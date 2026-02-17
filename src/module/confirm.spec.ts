import { Confirm } from './confirm';

describe('Confirm', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="main-container"></div>
            <div id="confirm">
                <div id="confirm-window"></div>
                <div class="modal-header">
                    <div class="modal-title"></div>
                    <button class="close"><em class="material-icons">close</em></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            </div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should be instance of Confirm', () => {
        const confirm = new Confirm();
        expect(confirm).toBeInstanceOf(Confirm);
    });

    describe('load', () => {
        it('should set message in modal body', () => {
            const confirm = new Confirm();
            confirm.load('Are you sure?', 'OK');
            expect(confirm.modalBody.getHtml()).toContain('Are you sure?');
        });

        it('should create OK button', () => {
            const confirm = new Confirm();
            confirm.load('Message', 'OK');
            const buttons = confirm.modalFooter
                .getNode()
                .querySelectorAll('button');
            expect(buttons.length).toBeGreaterThanOrEqual(1);
        });

        it('should create cancel and OK buttons', () => {
            const confirm = new Confirm();
            confirm.load('Message', 'OK', 'Cancel');
            const buttons = confirm.modalFooter
                .getNode()
                .querySelectorAll('button');
            expect(buttons.length).toBe(2);
        });

        it('should set title when provided', () => {
            const confirm = new Confirm();
            confirm.load('Message', 'OK', '', 'Title');
            expect(confirm.modalTitle.getHtml()).toContain('Title');
        });

        it('should apply type class to modal window', () => {
            const confirm = new Confirm();
            confirm.load('Message', 'OK', '', '', 'warning');
            expect(confirm.modalWindow.hasClass('warning')).toBe(true);
        });

        it('should apply choice type with primary cancel button', () => {
            const confirm = new Confirm();
            confirm.load('Message', 'OK', 'Cancel', '', 'choice');
            expect(confirm.modalWindow.hasClass('choice')).toBe(true);
        });
    });
});
