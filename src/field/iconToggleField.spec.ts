import { parseInputBlock } from '../component';
import { Knot, Query } from '../core';
import { XSS_PAYLOAD } from '../test-helpers';
import { IconToggleField } from './iconToggleField';

describe('IconToggleField', () => {
    let iconToggleField: IconToggleField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-icon-toggle',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        iconToggleField = new IconToggleField(input, label, error, inputBlock);
    });

    it('should be instance of IconToggleField', () => {
        expect(iconToggleField).toBeInstanceOf(IconToggleField);
    });

    it('should return field name', () => {
        const name = iconToggleField.getName();
        expect(name).toContain('icon-toggle');
    });

    it('should get value', () => {
        const value = iconToggleField.getValue();
        expect(value).toBeDefined();
    });

    it('should check disabled state', () => {
        expect(iconToggleField.isDisabled()).toBe(false);
    });

    it('should show a server-escaped label as text', () => {
        const blockNode = document.createElement('div');
        blockNode.className = 'input-block';
        blockNode.innerHTML =
            '<label for="xss-icon-toggle"></label>' +
            '<input type="hidden" name="xss[icon-toggle]" value="false" />' +
            '<input type="checkbox" value="true" name="xss[icon-toggle]" id="xss-icon-toggle" data-type="icon-toggle" data-checked="mood" data-unchecked="mood_bad" />';
        blockNode.querySelector('label')!.textContent = XSS_PAYLOAD;
        document.body.appendChild(blockNode);
        const { input, label, error } = parseInputBlock(new Knot(blockNode));
        const field = new IconToggleField(
            input,
            label,
            error,
            new Knot(blockNode),
        );
        field.render();
        const spanNode = field.spanLabel.getNode();
        expect(blockNode.querySelector('img')).toBeNull();
        expect(spanNode.textContent).toContain(XSS_PAYLOAD);
        blockNode.remove();
    });
});
