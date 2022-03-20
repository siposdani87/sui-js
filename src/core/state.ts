import { eachObject, eq, format, isNull } from '../utils/operation';
import { consoleWarn } from '../utils/log';
import { Collection } from './collection';
import { Objekt } from './objekt';
import { Query } from './query';
import { Router } from './router';

/**
 * @class
 */
export class State {
    private _current: Objekt;
    private _previous: Objekt;
    routes: Collection<Objekt>;
    basePath: string;
    options: Objekt;
    /**
     * @param {!Array} routes
     * @param {!Object} options
     */
    constructor(routes: Array<Object>, options: Object) {
        this._current = new Objekt();
        this._previous = this._current;

        this.routes = /** @type {!Collection<!Objekt>} */ new Collection(
            routes,
        );

        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setRealUrls(): void {
        this.routes.each((route) => {
            const url = /** @type {string} */(route).get<string>('url');
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
            home: {
                id: 'home',
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
        successCallback: Function,
        errorCallback: Function,
    ): void {
        const path = urlPath[0] === '#' ? urlPath.substring(1) : urlPath;
        const items = this.routes.getItems();

        let state = null;
        let params = null;
        let matches = null;

        let i = 0;
        while (i < items.length && isNull(matches)) {
            state = items[i];
            const stateUrl = /** @type {string} */(state).get('url');
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
        state: Objekt,
        url: string,
        opt_params: Object | undefined = {},
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        url = this.basePath === '#' ? this.basePath + url : url;
        const template = /** @type {string} */(state).get<string>('template');
        const router = new Router(template);
        state.set('templateUrl', router.stringify(opt_params));
        state.set('params', opt_params);
        if (opt_overwrite) {
            window.history.replaceState(
                state.get(),
                /** @type {string} */(state).get('title', ''),
                url,
            );
        } else {
            window.history.pushState(
                state.get(),
                /** @type {string} */(state).get('title', ''),
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
     * @return {!T}
     */
    getCurrent<T>(opt_attribute?: string | undefined): T {
        return /** @type {!Objekt|string} */ this._current.get<T>(
            opt_attribute,
        );
    }
    /**
     * @template T
     * @param {string=} opt_attribute
     * @return {!T}
     */
    getPrevious<T>(opt_attribute?: string | undefined): T {
        return /** @type {!Objekt|string} */ this._previous.get<T>(
            opt_attribute,
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
        opt_params: Object | undefined = undefined,
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
    _resolveUrlWithState(
        id: string,
        opt_params: Object | undefined = undefined,
    ): Array<any> {
        const state = this.routes.findById(id);
        let url = '';
        if (state) {
            const stateUrl = /** @type {string} */(state).get<string>('url');
            const router = new Router(stateUrl);
            url = router.stringify(opt_params);
        }
        return [url, state];
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {string}
     */
    resolveUrl(id: string, opt_params: Object | undefined = undefined): string {
        const url = /** @type {string} */(this)._resolveUrlWithState(
            id,
            opt_params,
        )[0];
        return this._getRealUrl(url);
    }
    /**
     * @param {!Object} state
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goState(
        state: Object,
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        this.go(state['id'], state['params'], opt_overwrite, opt_force);
    }
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goHome(
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        this.go(
            this.options.home.id,
            this.options.home.params,
            opt_overwrite,
            opt_force,
        );
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
        opt_params: Object | undefined,
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
     * @return {!Collection}
     */
    getRoutes(): Collection {
        return this.routes;
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
        const id = /** @type {string} */(this).getCurrent<string>('id');
        const params = this.getParams();
        params.set(name, value);
        this.go(id, params, true);
    }
    /**
     * @return {!Objekt}
     */
    getParams(): Objekt {
        return /** @type {!Objekt} */ this.getCurrent<Objekt>('params');
    }
    /**
     * @template T
     * @param {string} name
     * @param {*=} opt_defaultValue
     * @return {string}
     */
    getParam<T = string>(name: string, opt_defaultValue?: any): T {
        const params = this.getParams();
        return /** @type {T} */(params).get<T>(name, opt_defaultValue);
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
    /**
     * @return {!Array}
     */
    getHome(): Array<any> {
        return [this.options.home.id, this.options.home.params];
    }
}
