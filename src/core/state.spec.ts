import { State } from './state';

describe('state', () => {
    it('should be instance of State', () => {
        const state = new State([]);

        expect(state).toBeInstanceOf(State);
    });
});
