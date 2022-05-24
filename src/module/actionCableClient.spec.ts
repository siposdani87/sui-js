import { ActionCable } from './actionCable';
import { ActionCableClient } from './actionCableClient';

describe('actionCableClient', () => {
    it('should be instance of actionCableClient', () => {
        const channel = 'CHANNEL';
        const room = 'ROOM';
        const actionCable = new ActionCable();
        const actionCableClient = new ActionCableClient(actionCable, {
            channel,
            room,
        });

        expect(actionCableClient).toBeInstanceOf(ActionCableClient);
    });
});
