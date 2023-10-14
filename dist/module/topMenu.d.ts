import { Knot } from '../core';
import { Header } from './header';
export declare class TopMenu {
    header: Header;
    topMenu: Knot;
    toggleTopMenu: Knot;
    constructor(header: Header);
    private _init;
    toggle(): void;
    isOpened(): boolean;
    open(): void;
    close(): void;
    getContainer(): Knot;
}
