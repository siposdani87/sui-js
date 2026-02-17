import { Objekt } from './core/objekt';
import { State } from './core/state';
import { Route } from './component/route';

describe('State Routing Integration', () => {
    let state: State;
    let routes: Route[];

    beforeEach(() => {
        routes = [
            new Route('home', 'Home', '/home', 'homeCtrl'),
            new Route('users', 'Users', '/users', 'usersCtrl'),
            new Route(
                'user-detail',
                'User Detail',
                '/users/:userId',
                'userDetailCtrl',
            ),
            new Route(
                'user-edit',
                'User Edit',
                '/users/:userId/edit',
                'userEditCtrl',
            ),
        ];

        state = new State(routes, {
            root: { id: 'home', params: undefined },
        });
    });

    it('should initialize with routes', () => {
        expect(state).toBeInstanceOf(State);
        expect(state.routes.size()).toBe(4);
    });

    it('should resolve URL for state by ID', () => {
        const url = state.resolveUrl('home');
        expect(url).toContain('/home');
    });

    it('should resolve URL with parameters', () => {
        const url = state.resolveUrl('user-detail', { userId: '123' });
        expect(url).toContain('/users/123');
    });

    it('should track current state after navigation', () => {
        state.go('users');
        const current = state.getCurrent<string>('id');
        expect(current).toBe('users');
    });

    it('should track previous state after navigation', () => {
        state.go('home', undefined, true);
        state.go('users');
        const previous = state.getPrevious<string>('id');
        expect(previous).toBe('home');
    });

    it('should fire eventChange on go()', () => {
        const spy = jest.fn();
        state.eventChange = spy;
        state.go('users');
        expect(spy).toHaveBeenCalled();
        const [currentState] = spy.mock.calls[0];
        expect(currentState.get('id')).toBe('users');
    });

    it('should fire eventChange on run()', () => {
        const spy = jest.fn();
        state.eventChange = spy;
        state.run();
        expect(spy).toHaveBeenCalled();
    });

    it('should fire eventChange on refresh()', () => {
        state.go('home', undefined, true);
        const spy = jest.fn();
        state.eventChange = spy;
        state.refresh();
        expect(spy).toHaveBeenCalled();
    });

    it('should navigate with parameters and retrieve them', () => {
        state.go('user-detail', { userId: '456' });
        const params = state.getParams();
        expect(params.get('userId')).toBe(456);
    });

    it('should navigate to root state via goRoot()', () => {
        state.go('users', undefined, true);
        const spy = jest.fn();
        state.eventChange = spy;
        state.goRoot();
        const current = state.getCurrent<string>('id');
        expect(current).toBe('home');
    });

    it('should get root state configuration', () => {
        const [rootId, rootParams] = state.getRoot();
        expect(rootId).toBe('home');
        expect(rootParams).toBeUndefined();
    });

    it('should handle navigation to parameterized routes', () => {
        state.go('user-edit', { userId: '789' });
        const current = state.getCurrent<Objekt>();
        expect(current.get('id')).toBe('user-edit');
        expect(current.get('controller')).toBe('userEditCtrl');
    });

    it('should overwrite history when opt_overwrite is true', () => {
        const spy = jest.fn();
        state.eventChange = spy;
        state.go('users', undefined, true);
        // When overwriting, eventChange is NOT called
        expect(spy).not.toHaveBeenCalled();
    });

    it('should force eventChange when opt_force is true', () => {
        state.go('users', undefined, true);
        const spy = jest.fn();
        state.eventChange = spy;
        state.go('users', undefined, false, true);
        expect(spy).toHaveBeenCalled();
        const [, , force] = spy.mock.calls[0];
        expect(force).toBe(true);
    });
});
