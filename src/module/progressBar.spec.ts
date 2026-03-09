import { Confirm } from './confirm';
import { Dialog } from './dialog';
import { Http } from './http';
import { ProgressBar } from './progressBar';

describe('ProgressBar', () => {
    let progressBar: ProgressBar;
    let dialog: Dialog;
    let confirm: Confirm;

    beforeEach(() => {
        const http = new Http();
        dialog = new Dialog(http);
        confirm = new Confirm();
        progressBar = new ProgressBar(dialog, confirm);
    });

    it('should be instance of ProgressBar', () => {
        expect(progressBar).toBeInstanceOf(ProgressBar);
    });

    it('should initialize with lock false and counter 0', () => {
        expect(progressBar.options.get('lock')).toBe(false);
        expect(progressBar.options.get('counter')).toBe(0);
    });

    describe('show', () => {
        it('should add sui-progress class to container', () => {
            progressBar.show();
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(true);
        });

        it('should add sui-progress__indeterminate class to container', () => {
            progressBar.show();
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress--indeterminate')).toBe(
                true,
            );
        });

        it('should add classes to header bar', () => {
            progressBar.show();
            const node = progressBar.progressBarHeader.getNode();
            expect(node.classList.contains('sui-progress')).toBe(true);
            expect(node.classList.contains('sui-progress--indeterminate')).toBe(
                true,
            );
        });

        it('should increment counter', () => {
            progressBar.show();
            expect(progressBar.options.counter).toBe(1);
            progressBar.show();
            expect(progressBar.options.counter).toBe(2);
        });

        it('should route to dialog bar when dialog is open', () => {
            jest.spyOn(dialog, 'isOpened').mockReturnValue(true);
            progressBar.show();
            const dialogNode = progressBar.progressBarDialog.getNode();
            expect(
                dialogNode.classList.contains('sui-progress--indeterminate'),
            ).toBe(true);
            const containerNode = progressBar.progressBarContainer.getNode();
            expect(
                containerNode.classList.contains('sui-progress--indeterminate'),
            ).toBe(false);
        });

        it('should route to confirm bar when confirm is open', () => {
            jest.spyOn(confirm, 'isOpened').mockReturnValue(true);
            progressBar.show();
            const confirmNode = progressBar.progressBarConfirm.getNode();
            expect(
                confirmNode.classList.contains('sui-progress--indeterminate'),
            ).toBe(true);
        });
    });

    describe('hide', () => {
        it('should remove classes when counter reaches 0', () => {
            progressBar.show();
            progressBar.hide();
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(false);
            expect(node.classList.contains('sui-progress--indeterminate')).toBe(
                false,
            );
        });

        it('should not remove classes when counter > 0', () => {
            progressBar.show();
            progressBar.show();
            progressBar.hide();
            expect(progressBar.options.counter).toBe(1);
        });

        it('should force-hide regardless of counter', () => {
            progressBar.show();
            progressBar.show();
            progressBar.show();
            progressBar.hide(true);
            expect(progressBar.options.counter).toBe(0);
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(false);
        });

        it('should reset counter on force-hide', () => {
            progressBar.show();
            progressBar.show();
            progressBar.hide(true);
            expect(progressBar.options.counter).toBe(0);
        });
    });

    describe('lock / unlock', () => {
        it('should prevent progress display when locked', () => {
            progressBar.lock();
            progressBar.show();
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(false);
        });

        it('should allow progress display after unlock', () => {
            progressBar.lock();
            progressBar.unlock();
            progressBar.show();
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(true);
        });
    });

    describe('setProgress', () => {
        it('should set width on inner bar element', () => {
            progressBar.setProgress(75);
            const barNode = progressBar.barContainer.getNode();
            expect(barNode.style.width).toBe('75%');
        });

        it('should add sui-progress class', () => {
            progressBar.setProgress(50);
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(true);
        });
    });

    describe('setBuffer', () => {
        it('should set width on buffer bar element', () => {
            progressBar.setBuffer(90);
            const bufferNode = progressBar.bufferContainer.getNode();
            expect(bufferNode.style.width).toBe('90%');
        });

        it('should add sui-progress class', () => {
            progressBar.setBuffer(80);
            const node = progressBar.progressBarContainer.getNode();
            expect(node.classList.contains('sui-progress')).toBe(true);
        });
    });
});
