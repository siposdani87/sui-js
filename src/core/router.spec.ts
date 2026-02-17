import { Router } from './router';

describe('Router', () => {
    it('should be instance of Router', () => {
        const router = new Router();
        expect(router).toBeInstanceOf(Router);
    });

    describe('stringify', () => {
        it('should resolve url with params', () => {
            const router = new Router('/users/profile/:id');
            const url = router.stringify({
                empty: undefined,
                me: true,
                id: 1,
            });

            expect(url).toBe('/users/profile/1?me=true');
        });

        it('should handle route with no params', () => {
            const router = new Router('/about');
            expect(router.stringify()).toBe('/about');
        });

        it('should handle multiple path params', () => {
            const router = new Router('/users/:userId/posts/:postId');
            const url = router.stringify({ userId: 5, postId: 42 });
            expect(url).toBe('/users/5/posts/42');
        });

        it('should handle empty params object', () => {
            const router = new Router('/simple');
            expect(router.stringify({})).toBe('/simple');
        });

        it('should put non-path params in query string', () => {
            const router = new Router('/items/:id');
            const url = router.stringify({ id: 3, page: 1, limit: 10 });
            expect(url).toBe('/items/3?page=1&limit=10');
        });

        it('should handle unused path param placeholder', () => {
            const router = new Router('/users/:id/:action');
            const url = router.stringify({ id: 1 });
            expect(url).toBe('/users/1/');
        });
    });

    describe('getMatches', () => {
        it('should match simple path', () => {
            const router = new Router('/about');
            expect(router.getMatches('/about')).not.toBeNull();
        });

        it('should not match different path', () => {
            const router = new Router('/about');
            expect(router.getMatches('/contact')).toBeNull();
        });

        it('should match path with params', () => {
            const router = new Router('/users/:id');
            expect(router.getMatches('/users/123')).not.toBeNull();
        });

        it('should strip query string before matching', () => {
            const router = new Router('/search');
            expect(router.getMatches('/search?q=test')).not.toBeNull();
        });
    });

    describe('parse', () => {
        it('should parse path parameters', () => {
            const router = new Router('/users/:id');
            const params = router.parse('/users/42');
            expect(params).toEqual({ id: 42 });
        });

        it('should parse multiple path parameters', () => {
            const router = new Router('/users/:userId/posts/:postId');
            const params = router.parse('/users/5/posts/10');
            expect(params).toEqual({ userId: 5, postId: 10 });
        });

        it('should return empty object for no match', () => {
            const router = new Router('/users/:id');
            const params = router.parse('/other/path');
            expect(params).toEqual({});
        });

        it('should parse query string parameters', () => {
            const router = new Router('/search');
            const params = router.parse('/search?q=hello&page=2');
            expect(params).toMatchObject({ q: 'hello', page: 2 });
        });

        it('should handle array query params with []', () => {
            const router = new Router('/filter');
            const params = router.parse('/filter?ids[]=1&ids[]=2&ids[]=3');
            expect(params).toEqual({ ids: [1, 2, 3] });
        });

        it.each([
            ['/users/:id', '/users/hello', { id: 'hello' }],
            ['/users/:id', '/users/0', { id: 0 }],
            ['/users/:id', '/users/true', { id: true }],
        ])(
            'should parse param types for route %s with url %s',
            (route, url, expected) => {
                const router = new Router(route);
                expect(router.parse(url)).toMatchObject(expected);
            },
        );
    });
});
