import { Depot } from './depot';

describe('depot', () => {
    it('should be instance of Depot', () => {
        const depot = new Depot('LOCAL');

        expect(depot).toBeInstanceOf(Depot);
    });
});
