import { Knot } from '../core';
import { Popup } from './popup';
export declare class PopupContainer {
    selector: string;
    container: Knot;
    constructor(opt_selector?: string | undefined);
    private _init;
    private _initCollection;
    push(type: Function, popup: Popup): void;
    delete(popup: Popup): void;
    closeAll(): void;
    setPosition(popupKnot: Knot): void;
    clearPosition(popupKnot: Knot): void;
}
