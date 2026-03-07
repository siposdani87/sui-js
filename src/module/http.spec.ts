import { Http } from './http';
import { Xhr } from './xhr';
import { Objekt } from '../core/objekt';
import {
    installFetchMock,
    uninstallFetchMock,
    setFetchResponse,
    getLastFetchCall,
} from '../test-helpers';

const flushPromises = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('Http', () => {
    let http: Http;

    beforeEach(() => {
        installFetchMock();
        http = new Http({
            backend: 'https://api.example.com',
            locale: 'en',
        });
    });

    afterEach(() => {
        uninstallFetchMock();
    });

    describe('constructor & options', () => {
        it('should be instance of Http', () => {
            expect(http).toBeInstanceOf(Http);
        });

        it('should set backend option', () => {
            expect(http.options.get('backend')).toBe('https://api.example.com');
        });

        it('should set locale option', () => {
            expect(http.options.get('locale')).toBe('en');
        });

        it('should have null credentials by default', () => {
            expect(http.username).toBeNull();
            expect(http.password).toBeNull();
            expect(http.token).toBeNull();
        });

        it('should use empty defaults when no options provided', () => {
            const h = new Http();
            expect(h.options.get('backend')).toBe('');
            expect(h.options.get('locale')).toBe('');
        });
    });

    describe('setBasicAuthorization', () => {
        it('should set username and password', () => {
            http.setBasicAuthorization('admin', 'secret');
            expect(http.username).toBe('admin');
            expect(http.password).toBe('secret');
        });
    });

    describe('setBearerAuthorization', () => {
        it('should set token', () => {
            http.setBearerAuthorization('jwt-token-123');
            expect(http.token).toBe('jwt-token-123');
        });
    });

    describe('HTTP methods', () => {
        it('should make GET request and resolve with [Objekt, string]', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { result: 'ok' },
            );
            const onResolve = jest.fn();
            http.get('/data.json', { page: 1 }).then(onResolve);
            await flushPromises();

            const call = getLastFetchCall();
            expect(call.method).toBe('GET');
            expect(call.url).toContain('/data.json');

            expect(onResolve).toHaveBeenCalled();
            const [data, filename] = onResolve.mock.calls[0];
            expect(data).toBeInstanceOf(Objekt);
            expect(data.get('result')).toBe('ok');
            expect(filename).toBe('');
        });

        it('should make POST request with data', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { id: 1 },
            );
            const onResolve = jest.fn();
            http.post('/items.json', { name: 'item1' }, undefined).then(
                onResolve,
            );
            await flushPromises();

            const call = getLastFetchCall();
            expect(call.method).toBe('POST');
            expect(call.body).toBe(JSON.stringify({ name: 'item1' }));

            const [data] = onResolve.mock.calls[0];
            expect(data.get('id')).toBe(1);
        });

        it('should make PUT request with data', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { name: 'updated' },
            );
            const onResolve = jest.fn();
            http.put('/items/1.json', { name: 'updated' }, undefined).then(
                onResolve,
            );
            await flushPromises();

            const call = getLastFetchCall();
            expect(call.method).toBe('PUT');

            const [data] = onResolve.mock.calls[0];
            expect(data.get('name')).toBe('updated');
        });

        it('should make PATCH request with data', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { name: 'patched' },
            );
            const onResolve = jest.fn();
            http.patch('/items/1.json', { name: 'patched' }, undefined).then(
                onResolve,
            );
            await flushPromises();

            const call = getLastFetchCall();
            expect(call.method).toBe('PATCH');

            const [data] = onResolve.mock.calls[0];
            expect(data.get('name')).toBe('patched');
        });

        it('should make DELETE request', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { deleted: true },
            );
            const onResolve = jest.fn();
            http.delete('/items/1.json', {}, undefined).then(onResolve);
            await flushPromises();

            const call = getLastFetchCall();
            expect(call.method).toBe('DELETE');

            const [data] = onResolve.mock.calls[0];
            expect(data.get('deleted')).toBe(true);
        });
    });

    describe('auth propagation', () => {
        it('should propagate basic authorization to Xhr', async () => {
            http.setBasicAuthorization('admin', 'secret');
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            http.get('/data.json');
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Authorization']).toContain('Basic ');
            expect(call.credentials).toBe('include');
        });

        it('should propagate bearer authorization to Xhr', async () => {
            http.setBearerAuthorization('my-jwt-token');
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            http.get('/data.json');
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Authorization']).toBe('Bearer my-jwt-token');
            expect(call.credentials).toBe('include');
        });

        it('should not set authorization when credentials are null', async () => {
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            http.get('/data.json');
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Authorization']).toBeUndefined();
        });
    });

    describe('promise transformation', () => {
        it('should strip HttpResponse from resolved result', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { test: true },
            );
            const onResolve = jest.fn();
            http.get('/data.json').then(onResolve);
            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
            const [data, filename] = onResolve.mock.calls[0];
            expect(data).toBeInstanceOf(Objekt);
            expect(typeof filename).toBe('string');
        });

        it('should strip HttpResponse from rejected result', async () => {
            setFetchResponse(
                400,
                { 'Content-Type': 'application/json' },
                { error: 'bad request' },
            );
            const onResolve = jest.fn();
            const onReject = jest.fn();
            http.get('/data.json').then(onResolve, onReject);
            await flushPromises();
            expect(onResolve).not.toHaveBeenCalled();
            expect(onReject).toHaveBeenCalled();
            const [data, filename] = onReject.mock.calls[0];
            expect(data).toBeInstanceOf(Objekt);
            expect(typeof filename).toBe('string');
        });
    });

    describe('event hooks', () => {
        it('should emit beforeRequest with Xhr before request', () => {
            const spy = jest.fn();
            http.on('beforeRequest', spy);
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            http.get('/data.json');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(expect.any(Xhr));
        });

        it('should emit afterRequest on success', async () => {
            const spy = jest.fn();
            http.on('afterRequest', spy);
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            const onResolve = jest.fn();
            http.get('/data.json').then(onResolve);
            await flushPromises();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should emit afterRequest on error', async () => {
            const spy = jest.fn();
            http.on('afterRequest', spy);
            setFetchResponse(
                500,
                { 'Content-Type': 'application/json' },
                { error: 'fail' },
            );
            const onReject = jest.fn();
            http.get('/data.json').then(jest.fn(), onReject);
            await flushPromises();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should emit beforeRequest and afterRequest without error', () => {
            expect(() => http.emit('beforeRequest', {} as any)).not.toThrow();
            expect(() =>
                http.emit('afterRequest', {} as any, {} as any, ''),
            ).not.toThrow();
        });
    });
});
