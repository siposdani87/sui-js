import { Flash } from './flash';

describe('flash', () => {
    it('should be instance of Flash', () => {
        const flash = new Flash();
        
        expect(flash).toBeInstanceOf(Flash);
    });
});
