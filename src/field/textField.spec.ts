import { parseInputBlock } from '../component';
import { Query } from '../core';
import { TextField } from './textField';

describe('TextField', () => {
    it('should be instance of TextField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-text',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textField = new TextField(input, label, error, inputBlock);
        expect(textField).toBeInstanceOf(TextField);
    });

    it('should be instance of TextField, when type tel', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-tel',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textField = new TextField(input, label, error, inputBlock);
        expect(textField).toBeInstanceOf(TextField);
    });

    it('should be instance of TextField, when type email', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-email',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textField = new TextField(input, label, error, inputBlock);
        expect(textField).toBeInstanceOf(TextField);
    });

    describe('getValue', () => {
        it('should return current value', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const textField = new TextField(input, label, error, inputBlock);
            expect(textField.getValue()).toBe('text');
        });

        it('should return email value', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-email',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const textField = new TextField(input, label, error, inputBlock);
            expect(textField.getValue()).toBe('example@email.com');
        });
    });

    describe('setValue', () => {
        it('should update value', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const textField = new TextField(input, label, error, inputBlock);
            textField.setValue('new text');
            expect(textField.getValue()).toBe('new text');
        });
    });

    describe('render', () => {
        it('should add MDL classes', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const textField = new TextField(input, label, error, inputBlock);
            textField.render();
            expect(inputBlock.hasClass('mdl-textfield')).toBe(true);
            expect(input.hasClass('mdl-textfield__input')).toBe(true);
        });
    });

    describe('name', () => {
        it('should return field name', () => {
            const inputBlock = new Query<HTMLElement>(
                '.input-block.field-text',
            ).getKnot();
            const { input, label, error } = parseInputBlock(inputBlock);
            const textField = new TextField(input, label, error, inputBlock);
            expect(textField.getName()).toBe('field.text');
        });
    });
});
