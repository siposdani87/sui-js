import { Knot } from '../core';
import { ProgressStatus } from './progressStatus';

describe('ProgressStatus', () => {
    let container: HTMLDivElement;
    let progressStatus: ProgressStatus;

    function createProgressStatusDOM(): HTMLDivElement {
        const div = document.createElement('div');
        div.className = 'test-progress-status-view';
        const ps = document.createElement('div');
        ps.className = 'progress-status';
        const icon = document.createElement('span');
        icon.className = 'icon';
        const text = document.createElement('span');
        text.className = 'text';
        ps.appendChild(icon);
        ps.appendChild(text);
        div.appendChild(ps);
        document.body.appendChild(div);
        return div;
    }

    beforeEach(() => {
        container = createProgressStatusDOM();
        const knot = new Knot(container);
        progressStatus = new ProgressStatus(knot);
    });

    afterEach(() => {
        container.remove();
    });

    it('should be instance of ProgressStatus', () => {
        expect(progressStatus).toBeInstanceOf(ProgressStatus);
    });

    it('should have default options', () => {
        expect(progressStatus.options.get('successStyle')).toBe('success');
        expect(progressStatus.options.get('infoStyle')).toBe('info');
        expect(progressStatus.options.get('warningStyle')).toBe('warning');
        expect(progressStatus.options.get('errorStyle')).toBe('error');
    });

    it('should accept custom options', () => {
        const knot = new Knot(container);
        const ps = new ProgressStatus(knot, '.progress-status', {
            successStyle: 'ok',
        });
        expect(ps.options.get('successStyle')).toBe('ok');
    });

    it('should find icon and text knots', () => {
        expect(progressStatus.iconKnot).toBeDefined();
        expect(progressStatus.textKnot).toBeDefined();
    });

    describe('setSuccess', () => {
        it('should add success class', () => {
            progressStatus.setSuccess('Done');
            const node = progressStatus.progressStatusKnot.getNode();
            expect(node.classList.contains('success')).toBe(true);
        });

        it('should set text content', () => {
            progressStatus.setSuccess('Upload complete');
            const node = progressStatus.textKnot.getNode();
            expect(node.textContent).toBe('Upload complete');
        });

        it('should set icon when provided', () => {
            progressStatus.setSuccess('Done', 'check_circle');
            const node = progressStatus.iconKnot.getNode();
            expect(node.textContent).toBe('check_circle');
        });

        it('should not change icon when not provided', () => {
            progressStatus.iconKnot.getNode().textContent = 'old';
            progressStatus.setSuccess('Done');
            expect(progressStatus.iconKnot.getNode().textContent).toBe('old');
        });
    });

    describe('setInfo', () => {
        it('should add info class', () => {
            progressStatus.setInfo('Processing');
            const node = progressStatus.progressStatusKnot.getNode();
            expect(node.classList.contains('info')).toBe(true);
        });

        it('should set text content', () => {
            progressStatus.setInfo('Loading data');
            expect(progressStatus.textKnot.getNode().textContent).toBe(
                'Loading data',
            );
        });

        it('should set icon when provided', () => {
            progressStatus.setInfo('Info', 'info');
            expect(progressStatus.iconKnot.getNode().textContent).toBe('info');
        });
    });

    describe('setWarning', () => {
        it('should add warning class', () => {
            progressStatus.setWarning('Low disk');
            const node = progressStatus.progressStatusKnot.getNode();
            expect(node.classList.contains('warning')).toBe(true);
        });

        it('should set text content', () => {
            progressStatus.setWarning('Disk space low');
            expect(progressStatus.textKnot.getNode().textContent).toBe(
                'Disk space low',
            );
        });

        it('should set icon when provided', () => {
            progressStatus.setWarning('Warning', 'warning');
            expect(progressStatus.iconKnot.getNode().textContent).toBe(
                'warning',
            );
        });
    });

    describe('setError', () => {
        it('should add error class', () => {
            progressStatus.setError('Failed');
            const node = progressStatus.progressStatusKnot.getNode();
            expect(node.classList.contains('error')).toBe(true);
        });

        it('should set text content', () => {
            progressStatus.setError('Connection failed');
            expect(progressStatus.textKnot.getNode().textContent).toBe(
                'Connection failed',
            );
        });

        it('should set icon when provided', () => {
            progressStatus.setError('Error', 'error');
            expect(progressStatus.iconKnot.getNode().textContent).toBe('error');
        });
    });

    describe('status transitions', () => {
        it('should remove previous status class when switching', () => {
            progressStatus.setSuccess('OK');
            const node = progressStatus.progressStatusKnot.getNode();
            expect(node.classList.contains('success')).toBe(true);

            progressStatus.setError('Fail');
            expect(node.classList.contains('success')).toBe(false);
            expect(node.classList.contains('error')).toBe(true);
        });

        it('should remove all status classes on each call', () => {
            progressStatus.setSuccess('a');
            progressStatus.setInfo('b');
            progressStatus.setWarning('c');
            progressStatus.setError('d');
            const node = progressStatus.progressStatusKnot.getNode();
            expect(node.classList.contains('success')).toBe(false);
            expect(node.classList.contains('info')).toBe(false);
            expect(node.classList.contains('warning')).toBe(false);
            expect(node.classList.contains('error')).toBe(true);
        });
    });
});
