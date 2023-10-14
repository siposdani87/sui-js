import { Knot } from '../core';
import { Objekt } from '../core/objekt';
export declare class Header {
    options: Objekt;
    headerKnot: Knot;
    leftMenuButton: Knot;
    topMenuButton: Knot;
    brandKnot: Knot;
    brandKnotImage: Knot;
    brandKnotTitle: Knot;
    mainContainerKnot: Knot;
    templateViewKnot: Knot;
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    eventLogoClick(): void;
    setTitle(title: string): void;
    setUrl(url: string): void;
    setImage(imagePath: string): void;
    open(): void;
    close(): void;
    show(): void;
    hide(): void;
    showShadow(): void;
    hideShadow(): void;
    showLeftMenuButton(): void;
    hideLeftMenuButton(): void;
    showTopMenuButton(): void;
    hideTopMenuButton(): void;
}
