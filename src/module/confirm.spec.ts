import { Confirm } from './confirm';

describe('confirm', () => {
    it('should be instance of Confirm', () => {
        const confirm = new Confirm();
        
        expect(confirm).toBeInstanceOf(Confirm);
    });
});
