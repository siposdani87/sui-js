import { Footer } from './footer';
import { Knot } from '../core';

describe('Footer', () => {
    let footer: Footer;

    beforeEach(() => {
        footer = new Footer();
    });

    it('should be instance of Footer', () => {
        expect(footer).toBeInstanceOf(Footer);
    });

    describe('DOM references', () => {
        it('should query footerKnot', () => {
            expect(footer.footerKnot).toBeDefined();
            expect(footer.footerKnot.getId()).toBe('footer');
        });

        it('should query templateViewKnot', () => {
            expect(footer.templateViewKnot).toBeDefined();
        });

        it('should query contentKnot', () => {
            expect(footer.contentKnot).toBeDefined();
        });

        it('should query localesKnot', () => {
            expect(footer.localesKnot).toBeDefined();
        });
    });

    describe('show / hide', () => {
        it('should remove hidden class on show', () => {
            footer.hide();
            footer.show();
            expect(footer.footerKnot.hasClass('hidden')).toBe(false);
        });

        it('should add hidden class on hide', () => {
            footer.hide();
            expect(footer.footerKnot.hasClass('hidden')).toBe(true);
        });

        it('should remove static class on hide', () => {
            footer.hide();
            expect(footer.footerKnot.hasClass('static')).toBe(false);
        });

        it('should remove has-footer from template view on hide', () => {
            footer.hide();
            expect(footer.templateViewKnot.hasClass('has-footer')).toBe(false);
        });
    });

    describe('setContent', () => {
        it('should append content knot to content container', () => {
            const child = new Knot('span');
            child.setHtml('Copyright');
            footer.setContent(child);
            expect(footer.contentKnot.getNode().innerHTML).toContain(
                'Copyright',
            );
        });
    });

    describe('getLocalesContainer', () => {
        it('should return locales knot', () => {
            expect(footer.getLocalesContainer()).toBe(footer.localesKnot);
        });
    });

    describe('open / close', () => {
        it('should add open class', () => {
            footer.open();
            expect(footer.footerKnot.hasClass('open')).toBe(true);
        });

        it('should remove open class', () => {
            footer.open();
            footer.close();
            expect(footer.footerKnot.hasClass('open')).toBe(false);
        });
    });

    describe('isOpened', () => {
        it('should return false when closed', () => {
            expect(footer.isOpened()).toBe(false);
        });

        it('should return true when open', () => {
            footer.open();
            expect(footer.isOpened()).toBe(true);
        });
    });

    describe('toogle', () => {
        it('should open when closed', () => {
            footer.close();
            footer.toogle();
            expect(footer.isOpened()).toBe(true);
        });

        it('should close when open', () => {
            footer.open();
            footer.toogle();
            expect(footer.isOpened()).toBe(false);
        });
    });
});
