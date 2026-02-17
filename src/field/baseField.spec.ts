import { parseInputBlock } from '../component';
import { Query } from '../core';
import { BaseField } from './baseField';

describe('BaseField', () => {
    describe('with hidden input', () => {
        let field: BaseField<HTMLInputElement>;

        beforeEach(() => {
            const input = new Query<HTMLInputElement>(
                '#field-hidden',
            ).getKnot();
            field = new BaseField(input);
        });

        it('should be instance of BaseField', () => {
            expect(field).toBeInstanceOf(BaseField);
        });

        it('should return field name', () => {
            expect(field.getName()).toBe('field.hidden');
        });

        it('should return value', () => {
            expect(field.getValue()).toBe(1);
        });

        it('should set value', () => {
            field.setValue('new-value');
            expect(field.getValue()).toBe('new-value');
        });

        it('should check validity', () => {
            expect(typeof field.isValid()).toBe('boolean');
        });

        it('should call eventChange without error', () => {
            expect(() => field.eventChange('a', 'b')).not.toThrow();
        });

        it('should call render without error', () => {
            expect(() => field.render()).not.toThrow();
        });

        it('should call refresh without error', () => {
            expect(() => field.refresh()).not.toThrow();
        });

        it('should call modelChange without error', () => {
            expect(() => field.modelChange('test')).not.toThrow();
        });

        it('should return undefined from getPreviousValue', () => {
            expect(field.getPreviousValue()).toBeUndefined();
        });

        it('should check existsInput', () => {
            expect(field.existsInput()).toBe(true);
        });
    });

    describe('with text input block', () => {
        let field: BaseField<HTMLInputElement>;

        beforeEach(() => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            field = new BaseField(input, label, error, inputBlock);
        });

        it('should return field name', () => {
            expect(field.getName()).toBe('field.text');
        });

        it('should get value', () => {
            expect(field.getValue()).toBe('text');
        });

        it('should set value', () => {
            field.setValue('updated');
            expect(field.getValue()).toBe('updated');
        });

        it('should set and clear error', () => {
            field.setError('Required field', true);
            field.setError('');
        });

        it('should check required state', () => {
            expect(typeof field.isRequired()).toBe('boolean');
        });

        it('should set required state', () => {
            field.setRequired(true);
            expect(field.isRequired()).toBe(true);
            field.setRequired(false);
            expect(field.isRequired()).toBe(false);
        });

        it('should check disabled state', () => {
            expect(field.isDisabled()).toBe(false);
            expect(field.isEnabled()).toBe(true);
        });

        it('should set disabled state', () => {
            field.setDisabled(true);
            expect(field.isDisabled()).toBe(true);
            expect(field.isEnabled()).toBe(false);
            field.setDisabled(false);
            expect(field.isDisabled()).toBe(false);
        });

        it('should check visibility', () => {
            expect(field.isVisible()).toBe(true);
        });

        it('should hide and show', () => {
            field.hide();
            expect(field.isVisible()).toBe(false);
            field.show();
            expect(field.isVisible()).toBe(true);
        });

        it('should set visibility', () => {
            field.setVisibility(false);
            expect(field.isVisible()).toBe(false);
            field.setVisibility(true);
            expect(field.isVisible()).toBe(true);
        });

        it('should set label', () => {
            field.setLabel('New Label');
            expect(field.label.getHtml()).toContain('New Label');
        });

        it('should check validity', () => {
            field.checkValidity();
        });

        it('should force check validity', () => {
            field.checkValidity(true, true);
        });

        it('should check exists', () => {
            expect(field.exists()).toBe(true);
            expect(field.existsInputBlock()).toBe(true);
        });

        it('should get attribute via get method', () => {
            const name = field.get('name');
            expect(name).toBeDefined();
        });
    });
});
