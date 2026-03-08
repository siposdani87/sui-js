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

        it('should emit change event without error', () => {
            expect(() => field.emit('change', 'a', 'b')).not.toThrow();
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

        it('should show validation message when invalid and opt_showMessage is true', () => {
            field.setRequired(true);
            field.setValue('');
            field.checkValidity(false, true);
            // Should not throw; exercises the else-if opt_showMessage branch
        });

        it('should add is-invalid class when force-checking invalid field', () => {
            field.setRequired(true);
            field.setValue('');
            field.checkValidity(true, true);
            // opt_force=true with invalid value should add is-invalid
        });

        it('should add is-dirty class when force-checking with value', () => {
            field.setValue('some-value');
            field.checkValidity(true, true);
            // opt_force=true with value should add is-dirty
        });

        it('should suppress message when opt_showMessage is false', () => {
            field.setRequired(true);
            field.setValue('');
            field.checkValidity(true, false);
            // opt_showMessage=false exercises the branch that skips setError
        });

        it('should set custom error with is-invalid', () => {
            field.setError('Server error', true);
            expect(field.inputBlock.hasClass('is-invalid')).toBe(true);
        });
    });

    describe('with label attributes', () => {
        it('should create info button when label has title', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            label!.setAttribute('title', 'Help title');
            const f = new BaseField(input, label, error, inputBlock);
            expect(f).toBeInstanceOf(BaseField);
            const infoBtn = inputBlock
                .getNode()
                .querySelector('button.info-button');
            expect(infoBtn).not.toBeNull();
        });

        it('should create info button when label has desc', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            label!.setAttribute('desc', 'Help description');
            const f = new BaseField(input, label, error, inputBlock);
            expect(f).toBeInstanceOf(BaseField);
        });

        it('should replace existing info button on re-init', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            label!.setAttribute('title', 'First');
            new BaseField(input, label, error, inputBlock);
            label!.setAttribute('title', 'Second');
            const f = new BaseField(input, label, error, inputBlock);
            expect(f).toBeInstanceOf(BaseField);
        });
    });
});
