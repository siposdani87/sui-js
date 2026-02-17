import { Query } from '../core';
import { HiddenField } from './hiddenField';

describe('HiddenField', () => {
    let hiddenField: HiddenField;

    beforeEach(() => {
        const hiddenInput = new Query<HTMLInputElement>(
            '#field-hidden',
        ).getKnot();
        hiddenField = new HiddenField(hiddenInput);
    });

    it('should be instance of HiddenField', () => {
        expect(hiddenField).toBeInstanceOf(HiddenField);
    });

    it('should return value', () => {
        expect(hiddenField.getValue()).toBe(1);
    });

    it('should set value', () => {
        hiddenField.setValue('new-val');
        expect(hiddenField.getValue()).toBe('new-val');
    });

    it('should return field name', () => {
        expect(hiddenField.getName()).toBe('field.hidden');
    });

    it('should render without error', () => {
        expect(() => hiddenField.render()).not.toThrow();
    });

    it('should refresh without error', () => {
        expect(() => hiddenField.refresh()).not.toThrow();
    });
});
