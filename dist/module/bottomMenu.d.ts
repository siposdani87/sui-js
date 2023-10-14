import { Knot } from '../core';
import { Footer } from './footer';
export declare class BottomMenu {
    footer: Footer;
    bottomMenu: Knot;
    constructor(footer: Footer);
    private _init;
    toggle(): void;
    isOpened(): boolean;
    open(): void;
    close(): void;
    getContainer(): Knot;
}
