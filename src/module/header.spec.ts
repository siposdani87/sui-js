import { Header } from './header';

describe('header', () => {
    it('should be instance of Header', () => {
        const header = new Header();

        expect(header).toBeInstanceOf(Header);
    });
});
