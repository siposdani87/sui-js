import { Cookie } from './cookie';

describe('cookie', () => {
    it('should be instance of Cookie', () => {
        const cookie = new Cookie();
        
        expect(cookie).toBeInstanceOf(Cookie);
    });
});
