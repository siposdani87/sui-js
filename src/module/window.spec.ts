import { Window } from './window';

describe('window', () => {
    it('should be instance of Window', () => {
        const window = new Window();
        
        expect(window).toBeInstanceOf(Window);
    });
});
