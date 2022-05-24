import { ActionCable } from './actionCable';

describe('actionCable', () => {
    it('should be instance of ActionCable', () => {
        const actionCable = new ActionCable();

        expect(actionCable).toBeInstanceOf(ActionCable);
    });
});
