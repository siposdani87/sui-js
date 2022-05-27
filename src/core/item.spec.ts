import { Item } from './item';

describe('item', () => {
    it('should be instance of Item', () => {
        const item = new Item('<span>sample</span>');
        
        expect(item).toBeInstanceOf(Item);
    });
});
