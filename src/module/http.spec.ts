import { Http } from './http';

describe('Http', () => {
    let http: Http;

    beforeEach(() => {
        http = new Http({
            backend: 'https://api.example.com',
            locale: 'en',
        });
    });

    it('should be instance of Http', () => {
        expect(http).toBeInstanceOf(Http);
    });

    describe('constructor', () => {
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
        it('should have get method', () => {
            expect(typeof http.get).toBe('function');
        });

        it('should have post method', () => {
            expect(typeof http.post).toBe('function');
        });

        it('should have put method', () => {
            expect(typeof http.put).toBe('function');
        });

        it('should have patch method', () => {
            expect(typeof http.patch).toBe('function');
        });

        it('should have delete method', () => {
            expect(typeof http.delete).toBe('function');
        });
    });

    describe('event methods', () => {
        it('should have eventBeforeRequest', () => {
            expect(typeof http.eventBeforeRequest).toBe('function');
        });

        it('should have eventAfterRequest', () => {
            expect(typeof http.eventAfterRequest).toBe('function');
        });

        it('should call eventBeforeRequest without error', () => {
            expect(() =>
                http.eventBeforeRequest({} as any),
            ).not.toThrow();
        });

        it('should call eventAfterRequest without error', () => {
            expect(() =>
                http.eventAfterRequest({} as any, {} as any, ''),
            ).not.toThrow();
        });
    });
});
