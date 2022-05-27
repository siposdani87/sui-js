import { LeftMenu } from './leftMenu';

describe('leftMenu', () => {
    it('should be instance of LeftMenu', () => {
        const leftMenu = new LeftMenu();
        
        expect(leftMenu).toBeInstanceOf(LeftMenu);
    });
});
