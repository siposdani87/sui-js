import { Navigation } from './navigation';

describe('navigation', () => {
    it('should be instance of Navigation', () => {
        const navigation = new Navigation();
        
        expect(navigation).toBeInstanceOf(Navigation);
    });
});
