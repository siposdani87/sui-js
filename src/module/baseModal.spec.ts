import { BaseModal } from './baseModal';
import { Knot } from '../core/knot';

describe('BaseModal', () => {
    let modal: BaseModal;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="main-container"></div>
            <div id="test-modal">
                <div id="test-window"></div>
                <div class="modal-header">
                    <div class="modal-title"></div>
                    <button class="close"><em class="material-icons">close</em></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            </div>
        `;

        modal = new BaseModal();
        modal.body = new Knot(document.body);
        modal.modal = new Knot(document.getElementById('test-modal'));
        modal.modalWindow = new Knot(document.getElementById('test-window'));
        modal.modalHeader = new Knot(
            document.querySelector('.modal-header') as HTMLElement,
        );
        modal.modalTitle = new Knot(
            document.querySelector('.modal-title') as HTMLElement,
        );
        modal.modalBody = new Knot(
            document.querySelector('.modal-body') as HTMLElement,
        );
        modal.modalFooter = new Knot(
            document.querySelector('.modal-footer') as HTMLElement,
        );
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should be instance of BaseModal', () => {
        expect(modal).toBeInstanceOf(BaseModal);
    });

    describe('isOpened', () => {
        it('should return false when not opened', () => {
            expect(modal.isOpened()).toBe(false);
        });

        it('should return true when opened', () => {
            modal.modal.addClass('visible-flex');
            expect(modal.isOpened()).toBe(true);
        });
    });

    describe('open', () => {
        it('should add visible-flex class', () => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.open();
            expect(modal.isOpened()).toBe(true);
        });

        it('should add blur to main container', () => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.hasBlur = false;
            modal.open();
            expect(modal.mainContainerKnot.hasClass('blur')).toBe(true);
        });
    });

    describe('close', () => {
        it('should remove visible-flex class', () => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.hasBlur = false;
            modal.open();
            modal.close();
            expect(modal.isOpened()).toBe(false);
        });

        it('should add hidden class', () => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.hasBlur = false;
            modal.open();
            modal.close();
            expect(modal.modal.hasClass('hidden')).toBe(true);
        });
    });

    describe('setSize', () => {
        it('should set window dimensions', () => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.setSize(800, 600);
            expect(modal.windowWidth).toBe(800);
            expect(modal.windowHeight).toBe(600);
        });
    });

    describe('open with allowClose=false', () => {
        beforeEach(() => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.btnClose = new Knot(
                document.querySelector('.close') as HTMLElement,
            );
            modal.hasBlur = false;
        });

        it('should hide close button when allowClose is false', () => {
            modal.open(false);
            expect(modal.btnClose.hasClass('hidden')).toBe(true);
        });

        it('should show close button when allowClose is true', () => {
            modal.open(true);
            expect(modal.btnClose.hasClass('hidden')).toBe(false);
        });

        it('should not bind escape key when allowClose is false', () => {
            const cancelFn = jest.fn();
            modal.on('cancel', cancelFn);
            modal.open(false);
            document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' }),
            );
            expect(cancelFn).not.toHaveBeenCalled();
        });

        it('should bind escape key when allowClose is true', () => {
            const cancelFn = jest.fn();
            modal.on('cancel', cancelFn);
            modal.open(true);
            document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' }),
            );
            expect(cancelFn).toHaveBeenCalled();
        });
    });

    describe('blur state with stacked modals', () => {
        beforeEach(() => {
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
        });

        it('should preserve blur when another modal already applied it', () => {
            modal.mainContainerKnot.addClass('blur');
            modal.hasBlur = false;
            modal.open();
            modal.close();
            expect(modal.mainContainerKnot.hasClass('blur')).toBe(true);
        });

        it('should remove blur when this modal applied it', () => {
            modal.hasBlur = false;
            modal.open();
            modal.close();
            expect(modal.mainContainerKnot.hasClass('blur')).toBe(false);
        });
    });

    describe('_setTitle', () => {
        it('should show header for non-empty string title', () => {
            (modal as any)._setTitle('Test Title');
            expect(modal.modalHeader.hasClass('hidden')).toBe(false);
        });

        it('should hide header for empty string title', () => {
            (modal as any)._setTitle('');
            expect(modal.modalHeader.hasClass('hidden')).toBe(true);
        });

        it('should hide header for undefined title', () => {
            (modal as any)._setTitle(undefined);
            expect(modal.modalHeader.hasClass('hidden')).toBe(true);
        });
    });

    describe('focus trap', () => {
        let modalEl: HTMLElement;

        beforeEach(() => {
            const modalHtml = document.createElement('div');
            modalHtml.id = 'focus-modal';
            const windowEl = document.createElement('div');
            windowEl.id = 'focus-window';
            const header = document.createElement('div');
            header.className = 'modal-header';
            const title = document.createElement('div');
            title.className = 'modal-title';
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close';
            header.appendChild(title);
            header.appendChild(closeBtn);
            const body = document.createElement('div');
            body.className = 'modal-body';
            const btn1 = document.createElement('button');
            btn1.id = 'btn1';
            const btn2 = document.createElement('button');
            btn2.id = 'btn2';
            body.appendChild(btn1);
            body.appendChild(btn2);
            const footer = document.createElement('div');
            footer.className = 'modal-footer';
            modalHtml.appendChild(windowEl);
            modalHtml.appendChild(header);
            modalHtml.appendChild(body);
            modalHtml.appendChild(footer);
            document.body.appendChild(modalHtml);
            modalEl = modalHtml;

            modal = new BaseModal();
            modal.body = new Knot(document.body);
            modal.modal = new Knot(modalEl);
            modal.modalWindow = new Knot(windowEl);
            modal.modalHeader = new Knot(header);
            modal.modalTitle = new Knot(title);
            modal.modalBody = new Knot(body);
            modal.modalFooter = new Knot(footer);
            modal.mainContainerKnot = new Knot(
                document.querySelector('.main-container') as HTMLElement,
            );
            modal.btnClose = new Knot(closeBtn);
            modal.hasBlur = false;
        });

        it('should cycle focus forward from last to first on Tab', () => {
            modal.open();
            jest.runAllTimers();

            const btn2 = document.getElementById('btn2') as HTMLElement;
            btn2.focus();

            const tabEvent = new KeyboardEvent('keydown', {
                key: 'Tab',
                bubbles: true,
            });
            jest.spyOn(tabEvent, 'preventDefault');
            modalEl.dispatchEvent(tabEvent);
            expect(tabEvent.preventDefault).toHaveBeenCalled();
        });

        it('should cycle focus backward from first to last on Shift+Tab', () => {
            modal.open();
            jest.runAllTimers();

            const closeBtn = modalEl.querySelector('.close') as HTMLElement;
            closeBtn.focus();

            const tabEvent = new KeyboardEvent('keydown', {
                key: 'Tab',
                shiftKey: true,
                bubbles: true,
            });
            jest.spyOn(tabEvent, 'preventDefault');
            modalEl.dispatchEvent(tabEvent);
            expect(tabEvent.preventDefault).toHaveBeenCalled();
        });

        it('should ignore non-Tab keys in focus trap', () => {
            modal.open();
            jest.runAllTimers();

            const event = new KeyboardEvent('keydown', {
                key: 'Enter',
                bubbles: true,
            });
            jest.spyOn(event, 'preventDefault');
            modalEl.dispatchEvent(event);
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('should restore focus on close', () => {
            const outsideBtn = document.createElement('button');
            document.body.appendChild(outsideBtn);
            outsideBtn.focus();

            modal.open();
            jest.runAllTimers();
            modal.close();

            expect(document.activeElement).toBe(outsideBtn);
        });
    });
});
