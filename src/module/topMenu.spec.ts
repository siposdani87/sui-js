import { Header } from './header';
import { TopMenu } from './topMenu';

describe('TopMenu', () => {
    let header: Header;
    let topMenu: TopMenu;

    beforeEach(() => {
        header = new Header();
        topMenu = new TopMenu(header);
    });

    it('should be instance of TopMenu', () => {
        expect(topMenu).toBeInstanceOf(TopMenu);
    });

    describe('DOM references', () => {
        it('should query topMenu knot', () => {
            expect(topMenu.topMenu).toBeDefined();
        });

        it('should query toggleTopMenu knot', () => {
            expect(topMenu.toggleTopMenu).toBeDefined();
        });

        it('should store header reference', () => {
            expect(topMenu.header).toBe(header);
        });
    });

    describe('open / close', () => {
        it('should add visible-flex on open', () => {
            topMenu.open();
            expect(topMenu.topMenu.hasClass('visible-flex')).toBe(true);
        });

        it('should add active to toggle button on open', () => {
            topMenu.open();
            expect(topMenu.toggleTopMenu.hasClass('active')).toBe(true);
        });

        it('should open header on open', () => {
            topMenu.open();
            expect(header.headerKnot.hasClass('open')).toBe(true);
        });

        it('should show header shadow on open', () => {
            topMenu.open();
            expect(header.headerKnot.hasClass('shadow')).toBe(true);
        });

        it('should remove visible-flex on close', () => {
            topMenu.open();
            topMenu.close();
            expect(topMenu.topMenu.hasClass('visible-flex')).toBe(false);
        });

        it('should remove active from toggle button on close', () => {
            topMenu.open();
            topMenu.close();
            expect(topMenu.toggleTopMenu.hasClass('active')).toBe(false);
        });

        it('should close header on close', () => {
            topMenu.open();
            topMenu.close();
            expect(header.headerKnot.hasClass('open')).toBe(false);
        });

        it('should hide header shadow on close', () => {
            topMenu.open();
            topMenu.close();
            expect(header.headerKnot.hasClass('shadow')).toBe(false);
        });
    });

    describe('isOpened', () => {
        it('should return false when closed', () => {
            expect(topMenu.isOpened()).toBe(false);
        });

        it('should return true when open', () => {
            topMenu.open();
            expect(topMenu.isOpened()).toBe(true);
        });
    });

    describe('toggle', () => {
        it('should open when closed', () => {
            topMenu.close();
            topMenu.toggle();
            expect(topMenu.isOpened()).toBe(true);
        });

        it('should close when open', () => {
            topMenu.open();
            topMenu.toggle();
            expect(topMenu.isOpened()).toBe(false);
        });

        it('should toggle on click event', () => {
            topMenu.toggleTopMenu.getNode().click();
            expect(topMenu.isOpened()).toBe(true);
        });
    });

    describe('getContainer', () => {
        it('should return topMenu knot', () => {
            expect(topMenu.getContainer()).toBe(topMenu.topMenu);
        });
    });
});
