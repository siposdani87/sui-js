import { NavBar } from './navBar';

describe('NavBar', () => {
    let navBar: NavBar;

    beforeEach(() => {
        navBar = new NavBar();
    });

    it('should be instance of NavBar', () => {
        expect(navBar).toBeInstanceOf(NavBar);
    });

    describe('DOM references', () => {
        it('should query navBarHeader', () => {
            expect(navBar.navBarHeader).toBeDefined();
        });

        it('should query navBar', () => {
            expect(navBar.navBar).toBeDefined();
            expect(navBar.navBar.getId()).toBe('nav-bar');
        });

        it('should query toggleNavBarIcon', () => {
            expect(navBar.toggleNavBarIcon).toBeDefined();
            expect(navBar.toggleNavBarIcon.getNode().tagName).toBe('EM');
        });
    });

    describe('open / close', () => {
        it('should add open class on open', () => {
            navBar.open();
            expect(navBar.navBar.hasClass('open')).toBe(true);
        });

        it('should set icon to close on open', () => {
            navBar.open();
            expect(navBar.toggleNavBarIcon.getNode().innerHTML).toBe('close');
        });

        it('should remove open class on close', () => {
            navBar.open();
            navBar.close();
            expect(navBar.navBar.hasClass('open')).toBe(false);
        });

        it('should set icon to menu on close', () => {
            navBar.open();
            navBar.close();
            expect(navBar.toggleNavBarIcon.getNode().innerHTML).toBe('menu');
        });
    });

    describe('isOpened', () => {
        it('should return false when closed', () => {
            expect(navBar.isOpened()).toBe(false);
        });

        it('should return true when open', () => {
            navBar.open();
            expect(navBar.isOpened()).toBe(true);
        });
    });

    describe('toggle', () => {
        it('should open when closed', () => {
            navBar.close();
            navBar.toggle();
            expect(navBar.isOpened()).toBe(true);
        });

        it('should close when open', () => {
            navBar.open();
            navBar.toggle();
            expect(navBar.isOpened()).toBe(false);
        });
    });

    describe('show / hide', () => {
        it('should remove hidden on show', () => {
            navBar.hide();
            navBar.show();
            expect(navBar.navBarHeader.hasClass('hidden')).toBe(false);
        });

        it('should add hidden on hide', () => {
            navBar.hide();
            expect(navBar.navBarHeader.hasClass('hidden')).toBe(true);
        });
    });

    describe('showShadow / hideShadow', () => {
        it('should add shadow class', () => {
            navBar.showShadow();
            expect(navBar.navBar.hasClass('shadow')).toBe(true);
        });

        it('should remove shadow class', () => {
            navBar.showShadow();
            navBar.hideShadow();
            expect(navBar.navBar.hasClass('shadow')).toBe(false);
        });
    });

    describe('getContainer', () => {
        it('should return navBar knot', () => {
            expect(navBar.getContainer()).toBe(navBar.navBar);
        });
    });
});
