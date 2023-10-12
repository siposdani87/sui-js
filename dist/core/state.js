import { eachObject, eq, format, isNull } from '../utils/operation';
import { consoleDebug, consoleWarn } from '../utils/log';
import { Collection } from './collection';
import { Objekt } from './objekt';
import { Query } from './query';
import { Router } from './router';
/**
 * @class
 */
export class State {
    /**
     * @param {!Array<Route>} routes
     * @param {!Object=} opt_options
     */
    constructor(routes, opt_options = {}) {
        this._current = new Objekt();
        this._previous = this._current;
        this.routes = new Collection(routes);
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    _init() {
        this._setBasePath();
        this._setRealUrls();
        this._initPopstate();
        this._parseUrl();
    }
    /**
     * @private
     * @return {undefined}
     */
    _setRealUrls() {
        this.routes.each((route) => {
            const url = route.get('url');
            const realUrl = this._getRealUrl(url);
            route.set('realUrl', realUrl);
        });
    }
    /**
     * @private
     * @return {string}
     */
    _getUrlPrefix() {
        return this.basePath === '#' ? '/#' : '';
    }
    /**
     * @private
     * @param {string} url
     * @return {string}
     */
    _getRealUrl(url) {
        return format('{0}{1}', [this._getUrlPrefix(), url]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _setBasePath() {
        this.basePath = '#';
        const baseMetaTag = new Query('base').getKnot();
        if (!baseMetaTag.isEmpty()) {
            this.basePath = baseMetaTag.getAttribute('href') || '#';
        }
    }
    /**
     * @private
     * @return {undefined}
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
     * @return {undefined}
     */
    run() {
        this._triggerChange();
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @param {string} urlPath
     * @param {!Function} successCallback
     * @param {!Function} errorCallback
     * @return {undefined}
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
     * @private
     * @param {!Objekt} state
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _setHistory(state, url, opt_params = {}, opt_overwrite = false, opt_force = false) {
        url = this.basePath === '#' ? this.basePath + url : url;
        const template = state.get('template');
        const router = new Router(template);
        state.set('templateUrl', router.stringify(opt_params));
        state.set('params', opt_params);
        if (opt_overwrite) {
            window.history.replaceState(state.get(), state.get('title', ''), url);
        }
        else {
            window.history.pushState(state.get(), state.get('title', ''), url);
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
    _triggerChange(opt_force = false) {
        const currentState = this.getCurrent();
        const previousState = this.getPrevious();
        this.eventChange(currentState, previousState, opt_force);
    }
    /**
     * @private
     * @param {!Objekt} state
     * @return {undefined}
     */
    _setCurrent(state) {
        this._previous = this._current;
        this._current = state;
    }
    /**
     * @template T
     * @param {string=} opt_attribute
     * @param {T=} opt_defaultValue
     * @return {!T}
     */
    getCurrent(opt_attribute, opt_defaultValue) {
        return this._current.get(opt_attribute, opt_defaultValue);
    }
    /**
     * @template T
     * @param {string=} opt_attribute
     * @param {T=} opt_defaultValue
     * @return {!T}
     */
    getPrevious(opt_attribute, opt_defaultValue) {
        return this._previous.get(opt_attribute, opt_defaultValue);
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
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
     * @private
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {!Array}
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
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {string}
     */
    resolveUrl(id, opt_params) {
        const url = this._resolveUrlWithState(id, opt_params)[0];
        return this._getRealUrl(url);
    }
    /**
     * @param {!Route} state
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goState(state, opt_overwrite = false, opt_force = false) {
        this.go(state.get('id'), state.get('params'), opt_overwrite, opt_force);
    }
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goRoot(opt_overwrite = false, opt_force = false) {
        this.go(this.options.get('root.id'), this.options.get('root.params'), opt_overwrite, opt_force);
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
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
     * @return {undefined}
     */
    back() {
        window.history.go(-1);
    }
    /**
     * @param {string} url
     * @param {boolean=} opt_inTab
     * @return {undefined}
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
     * @return {undefined}
     */
    forward() {
        window.history.forward();
    }
    /**
     * @param {!Objekt} currentState
     * @param {!Objekt} previousState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    eventChange(currentState, previousState, opt_force = false) {
        consoleDebug('State.eventChange()', currentState, previousState, opt_force);
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setParams(properties) {
        eachObject(properties, (value, name) => {
            this.setParam(name, value);
        });
    }
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setParam(name, value) {
        const id = this.getCurrent('id');
        const params = this.getParams();
        params.set(name, value);
        this.go(id, params, true);
    }
    /**
     * @return {!Objekt}
     */
    getParams() {
        return this.getCurrent('params', new Objekt());
    }
    /**
     * @template T
     * @param {string} name
     * @param {*=} opt_defaultValue
     * @return {string}
     */
    getParam(name, opt_defaultValue) {
        const params = this.getParams();
        return params.get(name, opt_defaultValue);
    }
    /**
     * @return {undefined}
     */
    reload() {
        window.location.reload();
    }
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    refresh(opt_force = false) {
        this._triggerChange(opt_force);
    }
    /**
     * @return {!Array}
     */
    getRoot() {
        return [this.options.root.id, this.options.root.params];
    }
}
