import { Header } from './header';
import { TopMenu } from './topMenu';

describe('topMenu', () => {
    it('should be instance of TopMenu', () => {
        const header = new Header();
        const topMenu = new TopMenu(header);

        expect(topMenu).toBeInstanceOf(TopMenu);
    });
});
