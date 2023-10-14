import { Knot } from '../core';
export declare class LeftMenu {
    body: Knot;
    mainContainerKnot: Knot;
    leftMenu: Knot;
    mainMenu: Knot;
    subMenu: Knot;
    mainMenuContainer: Knot;
    subMenuContainer: Knot;
    mainMenuTitle: Knot;
    subMenuTitle: Knot;
    constructor();
    private _init;
    private _initEvents;
    open(opt_title?: string | undefined): void;
    close(): void;
    openSubMenu(opt_title?: string | undefined): void;
    closeSubMenu(): void;
    getMainContainer(): Knot;
    getSubContainer(): Knot;
}
