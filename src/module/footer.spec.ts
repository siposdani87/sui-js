import { Footer } from './footer';

describe('footer', () => {
    it('should be instance of Footer', () => {
        const footer = new Footer();

        expect(footer).toBeInstanceOf(Footer);
    });
});
