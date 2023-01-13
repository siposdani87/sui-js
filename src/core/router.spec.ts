import { Router } from './router';

describe('router', () => {
    it('should be instance of Router', () => {
        const router = new Router();

        expect(router).toBeInstanceOf(Router);
    });

    it('should resolve url with params', () => {
        const stateUrl = '/users/profile/:id';
        const params = {
            empty: undefined,
            me: true,
            id: 1,
        };
        const router = new Router(stateUrl);
        const url = router.stringify(params);

        expect(url).toBe('/users/profile/1?me=true');
    });
});
