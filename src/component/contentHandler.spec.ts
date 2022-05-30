import { Query } from '../core';
import { ContentHandler } from './contentHandler';

describe('contentHandler', () => {
    it('should be instance of ContentHandler', () => {
        const node = new Query('.template-view').getItem();
        const contentHandler = new ContentHandler(node);

        expect(contentHandler).toBeInstanceOf(ContentHandler);
    });
});
