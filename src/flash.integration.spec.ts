import { Flash } from './module/flash';
import { Knot, Query } from './core';

describe('Flash Integration', () => {
    let flash: Flash;
    let container: Knot;

    beforeEach(() => {
        flash = new Flash();
        container = new Query('#flashes').getKnot();
    });

    afterEach(() => {
        container.getNode().innerHTML = '';
    });

    it('should initialize with default container', () => {
        expect(flash).toBeInstanceOf(Flash);
        expect(container.isEmpty()).toBe(false);
    });

    it('should add success flash to DOM', () => {
        const flashKnot = flash.addSuccess('Operation succeeded');
        expect(flashKnot).toBeDefined();
        expect(flashKnot.hasClass('success')).toBe(true);
    });

    it('should add error flash to DOM', () => {
        const flashKnot = flash.addError('Something failed');
        expect(flashKnot).toBeDefined();
        expect(flashKnot.hasClass('error')).toBe(true);
    });

    it('should add info flash to DOM', () => {
        const flashKnot = flash.addInfo('FYI message');
        expect(flashKnot.hasClass('info')).toBe(true);
    });

    it('should add warning flash to DOM', () => {
        const flashKnot = flash.addWarning('Be careful');
        expect(flashKnot.hasClass('warning')).toBe(true);
    });

    it('should add default flash to DOM', () => {
        const flashKnot = flash.addDefault('Default message');
        expect(flashKnot.hasClass('default')).toBe(true);
    });

    it('should add flash via addMessage with object', () => {
        const flashKnot = flash.addMessage({
            type: 'success',
            content: 'Message content',
        });
        expect(flashKnot).toBeDefined();
        expect(flashKnot.hasClass('success')).toBe(true);
    });

    it('should return null from addMessage with non-object', () => {
        const result = flash.addMessage('not an object' as any);
        expect(result).toBeNull();
    });

    it('should add close button for error type', () => {
        const flashKnot = flash.addError('Error with close');
        const buttons = flashKnot.getNode().querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('should add multiple flashes to container', () => {
        flash.addSuccess('First');
        flash.addError('Second');
        flash.addWarning('Third');
        const children = container.getNode().querySelectorAll('.flash');
        expect(children.length).toBe(3);
    });

    it('should remove flash by reference', () => {
        const flashKnot = flash.addSuccess('To be removed', Infinity);
        const countBefore = container
            .getNode()
            .querySelectorAll('.flash').length;
        flash.remove(flashKnot);
        const countAfter = container
            .getNode()
            .querySelectorAll('.flash').length;
        expect(countAfter).toBe(countBefore - 1);
    });

    it('should remove flash by ID', () => {
        flash.addSuccess('Identified', Infinity, null, 'my-flash');
        expect(
            container.getNode().querySelector('[data-id="my-flash"]'),
        ).not.toBeNull();

        flash.removeById('my-flash');
        expect(
            container.getNode().querySelector('[data-id="my-flash"]'),
        ).toBeNull();
    });

    it('should replace flash with same ID', () => {
        flash.addSuccess('First version', Infinity, null, 'replace-me');
        flash.addSuccess('Second version', Infinity, null, 'replace-me');
        const elements = container
            .getNode()
            .querySelectorAll('[data-id="replace-me"]');
        expect(elements.length).toBe(1);
    });

    it('should call close callback on remove', () => {
        const callback = jest.fn();
        const flashKnot = flash.addSuccess('With callback', Infinity, callback);
        flash.remove(flashKnot, callback);
        expect(callback).toHaveBeenCalled();
    });
});
