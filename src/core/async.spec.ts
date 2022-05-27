import { Async } from './async';

describe('async', () => {
    it('should be instance of Async', () => {
        const async = new Async();
        
        expect(async).toBeInstanceOf(Async);
    });
});
