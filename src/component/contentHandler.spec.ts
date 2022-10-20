import { Query } from '../core';
import { ContentHandler } from './contentHandler';

describe('contentHandler', () => {
    it('should be instance of ContentHandler', () => {
        const knot = new Query('.template-view').getKnot();
        const contentHandler = new ContentHandler(knot);

        expect(contentHandler).toBeInstanceOf(ContentHandler);
    });
});
