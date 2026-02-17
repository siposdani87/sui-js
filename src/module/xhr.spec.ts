import { Xhr } from './xhr';

describe('Xhr', () => {
    let xhr: Xhr;

    beforeEach(() => {
        xhr = new Xhr({ backend: 'https://api.example.com', locale: 'en' });
    });

    it('should be instance of Xhr', () => {
        expect(xhr).toBeInstanceOf(Xhr);
    });

    describe('constructor', () => {
        it('should set backend option', () => {
            expect(xhr.options.get('backend')).toBe(
                'https://api.example.com',
            );
        });

        it('should set locale option', () => {
            expect(xhr.options.get('locale')).toBe('en');
        });

        it('should initialize request headers as empty', () => {
            expect(xhr.requestHeaders).toEqual({});
        });

        it('should have null authorization by default', () => {
            expect(xhr.authorization).toBeNull();
        });

        it('should define content types', () => {
            expect(xhr.types).toBeDefined();
            expect(xhr.types['json']).toBeDefined();
            expect(xhr.types['form']).toBeDefined();
            expect(xhr.types['html']).toBeDefined();
        });
    });

    describe('setBasicAuthorization', () => {
        it('should set Basic authorization header', () => {
            xhr.setBasicAuthorization('user', 'pass');
            expect(xhr.authorization).toContain('Basic ');
        });

        it('should not set authorization for empty credentials', () => {
            xhr.setBasicAuthorization('', '');
            expect(xhr.authorization).toBeNull();
        });
    });

    describe('setBearerAuthorization', () => {
        it('should set Bearer authorization header', () => {
            xhr.setBearerAuthorization('mytoken123');
            expect(xhr.authorization).toBe('Bearer mytoken123');
        });

        it('should not set authorization for empty token', () => {
            xhr.setBearerAuthorization('');
            expect(xhr.authorization).toBeNull();
        });
    });

    describe('HTTP methods', () => {
        it('should have get method', () => {
            expect(typeof xhr.get).toBe('function');
        });

        it('should have post method', () => {
            expect(typeof xhr.post).toBe('function');
        });

        it('should have put method', () => {
            expect(typeof xhr.put).toBe('function');
        });

        it('should have patch method', () => {
            expect(typeof xhr.patch).toBe('function');
        });

        it('should have delete method', () => {
            expect(typeof xhr.delete).toBe('function');
        });
    });
});
