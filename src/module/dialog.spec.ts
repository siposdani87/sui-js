import { Dialog } from './dialog';
import { Http } from './http';

describe('Dialog', () => {
    let http: Http;

    beforeEach(() => {
        http = new Http();
    });

    it('should be instance of Dialog', () => {
        const dialog = new Dialog(http);
        expect(dialog).toBeInstanceOf(Dialog);
    });

    it('should store http reference', () => {
        const dialog = new Dialog(http);
        expect(dialog.http).toBe(http);
    });

    it('should have loadTemplate method', () => {
        const dialog = new Dialog(http);
        expect(typeof dialog.loadTemplate).toBe('function');
    });

    it('should have open method from BaseModal', () => {
        const dialog = new Dialog(http);
        expect(typeof dialog.open).toBe('function');
    });

    it('should have close method from BaseModal', () => {
        const dialog = new Dialog(http);
        expect(typeof dialog.close).toBe('function');
    });

    it('should have isOpened method from BaseModal', () => {
        const dialog = new Dialog(http);
        expect(typeof dialog.isOpened).toBe('function');
    });

    it('should not be opened by default', () => {
        const dialog = new Dialog(http);
        expect(dialog.isOpened()).toBe(false);
    });
});
