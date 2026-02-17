import { eachObject, eq, format, isNull } from '../utils/operation';
import { consoleDebug, consoleWarn } from '../utils/log';
import { Collection } from './collection';
import { Objekt } from './objekt';
import { Query } from './query';
import { Router } from './router';
/**
 * Manages application state via URL-based routing using the browser
 * History API. State maintains a collection of {@link Route} definitions,
 * matches the current URL against those routes using {@link Router}, and
 * triggers state change notifications when navigation occurs.
 *
 * State supports both hash-based (`#/path`) and path-based (`/path`)
 * routing, auto-detecting the mode from the `<base href>` tag. It
 * integrates with `window.history` for pushState/replaceState navigation
 * and handles browser back/forward via the `popstate` event.
 *
 * The {@link eventChange} method is designed to be overridden by subclasses
 * (such as {@link Module}) to react to state transitions.
 *
 * @example
 * const routes = [
 *     new Route('home', 'Home', '/', 'HomeController'),
 *     new Route('user', 'User Profile', '/users/:id', 'UserController'),
 * ];
 *
 * const state = new State(routes, { root: { id: 'home' } });
 * state.go('user', { id: 42 });
 * state.getParam('id'); // 42
 *
 * @see {@link Router}
 * @see {@link Route}
 * @see {@link Module}
 * @category Core
 */
