import { Helper } from './helper';

describe('helper', () => {
    it('should be instance of Helper', () => {
        const helper = new Helper();

        expect(helper).toBeInstanceOf(Helper);
    });
});
