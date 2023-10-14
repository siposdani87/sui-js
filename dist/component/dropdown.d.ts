import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Action } from '../utils';
export declare class Dropdown {
    dropdown: Knot;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Objekt;
    buttonKnot: Knot;
    menuKnot: Knot;
    constructor(element: Knot, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    private _appendButton;
    private _appendMenu;
    setActions(actions: Array<Action>, item: Objekt): void;
    private _renderMenu;
}
