import { Browser } from './browser';

describe('browser', () => {
    it('should be instance of Browser', () => {
        const browser = new Browser();

        expect(browser).toBeInstanceOf(Browser);
    });
});
