import { Promize } from './promize';

describe('promize', () => {
    it('should be instance of Promize', () => {
        const promize = new Promize();
        
        expect(promize).toBeInstanceOf(Promize);
    });
});
