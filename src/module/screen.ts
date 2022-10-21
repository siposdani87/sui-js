import { debounce, neq, gte } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Screen {
    options: Objekt;
    window: Window;
    document: Document;
    orientation: string;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            delay: 250,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.window = window;
        this.document = document;

        this.orientation = this.getOrientation();

        this._initResizeEvent();
        this._initScrollEvent();
        this._initConnectionEvent();
        this._initColorSchemeEvent();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initResizeEvent(): void {
        this.window.addEventListener(
            'resize',
            debounce((event) => {
                this._resize(event);
            }, this.options.delay),
            false,
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initScrollEvent(): void {
        this.window.addEventListener(
            'scroll',
            debounce((event) => {
                this._scroll(event);
            }, this.options.delay),
            false,
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initConnectionEvent(): void {
        this.window.addEventListener(
            'online',
            (event) => {
                this.eventOnline(event);
            },
            false,
        );

        this.window.addEventListener(
            'offline',
            (event) => {
                this.eventOffline(event);
            },
            false,
        );
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOffline(event: Event): void {
        consoleWarn('Window.eventOffline()', event);
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOnline(event: Event): void {
        consoleWarn('Window.eventOffline()', event);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventResize(width: number, height: number, event: Event): void {
        consoleWarn('Window.eventResize()', width, height, event);
    }
    /**
     * @param {string} orientation
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventOrientationChange(
        orientation: string,
        width: number,
        height: number,
        event: Event,
    ): void {
        consoleWarn(
            'Window.eventOrientationChange()',
            orientation,
            width,
            height,
            event,
        );
    }
    /**
     * @param {number} scrollTop
     * @param {!Event} event
     * @return {undefined}
     */
    eventScroll(scrollTop: number, event: Event): void {
        consoleWarn('Window.eventScroll()', scrollTop, event);
    }
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    private _resize(event: Event): void {
        this.eventResize(this.getWidth(), this.getHeight(), event);

        const orientation = this.getOrientation();
        if (neq(this.orientation, orientation)) {
            this.orientation = orientation;
            this.eventOrientationChange(
                this.orientation,
                this.getWidth(),
                this.getHeight(),
                event,
            );
        }
    }
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    private _scroll(event: Event): void {
        this.eventScroll(this.getScrollTop(), event);
    }
    /**
     * @return {number}
     */
    getScrollTop(): number {
        return (
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop
        );
    }
    /**
     * @return {number}
     */
    getWidth(): number {
        return this.window.innerWidth;
    }
    /**
     * @return {number}
     */
    getHeight(): number {
        return this.window.innerHeight;
    }
    /**
     * @return {string} landscape|portrait
     */
    getOrientation(): string {
        return gte(this.getWidth(), this.getHeight())
            ? 'landscape'
            : 'portrait';
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initColorSchemeEvent(): void {
        if (window.matchMedia) {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (event) => {
                    if (event.matches) {
                        this.eventColorSchemeChange('dark', event);
                    } else {
                        this.eventColorSchemeChange('light', event);
                    }
                });
        }
    }
    /**
     * @param {string} colorScheme
     * @param {!Event} event
     * @return {undefined}
     */
    eventColorSchemeChange(colorScheme: string, event: Event): void {
        consoleWarn('Window.eventColorSchemeChange()', colorScheme, event);
    }
    /**
     * @param {string} type dark|light|no-preference
     * @return {boolean}
     */
    isColorScheme(type: string): boolean {
        return (
            window.matchMedia &&
            window.matchMedia(`(prefers-color-scheme: ${type})`).matches
        );
    }
}
