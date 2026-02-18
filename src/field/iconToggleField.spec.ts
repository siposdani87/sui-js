import { parseInputBlock } from '../component';
import { Query } from '../core';
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
});
