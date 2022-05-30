import { Xhr } from './xhr';

describe('xhr', () => {
    it('should be instance of Xhr', () => {
        const xhr = new Xhr();

        expect(xhr).toBeInstanceOf(Xhr);
    });
});
