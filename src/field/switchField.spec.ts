import { parseInputBlock } from '../component';
import { Query } from '../core';
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
});
