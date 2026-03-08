import { parseInputBlock } from '../component';
import { Query } from '../core';
import { DateTimeField } from './dateTimeField';

describe('dateTimeField', () => {
    let field: DateTimeField;
    let inputBlock: ReturnType<typeof Query.prototype.getKnot>;

    beforeEach(() => {
        inputBlock = new Query<HTMLElement>(
            '.input-block.field-datetime',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        field = new DateTimeField(input, label, error, inputBlock);
    });

    it('should be instance of DateTimeField', () => {
        expect(field).toBeInstanceOf(DateTimeField);
    });

    it('should have datetime container', () => {
        expect(field.datetimeContainer).toBeDefined();
    });

    it('should have datetime input', () => {
        expect(field.datetimeInput).toBeDefined();
    });

    it('should have popup', () => {
        expect(field.popup).toBeDefined();
    });

    describe('render', () => {
        it('should render without error', () => {
            expect(() => field.render()).not.toThrow();
        });

        it('should add field-label class to label', () => {
            field.render();
            expect(field.label.hasClass('field-label')).toBe(true);
        });
    });

    describe('setValue', () => {
        it('should set and get value', () => {
            field.render();
            field.setValue('2024-01-15');
            expect(field.getValue()).toBe('2024-01-15');
        });

        it('should create tag when setting non-empty value', () => {
            field.render();
            field.setValue('2024-06-01');
            const tags = field.datetimeInput
                .getNode()
                .querySelectorAll('.field-tag');
            expect(tags.length).toBe(1);
        });

        it('should clear tag when setting empty value', () => {
            field.render();
            field.setValue('2024-06-01');
            field.setValue('');
            const tags = field.datetimeInput
                .getNode()
                .querySelectorAll('.field-tag');
            expect(tags.length).toBe(0);
        });
    });

    describe('refresh', () => {
        it('should add is-disabled when disabled', () => {
            field.render();
            field.setDisabled(true);
            field.refresh();
            expect(inputBlock.hasClass('is-disabled')).toBe(true);
        });

        it('should remove is-disabled when enabled', () => {
            field.render();
            field.setDisabled(true);
            field.refresh();
            field.setDisabled(false);
            field.refresh();
            expect(inputBlock.hasClass('is-disabled')).toBe(false);
        });
    });

    describe('click interaction', () => {
        it('should not open popup when disabled', () => {
            field.render();
            field.setDisabled(true);
            field.datetimeInput.getNode().click();
            expect(field.datetimeInput.hasClass('active')).toBe(false);
        });

        it('should not add active class when disabled and clicked via trigger', () => {
            field.render();
            field.setDisabled(true);
            field.datetimeInput.trigger('click');
            expect(field.datetimeInput.hasClass('active')).toBe(false);
        });
    });
});
