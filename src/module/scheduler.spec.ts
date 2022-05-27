import { Scheduler } from './scheduler';

describe('scheduler', () => {
    it('should be instance of Scheduler', () => {
        const scheduler = new Scheduler();
        
        expect(scheduler).toBeInstanceOf(Scheduler);
    });
});
