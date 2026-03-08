import { Page } from './page';

describe('Page', () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
    });

    afterEach(() => {
        page.destroy();
    });

    it('should be instance of Page', () => {
        expect(page).toBeInstanceOf(Page);
    });

    describe('setTitle', () => {
        it('should set document title', () => {
            page.setTitle('Test Title');
            expect(document.title).toBe('Test Title');
        });
    });

    describe('click event', () => {
        it('should emit click on document click', () => {
            const clickSpy = jest.fn();
            page.on('click', clickSpy);
            document.dispatchEvent(new Event('click'));
            expect(clickSpy).toHaveBeenCalled();
        });
    });

    describe('destroy', () => {
        it('should remove document click listener', () => {
            const clickSpy = jest.fn();
            page.on('click', clickSpy);
            page.destroy();
            document.dispatchEvent(new Event('click'));
            expect(clickSpy).not.toHaveBeenCalled();
        });
    });

    describe('mailTo', () => {
        it('should not throw when called with email and subject', () => {
            expect(() =>
                page.mailTo('test@example.com', 'Subject'),
            ).not.toThrow();
        });

        it('should not throw when called without subject', () => {
            expect(() => page.mailTo('test@example.com')).not.toThrow();
        });
    });
});
