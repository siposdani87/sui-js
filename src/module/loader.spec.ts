import { Loader } from './loader';

describe('loader', () => {
    it('should be instance of Loader', () => {
        const loader = new Loader();
        
        expect(loader).toBeInstanceOf(Loader);
    });
});