export class State {
    /**
     * Creates a new State instance with the given route definitions and
     * options. Initializes the base path, parses the current URL, and
     * sets up the `popstate` event listener for browser navigation.
     *
     * @param routes Array of {@link Route} objects defining the
     *     application's available routes.
     * @param opt_options Configuration options. Supports `root.id` and
     *     `root.params` to define the fallback root route.
     */
    constructor(routes, opt_options = {}) {
        this._current = new Objekt();
        this._previous = this._current;
        this.routes = new Collection(routes);
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges the provided options with defaults. The default root route
     * is configured with `id: 'root'`.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            root: {
                id: 'root',
                params: undefined,
            },
        });
        this.options.merge(opt_options);
    }
    /**
     * Initializes the state manager by determining the base path, computing
     * real URLs for all routes, setting up the popstate listener, and
     * parsing the current browser URL.
     */
    _init() {
        this._setBasePath();
        this._setRealUrls();
        this._initPopstate();
        this._parseUrl();
    }
    /**
     * Computes the full real URL for each route by prepending the URL
     * prefix (hash or empty) and stores it as the `realUrl` property.
     */
    _setRealUrls() {
        this.routes.each((route) => {
            const url = route.get('url');
            const realUrl = this._getRealUrl(url);
            route.set('realUrl', realUrl);
        });
    }
    /**
     * Returns the URL prefix based on the routing mode. In hash-based
     * routing returns `'/#'`; in path-based routing returns an empty string.
     *
     * @returns The URL prefix string.
     */
    _getUrlPrefix() {
        return this.basePath === '#' ? '/#' : '';
    }
    /**
     * Prepends the URL prefix to a route URL to produce a navigable URL.
     *
     * @param url The route's URL pattern.
     * @returns The full URL including the routing prefix.
     */
    _getRealUrl(url) {
        return format('{0}{1}', [this._getUrlPrefix(), url]);
    }
    /**
     * Determines the base path from the `<base>` HTML tag. If a `<base>`
     * tag with an `href` attribute exists, uses that value; otherwise
     * defaults to `'#'` for hash-based routing.
     */
    _setBasePath() {
        this.basePath = '#';
        const baseMetaTag = new Query('base').getKnot();
        if (!baseMetaTag.isEmpty()) {
            this.basePath = baseMetaTag.getAttribute('href') || '#';
        }
    }
    /**
     * Registers the `popstate` event listener on the window. When the
     * browser navigates back or forward, re-parses the URL or restores
     * the saved history state and triggers a state change.
     */
    _initPopstate() {
        window.addEventListener('popstate', () => {
            if (window.history.state) {
                const state = new Objekt();
                state.merge(window.history.state);
                this._setCurrent(state);
                this._triggerChange();
            }
            else {
                this._parseUrl();
                this._triggerChange();
            }
        });
    }
    /**
     * Triggers the initial state change after construction. Call this
     * method to begin routing and notify listeners of the current state.
     *
     * @example
     * const state = new State(routes);
     * state.run(); // Fires eventChange with the initial route
     */
    run() {
        this._triggerChange();
    }
    /**
     * Parses the current browser URL to determine the active route. On
     * success, replaces the current history state. If no route matches,
     * logs a warning and navigates to the root route.
     */
    _parseUrl() {
        const path = window.location.hash
            ? window.location.hash
            : window.location.pathname.replace(this.basePath, '/') +
                window.location.search;
        this._parsePath(path, (state, path, params) => {
            this._setHistory(state, path, params, true);
        }, () => {
            consoleWarn('State._parseUrl()', path, 'missing state from routes config');
            this.goRoot(true);
        });
    }
    /**
     * Attempts to match a URL path against all registered routes. Iterates
     * through routes using {@link Router} until a match is found, then
     * invokes the success callback. If no route matches, invokes the
     * error callback.
     *
     * @param urlPath URL path to match against routes.
     * @param successCallback Called with the matched route, path, and
     *     extracted parameters when a match is found.
     * @param errorCallback Called when no route matches the given path.
     */
    _parsePath(urlPath, successCallback, errorCallback) {
        const path = urlPath[0] === '#' ? urlPath.substring(1) : urlPath;
        const states = this.routes.getItems();
        let state = null;
        let params = null;
        let matches = null;
        let i = 0;
        while (i < states.length && isNull(matches)) {
            state = states[i];
            const stateUrl = state.get('url');
            const router = new Router(stateUrl);
            matches = router.getMatches(path);
            params = router.parse(path);
            i++;
        }
        if (state && params && matches) {
            successCallback(state, path, params);
        }
        else {
            errorCallback(state, path, params);
        }
    }
    /**
     * Pushes or replaces a history entry for the given route and URL.
     * Updates the template URL from route parameters, sets the current
     * state, and optionally triggers a state change event.
     *
     * @param state The matched {@link Route} to record in history.
     * @param url The URL path to push or replace in the browser history.
     * @param opt_params Route parameters extracted from the URL.
     * @param opt_overwrite When `true`, replaces the current history
     *     entry instead of pushing a new one.
     * @param opt_force When `true`, forces the state change event even
     *     if the state has not changed.
     */
    _setHistory(state, url, opt_params = {}, opt_overwrite = false, opt_force = false) {
        url = this.basePath === '#' ? this.basePath + url : url;
        const template = state.get('template');
        const router = new Router(template);
        state.set('templateUrl', router.stringify(opt_params));
        state.set('params', opt_params);
        if (opt_overwrite) {
            window.history.replaceState(state, state.get('title', ''), url);
        }
        else {
            window.history.pushState(state, state.get('title', ''), url);
        }
        this._setCurrent(state);
        if (!opt_overwrite) {
            this._triggerChange(opt_force);
        }
    }
    /**
     * Invokes {@link eventChange} with the current and previous states.
     *
     * @param opt_force When `true`, forces the event even if the route
     *     has not changed.
     */
    _triggerChange(opt_force = false) {
        const currentState = this.getCurrent();
        const previousState = this.getPrevious();
        this.eventChange(currentState, previousState, opt_force);
    }
    /**
     * Updates the internal current state reference and saves the
     * outgoing state as the previous state.
     *
     * @param state The new current state object.
     */
    _setCurrent(state) {
        this._previous = this._current;
        this._current = state;
    }
    /**
     * Retrieves the current route state or a specific attribute from it.
     * When called without arguments, returns the full current state as
     * an {@link Objekt}. When called with an attribute path, returns that
     * nested value.
     *
     * @param opt_attribute Dot-notation path to a specific attribute
     *     within the current state (e.g., `'params.id'`).
     * @param opt_defaultValue Default value returned when the attribute
     *     does not exist.
     * @returns The full current state or the requested attribute value.
     * @example
     * const currentRoute = state.getCurrent<Objekt>();
     * const routeId = state.getCurrent<string>('id');
     */
    getCurrent(opt_attribute, opt_defaultValue) {
        return this._current.get(opt_attribute, opt_defaultValue);
    }
    /**
     * Retrieves the previous route state or a specific attribute from it.
     * Works identically to {@link getCurrent} but returns the state that
     * was active before the last navigation.
     *
     * @param opt_attribute Dot-notation path to a specific attribute
     *     within the previous state.
     * @param opt_defaultValue Default value returned when the attribute
     *     does not exist.
     * @returns The full previous state or the requested attribute value.
     * @example
     * const previousRoute = state.getPrevious<Objekt>();
     * const previousId = state.getPrevious<string>('id');
     */
    getPrevious(opt_attribute, opt_defaultValue) {
        return this._previous.get(opt_attribute, opt_defaultValue);
    }
    /**
     * Navigates to a route by its ID or by a direct URL path. When given
     * a route ID, resolves the URL from the registered routes and
     * substitutes the provided parameters. When given a path starting
     * with `#` or `/`, parses it directly against registered routes.
     *
     * Pushes a new browser history entry by default, or replaces the
     * current entry when `opt_overwrite` is `true`.
     *
     * @param id Route identifier string, or a URL path starting with
     *     `#` or `/`.
     * @param opt_params Parameters to substitute into the route pattern.
     * @param opt_overwrite When `true`, replaces the current history
     *     entry instead of pushing a new one.
     * @param opt_force When `true`, forces the state change event even
     *     if navigating to the same route.
     * @example
     * // Navigate by route ID with parameters
     * state.go('user', { id: 42 });
     *
     * // Navigate by URL path
     * state.go('/users/42');
     *
     * // Replace current history entry
     * state.go('home', {}, true);
     */
    go(id, opt_params, opt_overwrite = false, opt_force = false) {
        if (eq(id[0], '#') || eq(id[0], '/')) {
            this._parsePath(id, (state, path, params) => {
                this._setHistory(state, path, params, opt_overwrite, opt_force);
            }, () => {
                // empty function
            });
        }
        else {
            const [url, state] = this._resolveUrlWithState(id, opt_params);
            if (url && state) {
                this._setHistory(state, url, opt_params, opt_overwrite, opt_force);
            }
        }
    }
    /**
     * Resolves a route ID and parameters to a URL string and the
     * corresponding {@link Route} object.
     *
     * @param id Route identifier to look up.
     * @param opt_params Parameters to substitute into the route URL.
     * @returns A two-element array of `[url, route]`, or `['', undefined]`
     *     if the route ID is not found.
     */
    _resolveUrlWithState(id, opt_params) {
        const route = this.routes.findById(id);
        let url = '';
        if (route) {
            const stateUrl = route.get('url');
            const router = new Router(stateUrl);
            url = router.stringify(opt_params);
        }
        return [url, route];
    }
    /**
     * Builds a full navigable URL for a route ID and parameters, including
     * the routing prefix (hash or path-based). Useful for generating
     * `href` values for links.
     *
     * @param id Route identifier to resolve.
     * @param opt_params Parameters to substitute into the route pattern.
     * @returns The fully resolved URL string including the routing prefix.
     * @example
     * const href = state.resolveUrl('user', { id: 42 });
     * // '/#/users/42' (hash mode) or '/users/42' (path mode)
     */
    resolveUrl(id, opt_params) {
        const url = this._resolveUrlWithState(id, opt_params)[0];
        return this._getRealUrl(url);
    }
    /**
     * Navigates to a route using an existing {@link Route} object. Extracts
     * the route's ID and parameters and delegates to {@link go}.
     *
     * @param state The {@link Route} object to navigate to.
     * @param opt_overwrite When `true`, replaces the current history entry.
     * @param opt_force When `true`, forces the state change event.
     * @example
     * const route = state.routes.findById('dashboard');
     * state.goState(route);
     */
    goState(state, opt_overwrite = false, opt_force = false) {
        this.go(state.get('id'), state.get('params'), opt_overwrite, opt_force);
    }
    /**
     * Navigates to the configured root route. The root route ID and
     * parameters are defined in the constructor options.
     *
     * @param opt_overwrite When `true`, replaces the current history entry.
     * @param opt_force When `true`, forces the state change event.
     * @example
     * state.goRoot(); // Navigate to the root/home route
     */
    goRoot(opt_overwrite = false, opt_force = false) {
        this.go(this.options.get('root.id'), this.options.get('root.params'), opt_overwrite, opt_force);
    }
    /**
     * Navigates to a fallback route if browser history is empty, otherwise
     * goes back one step in history. Useful for "back" buttons that need
     * a guaranteed destination.
     *
     * @param id Fallback route ID to navigate to if history is empty.
     * @param opt_params Parameters for the fallback route.
     * @param opt_overwrite When `true`, replaces the current history entry
     *     (only used for the fallback navigation).
     * @param opt_force When `true`, forces the state change event
     *     (only used for the fallback navigation).
     * @example
     * // Go back in history, or navigate to 'dashboard' if no history
     * state.goBack('dashboard', { tab: 'overview' });
     */
    goBack(id, opt_params, opt_overwrite = false, opt_force = false) {
        if (eq(window.history.length, 0)) {
            this.go(id, opt_params, opt_overwrite, opt_force);
        }
        else {
            this.back();
        }
    }
    /**
     * Navigates one step back in browser history.
     *
     * @example
     * state.back();
     */
    back() {
        window.history.go(-1);
    }
    /**
     * Performs a full page navigation to the given URL. Unlike {@link go},
     * this does not use the History API and causes a complete page load.
     * Optionally opens the URL in a new browser tab.
     *
     * @param url The full URL to navigate to.
     * @param opt_inTab When `true`, opens the URL in a new tab instead
     *     of navigating the current window.
     * @example
     * state.redirect('https://example.com');
     * state.redirect('https://docs.example.com', true); // New tab
     */
    redirect(url, opt_inTab = false) {
        if (opt_inTab) {
            window.open(url, '_blank');
        }
        else {
            window.location.href = url;
        }
    }
    /**
     * Navigates one step forward in browser history.
     *
     * @example
     * state.forward();
     */
    forward() {
        window.history.forward();
    }
    /**
     * Called when the application state changes due to navigation. This
     * is a hook method intended to be overridden by subclasses (such as
     * {@link Module}) to respond to route transitions. The default
     * implementation logs the state change to the console.
     *
     * @param currentState The newly active route state as an {@link Objekt}.
     * @param previousState The previously active route state as an
     *     {@link Objekt}.
     * @param opt_force Whether the change was forced (e.g., navigating
     *     to the same route).
     */
    eventChange(currentState, previousState, opt_force = false) {
        consoleDebug('State.eventChange()', currentState, previousState, opt_force);
    }
    /**
     * Sets multiple URL parameters at once on the current route. Each
     * key-value pair is applied individually via {@link setParam}.
     *
     * @param properties An object of parameter names and values to set.
     * @example
     * state.setParams({ page: 2, sort: 'name' });
     */
    setParams(properties) {
        eachObject(properties, (value, name) => {
            this.setParam(name, value);
        });
    }
    /**
     * Sets a single URL parameter on the current route and re-navigates
     * with the updated parameters (replacing the current history entry).
     *
     * @param name The parameter name to set.
     * @param value The parameter value to assign.
     * @example
     * state.setParam('page', 3);
     */
    setParam(name, value) {
        const id = this.getCurrent('id');
        const params = this.getParams();
        params.set(name, value);
        this.go(id, params, true);
    }
    /**
     * Returns all parameters of the current route as an {@link Objekt}.
     *
     * @returns The current route's parameters, or an empty {@link Objekt}
     *     if no parameters are set.
     * @example
     * const params = state.getParams();
     * console.log(params.get('id'));
     */
    getParams() {
        return this.getCurrent('params', new Objekt());
    }
    /**
     * Retrieves a single parameter value from the current route by name.
     * Returns the default value if the parameter does not exist.
     *
     * @param name The parameter name to retrieve.
     * @param opt_defaultValue Value returned when the parameter is not set.
     * @returns The parameter value, automatically type-cast.
     * @example
     * const userId = state.getParam<number>('id');
     * const page = state.getParam<number>('page', 1);
     */
    getParam(name, opt_defaultValue) {
        const params = this.getParams();
        return params.get(name, opt_defaultValue);
    }
    /**
     * Performs a full page reload, discarding all client-side state.
     *
     * @example
     * state.reload();
     */
    reload() {
        window.location.reload();
    }
    /**
     * Re-triggers the {@link eventChange} callback for the current state
     * without navigating. Useful for forcing a view re-render.
     *
     * @param opt_force When `true`, forces the event even if the state
     *     has not changed.
     * @example
     * state.refresh();       // Re-trigger with default behavior
     * state.refresh(true);   // Force re-trigger
     */
    refresh(opt_force = false) {
        this._triggerChange(opt_force);
    }
    /**
     * Returns the configured root route ID and parameters as a
     * two-element array.
     *
     * @returns An array of `[rootId, rootParams]` from the options.
     * @example
     * const [rootId, rootParams] = state.getRoot();
     */
    getRoot() {
        return [this.options.root.id, this.options.root.params];
    }
}
