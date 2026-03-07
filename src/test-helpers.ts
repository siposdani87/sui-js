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

/** Captured fetch call for test assertions */
export type CapturedFetchCall = {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string | null;
    credentials?: RequestCredentials;
};

let _originalFetch: typeof fetch | undefined;
let _capturedCalls: CapturedFetchCall[] = [];
let _pendingResponse: {
    status: number;
    headers: Record<string, string>;
    body: any;
} | null = null;
let _fetchNetworkError: boolean = false;

/** Replace global fetch with a test mock. Call setFetchResponse() before making requests. */
export function installFetchMock(): void {
    _originalFetch = globalThis.fetch;
    _capturedCalls = [];
    _pendingResponse = null;
    _fetchNetworkError = false;
    globalThis.fetch = jest.fn(
        async (
            input: RequestInfo | URL,
            init?: RequestInit,
        ): Promise<Response> => {
            const url =
                typeof input === 'string' ? input : input.toString();
            const headers: Record<string, string> = {};
            if (init?.headers) {
                if (init.headers instanceof Headers) {
                    init.headers.forEach((v, k) => {
                        headers[k] = v;
                    });
                } else {
                    Object.assign(headers, init.headers);
                }
            }
            _capturedCalls.push({
                url,
                method: init?.method || 'GET',
                headers,
                body: (init?.body as string) ?? null,
                credentials: init?.credentials,
            });

            if (_fetchNetworkError) {
                throw new TypeError('Failed to fetch');
            }

            if (!_pendingResponse) {
                throw new Error(
                    'No fetch response configured. Call setFetchResponse() first.',
                );
            }

            const resp = _pendingResponse;
            const responseHeaders = new Headers(resp.headers);
            let bodyText: string;
            if (typeof resp.body === 'object' && resp.body !== null) {
                bodyText = JSON.stringify(resp.body);
            } else if (typeof resp.body === 'string') {
                bodyText = resp.body;
            } else {
                bodyText = '';
            }

            const statusTexts: Record<number, string> = {
                200: 'OK',
                201: 'Created',
                204: 'No Content',
                301: 'Moved Permanently',
                400: 'Bad Request',
                401: 'Unauthorized',
                403: 'Forbidden',
                404: 'Not Found',
                500: 'Internal Server Error',
            };
            // jsdom doesn't have Response class, so build a mock
            const mockResponse = {
                status: resp.status,
                statusText: statusTexts[resp.status] || '',
                ok: resp.status >= 200 && resp.status < 300,
                url,
                headers: responseHeaders,
                text: async () => bodyText,
                json: async () => JSON.parse(bodyText || 'null'),
            };
            return mockResponse as unknown as Response;
        },
    ) as any;
}

/** Restore original fetch */
export function uninstallFetchMock(): void {
    if (_originalFetch !== undefined) {
        globalThis.fetch = _originalFetch;
        _originalFetch = undefined;
    }
    _capturedCalls = [];
    _pendingResponse = null;
    _fetchNetworkError = false;
}

/** Configure the response that the next fetch call will return */
export function setFetchResponse(
    status: number,
    headers: Record<string, string>,
    body: any,
): void {
    _pendingResponse = { status, headers, body };
}

/** Configure fetch to throw a network error */
export function setFetchNetworkError(): void {
    _fetchNetworkError = true;
}

/** Get the most recently captured fetch call */
export function getLastFetchCall(): CapturedFetchCall {
    if (_capturedCalls.length === 0) {
        throw new Error(
            'No fetch calls recorded. Did you call installFetchMock()?',
        );
    }
    return _capturedCalls[_capturedCalls.length - 1];
}

/** Get all captured fetch calls */
export function getAllFetchCalls(): CapturedFetchCall[] {
    return _capturedCalls;
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

