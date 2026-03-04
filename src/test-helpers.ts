import { Knot } from './core/knot';
import { Objekt } from './core/objekt';

/** Create a Knot wrapping a fresh DOM element */
export function createKnot<T extends HTMLElement>(
    tag: string,
    attributes: Record<string, string> = {},
): Knot<T> {
    const el = document.createElement(tag) as T;
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    document.body.appendChild(el);
    return new Knot<T>(el);
}

/** Create an Objekt with default test data */
export function createObjekt(data: object = {}): Objekt {
    return new Objekt({ id: 'test-1', name: 'Test', ...data });
}

/** Clean up DOM elements added during a test */
export function cleanupDOM(): void {
    document.body.innerHTML = '';
}

/** Mock XMLHttpRequest for testing Xhr/Http modules */
export class MockXMLHttpRequest {
    method = '';
    url = '';
    async = true;
    requestHeaders: Record<string, string> = {};
    body: string | null = null;
    readyState = 0;
    status = 0;
    response: any = null;
    responseType: XMLHttpRequestResponseType = '';
    responseURL = '';
    withCredentials = false;
    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null =
        null;

    private _responseHeaders: Record<string, string> = {};

    open(method: string, url: string, async: boolean = true): void {
        this.method = method;
        this.url = url;
        this.async = async;
    }

    setRequestHeader(name: string, value: string): void {
        this.requestHeaders[name] = value;
    }

    send(body?: string | null): void {
        this.body = body ?? null;
    }

    getResponseHeader(name: string): string | null {
        return this._responseHeaders[name] ?? null;
    }

    /** Simulate a complete response (readyState 4) */
    respond(status: number, headers: Record<string, string>, body: any): void {
        this.status = status;
        this._responseHeaders = headers;
        this.response = body;
        this.responseURL = this.url;
        this.readyState = 4;
        this.onreadystatechange?.call(
            this as any,
            new Event('readystatechange'),
        );
    }
}

/** Create a mock Canvas 2D rendering context for jsdom (which lacks native canvas support) */
export function createMockCanvasContext(): Record<string, jest.Mock | any> {
    const context: Record<string, jest.Mock | any> = {
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(() => ({
            data: new Uint8ClampedArray([0, 0, 0, 255]),
        })),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        strokeText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn(),
        canvas: { width: 300, height: 150 },
    };
    return context;
}

/** Install canvas 2D context mock on HTMLCanvasElement.prototype */
let _originalGetContext:
    | typeof HTMLCanvasElement.prototype.getContext
    | undefined;
let _mockCanvasContext: Record<string, jest.Mock | any> | undefined;

export function installCanvasMock(): Record<string, jest.Mock | any> {
    const ctx = createMockCanvasContext();
    _mockCanvasContext = ctx;
    _originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = jest.fn(
        () => ctx,
    ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
    return ctx;
}

export function uninstallCanvasMock(): void {
    if (_originalGetContext !== undefined) {
        HTMLCanvasElement.prototype.getContext = _originalGetContext;
        _originalGetContext = undefined;
    }
    _mockCanvasContext = undefined;
}

let _originalXhr: typeof XMLHttpRequest | undefined;
let _lastXhr: MockXMLHttpRequest | undefined;

/** Replace global XMLHttpRequest with MockXMLHttpRequest */
export function installXhrMock(): void {
    _originalXhr = (globalThis as any).XMLHttpRequest;
    (globalThis as any).XMLHttpRequest = function () {
        const instance = new MockXMLHttpRequest();
        _lastXhr = instance;
        return instance;
    } as any;
}

/** Restore original XMLHttpRequest */
export function uninstallXhrMock(): void {
    if (_originalXhr !== undefined) {
        (globalThis as any).XMLHttpRequest = _originalXhr;
        _originalXhr = undefined;
    }
    _lastXhr = undefined;
}

/** Get the most recently constructed MockXMLHttpRequest instance */
export function getLastXhr(): MockXMLHttpRequest {
    if (!_lastXhr) {
        throw new Error(
            'No MockXMLHttpRequest instance found. Did you call installXhrMock()?',
        );
    }
    return _lastXhr;
}
