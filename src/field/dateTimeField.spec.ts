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

        it('should add active class and toggle popup when enabled', () => {
            field.render();
            field.setDisabled(false);
            field.datetimeInput.getNode().click();
            expect(field.datetimeInput.hasClass('active')).toBe(true);
        });
    });

    describe('datetime click event', () => {
        it('should update value when datetime emits click', () => {
            field.render();
            field.datetime.emit('click', '2024-03-20');
            expect(field.getValue()).toBe('2024-03-20');
        });
    });

    describe('popup close event', () => {
        it('should remove active class when popup emits close', () => {
            field.render();
            field.datetimeInput.addClass('active');
            field.popup.emit('close');
            expect(field.datetimeInput.hasClass('active')).toBe(false);
        });
    });

    describe('close button in tag', () => {
        it('should clear value when close button is clicked', () => {
            field.render();
            field.setDisabled(false);
            field.setValue('2024-06-01');
            const closeBtn = field.datetimeInput
                .getNode()
                .querySelector('.close') as HTMLElement;
            expect(closeBtn).not.toBeNull();
            closeBtn.click();
            expect(field.getValue()).toBe('');
        });

        it('should not show close button when disabled', () => {
            field.render();
            field.setDisabled(true);
            field.setValue('2024-06-01');
            const closeBtn = field.datetimeInput
                .getNode()
                .querySelector('.close');
            expect(closeBtn).toBeNull();
        });
    });

    describe('input change event', () => {
        it('should trigger modelChange on input change', () => {
            field.render();
            const spy = jest.spyOn(field, 'modelChange');
            field.input.setAttribute('value', '2024-09-01');
            field.input.trigger('change');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('initialization with empty value', () => {
        it('should not set tag when input has no value', () => {
            inputBlock = new Query<HTMLElement>(
                '.input-block.field-datetime',
            ).getKnot();
            const inputEl = inputBlock
                .getNode()
                .querySelector('input') as HTMLInputElement;
            inputEl.value = '';
            inputEl.setAttribute('value', '');
            const { input, label, error } = parseInputBlock(inputBlock);
            const emptyField = new DateTimeField(
                input,
                label,
                error,
                inputBlock,
            );
            const tags = emptyField.datetimeInput
                .getNode()
                .querySelectorAll('.field-tag');
            expect(tags.length).toBe(0);
        });
    });
});
