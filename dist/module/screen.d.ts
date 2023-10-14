import { Objekt } from '../core/objekt';
export declare class Screen {
    options: Objekt;
    window: Window;
    document: Document;
    orientation: string;
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    private _initResizeEvent;
    private _initScrollEvent;
    private _initConnectionEvent;
    eventOffline(event: Event): void;
    eventOnline(event: Event): void;
    eventResize(width: number, height: number, event: Event): void;
    eventOrientationChange(orientation: string, width: number, height: number, event: Event): void;
    eventScroll(scrollTop: number, event: Event): void;
    private _resize;
    private _scroll;
    getScrollTop(): number;
    getWidth(): number;
    getHeight(): number;
    getOrientation(): string;
    private _initColorSchemeEvent;
    eventColorSchemeChange(colorScheme: string, event: Event): void;
    isColorScheme(type: string): boolean;
}
