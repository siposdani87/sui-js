import { Route } from './route';

describe('route', () => {
    it('should be instance of Route', () => {
        const route = new Route('users.login', 'Login', '/users/login', 'usersLoginController');
        
        expect(route).toBeInstanceOf(Route);
    });
});
