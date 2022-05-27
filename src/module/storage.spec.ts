import { Storage } from './storage';

describe('storage', () => {
    it('should be instance of Storage', () => {
        const storage = new Storage('LOCAL');
        
        expect(storage).toBeInstanceOf(Storage);
    });
});
