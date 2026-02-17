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
});
