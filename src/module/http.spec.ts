import { Http } from './http';
import { Xhr } from './xhr';
import { Objekt } from '../core/objekt';
import { Deferred } from '../core/deferred';
import {
    installXhrMock,
    uninstallXhrMock,
    getLastXhr,
} from '../test-helpers';

describe('Http', () => {
    let http: Http;

    beforeEach(() => {
        installXhrMock();
        http = new Http({
            backend: 'https://api.example.com',
            locale: 'en',
        });
    });

    afterEach(() => {
        uninstallXhrMock();
    });

    describe('constructor & options', () => {
        it('should be instance of Http', () => {
            expect(http).toBeInstanceOf(Http);
        });

        it('should set backend option', () => {
            expect(http.options.get('backend')).toBe(
                'https://api.example.com',
            );
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
        it('should make GET request and resolve with [Objekt, string]', (done) => {
            const promise = http.get('/data.json', { page: 1 });
            const mock = getLastXhr();

            expect(mock.method).toBe('GET');
            expect(mock.url).toContain('/data.json');

            promise.then((data, filename) => {
                expect(data).toBeInstanceOf(Objekt);
                expect(data.get('result')).toBe('ok');
                expect(filename).toBe('');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { result: 'ok' },
            );
        });

        it('should make POST request with data', (done) => {
            const promise = http.post(
                '/items.json',
                { name: 'item1' },
                undefined,
            );
            const mock = getLastXhr();

            expect(mock.method).toBe('POST');
            expect(mock.body).toBe(JSON.stringify({ name: 'item1' }));

            promise.then((data) => {
                expect(data.get('id')).toBe(1);
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { id: 1 },
            );
        });

        it('should make PUT request with data', (done) => {
            const promise = http.put(
                '/items/1.json',
                { name: 'updated' },
                undefined,
            );
            const mock = getLastXhr();

            expect(mock.method).toBe('PUT');

            promise.then((data) => {
                expect(data.get('name')).toBe('updated');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { name: 'updated' },
            );
        });

        it('should make PATCH request with data', (done) => {
            const promise = http.patch(
                '/items/1.json',
                { name: 'patched' },
                undefined,
            );
            const mock = getLastXhr();

            expect(mock.method).toBe('PATCH');

            promise.then((data) => {
                expect(data.get('name')).toBe('patched');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { name: 'patched' },
            );
        });

        it('should make DELETE request', (done) => {
            const promise = http.delete('/items/1.json', {}, undefined);
            const mock = getLastXhr();

            expect(mock.method).toBe('DELETE');

            promise.then((data) => {
                expect(data.get('deleted')).toBe(true);
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { deleted: true },
            );
        });
    });

    describe('auth propagation', () => {
        it('should propagate basic authorization to Xhr', (done) => {
            http.setBasicAuthorization('admin', 'secret');
            const promise = http.get('/data.json');
            const mock = getLastXhr();

            expect(mock.requestHeaders['Authorization']).toContain(
                'Basic ',
            );
            expect(mock.withCredentials).toBe(true);

            promise.then(() => done());
            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                {},
            );
        });

        it('should propagate bearer authorization to Xhr', (done) => {
            http.setBearerAuthorization('my-jwt-token');
            const promise = http.get('/data.json');
            const mock = getLastXhr();

            expect(mock.requestHeaders['Authorization']).toBe(
                'Bearer my-jwt-token',
            );
            expect(mock.withCredentials).toBe(true);

            promise.then(() => done());
            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                {},
            );
        });

        it('should not set authorization when credentials are null', () => {
            http.get('/data.json');
            const mock = getLastXhr();
            expect(mock.requestHeaders['Authorization']).toBeUndefined();
        });
    });

    describe('promise transformation', () => {
        it('should strip XMLHttpRequest from resolved result', (done) => {
            const promise = http.get('/data.json');
            const mock = getLastXhr();

            promise.then((data, filename) => {
                expect(data).toBeInstanceOf(Objekt);
                expect(typeof filename).toBe('string');
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                { test: true },
            );
        });

        it('should strip XMLHttpRequest from rejected result', (done) => {
            const promise = http.get('/data.json');
            const mock = getLastXhr();

            promise.then(
                () => {
                    done.fail('should not resolve');
                },
                (data, filename) => {
                    expect(data).toBeInstanceOf(Objekt);
                    expect(typeof filename).toBe('string');
                    done();
                },
            );

            mock.respond(
                400,
                { 'Content-Type': 'application/json' },
                { error: 'bad request' },
            );
        });
    });

    describe('event hooks', () => {
        it('should call eventBeforeRequest with Xhr before request', () => {
            const spy = jest.spyOn(http, 'eventBeforeRequest');
            http.get('/data.json');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(expect.any(Xhr));
        });

        it('should call eventAfterRequest on success', (done) => {
            const spy = jest.spyOn(http, 'eventAfterRequest');
            const promise = http.get('/data.json');
            const mock = getLastXhr();

            promise.then(() => {
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });

            mock.respond(
                200,
                { 'Content-Type': 'application/json' },
                {},
            );
        });

        it('should call eventAfterRequest on error', (done) => {
            const spy = jest.spyOn(http, 'eventAfterRequest');
            const promise = http.get('/data.json');
            const mock = getLastXhr();

            promise.then(
                () => {
                    done.fail('should not resolve');
                },
                () => {
                    expect(spy).toHaveBeenCalledTimes(1);
                    done();
                },
            );

            mock.respond(
                500,
                { 'Content-Type': 'application/json' },
                { error: 'fail' },
            );
        });

        it('should call eventBeforeRequest and eventAfterRequest without error', () => {
            expect(() =>
                http.eventBeforeRequest({} as any),
            ).not.toThrow();
            expect(() =>
                http.eventAfterRequest({} as any, {} as any, ''),
            ).not.toThrow();
        });
    });
});
