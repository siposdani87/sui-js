import { debounce, neq, gte } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';

export class Screen {
    options!: Objekt;
    window!: Window;
    document!: Document;
    orientation!: string;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            delay: 250,
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.window = window;
        this.document = document;

        this.orientation = this.getOrientation();

        this._initResizeEvent();
        this._initScrollEvent();
        this._initConnectionEvent();
        this._initColorSchemeEvent();
    }

    private _initResizeEvent(): void {
        this.window.addEventListener(
            'resize',
            debounce((event) => {
                this._resize(event);
            }, this.options.delay),
            false,
        );
    }

    private _initScrollEvent(): void {
        this.window.addEventListener(
            'scroll',
            debounce((event) => {
                this._scroll(event);
            }, this.options.delay),
            false,
        );
    }

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

    eventOffline(event: Event): void {
        consoleDebug('Window.eventOffline()', event);
    }

    eventOnline(event: Event): void {
        consoleDebug('Window.eventOffline()', event);
    }

    eventResize(width: number, height: number, event: Event): void {
        consoleDebug('Window.eventResize()', width, height, event);
    }

    eventOrientationChange(
        orientation: string,
        width: number,
        height: number,
        event: Event,
    ): void {
        consoleDebug(
            'Window.eventOrientationChange()',
            orientation,
            width,
            height,
            event,
        );
    }

    eventScroll(scrollTop: number, event: Event): void {
        consoleDebug('Window.eventScroll()', scrollTop, event);
    }

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

    private _scroll(event: Event): void {
        this.eventScroll(this.getScrollTop(), event);
    }

    getScrollTop(): number {
        return (
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop
        );
    }

    getWidth(): number {
        return this.window.innerWidth;
    }

    getHeight(): number {
        return this.window.innerHeight;
    }

    getOrientation(): string {
        return gte(this.getWidth(), this.getHeight())
            ? 'landscape'
            : 'portrait';
    }

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

    eventColorSchemeChange(colorScheme: string, event: Event): void {
        consoleDebug('Window.eventColorSchemeChange()', colorScheme, event);
    }

    isColorScheme(type: string): boolean {
        return (
            window.matchMedia?.(`(prefers-color-scheme: ${type})`)?.matches ??
            false
        );
    }
}
