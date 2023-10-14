import { Knot } from '../core';
export declare class NavBar {
    navBarHeader: Knot;
    navBar: Knot;
    toggleNavBarIcon: Knot;
    constructor();
    private _init;
    toggle(): void;
    isOpened(): boolean;
    open(): void;
    close(): void;
    show(): void;
    hide(): void;
    showShadow(): void;
    hideShadow(): void;
    getContainer(): Knot;
}
