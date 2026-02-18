import { Xhr } from './xhr';
import {
    MockXMLHttpRequest,
    installXhrMock,
    uninstallXhrMock,
    getLastXhr,
} from '../test-helpers';

describe('Xhr', () => {
    let xhr: Xhr;

    beforeEach(() => {
        installXhrMock();
    });

    afterEach(() => {
        uninstallXhrMock();
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

        it('should create an XMLHttpRequest instance', () => {
            xhr = new Xhr();
            expect(xhr.httpRequest).toBeDefined();
        });

        it('should create a deferred', () => {
            xhr = new Xhr();
            expect(xhr.deferred).toBeDefined();
        });
    });

    describe('URL construction', () => {
        it('should prefix backend for URLs starting with /', () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            xhr.get('/users', undefined);
            const mock = getLastXhr();
            expect(mock.url).toBe('https://api.example.com/users');
        });

        it('should not prefix backend for absolute URLs', () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            xhr.get('https://other.com/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.url).toBe('https://other.com/data.json');
        });

        it('should append query string params', () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            xhr.get('/users', { page: 1, limit: 10 });
            const mock = getLastXhr();
            expect(mock.url).toContain('/users?');
            expect(mock.url).toContain('page=1');
            expect(mock.url).toContain('limit=10');
        });

        it('should handle undefined params without query string', () => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            xhr.get('/users', undefined);
            const mock = getLastXhr();
            expect(mock.url).toBe('https://api.example.com/users');
        });
    });

    describe('request headers', () => {
        it('should set Content-Type to application/json for .json URLs', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Content-Type']).toBe(
                'application/json',
            );
        });

        it('should set Accept to application/json for .json URLs', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Accept']).toBe('application/json');
        });

        it('should set Accept to text/html for .html URLs', () => {
            xhr = new Xhr();
            xhr.get('/page.html', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Accept']).toBe('text/html');
        });

        it('should set X-Requested-With header', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['X-Requested-With']).toBe(
                'XMLHttpRequest',
            );
        });

        it('should set Accept-Language from locale', () => {
            xhr = new Xhr({ locale: 'hu' });
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Accept-Language']).toBe('hu');
        });

        it('should allow custom header overrides', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined, {
                Accept: 'text/plain',
            });
            const mock = getLastXhr();
            expect(mock.requestHeaders['Accept']).toBe('text/plain');
        });

        it('should set Authorization and withCredentials when authorization is set', () => {
            xhr = new Xhr();
            xhr.setBearerAuthorization('mytoken');
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Authorization']).toBe('Bearer mytoken');
            expect(mock.withCredentials).toBe(true);
        });

        it('should not set Authorization when authorization is null', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Authorization']).toBeUndefined();
        });

        it('should handle responseType via opt_headers', () => {
            xhr = new Xhr();
            xhr.get('/file.bin', undefined, { responseType: 'blob' });
            const mock = getLastXhr();
            expect(mock.responseType).toBe('blob');
        });

        it('should use fallback type for unknown extensions', () => {
            xhr = new Xhr();
            xhr.get('/data.txt', undefined);
            const mock = getLastXhr();
            expect(mock.requestHeaders['Accept']).toBe('*/*');
        });
    });

    describe('response type', () => {
        it('should set responseType to json for .json URLs', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.responseType).toBe('json');
        });

        it('should set responseType to document for .html URLs', () => {
            xhr = new Xhr();
            xhr.get('/page.html', undefined);
            const mock = getLastXhr();
            expect(mock.responseType).toBe('document');
        });

        it('should set responseType to document for .svg URLs', () => {
            xhr = new Xhr();
            xhr.get('/icon.svg', undefined);
            const mock = getLastXhr();
            expect(mock.responseType).toBe('document');
        });

        it('should set responseType to document for .xml URLs', () => {
            xhr = new Xhr();
            xhr.get('/data.xml', undefined);
            const mock = getLastXhr();
            expect(mock.responseType).toBe('document');
        });

        it('should set responseType to text for unknown extensions', () => {
            xhr = new Xhr();
            xhr.get('/data.csv', undefined);
            const mock = getLastXhr();
            expect(mock.responseType).toBe('text');
        });
    });

    describe('request body encoding', () => {
        it('should JSON.stringify body for json content type', () => {
            xhr = new Xhr();
            const data = { name: 'test', value: 42 };
            xhr.post('/api/items.json', data, undefined);
            const mock = getLastXhr();
            expect(mock.body).toBe(JSON.stringify(data));
        });

        it('should form-encode body for form content type', () => {
            xhr = new Xhr();
            xhr.types[''] = [
                'application/x-www-form-urlencoded',
                'json',
                'application/json',
            ];
            const data = { name: 'test', value: '42' };
            xhr.post('/api/items', data, undefined);
            const mock = getLastXhr();
            expect(mock.body).toContain('name=test');
            expect(mock.body).toContain('value=42');
        });

        it('should form-encode nested objects', () => {
            xhr = new Xhr();
            xhr.types[''] = [
                'application/x-www-form-urlencoded',
                'json',
                'application/json',
            ];
            const data = { user: { name: 'test', age: 30 } };
            xhr.post('/api/items', data, undefined);
            const mock = getLastXhr();
            expect(mock.body).toContain('user[name]=test');
            expect(mock.body).toContain('user[age]=30');
        });

        it('should form-encode arrays', () => {
            xhr = new Xhr();
            xhr.types[''] = [
                'application/x-www-form-urlencoded',
                'json',
                'application/json',
            ];
            const data = { tags: ['a', 'b'] };
            xhr.post('/api/items', data, undefined);
            const mock = getLastXhr();
            expect(mock.body).toContain('tags[]=a');
            expect(mock.body).toContain('tags[]=b');
        });

        it('should send stringified empty object for GET requests on .json URLs', () => {
            xhr = new Xhr();
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.body).toBe('{}');
        });

        it('should send empty string when data is not provided and content type is empty', () => {
            xhr = new Xhr();
            xhr.get('/data.html', undefined);
            const mock = getLastXhr();
            expect(mock.body).toBe('');
        });
    });

    describe('HTTP methods', () => {
        beforeEach(() => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
        });

        it('should open GET request with correct method', () => {
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.method).toBe('GET');
        });

        it('should open POST request with correct method', () => {
            xhr.post('/data.json', {}, undefined);
            const mock = getLastXhr();
            expect(mock.method).toBe('POST');
        });

        it('should open PUT request with correct method', () => {
            xhr.put('/data.json', {}, undefined);
            const mock = getLastXhr();
            expect(mock.method).toBe('PUT');
        });

        it('should open PATCH request with correct method', () => {
            xhr.patch('/data.json', {}, undefined);
            const mock = getLastXhr();
            expect(mock.method).toBe('PATCH');
        });

        it('should open DELETE request with correct method', () => {
            xhr.delete('/data.json', {}, undefined);
            const mock = getLastXhr();
            expect(mock.method).toBe('DELETE');
        });

        it('should always open with async=true', () => {
            xhr.get('/data.json', undefined);
            const mock = getLastXhr();
            expect(mock.async).toBe(true);
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

        it('should resolve deferred on status 200 with JSON response', (done) => {
            const promise = xhr.get('/data.json', undefined);
            const mock = getLastXhr();

            promise.then(
                (httpRequest, data, filename) => {
                    expect(data).toBeDefined();
                    expect(data.get('name')).toBe('test');
                    done();
                },
                () => {
                    done.fail('should not reject');
                },
            );

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { name: 'test' },
            );
        });

        it('should reject deferred on status 400', (done) => {
            const promise = xhr.get('/data.json', undefined);
            const mock = getLastXhr();

            promise.then(
                () => {
                    done.fail('should not resolve');
                },
                (httpRequest, data, filename) => {
                    expect(data).toBeDefined();
                    done();
                },
            );

            mock.respond(
                400,
                { 'Content-Type': 'application/json' },
                { error: 'bad request' },
            );
        });

        it('should reject deferred on status 500', (done) => {
            const promise = xhr.get('/data.json', undefined);
            const mock = getLastXhr();

            promise.then(
                () => {
                    done.fail('should not resolve');
                },
                (httpRequest, data, filename) => {
                    expect(data).toBeDefined();
                    done();
                },
            );

            mock.respond(
                500,
                { 'Content-Type': 'application/json' },
                { error: 'server error' },
            );
        });

        it('should parse JSON string response into Objekt', (done) => {
            const promise = xhr.get('/data.json', undefined);
            const mock = getLastXhr();

            promise.then((httpRequest, data) => {
                expect(data.get('id')).toBe(1);
                expect(data.get('title')).toBe('hello');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify({ id: 1, title: 'hello' }),
            );
        });

        it('should wrap non-JSON response as raw property in Objekt', (done) => {
            const promise = xhr.get('/page.html', undefined);
            const mock = getLastXhr();

            promise.then((httpRequest, data) => {
                expect(data.get('raw')).toBe('<html></html>');
                done();
            });

            mock.respond(200, { 'Content-Type': 'text/html' }, '<html></html>');
        });

        it('should extract filename from Content-Disposition header', (done) => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            const promise = xhr.get('/download.json', undefined);
            const mock = getLastXhr();

            promise.then((httpRequest, data, filename) => {
                expect(filename).toBe('report.pdf');
                done();
            });

            mock.respond(
                200,
                {
                    'Content-Type': 'application/json',
                    'Content-Disposition': 'attachment; filename="report.pdf"',
                },
                { ok: true },
            );
        });

        it('should return empty filename when no Content-Disposition', (done) => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            const promise = xhr.get('/data.json', undefined);
            const mock = getLastXhr();

            promise.then((httpRequest, data, filename) => {
                expect(filename).toBe('');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { ok: true },
            );
        });

        it('should return empty filename when responseURL does not match backend', (done) => {
            xhr = new Xhr({ backend: 'https://api.example.com' });
            const promise = xhr.get(
                'https://other.example.com/data.json',
                undefined,
            );
            const mock = getLastXhr();

            promise.then((httpRequest, data, filename) => {
                expect(filename).toBe('');
                done();
            });

            mock.respond(
                200,
                {
                    'Content-Type': 'application/json',
                    'Content-Disposition': 'attachment; filename="report.pdf"',
                },
                { ok: true },
            );
        });

        it('should handle JSON response with content-type having charset', (done) => {
            const promise = xhr.get('/data.json', undefined);
            const mock = getLastXhr();

            promise.then((httpRequest, data) => {
                expect(data.get('key')).toBe('value');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json; charset=utf-8' },
                { key: 'value' },
            );
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
});
