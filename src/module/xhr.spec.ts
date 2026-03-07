import { Xhr } from './xhr';
import {
    installFetchMock,
    uninstallFetchMock,
    setFetchResponse,
    setFetchNetworkError,
    getLastFetchCall,
} from '../test-helpers';

const flushPromises = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('Xhr', () => {
    let xhr: Xhr;

    beforeEach(() => {
        installFetchMock();
    });

    afterEach(() => {
        uninstallFetchMock();
    });

    describe('constructor & options', () => {
        it('should set backend and locale options', () => {
            xhr = new Xhr({
                backend: 'https://api.example.com',
                locale: 'en',
            });
            expect(xhr.options.get('backend')).toBe('https://api.example.com');
            expect(xhr.options.get('locale')).toBe('en');
        });

        it('should use empty defaults when no options provided', () => {
            xhr = new Xhr();
            expect(xhr.options.get('backend')).toBe('');
            expect(xhr.options.get('locale')).toBe('');
        });

        it('should initialize request headers as empty', () => {
            xhr = new Xhr();
            expect(xhr.requestHeaders).toEqual({});
        });

        it('should have null authorization by default', () => {
            xhr = new Xhr();
            expect(xhr.authorization).toBeNull();
        });

        it('should define content types for json, form, html, svg, xml', () => {
            xhr = new Xhr();
            expect(xhr.types['json']).toBeDefined();
            expect(xhr.types['form']).toBeDefined();
            expect(xhr.types['html']).toBeDefined();
            expect(xhr.types['svg']).toBeDefined();
            expect(xhr.types['xml']).toBeDefined();
        });

        it('should create a deferred', () => {
            xhr = new Xhr();
            expect(xhr.deferred).toBeDefined();
        });
    });

    describe('URL construction', () => {
        it('should prefix backend for URLs starting with /', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/users', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.url).toBe('https://api.example.com/users');
        });

        it('should not prefix backend for absolute URLs', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('https://other.com/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.url).toBe('https://other.com/data.json');
        });

        it('should append query string params', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/users', { page: 1, limit: 10 });
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.url).toContain('/users?');
            expect(call.url).toContain('page=1');
            expect(call.url).toContain('limit=10');
        });

        it('should handle undefined params without query string', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/users', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.url).toBe('https://api.example.com/users');
        });
    });

    describe('request headers', () => {
        it('should set Content-Type to application/json for .json URLs', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Content-Type']).toBe('application/json');
        });

        it('should set Accept to application/json for .json URLs', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Accept']).toBe('application/json');
        });

        it('should set Accept to text/html for .html URLs', async () => {
            xhr = new Xhr();
            setFetchResponse(
                200,
                { 'Content-Type': 'text/html' },
                '<html></html>',
            );
            xhr.get('/page.html', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Accept']).toBe('text/html');
        });

        it('should set X-Requested-With header', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['X-Requested-With']).toBe('XMLHttpRequest');
        });

        it('should set Accept-Language from locale', async () => {
            xhr = new Xhr({ locale: 'hu' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Accept-Language']).toBe('hu');
        });

        it('should allow custom header overrides', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined, {
                Accept: 'text/plain',
            });
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Accept']).toBe('text/plain');
        });

        it('should set Authorization when authorization is set', async () => {
            xhr = new Xhr();
            xhr.setBearerAuthorization('mytoken');
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Authorization']).toBe('Bearer mytoken');
        });

        it('should set credentials to include when authorization is set', async () => {
            xhr = new Xhr();
            xhr.setBearerAuthorization('mytoken');
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.credentials).toBe('include');
        });

        it('should not set Authorization when authorization is null', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Authorization']).toBeUndefined();
        });

        it('should use fallback type for unknown extensions', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'text/plain' }, 'hello');
            xhr.get('/data.txt', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.headers['Accept']).toBe('*/*');
        });
    });

    describe('request body encoding', () => {
        it('should JSON.stringify body for json content type', async () => {
            xhr = new Xhr();
            const data = { name: 'test', value: 42 };
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.post('/api/items.json', data, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.body).toBe(JSON.stringify(data));
        });

        it('should form-encode body for form content type', async () => {
            xhr = new Xhr();
            xhr.types[''] = [
                'application/x-www-form-urlencoded',
                'application/json',
            ];
            const data = { name: 'test', value: '42' };
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.post('/api/items', data, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.body).toContain('name=test');
            expect(call.body).toContain('value=42');
        });

        it('should form-encode nested objects', async () => {
            xhr = new Xhr();
            xhr.types[''] = [
                'application/x-www-form-urlencoded',
                'application/json',
            ];
            const data = { user: { name: 'test', age: 30 } };
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.post('/api/items', data, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.body).toContain('user[name]=test');
            expect(call.body).toContain('user[age]=30');
        });

        it('should form-encode arrays', async () => {
            xhr = new Xhr();
            xhr.types[''] = [
                'application/x-www-form-urlencoded',
                'application/json',
            ];
            const data = { tags: ['a', 'b'] };
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.post('/api/items', data, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.body).toContain('tags[]=a');
            expect(call.body).toContain('tags[]=b');
        });

        it('should not send body for GET requests', async () => {
            xhr = new Xhr();
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.body).toBeNull();
        });

        it('should send empty string when data is not provided for POST', async () => {
            xhr = new Xhr();
            setFetchResponse(
                200,
                { 'Content-Type': 'text/html' },
                '<html></html>',
            );
            xhr.post('/page.html', undefined, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.body).toBe('');
        });
    });

    describe('HTTP methods', () => {
        beforeEach(() => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, {});
        });

        it('should make GET request with correct method', async () => {
            xhr.get('/data.json', undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.method).toBe('GET');
        });

        it('should make POST request with correct method', async () => {
            xhr.post('/data.json', {}, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.method).toBe('POST');
        });

        it('should make PUT request with correct method', async () => {
            xhr.put('/data.json', {}, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.method).toBe('PUT');
        });

        it('should make PATCH request with correct method', async () => {
            xhr.patch('/data.json', {}, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.method).toBe('PATCH');
        });

        it('should make DELETE request with correct method', async () => {
            xhr.delete('/data.json', {}, undefined);
            await flushPromises();
            const call = getLastFetchCall();
            expect(call.method).toBe('DELETE');
        });

        it('should return a promise from each method', () => {
            const promise = xhr.get('/data.json', undefined);
            expect(promise).toBeDefined();
            expect(typeof promise.then).toBe('function');
        });
    });

    describe('response handling', () => {
        beforeEach(() => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
        });

        it('should resolve deferred on status 200 with JSON response', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { name: 'test' },
            );
            const onResolve = jest.fn();
            const onReject = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve, onReject);
            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
            expect(onReject).not.toHaveBeenCalled();
            const [httpResponse, data] = onResolve.mock.calls[0];
            expect(data.get('name')).toBe('test');
        });

        it('should reject deferred on status 400', async () => {
            setFetchResponse(
                400,
                { 'Content-Type': 'application/json' },
                { error: 'bad request' },
            );
            const onResolve = jest.fn();
            const onReject = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve, onReject);
            await flushPromises();
            expect(onResolve).not.toHaveBeenCalled();
            expect(onReject).toHaveBeenCalled();
            const [httpResponse, data] = onReject.mock.calls[0];
            expect(data).toBeDefined();
        });

        it('should reject deferred on status 500', async () => {
            setFetchResponse(
                500,
                { 'Content-Type': 'application/json' },
                { error: 'server error' },
            );
            const onResolve = jest.fn();
            const onReject = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve, onReject);
            await flushPromises();
            expect(onResolve).not.toHaveBeenCalled();
            expect(onReject).toHaveBeenCalled();
        });

        it('should parse JSON response into Objekt', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { id: 1, title: 'hello' },
            );
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [, data] = onResolve.mock.calls[0];
            expect(data.get('id')).toBe(1);
            expect(data.get('title')).toBe('hello');
        });

        it('should wrap non-JSON response as raw property in Objekt', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'text/html' },
                '<html></html>',
            );
            const onResolve = jest.fn();
            xhr.get('/page.html', undefined).then(onResolve);
            await flushPromises();
            const [, data] = onResolve.mock.calls[0];
            expect(data.get('raw')).toBe('<html></html>');
        });

        it('should extract filename from Content-Disposition header', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(
                200,
                {
                    'Content-Type': 'application/json',
                    'Content-Disposition': 'attachment; filename="report.pdf"',
                },
                { ok: true },
            );
            const onResolve = jest.fn();
            xhr.get('/download.json', undefined).then(onResolve);
            await flushPromises();
            const [, , filename] = onResolve.mock.calls[0];
            expect(filename).toBe('report.pdf');
        });

        it('should return empty filename when no Content-Disposition', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { ok: true },
            );
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [, , filename] = onResolve.mock.calls[0];
            expect(filename).toBe('');
        });

        it('should return empty filename when URL does not match backend', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(
                200,
                {
                    'Content-Type': 'application/json',
                    'Content-Disposition': 'attachment; filename="report.pdf"',
                },
                { ok: true },
            );
            const onResolve = jest.fn();
            xhr.get('https://other.example.com/data.json', undefined).then(
                onResolve,
            );
            await flushPromises();
            const [, , filename] = onResolve.mock.calls[0];
            expect(filename).toBe('');
        });

        it('should handle JSON response with content-type having charset', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json; charset=utf-8' },
                { key: 'value' },
            );
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [, data] = onResolve.mock.calls[0];
            expect(data.get('key')).toBe('value');
        });

        it('should provide HttpResponse with status and statusText', async () => {
            setFetchResponse(
                200,
                { 'Content-Type': 'application/json' },
                { ok: true },
            );
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [httpResponse] = onResolve.mock.calls[0];
            expect(httpResponse.status).toBe(200);
            expect(httpResponse.statusText).toBe('OK');
        });

        it('should provide HttpResponse headers', async () => {
            setFetchResponse(
                200,
                {
                    'Content-Type': 'application/json',
                    'X-Custom': 'test',
                },
                {},
            );
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [httpResponse] = onResolve.mock.calls[0];
            expect(httpResponse.headers['content-type']).toBe(
                'application/json',
            );
        });
    });

    describe('network error handling', () => {
        it('should reject with status 0 on network error', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchNetworkError();
            const onReject = jest.fn();
            xhr.get('/data.json', undefined).then(jest.fn(), onReject);
            await flushPromises();
            expect(onReject).toHaveBeenCalled();
            const [httpResponse] = onReject.mock.calls[0];
            expect(httpResponse.status).toBe(0);
            expect(httpResponse.statusText).toBe('Network Error');
        });
    });

    describe('setBasicAuthorization', () => {
        it('should set Basic authorization with base64 encoded credentials', () => {
            xhr = new Xhr();
            xhr.setBasicAuthorization('user', 'pass');
            expect(xhr.authorization).toContain('Basic ');
            expect(xhr.authorization).not.toBe('Basic ');
        });

        it('should not set authorization for empty username', () => {
            xhr = new Xhr();
            xhr.setBasicAuthorization('', 'pass');
            expect(xhr.authorization).toBeNull();
        });

        it('should not set authorization for empty password', () => {
            xhr = new Xhr();
            xhr.setBasicAuthorization('user', '');
            expect(xhr.authorization).toBeNull();
        });
    });

    describe('setBearerAuthorization', () => {
        it('should set Bearer authorization with token', () => {
            xhr = new Xhr();
            xhr.setBearerAuthorization('mytoken123');
            expect(xhr.authorization).toBe('Bearer mytoken123');
        });

        it('should not set authorization for empty token', () => {
            xhr = new Xhr();
            xhr.setBearerAuthorization('');
            expect(xhr.authorization).toBeNull();
        });
    });

    describe('filename header error handling', () => {
        it('should return empty filename when Content-Disposition has no filename match', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(
                200,
                {
                    'Content-Type': 'application/json',
                    'Content-Disposition': 'inline',
                },
                { ok: true },
            );
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [, , filename] = onResolve.mock.calls[0];
            expect(filename).toBe('');
        });

        it('should handle null JSON response string', async () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            setFetchResponse(200, { 'Content-Type': 'application/json' }, '');
            const onResolve = jest.fn();
            xhr.get('/data.json', undefined).then(onResolve);
            await flushPromises();
            const [, data] = onResolve.mock.calls[0];
            expect(data).toBeDefined();
        });
    });
});
