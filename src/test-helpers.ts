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
