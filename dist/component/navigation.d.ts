import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Http } from '../module';
export declare class Navigation {
    http?: Http;
    options: Objekt;
    container: Collection<Objekt>;
    linkKnotKey: string;
    constructor(opt_http?: Http, opt_options?: object | undefined);
    private _setOptions;
    private _init;
    add(item: Objekt): void;
    addCounter(id: string, counter: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: object | undefined): void;
    addIcon(id: string, icon: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: object | undefined): void;
    addImage(id: string, image: string, title: string | null, action: Function, opt_href?: string | undefined, opt_data?: object | undefined): void;
    addText(id: string, title: string, action: Function, opt_href?: string | undefined, opt_data?: object | undefined): void;
    private _setKnot;
    each(next: Function): void;
    bindToContainer(containerKnot: Knot): void;
    setDisabled(id: string): void;
    private _disabled;
    setEnabled(id: string): void;
    private _enabled;
    setActive(id: string): void;
    setAllInactive(): void;
    show(id: string): void;
    hide(id: string): void;
}
