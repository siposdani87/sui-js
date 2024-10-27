import { eachObject, eq, format, isNull } from '../utils/operation';
import { consoleDebug, consoleWarn } from '../utils/log';
import { Collection } from './collection';
import { Objekt } from './objekt';
import { Query } from './query';
import { Router } from './router';
import { Route } from '../component';

export class State {
    private _current: Objekt;
    private _previous: Objekt;
    routes: Collection<Route>;
    basePath: string;
    options: Objekt;

    constructor(routes: Route[], opt_options: object | undefined = {}) {
        this._current = new Objekt();
        this._previous = this._current;

        this.routes = new Collection(routes);

        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            root: {
                id: 'root',
                params: undefined,
            },
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this._setBasePath();
        this._setRealUrls();

        this._initPopstate();
        this._parseUrl();
    }

    private _setRealUrls(): void {
        this.routes.each((route) => {
            const url = route.get<string>('url');
            const realUrl = this._getRealUrl(url);
            route.set('realUrl', realUrl);
        });
    }

    private _getUrlPrefix(): string {
        return this.basePath === '#' ? '/#' : '';
    }

    private _getRealUrl(url: string): string {
        return format('{0}{1}', [this._getUrlPrefix(), url]);
    }

    private _setBasePath(): void {
        this.basePath = '#';
        const baseMetaTag = new Query('base').getKnot();
        if (!baseMetaTag.isEmpty()) {
            this.basePath = baseMetaTag.getAttribute('href') || '#';
        }
    }

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

    run(): void {
        this._triggerChange();
    }

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
                consoleWarn(
                    'State._parseUrl()',
                    path,
                    'missing state from routes config',
                );
                this.goRoot(true);
            },
        );
    }

    private _parsePath(
        urlPath: string,
        successCallback: (state: Route, path: string, params: object) => void,
        errorCallback: (state: Route, path: string, params: object) => void,
    ): void {
        const path = urlPath[0] === '#' ? urlPath.substring(1) : urlPath;
        const states = this.routes.getItems();

        let state: Route = null;
        let params: object = null;
        let matches: RegExpMatchArray = null;

        let i = 0;
        while (i < states.length && isNull(matches)) {
            state = states[i];
            const stateUrl = state.get<string>('url');
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

    private _setHistory(
        state: Route,
        url: string,
        opt_params: object | undefined = {},
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        url = this.basePath === '#' ? this.basePath + url : url;
        const template = state.get<string>('template');
        const router = new Router(template);
        state.set('templateUrl', router.stringify(opt_params));
        state.set('params', opt_params);
        if (opt_overwrite) {
            window.history.replaceState(
                state,
                state.get<string>('title', ''),
                url,
            );
        } else {
            window.history.pushState(
                state,
                state.get<string>('title', ''),
                url,
            );
        }
        this._setCurrent(state);
        if (!opt_overwrite) {
            this._triggerChange(opt_force);
        }
    }

    private _triggerChange(opt_force: boolean | undefined = false): void {
        const currentState = this.getCurrent<Objekt>();
        const previousState = this.getPrevious<Objekt>();
        this.eventChange(currentState, previousState, opt_force);
    }

    private _setCurrent(state: Objekt): void {
        this._previous = this._current;
        this._current = state;
    }

    getCurrent<T>(opt_attribute?: string, opt_defaultValue?: T): T {
        return this._current.get<T>(opt_attribute, opt_defaultValue);
    }

    getPrevious<T>(opt_attribute?: string, opt_defaultValue?: T): T {
        return this._previous.get<T>(opt_attribute, opt_defaultValue);
    }

    go(
        id: string,
        opt_params?: object,
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
                    state,
                    url,
                    opt_params,
                    opt_overwrite,
                    opt_force,
                );
            }
        }
    }

    private _resolveUrlWithState(id: string, opt_params?: object): Array<any> {
        const route = this.routes.findById(id);
        let url = '';
        if (route) {
            const stateUrl = route.get<string>('url');
            const router = new Router(stateUrl);
            url = router.stringify(opt_params);
        }
        return [url, route];
    }

    resolveUrl(id: string, opt_params?: object): string {
        const url = this._resolveUrlWithState(id, opt_params)[0];
        return this._getRealUrl(url);
    }

    goState(
        state: Route,
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        this.go(state.get('id'), state.get('params'), opt_overwrite, opt_force);
    }

    goRoot(
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        this.go(
            this.options.get('root.id'),
            this.options.get('root.params'),
            opt_overwrite,
            opt_force,
        );
    }

    goBack(
        id: string,
        opt_params?: object,
        opt_overwrite: boolean | undefined = false,
        opt_force: boolean | undefined = false,
    ): void {
        if (eq(window.history.length, 0)) {
            this.go(id, opt_params, opt_overwrite, opt_force);
        } else {
            this.back();
        }
    }

    back(): void {
        window.history.go(-1);
    }

    redirect(url: string, opt_inTab: boolean | undefined = false): void {
        if (opt_inTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }

    forward(): void {
        window.history.forward();
    }

    eventChange(
        currentState: Objekt,
        previousState: Objekt,
        opt_force: boolean | undefined = false,
    ): void {
        consoleDebug(
            'State.eventChange()',
            currentState,
            previousState,
            opt_force,
        );
    }

    setParams(properties: object): void {
        eachObject(properties, (value, name) => {
            this.setParam(name, value);
        });
    }

    setParam(name: string, value: any): void {
        const id = this.getCurrent<string>('id');
        const params = this.getParams();
        params.set(name, value);
        this.go(id, params, true);
    }

    getParams(): Objekt {
        return this.getCurrent<Objekt>('params', new Objekt());
    }

    getParam<T = string>(name: string, opt_defaultValue?: any): T {
        const params = this.getParams();
        return params.get<T>(name, opt_defaultValue);
    }

    reload(): void {
        window.location.reload();
    }

    refresh(opt_force: boolean | undefined = false): void {
        this._triggerChange(opt_force);
    }

    getRoot(): Array<any> {
        return [this.options.root.id, this.options.root.params];
    }
}
