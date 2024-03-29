import { Objekt } from './objekt';
import { Knot } from './knot';
import { Route } from '../component/route';
import { ClassRef, Injection, Instance } from '../utils';
export declare class Module {
    private _instances;
    private _injections;
    private _modules;
    private _controller;
    constructor();
    load(instances: Instance, injections: Injection): void;
    getController(): Object;
    add(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
    private _resolveDependencies;
    private _getSortedServices;
    private _topologicalSort;
    handleServices(services: string[]): void;
    handleRoutes(routes: Route[], options: Object): void;
    private _handleStateChange;
    private _initController;
    eventControllerLoaded(dom: Knot): void;
    eventControllerFailed(): void;
    eventModuleFailed(state: Objekt): void;
    eventModuleLoaded(state: Objekt): void;
    eventStateChange(state: Objekt): import("./promize").Promize<Object, Object>;
    eventDomChange(state: Objekt, dom: Knot): import("./promize").Promize<Object, Object>;
    eventAfterInit(): void;
    eventServiceLoaded(): void;
    eventServiceFailed(): void;
}
