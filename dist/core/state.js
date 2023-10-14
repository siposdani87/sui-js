import { eachObject, eq, format, isNull } from '../utils/operation';
import { consoleDebug, consoleWarn } from '../utils/log';
import { Collection } from './collection';
import { Objekt } from './objekt';
import { Query } from './query';
import { Router } from './router';
export class State {
    constructor(routes, opt_options = {}) {
        this._current = new Objekt();
        this._previous = this._current;
        this.routes = new Collection(routes);
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            root: {
                id: 'root',
                params: undefined,
            },
        });
        this.options.merge(opt_options);
    }
    _init() {
        this._setBasePath();
        this._setRealUrls();
        this._initPopstate();
        this._parseUrl();
    }
    _setRealUrls() {
        this.routes.each((route) => {
            const url = route.get('url');
            const realUrl = this._getRealUrl(url);
            route.set('realUrl', realUrl);
        });
    }
    _getUrlPrefix() {
        return this.basePath === '#' ? '/#' : '';
    }
    _getRealUrl(url) {
        return format('{0}{1}', [this._getUrlPrefix(), url]);
    }
    _setBasePath() {
        this.basePath = '#';
        const baseMetaTag = new Query('base').getKnot();
        if (!baseMetaTag.isEmpty()) {
            this.basePath = baseMetaTag.getAttribute('href') || '#';
        }
    }
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
    run() {
        this._triggerChange();
    }
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
    _triggerChange(opt_force = false) {
        const currentState = this.getCurrent();
        const previousState = this.getPrevious();
        this.eventChange(currentState, previousState, opt_force);
    }
    _setCurrent(state) {
        this._previous = this._current;
        this._current = state;
    }
    getCurrent(opt_attribute, opt_defaultValue) {
        return this._current.get(opt_attribute, opt_defaultValue);
    }
    getPrevious(opt_attribute, opt_defaultValue) {
        return this._previous.get(opt_attribute, opt_defaultValue);
    }
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
    resolveUrl(id, opt_params) {
        const url = this._resolveUrlWithState(id, opt_params)[0];
        return this._getRealUrl(url);
    }
    goState(state, opt_overwrite = false, opt_force = false) {
        this.go(state.get('id'), state.get('params'), opt_overwrite, opt_force);
    }
    goRoot(opt_overwrite = false, opt_force = false) {
        this.go(this.options.get('root.id'), this.options.get('root.params'), opt_overwrite, opt_force);
    }
    goBack(id, opt_params, opt_overwrite = false, opt_force = false) {
        if (eq(window.history.length, 0)) {
            this.go(id, opt_params, opt_overwrite, opt_force);
        }
        else {
            this.back();
        }
    }
    back() {
        window.history.go(-1);
    }
    redirect(url, opt_inTab = false) {
        if (opt_inTab) {
            window.open(url, '_blank');
        }
        else {
            window.location.href = url;
        }
    }
    forward() {
        window.history.forward();
    }
    eventChange(currentState, previousState, opt_force = false) {
        consoleDebug('State.eventChange()', currentState, previousState, opt_force);
    }
    setParams(properties) {
        eachObject(properties, (value, name) => {
            this.setParam(name, value);
        });
    }
    setParam(name, value) {
        const id = this.getCurrent('id');
        const params = this.getParams();
        params.set(name, value);
        this.go(id, params, true);
    }
    getParams() {
        return this.getCurrent('params', new Objekt());
    }
    getParam(name, opt_defaultValue) {
        const params = this.getParams();
        return params.get(name, opt_defaultValue);
    }
    reload() {
        window.location.reload();
    }
    refresh(opt_force = false) {
        this._triggerChange(opt_force);
    }
    getRoot() {
        return [this.options.root.id, this.options.root.params];
    }
}
