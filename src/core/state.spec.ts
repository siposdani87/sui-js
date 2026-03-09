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

    afterEach(() => {
        state.destroy();
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
            state.on('change', eventChangeSpy);

            state.go('users');

            expect(eventChangeSpy).toHaveBeenCalled();
            expect(state.getCurrent('id')).toBe('users');
        });

        it('should navigate with params', () => {
            const eventChangeSpy = jest.fn();
            state.on('change', eventChangeSpy);

            state.go('user', { id: 42 });

            expect(eventChangeSpy).toHaveBeenCalled();
        });

        it('should navigate by path string', () => {
            const eventChangeSpy = jest.fn();
            state.on('change', eventChangeSpy);

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
            stateWithRoot.on('change', eventChangeSpy);

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
            state.on('change', eventChangeSpy);

            state.refresh();

            expect(eventChangeSpy).toHaveBeenCalled();
        });

        it('should pass force flag', () => {
            const eventChangeSpy = jest.fn();
            state.on('change', eventChangeSpy);

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
            state.on('change', eventChangeSpy);

            state.go('search');
            state.setParam('q', 'hello');

            expect(state.getParam('q')).toBe('hello');
        });

        it('should return default value for missing param', () => {
            const eventChangeSpy = jest.fn();
            state.on('change', eventChangeSpy);
            state.go('home');
            expect(state.getParam('missing', 'default')).toBe('default');
        });
    });

    describe('destroy', () => {
        it('should remove popstate listener without error', () => {
            expect(() => state.destroy()).not.toThrow();
        });
    });

    describe('popstate handling', () => {
        it('should handle popstate with history state', () => {
            const changeSpy = jest.fn();
            state.on('change', changeSpy);

            state.go('users');
            changeSpy.mockClear();

            // Simulate popstate with state object
            window.history.replaceState({ id: 'home', url: '/' }, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));

            expect(changeSpy).toHaveBeenCalled();
        });

        it('should handle popstate without history state', () => {
            const changeSpy = jest.fn();
            state.on('change', changeSpy);

            // Simulate popstate without state
            window.history.replaceState(null, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));

            expect(changeSpy).toHaveBeenCalled();
        });
    });

    describe('goBack', () => {
        it('should call back when history has entries', () => {
            const backSpy = jest.spyOn(window.history, 'go');
            state.go('users');
            state.goBack('home');
            expect(backSpy).toHaveBeenCalledWith(-1);
            backSpy.mockRestore();
        });
    });

    describe('redirect', () => {
        it('should open in new tab when opt_inTab is true', () => {
            const openSpy = jest
                .spyOn(window, 'open')
                .mockImplementation(() => null);
            state.redirect('https://example.com', true);
            expect(openSpy).toHaveBeenCalledWith(
                'https://example.com',
                '_blank',
            );
            openSpy.mockRestore();
        });
    });

    describe('forward', () => {
        it('should call history.forward', () => {
            const forwardSpy = jest.spyOn(window.history, 'forward');
            state.forward();
            expect(forwardSpy).toHaveBeenCalled();
            forwardSpy.mockRestore();
        });
    });

    describe('setParams', () => {
        it('should set multiple params at once', () => {
            state.go('search');
            state.setParams({ q: 'hello', page: 2 });
            expect(state.getParam('q')).toBe('hello');
        });
    });
});
