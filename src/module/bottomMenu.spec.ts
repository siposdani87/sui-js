import { BottomMenu } from './bottomMenu';
import { Footer } from './footer';

describe('BottomMenu', () => {
    it('should be instance of BottomMenu', () => {
        const footer = new Footer();
        const bottomMenu = new BottomMenu(footer);

        expect(bottomMenu).toBeInstanceOf(BottomMenu);
    });
});
