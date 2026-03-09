import { parseInputBlock } from '../component';
import { Knot, Query } from '../core';
import { BaseCheckboxField } from './baseCheckboxField';

describe('baseCheckboxField', () => {
    let field: BaseCheckboxField;
    let inputBlock: Knot;

    beforeEach(() => {
        inputBlock = new Query<HTMLElement>(
            '.input-block.field-checkbox',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        field = new BaseCheckboxField(input, label, error, inputBlock);
        // dataLabelKnot is needed by refresh() which is called by MutationObserver
        field.dataLabelKnot = new Knot('span');
        inputBlock.getNode().appendChild(field.dataLabelKnot.getNode());
    });

    it('should be instance of BaseCheckboxField', () => {
        expect(field).toBeInstanceOf(BaseCheckboxField);
    });

    describe('getValue', () => {
        it('should return input value when checked', () => {
            field.input.getNode().checked = true;
            expect(field.getValue()).toBe(true);
        });

        it('should return hidden input value when unchecked', () => {
            field.input.getNode().checked = false;
            expect(field.getValue()).toBe(false);
        });
    });

    describe('setValue', () => {
        it('should check when value matches input value', () => {
            field.setValue(true);
            expect(field.input.getNode().checked).toBe(true);
        });

        it('should uncheck when value does not match', () => {
            field.setValue(false);
            expect(field.input.getNode().checked).toBe(false);
        });
    });

    describe('setDisabled', () => {
        it('should disable the field', () => {
            field.setDisabled(true);
            expect(field.input.getNode().disabled).toBe(true);
            expect(field.label.hasClass('is-disabled')).toBe(true);
            expect(inputBlock.hasClass('is-disabled')).toBe(true);
        });

        it('should enable the field', () => {
            field.setDisabled(true);
            field.setDisabled(false);
            expect(field.input.getNode().disabled).toBe(false);
            expect(field.label.hasClass('is-disabled')).toBe(false);
            expect(inputBlock.hasClass('is-disabled')).toBe(false);
        });
    });

    describe('setLabel', () => {
        it('should set label on spanLabel when it exists', () => {
            field.spanLabel = new Knot('span');
            field.spanLabel.setHtml('Old');
            inputBlock.getNode().appendChild(field.spanLabel.getNode());
            field.setLabel('New Label');
            expect(field.spanLabel.getHtml(true)).toContain('New Label');
        });

        it('should not throw when spanLabel is undefined', () => {
            field.spanLabel = undefined as any;
            expect(() => field.setLabel('Test')).not.toThrow();
        });
    });

    describe('refresh', () => {
        it('should set data label text when data-label attribute exists', () => {
            field.label.setAttribute('data-label', 'Data Label');
            field.refresh();
            expect(field.dataLabelKnot.getHtml(true)).toContain('Data Label');
        });

        it('should clear data label when no data-label attribute', () => {
            field.label.removeAttribute('data-label');
            field.dataLabelKnot.setHtml('old');
            field.refresh();
            expect(field.dataLabelKnot.getHtml(true)).toBe('');
        });

        it('should add is-disabled class when field is disabled', () => {
            field.setDisabled(true);
            field.refresh();
            expect(field.label.hasClass('is-disabled')).toBe(true);
            expect(inputBlock.hasClass('is-disabled')).toBe(true);
        });
    });

    describe('change event', () => {
        it('should trigger modelChange on change', () => {
            const spy = jest.spyOn(field, 'modelChange');
            field.input
                .getNode()
                .dispatchEvent(new Event('change', { bubbles: true }));
            expect(spy).toHaveBeenCalled();
        });
    });
});
