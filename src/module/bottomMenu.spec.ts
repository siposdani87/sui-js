import { BottomMenu } from './bottomMenu';
import { Footer } from './footer';

describe('BottomMenu', () => {
    let footer: Footer;
    let bottomMenu: BottomMenu;

    beforeEach(() => {
        footer = new Footer();
        bottomMenu = new BottomMenu(footer);
    });

    it('should be instance of BottomMenu', () => {
        expect(bottomMenu).toBeInstanceOf(BottomMenu);
    });

    describe('DOM references', () => {
        it('should query bottomMenu knot', () => {
            expect(bottomMenu.bottomMenu).toBeDefined();
            expect(bottomMenu.bottomMenu.getId()).toBe('bottom-menu');
        });

        it('should store footer reference', () => {
            expect(bottomMenu.footer).toBe(footer);
        });
    });

    describe('open / close', () => {
        it('should add visible-flex on open', () => {
            bottomMenu.open();
            expect(bottomMenu.bottomMenu.hasClass('visible-flex')).toBe(true);
        });

        it('should open footer on open', () => {
            bottomMenu.open();
            expect(footer.isOpened()).toBe(true);
        });

        it('should remove visible-flex on close', () => {
            bottomMenu.open();
            bottomMenu.close();
            expect(bottomMenu.bottomMenu.hasClass('visible-flex')).toBe(false);
        });

        it('should close footer on close', () => {
            bottomMenu.open();
            bottomMenu.close();
            expect(footer.isOpened()).toBe(false);
        });
    });

    describe('isOpened', () => {
        it('should return false when closed', () => {
            expect(bottomMenu.isOpened()).toBe(false);
        });

        it('should return true when open', () => {
            bottomMenu.open();
            expect(bottomMenu.isOpened()).toBe(true);
        });
    });

    describe('toggle', () => {
        it('should open when closed', () => {
            bottomMenu.close();
            bottomMenu.toggle();
            expect(bottomMenu.isOpened()).toBe(true);
        });

        it('should close when open', () => {
            bottomMenu.open();
            bottomMenu.toggle();
            expect(bottomMenu.isOpened()).toBe(false);
        });
    });

    describe('getContainer', () => {
        it('should return bottomMenu knot', () => {
            expect(bottomMenu.getContainer()).toBe(bottomMenu.bottomMenu);
        });
    });
});
