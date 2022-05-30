import { Router } from './router';

describe('router', () => {
    it('should be instance of Router', () => {
        const router = new Router();

        expect(router).toBeInstanceOf(Router);
    });
});
