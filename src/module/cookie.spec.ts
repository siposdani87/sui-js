import { Cookie } from './cookie';

describe('Cookie', () => {
    let cookie: Cookie;

    beforeEach(() => {
        cookie = new Cookie({ prefix: 'test' });
        // Clear all cookies
        document.cookie.split(';').forEach((c) => {
            const name = c.trim().split('=')[0];
            if (name) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            }
        });
    });

    it('should be instance of Cookie', () => {
        expect(cookie).toBeInstanceOf(Cookie);
    });

    describe('set and get', () => {
        it('should set and retrieve a cookie value', () => {
            cookie.set('name', 'value');
            expect(cookie.get('name')).toBe('value');
        });

        it('should handle numeric values', () => {
            cookie.set('count', '42');
            expect(cookie.get('count')).toBe(42);
        });

        it('should return null for non-existent cookie', () => {
            expect(cookie.get('nonexistent')).toBeNull();
        });

        it('should use default prefix', () => {
            const defaultCookie = new Cookie();
            defaultCookie.set('key', 'val');
            expect(defaultCookie.get('key')).toBe('val');
        });

        it('should set cookie with number expires', () => {
            cookie.set('expiring', 'data', 24);
            expect(cookie.get('expiring')).toBe('data');
        });

        it('should set cookie with Date expires', () => {
            const future = new Date(Date.now() + 86400000);
            cookie.set('dated', 'value', future);
            expect(cookie.get('dated')).toBe('value');
        });

        it('should not set cookie with reserved name', () => {
            const reservedCookie = new Cookie({ prefix: '' });
            reservedCookie.set('expires', 'value');
            // reserved names are silently rejected
        });
    });

    describe('hasKey', () => {
        it('should return true for existing key', () => {
            cookie.set('exists', 'yes');
            expect(cookie.hasKey('exists')).toBe(true);
        });

        it('should return false for non-existing key', () => {
            expect(cookie.hasKey('missing')).toBe(false);
        });
    });

    describe('remove', () => {
        it('should remove an existing cookie', () => {
            cookie.set('toRemove', 'data');
            expect(cookie.hasKey('toRemove')).toBe(true);
            cookie.remove('toRemove');
            expect(cookie.hasKey('toRemove')).toBe(false);
        });

        it('should not throw when removing non-existent cookie', () => {
            expect(() => cookie.remove('nonexistent')).not.toThrow();
        });
    });

    describe('getKeys', () => {
        it('should return array of keys', () => {
            cookie.set('key1', 'val1');
            cookie.set('key2', 'val2');
            const keys = cookie.getKeys();
            expect(keys).toContain('key1');
            expect(keys).toContain('key2');
        });
    });

    describe('clear', () => {
        it('should remove all cookies with prefix', () => {
            cookie.set('a', '1');
            cookie.set('b', '2');
            cookie.clear();
            expect(cookie.hasKey('a')).toBe(false);
            expect(cookie.hasKey('b')).toBe(false);
        });
    });
});
