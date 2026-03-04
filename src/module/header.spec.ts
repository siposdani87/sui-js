import { Header } from './header';

describe('Header', () => {
    let header: Header;

    beforeEach(() => {
        header = new Header();
    });

    it('should be instance of Header', () => {
        expect(header).toBeInstanceOf(Header);
    });

    describe('DOM references', () => {
        it('should query headerKnot', () => {
            expect(header.headerKnot).toBeDefined();
            expect(header.headerKnot.getId()).toBe('header');
        });

        it('should query leftMenuButton', () => {
            expect(header.leftMenuButton).toBeDefined();
            expect(header.leftMenuButton.getId()).toBe('open-left-menu');
        });

        it('should query topMenuButton', () => {
            expect(header.topMenuButton).toBeDefined();
            expect(header.topMenuButton.getId()).toBe('toggle-top-menu');
        });

        it('should query brandKnot', () => {
            expect(header.brandKnot).toBeDefined();
            expect(
                header.brandKnot.getNode().classList.contains('brand'),
            ).toBe(true);
        });

        it('should query brandKnotImage', () => {
            expect(header.brandKnotImage).toBeDefined();
            expect(header.brandKnotImage.getNode().tagName).toBe('IMG');
        });

        it('should query brandKnotTitle', () => {
            expect(header.brandKnotTitle).toBeDefined();
            expect(
                header.brandKnotTitle.getNode().classList.contains('app-title'),
            ).toBe(true);
        });

        it('should query mainContainerKnot', () => {
            expect(header.mainContainerKnot).toBeDefined();
        });

        it('should query templateViewKnot', () => {
            expect(header.templateViewKnot).toBeDefined();
        });
    });

    describe('setTitle', () => {
        it('should set title text', () => {
            header.setTitle('My App');
            expect(header.brandKnotTitle.getNode().innerHTML).toBe('My App');
        });
    });

    describe('setUrl', () => {
        it('should set brand href', () => {
            header.setUrl('/home');
            expect(header.brandKnot.getAttribute('href')).toBe('/home');
        });
    });

    describe('setImage', () => {
        it('should set image src', () => {
            header.setImage('/logo.png');
            expect(header.brandKnotImage.getAttribute('src')).toBe(
                '/logo.png',
            );
        });
    });

    describe('open / close', () => {
        it('should add open class', () => {
            header.open();
            expect(header.headerKnot.hasClass('open')).toBe(true);
        });

        it('should remove open class', () => {
            header.open();
            header.close();
            expect(header.headerKnot.hasClass('open')).toBe(false);
        });
    });

    describe('show / hide', () => {
        it('should remove hidden and add padding classes on show', () => {
            header.show();
            expect(header.headerKnot.hasClass('hidden')).toBe(false);
            expect(header.mainContainerKnot.hasClass('header-padding')).toBe(
                true,
            );
            expect(header.templateViewKnot.hasClass('has-header')).toBe(true);
        });

        it('should add hidden and remove padding classes on hide', () => {
            header.show();
            header.hide();
            expect(header.headerKnot.hasClass('hidden')).toBe(true);
            expect(header.mainContainerKnot.hasClass('header-padding')).toBe(
                false,
            );
            expect(header.templateViewKnot.hasClass('has-header')).toBe(false);
        });
    });

    describe('showShadow / hideShadow', () => {
        it('should add shadow class', () => {
            header.showShadow();
            expect(header.headerKnot.hasClass('shadow')).toBe(true);
        });

        it('should remove shadow class', () => {
            header.showShadow();
            header.hideShadow();
            expect(header.headerKnot.hasClass('shadow')).toBe(false);
        });
    });

    describe('showLeftMenuButton / hideLeftMenuButton', () => {
        it('should remove hidden from left menu button', () => {
            header.hideLeftMenuButton();
            header.showLeftMenuButton();
            expect(header.leftMenuButton.hasClass('hidden')).toBe(false);
        });

        it('should add hidden to left menu button', () => {
            header.hideLeftMenuButton();
            expect(header.leftMenuButton.hasClass('hidden')).toBe(true);
        });
    });

    describe('showTopMenuButton / hideTopMenuButton', () => {
        it('should remove hidden from top menu button', () => {
            header.hideTopMenuButton();
            header.showTopMenuButton();
            expect(header.topMenuButton.hasClass('hidden')).toBe(false);
        });

        it('should add hidden to top menu button', () => {
            header.hideTopMenuButton();
            expect(header.topMenuButton.hasClass('hidden')).toBe(true);
        });
    });

    describe('eventLogoClick', () => {
        it('should be callable without error', () => {
            expect(() => header.eventLogoClick()).not.toThrow();
        });

        it('should fire on brand click', () => {
            const spy = jest.fn();
            header.eventLogoClick = spy;
            header.brandKnot.getNode().click();
            expect(spy).toHaveBeenCalled();
        });
    });
});
