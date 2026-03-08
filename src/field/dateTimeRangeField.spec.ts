import { parseInputBlock } from '../component';
import { Query } from '../core';
import { DateTimeRangeField } from './dateTimeRangeField';

describe('DateTimeRangeField', () => {
    let startField: DateTimeRangeField;
    let endField: DateTimeRangeField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-datetime',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        startField = new DateTimeRangeField(
            input,
            label!,
            error!,
            inputBlock,
            true,
        );
    });

    it('should be instance of DateTimeRangeField', () => {
        expect(startField).toBeInstanceOf(DateTimeRangeField);
    });

    it('should create an end field as well', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-datetime',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        endField = new DateTimeRangeField(
            input,
            label!,
            error!,
            inputBlock,
            false,
        );
        expect(endField).toBeInstanceOf(DateTimeRangeField);
    });

    describe('render', () => {
        it('should render start field without error', () => {
            expect(() => startField.render()).not.toThrow();
        });

        it('should render end field without error', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-datetime',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            endField = new DateTimeRangeField(
                input,
                label!,
                error!,
                inputBlock,
                false,
            );
            expect(() => endField.render()).not.toThrow();
        });
    });

    describe('refresh', () => {
        it('should execute refresh without error', () => {
            startField.render();
            expect(() => startField.refresh()).not.toThrow();
        });
    });

    describe('setValue / getValue', () => {
        it('should set and get value', () => {
            startField.render();
            startField.setValue('2024-01-15T10:30:00Z');
            const value = startField.getValue();
            expect(value).toBeDefined();
        });

        it('should handle empty value', () => {
            startField.render();
            startField.setValue('');
            expect(startField.getValue()).toBe('');
        });
    });

    describe('_setTag', () => {
        it('should create a tag for non-empty value', () => {
            startField.render();
            (startField as any)._setTag('2024-01-15');
            const container = (startField as any).datetimeInput;
            if (container) {
                expect(container.getNode().childNodes.length).toBeGreaterThan(
                    0,
                );
            }
        });

        it('should clear tag for empty value', () => {
            startField.render();
            (startField as any)._setTag('');
        });
    });

    describe('_onClick', () => {
        it('should not throw when called', () => {
            startField.render();
            expect(() => (startField as any)._onClick()).not.toThrow();
        });

        it('should add active class and toggle popup when enabled', () => {
            startField.render();
            startField.setDisabled(false);
            startField.datetimeInput.getNode().click();
            expect(startField.datetimeInput.hasClass('active')).toBe(true);
        });

        it('should not add active class when disabled', () => {
            startField.render();
            startField.setDisabled(true);
            startField.datetimeInput.getNode().click();
            expect(startField.datetimeInput.hasClass('active')).toBe(false);
        });
    });

    describe('datetime click event', () => {
        it('should update value when datetime emits click', () => {
            startField.render();
            startField.datetime.emit('click', '2024-03-20');
            expect(startField.getValue()).toBe('2024-03-20');
        });
    });

    describe('popup close event', () => {
        it('should remove active class when popup emits close', () => {
            startField.render();
            startField.datetimeInput.addClass('active');
            startField.popup.emit('close');
            expect(startField.datetimeInput.hasClass('active')).toBe(false);
        });
    });

    describe('refresh', () => {
        it('should add is-disabled when disabled', () => {
            startField.render();
            startField.setDisabled(true);
            startField.refresh();
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-datetime',
            ).getKnot();
            expect(inputBlock.hasClass('is-disabled')).toBe(true);
        });

        it('should remove is-disabled when enabled', () => {
            startField.render();
            startField.setDisabled(true);
            startField.refresh();
            startField.setDisabled(false);
            startField.refresh();
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-datetime',
            ).getKnot();
            expect(inputBlock.hasClass('is-disabled')).toBe(false);
        });
    });

    describe('close button in tag', () => {
        it('should clear value when close button is clicked', () => {
            startField.render();
            startField.setDisabled(false);
            startField.setValue('2024-06-01');
            const closeBtn = startField.datetimeInput
                .getNode()
                .querySelector('.close') as HTMLElement;
            expect(closeBtn).not.toBeNull();
            closeBtn.click();
            expect(startField.getValue()).toBe('');
        });

        it('should not show close button when disabled', () => {
            startField.render();
            startField.setDisabled(true);
            startField.setValue('2024-06-01');
            const closeBtn = startField.datetimeInput
                .getNode()
                .querySelector('.close');
            expect(closeBtn).toBeNull();
        });
    });

    describe('input change event', () => {
        it('should trigger modelChange on input change', () => {
            startField.render();
            const spy = jest.spyOn(startField, 'modelChange');
            startField.input.setAttribute('value', '2024-09-01');
            startField.input.trigger('change');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('end field render', () => {
        it('should add date_range icon to action container for end field', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-datetime',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const endField = new DateTimeRangeField(
                input,
                label!,
                error!,
                inputBlock,
                false,
            );
            endField.render();
            const icon = endField.actionContainerKnot
                .getNode()
                .querySelector('.expander');
            expect(icon).not.toBeNull();
            expect(icon?.textContent).toBe('date_range');
        });

        it('should add remove icon after datetime input for start field', () => {
            startField.render();
            const container = startField.datetimeInput.getNode().parentElement;
            const icon = container?.querySelector('.expander');
            expect(icon).not.toBeNull();
            expect(icon?.textContent).toBe('remove');
        });
    });
});
