import { Document } from './document';

describe('document', () => {
    it('should be instance of Document', () => {
        const document = new Document();
        
        expect(document).toBeInstanceOf(Document);
    });
});
