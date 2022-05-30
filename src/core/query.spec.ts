import { Query } from './query';

describe('query', () => {
    it('should be instance of Query', () => {
        const query = new Query('.template-view');

        expect(query).toBeInstanceOf(Query);
    });
});
