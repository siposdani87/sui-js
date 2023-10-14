import { Objekt } from '../core/objekt';
export declare class EventBus {
    eventStore: Objekt;
    constructor();
    set(name: string, callback: Function): Function;
    remove(name: string, callback: Function): void;
    pop(name: string): void;
    call(name: string, opt_args?: Array<any> | undefined): import("..").Promize<Object, Object>;
    override(name: string, args: Array<any>, callback: Function): import("..").Promize<Object, Object>;
}
