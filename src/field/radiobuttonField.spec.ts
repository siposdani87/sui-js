import { Form, parseInputBlock } from '../component';
import { Knot, Query } from '../core';
import { RadiobuttonField } from './radiobuttonField';
import { XSS_PAYLOAD } from '../test-helpers';

describe('RadiobuttonField', () => {
    let radiobuttonField: RadiobuttonField;

    beforeEach(() => {
        const knot = new Query('.template-view').getKnot();
        const form = new Form(knot);
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-radio',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        radiobuttonField = new RadiobuttonField(
            input,
            label!,
            error!,
            inputBlock,
            form,
        );
    });

    it('should be instance of RadiobuttonField', () => {
        expect(radiobuttonField).toBeInstanceOf(RadiobuttonField);
    });

    it('should return field name', () => {
        expect(radiobuttonField.getName()).toBe('field.radio');
    });

    it('should get value', () => {
        const value = radiobuttonField.getValue();
        expect(value).toBeDefined();
    });

    it('should check disabled state', () => {
        expect(radiobuttonField.isDisabled()).toBe(false);
    });

    it('should show a data-label attribute as text', () => {
        radiobuttonField.render();
        radiobuttonField.label.setAttribute('data-label', XSS_PAYLOAD);
        radiobuttonField.refresh();
        const dataLabelNode = radiobuttonField.dataLabelKnot.getNode();
        expect(dataLabelNode.querySelector('img')).toBeNull();
        expect(dataLabelNode.textContent).toBe(XSS_PAYLOAD);
    });

    it('should show a setLabel label as text', () => {
        radiobuttonField.spanLabel = new Knot('span');
        radiobuttonField.inputBlock
            .getNode()
            .appendChild(radiobuttonField.spanLabel.getNode());
        radiobuttonField.setLabel(XSS_PAYLOAD);
        const spanNode = radiobuttonField.spanLabel.getNode();
        expect(spanNode.querySelector('img')).toBeNull();
        expect(spanNode.textContent).toContain(XSS_PAYLOAD);
    });
});
