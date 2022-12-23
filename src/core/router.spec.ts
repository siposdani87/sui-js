import { Router } from './router';

describe('router', () => {
    it('should be instance of Router', () => {
        const router = new Router();

        expect(router).toBeInstanceOf(Router);
    });

    it('should resolve url with params', () => {
        const stateUrl = '/users/profile';
        const params = {
            empty: undefined,
            me: 1,
        }
        const router = new Router(stateUrl);
        const url = router.stringify(params);

        expect(url).toBe(stateUrl + '?me=1');
    });
});
