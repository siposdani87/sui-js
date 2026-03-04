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

    describe('eventClick', () => {
        it('should call eventClick on document click', () => {
            const clickSpy = jest.fn();
            page.eventClick = clickSpy;
            document.dispatchEvent(new Event('click'));
            expect(clickSpy).toHaveBeenCalled();
        });
    });

    describe('destroy', () => {
        it('should remove document click listener', () => {
            const clickSpy = jest.fn();
            page.eventClick = clickSpy;
            page.destroy();
            document.dispatchEvent(new Event('click'));
            expect(clickSpy).not.toHaveBeenCalled();
        });
    });
});
