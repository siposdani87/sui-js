import { Query } from '../core';
import { ContentHandler } from './contentHandler';

describe('contentHandler', () => {
    it('should be instance of ContentHandler', () => {
        const node = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(node);

        expect(contentHandler).toBeInstanceOf(ContentHandler);
    });
});
