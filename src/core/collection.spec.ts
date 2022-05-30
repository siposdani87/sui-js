import { Collection } from './collection';

describe('collection', () => {
    it('should be instance of Collection', () => {
        const collection = new Collection();

        expect(collection).toBeInstanceOf(Collection);
    });
});
