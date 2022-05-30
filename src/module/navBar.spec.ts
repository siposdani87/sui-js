import { NavBar } from './navBar';

describe('navBar', () => {
    it('should be instance of NavBar', () => {
        const navBar = new NavBar();

        expect(navBar).toBeInstanceOf(NavBar);
    });
});
