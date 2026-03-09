import { parseInputBlock } from '../component';
import { Query } from '../core';
import { NumberField } from './numberField';

describe('NumberField', () => {
    let numberField: NumberField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-number',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        numberField = new NumberField(input, label, error, inputBlock);
    });

    it('should be instance of NumberField', () => {
        expect(numberField).toBeInstanceOf(NumberField);
    });

    it('should return field name', () => {
        expect(numberField.getName()).toBe('field.number');
    });

    it('should set and get numeric value', () => {
        numberField.setValue(42);
        expect(numberField.getValue()).toBe(42);
    });

    it('should render without error', () => {
        expect(() => numberField.render()).not.toThrow();
    });

    it('should check disabled state', () => {
        expect(numberField.isDisabled()).toBe(false);
    });

    it('should set disabled', () => {
        numberField.setDisabled(true);
        expect(numberField.isDisabled()).toBe(true);
        numberField.setDisabled(false);
    });

    it('should update value on keyup event', () => {
        numberField.render();
        const inputNode = numberField.input.getNode();
        inputNode.value = '5';
        inputNode.dispatchEvent(new Event('keyup'));
        expect(numberField.getValue()).toBe(5);
    });

    it('should update value on change event', () => {
        numberField.render();
        const inputNode = numberField.input.getNode();
        inputNode.value = '10';
        inputNode.dispatchEvent(new Event('change'));
        expect(numberField.getValue()).toBe(10);
    });

    it('should increment value on up button click', () => {
        numberField.render();
        numberField.setValue(5);
        const upButton = numberField.inputBlock
            .getNode()
            .querySelector('button.up-button') as HTMLButtonElement;
        expect(upButton).not.toBeNull();
        upButton.click();
        expect(numberField.getValue()).toBe(6);
    });

    it('should decrement value on down button click', () => {
        numberField.render();
        numberField.setValue(5);
        const downButton = numberField.inputBlock
            .getNode()
            .querySelector('button.down-button') as HTMLButtonElement;
        expect(downButton).not.toBeNull();
        downButton.click();
        expect(numberField.getValue()).toBe(4);
    });

    it('should clamp value to min on keyup', () => {
        numberField.render();
        numberField.input.getNode().setAttribute('min', '0');
        const inputNode = numberField.input.getNode();
        inputNode.value = '-5';
        inputNode.dispatchEvent(new Event('keyup'));
        expect(numberField.getValue()).toBe(0);
    });

    it('should clamp value to max on keyup', () => {
        numberField.render();
        numberField.input.getNode().setAttribute('max', '10');
        const inputNode = numberField.input.getNode();
        inputNode.value = '20';
        inputNode.dispatchEvent(new Event('keyup'));
        expect(numberField.getValue()).toBe(10);
    });

    it('should use step attribute for increment', () => {
        numberField.render();
        numberField.input.getNode().setAttribute('step', '5');
        numberField.setValue(0);
        const upButton = numberField.inputBlock
            .getNode()
            .querySelector('button.up-button') as HTMLButtonElement;
        upButton.click();
        expect(numberField.getValue()).toBe(5);
    });
});
