import { parseInputBlock } from '../component';
import { Query } from '../core';
import { UrlField } from './urlField';

describe('UrlField', () => {
    let urlField: UrlField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-url',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        urlField = new UrlField(input, label, error, inputBlock);
    });

    it('should be instance of UrlField', () => {
        expect(urlField).toBeInstanceOf(UrlField);
    });

    it('should return field name', () => {
        expect(urlField.getName()).toBe('field.url');
    });

    it('should set and get value', () => {
        urlField.setValue('https://example.com');
        expect(urlField.getValue()).toBe('https://example.com');
    });

    it('should check disabled state', () => {
        expect(urlField.isDisabled()).toBe(false);
    });

    it('should render without error', () => {
        expect(() => urlField.render()).not.toThrow();
    });

    it('should update value on keyup event', () => {
        urlField.render();
        const inputNode = urlField.input.getNode();
        inputNode.value = 'https://test.com';
        inputNode.dispatchEvent(new Event('keyup'));
        expect(urlField.getValue()).toBe('https://test.com');
    });

    it('should update value on change event', () => {
        urlField.render();
        const inputNode = urlField.input.getNode();
        inputNode.value = 'https://changed.com';
        inputNode.dispatchEvent(new Event('change'));
        expect(urlField.getValue()).toBe('https://changed.com');
    });

    it('should render protocol prefix when data-protocol is set', () => {
        urlField.input.getNode().setAttribute('data-protocol', 'https://');
        urlField = new (urlField.constructor as any)(
            urlField.input,
            urlField.label,
            urlField.error,
            urlField.inputBlock,
        );
        urlField.render();
        const protocolSpan = urlField.inputBlock
            .getNode()
            .querySelector('span.protocol');
        expect(protocolSpan).not.toBeNull();
        expect(protocolSpan!.innerHTML).toBe('https://');
    });
});
