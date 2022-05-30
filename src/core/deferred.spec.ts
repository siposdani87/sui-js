import { Deferred } from './deferred';

describe('deferred', () => {
    it('should be instance of Deferred', () => {
        const deferred = new Deferred();

        expect(deferred).toBeInstanceOf(Deferred);
    });
});
