import { Collection } from './collection';
import { Objekt } from './objekt';
import { Route } from '../component';
export declare class State {
    private _current;
    private _previous;
    routes: Collection<Route>;
    basePath: string;
    options: Objekt;
    constructor(routes: Route[], opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    private _setRealUrls;
    private _getUrlPrefix;
    private _getRealUrl;
    private _setBasePath;
    private _initPopstate;
    run(): void;
    private _parseUrl;
    private _parsePath;
    private _setHistory;
    private _triggerChange;
    private _setCurrent;
    getCurrent<T>(opt_attribute?: string, opt_defaultValue?: T): T;
    getPrevious<T>(opt_attribute?: string, opt_defaultValue?: T): T;
    go(id: string, opt_params?: Object, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    private _resolveUrlWithState;
    resolveUrl(id: string, opt_params?: Object): string;
    goState(state: Route, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    goRoot(opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    goBack(id: string, opt_params?: Object, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    back(): void;
    redirect(url: string, opt_inTab?: boolean | undefined): void;
    forward(): void;
    eventChange(currentState: Objekt, previousState: Objekt, opt_force?: boolean | undefined): void;
    setParams(properties: Object): void;
    setParam(name: string, value: any): void;
    getParams(): Objekt;
    getParam<T = string>(name: string, opt_defaultValue?: any): T;
    reload(): void;
    refresh(opt_force?: boolean | undefined): void;
    getRoot(): Array<any>;
}
