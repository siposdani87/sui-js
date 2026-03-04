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
            label,
            error,
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
            label,
            error,
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
                label,
                error,
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
    });
});
