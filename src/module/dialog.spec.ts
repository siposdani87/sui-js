import { Dialog } from './dialog';
import { Http } from './http';

describe('dialog', () => {
    it('should be instance of Dialog', () => {
        const http = new Http();
        const dialog = new Dialog(http);

        expect(dialog).toBeInstanceOf(Dialog);
    });
});
