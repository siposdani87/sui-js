import { parseInputBlock } from '../component';
import { Knot, Query } from '../core';
import { XSS_PAYLOAD } from '../test-helpers';
import { SwitchField } from './switchField';

describe('SwitchField', () => {
    let switchField: SwitchField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-switch',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        switchField = new SwitchField(input, label, error, inputBlock);
    });

    it('should be instance of SwitchField', () => {
        expect(switchField).toBeInstanceOf(SwitchField);
    });

    it('should return field name', () => {
        const name = switchField.getName();
        expect(name).toContain('switch');
    });

    it('should get value', () => {
        const value = switchField.getValue();
        expect(value).toBeDefined();
    });

    it('should check disabled state', () => {
        expect(switchField.isDisabled()).toBe(false);
    });

    it('should show a server-escaped label as text', () => {
        const blockNode = document.createElement('div');
        blockNode.className = 'input-block';
        blockNode.innerHTML =
            '<label for="xss-switch"></label>' +
            '<input type="hidden" name="xss[switch]" value="false" />' +
            '<input type="checkbox" value="true" name="xss[switch]" id="xss-switch" data-type="switch" />';
        blockNode.querySelector('label')!.textContent = XSS_PAYLOAD;
        document.body.appendChild(blockNode);
        const { input, label, error } = parseInputBlock(new Knot(blockNode));
        const field = new SwitchField(input, label, error, new Knot(blockNode));
        field.render();
        const spanNode = field.spanLabel.getNode();
        expect(blockNode.querySelector('img')).toBeNull();
        expect(spanNode.textContent).toContain(XSS_PAYLOAD);
        blockNode.remove();
    });
});
