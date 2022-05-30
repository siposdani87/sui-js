import { Sidebar } from './sidebar';

describe('sidebar', () => {
    it('should be instance of Sidebar', () => {
        const sidebar = new Sidebar('#left-sidebar');

        expect(sidebar).toBeInstanceOf(Sidebar);
    });
});
