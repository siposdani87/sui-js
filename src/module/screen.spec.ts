import { Screen } from './screen';

describe('screen', () => {
    it('should be instance of Screen', () => {
        const screen = new Screen();

        expect(screen).toBeInstanceOf(Screen);
    });
});
