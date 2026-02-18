import { State } from './state';
import { Route } from '../component/route';
import { Objekt } from './objekt';

describe('State', () => {
    let state: State;
    let routes: Route[];

    beforeEach(() => {
        routes = [
            new Route('home', 'Home', '/', 'homeCtrl'),
            new Route('users', 'Users', '/users', 'usersCtrl'),
            new Route(
                'user',
                'User',
                '/users/:id',
                'userCtrl',
                '/templates/user.html',
            ),
            new Route('search', 'Search', '/search', 'searchCtrl'),
        ];
        state = new State(routes);
    });

    it('should instantiate with routes array', () => {
        expect(state).toBeInstanceOf(State);
    });

    it('should instantiate with empty routes', () => {
        const emptyState = new State([]);
        expect(emptyState).toBeInstanceOf(State);
    });

    describe('routes collection', () => {
        it('should store routes in a collection', () => {
            expect(state.routes.size()).toBe(4);
        });
    });

    describe('getCurrent / getPrevious', () => {
        it('should return current state', () => {
            const current = state.getCurrent<Objekt>();
            expect(current).toBeDefined();
        });

        it('should return previous state', () => {
            const previous = state.getPrevious<Objekt>();
            expect(previous).toBeDefined();
        });
    });

    describe('go', () => {
        it('should navigate to a route by ID', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;

            state.go('users');

            expect(eventChangeSpy).toHaveBeenCalled();
            expect(state.getCurrent('id')).toBe('users');
        });

        it('should navigate with params', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;

            state.go('user', { id: 42 });

            expect(eventChangeSpy).toHaveBeenCalled();
        });

        it('should navigate by path string', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;

            state.go('/users');

            expect(eventChangeSpy).toHaveBeenCalled();
        });
    });

    describe('resolveUrl', () => {
        it('should resolve URL for a route ID', () => {
            const url = state.resolveUrl('user', { id: 5 });
            expect(url).toContain('/users/5');
        });
    });

    describe('goRoot', () => {
        it('should navigate to root route', () => {
            const stateWithRoot = new State(routes, {
                root: { id: 'home', params: undefined },
            });
            const eventChangeSpy = jest.fn();
            stateWithRoot.eventChange = eventChangeSpy;

            stateWithRoot.goRoot();

            expect(eventChangeSpy).toHaveBeenCalled();
        });
    });

    describe('getRoot', () => {
        it('should return root route config', () => {
            const [id, params] = state.getRoot();
            expect(id).toBe('root');
        });
    });

    describe('refresh', () => {
        it('should trigger change event', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;

            state.refresh();

            expect(eventChangeSpy).toHaveBeenCalled();
        });

        it('should pass force flag', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;

            state.refresh(true);

            expect(eventChangeSpy).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                true,
            );
        });
    });

    describe('setParam / getParam / getParams', () => {
        it('should set and get params after navigation', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;

            state.go('search');
            state.setParam('q', 'hello');

            expect(state.getParam('q')).toBe('hello');
        });

        it('should return default value for missing param', () => {
            const eventChangeSpy = jest.fn();
            state.eventChange = eventChangeSpy;
            state.go('home');
            expect(state.getParam('missing', 'default')).toBe('default');
        });
    });
});
