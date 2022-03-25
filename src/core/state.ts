import { eachObject, eq, format, isNull } from '../utils/operation';
import { consoleWarn } from '../utils/log';
import { Collection } from './collection';
import { Objekt } from './objekt';
import { Query } from './query';
import { Router } from './router';
import { Route } from '../component';

/**
 * @class
 */
export class State {
    private _current: Objekt;
    private _previous: Objekt;
    routes: Collection<Route>;
    basePath: string;
    options: Objekt;
    /**
     * @param {!Array<Route>} routes
     * @param {!Object} options
     */
    constructor(routes: Route[], options: Object) {
        this._current = new Objekt();
        this._previous = this._current;

        this.routes = /** @type {!Collection<!Route>} */ new Collection(routes);

        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setRealUrls(): void {
        this.routes.each((route) => {
            const url = /** @type {string} */ route.get<string>('url');
            const realUrl = this._getRealUrl(url);
            route.set('realUrl', realUrl);
        });
    }
    /**
     * @private
     * @return {string}
     */
    private _getUrlPrefix(): string {
        return this.basePath === '#' ? '/#' : '';
    }
    /**
     * @private
     * @param {string} url
     * @return {string}
     */
    private _getRealUrl(url: string): string {
        return format('{0}{1}', [this._getUrlPrefix(), url]);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setBasePath(): void {
        this.basePath = '#';
        const baseMetaTag = new Query('base').getItem();
        if (!baseMetaTag.isEmpty()) {
            this.basePath = baseMetaTag.getAttribute('href') || '#';
        }
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions(options: Object): void {
        const _self = this;
        _self.options = new Objekt({
            root: {
                id: 'root',
                params: undefined,
            },
        });
        _self.options.merge(options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this._setBasePath();
        this._setRealUrls();

        this._initPopstate();
        this._parseUrl();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initPopstate(): void {
        window.addEventListener('popstate', () => {
            if (window.history.state) {
                const state = new Objekt();
                state.merge(window.history.state);
                this._setCurrent(state);
                this._triggerChange();
            } else {
                this._parseUrl();
                this._triggerChange();
            }
        });
    }
    /**
     * @return {undefined}
     */
    run(): void {
        this._triggerChange();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _parseUrl(): void {
        const path = window.location.hash
            ? window.location.hash
            : window.location.pathname.replace(this.basePath, '/') +
              window.location.search;
        this._parsePath(
            path,
            (state, path, params) => {
                this._setHistory(state, path, params, true);
            },
            () => {
                // consoleWarn('State._parseUrl()', path, 'missing state from routes config');
                this.goRoot(true);
            },
        );
    }
    /**
     * @private
     * @param {string} urlPath
     * @param {!Function} successCallback
     * @param {!Function} errorCallback
     * @return {undefined}
     */
    _parsePath(
        urlPath: string,
        successCallback: (state: Route, path: string, params: Object) => void,
        errorCallback: (state: Route, path: string, params: Object) => void,
    ): void {
        const path = urlPath[0] === '#' ? urlPath.substring(1) : urlPath;
        const states = this.routes.getItems();

        let state: Route = null;
        let params: Object = null;
        let matches: RegExpMatchArray = null;

        let i = 0;
        while (i < states.length && isNull(matches)) {
            state = states[i];
            const stateUrl = /** @type {string} */ state.get<string>('url');
            const router = new Router(stateUrl);
            matches = router.getMatches(path);
            params = router.parse(path);
            i++;
        }
        if (state && params && matches) {
            successCallback(state, path, params);
        } else {
            errorCallback(state, path, params);
        }
    }
    /**
     * @private
     * @param {!Objekt} state
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _setHistory(
        state: Route,
        url: string,
        opt_params: Object | undefined = {},
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        url = this.basePath === '#' ? this.basePath + url : url;
        const template = /** @type {string} */ state.get<string>('template');
        const router = new Router(template);
        state.set('templateUrl', router.stringify(opt_params));
        state.set('params', opt_params);
        if (opt_overwrite) {
            window.history.replaceState(
                state.get(),
                /** @type {string} */ state.get<string>('title', ''),
                url,
            );
        } else {
            window.history.pushState(
                state.get(),
                /** @type {string} */ state.get<string>('title', ''),
                url,
            );
        }
        this._setCurrent(state);
        if (!opt_overwrite) {
            this._triggerChange(opt_force);
        }
    }
    /**
     * @private
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    private _triggerChange(opt_force: boolean | undefined = false): void {
        const currentState = /** @type {!Objekt} */ this.getCurrent<Objekt>();
        const previousState = /** @type {!Objekt} */ this.getPrevious<Objekt>();
        this.eventChange(currentState, previousState, opt_force);
    }
    /**
     * @private
     * @param {!Objekt} state
     * @return {undefined}
     */
    private _setCurrent(state: Objekt): void {
        this._previous = this._current;
        this._current = state;
    }
    /**
     * @template T
     * @param {string=} opt_attribute
     * @param {T=} opt_defaultValue
     * @return {!T}
     */
    getCurrent<T>(opt_attribute?: string, opt_defaultValue?: T): T {
        return /** @type {!Objekt|string} */ this._current.get<T>(
            opt_attribute,
            opt_defaultValue,
        );
    }
    /**
     * @template T
     * @param {string=} opt_attribute
     * @param {T=} opt_defaultValue
     * @return {!T}
     */
    getPrevious<T>(opt_attribute?: string, opt_defaultValue?: T): T {
        return /** @type {!Objekt|string} */ this._previous.get<T>(
            opt_attribute,
            opt_defaultValue,
        );
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    go(
        id: string,
        opt_params?: Object,
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        if (eq(id[0], '#') || eq(id[0], '/')) {
            this._parsePath(
                id,
                (state, path, params) => {
                    this._setHistory(
                        state,
                        path,
                        params,
                        opt_overwrite,
                        opt_force,
                    );
                },
                () => {
                    // empty function
                },
            );
        } else {
            const [url, state] = this._resolveUrlWithState(id, opt_params);
            if (url && state) {
                this._setHistory(
                    /** @type {!Objekt} */ state,
                    url,
                    opt_params,
                    opt_overwrite,
                    opt_force,
                );
            }
        }
    }
    /**
     * @private
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {!Array}
     */
    _resolveUrlWithState(id: string, opt_params?: Object): Array<any> {
        const route = this.routes.findById(id);
        let url = '';
        if (route) {
            const stateUrl =
                /** @type {string} */ route.get<string>('url');
            const router = new Router(stateUrl);
            url = router.stringify(opt_params);
        }
        return [url, route?.state];
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {string}
     */
    resolveUrl(id: string, opt_params?: Object): string {
        const url = /** @type {string} */ this._resolveUrlWithState(
            id,
            opt_params,
        )[0];
        return this._getRealUrl(url);
    }
    /**
     * @param {!Route} state
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goState(
        state: Route,
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        this.go(state.get('id'), state.get('params'), opt_overwrite, opt_force);
    }
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goRoot(
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        this.go(
            this.options.root.id,
            this.options.root.params,
            opt_overwrite,
            opt_force,
        );
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goBack(
        id: string,
        opt_params?: Object,
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        if (eq(window.history.length, 0)) {
            this.go(id, opt_params, opt_overwrite, opt_force);
        } else {
            this.back();
        }
    }
    /**
     * @return {undefined}
     */
    back(): void {
        window.history.go(-1);
    }
    /**
     * @param {string} url
     * @param {boolean=} opt_inTab
     * @return {undefined}
     */
    redirect(url: string, opt_inTab: boolean | undefined = false): void {
        if (opt_inTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }
    /**
     * @return {undefined}
     */
    forward(): void {
        window.history.forward();
    }
    /**
     * @param {!Objekt} currentState
     * @param {!Objekt} previousState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    eventChange(
        currentState: Objekt,
        previousState: Objekt,
        opt_force: boolean | undefined = false,
    ): void {
        consoleWarn(
            'State.eventChange()',
            currentState,
            previousState,
            opt_force,
        );
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setParams(properties: Object): void {
        eachObject(properties, (value, name) => {
            this.setParam(name, value);
        });
    }
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setParam(name: string, value: any): void {
        const id = /** @type {string} */ this.getCurrent<string>('id');
        const params = this.getParams();
        params.set(name, value);
        this.go(id, params, true);
    }
    /**
     * @return {!Objekt}
     */
    getParams(): Objekt {
        return /** @type {!Objekt} */ this.getCurrent<Objekt>('params', new Objekt());
    }
    /**
     * @template T
     * @param {string} name
     * @param {*=} opt_defaultValue
     * @return {string}
     */
    getParam<T = string>(name: string, opt_defaultValue?: any): T {
        const params = this.getParams();
        return /** @type {T} */ params.get<T>(name, opt_defaultValue);
    }
    /**
     * @return {undefined}
     */
    reload(): void {
        window.location.reload();
    }
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    refresh(opt_force: boolean | undefined = false): void {
        this._triggerChange(opt_force);
    }
    /**
     * @return {!Array}
     */
    getRoot(): Array<any> {
        return [this.options.root.id, this.options.root.params];
    }
}
