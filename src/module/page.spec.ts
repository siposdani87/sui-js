import { Page } from './page';

describe('page', () => {
    it('should be instance of Page', () => {
        const page = new Page();

        expect(page).toBeInstanceOf(Page);
    });
});
