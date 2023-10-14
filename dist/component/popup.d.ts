import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
export declare class Popup {
    content: Knot;
    parent?: Knot;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupKnot: Knot;
    constructor(content: Knot, parent: Knot, opt_withClose?: boolean | undefined);
    private _init;
    private _draw;
    private _initCloseButton;
    open(): void;
    close(): void;
    eventClose(): void;
    toggle(): void;
    isOpened(): boolean;
}
