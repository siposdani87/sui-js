import { Waiter } from './waiter';

describe('waiter', () => {
    it('should be instance of Waiter', () => {
        const waiter = new Waiter();
        
        expect(waiter).toBeInstanceOf(Waiter);
    });
});
