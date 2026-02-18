import { Query, Objekt } from './core';
import { Form } from './component/form';

describe('Form-Field Integration', () => {
    let form: Form;

    beforeEach(() => {
        const knot = new Query('.template-view').getKnot();
        form = new Form(knot);
    });

    it('should initialize form with fields from DOM', () => {
        expect(form).toBeInstanceOf(Form);
        const model = form.getModel();
        expect(model).toBeDefined();
    });

    it('should collect model as object with field values', () => {
        const model = form.getModel();
        expect(typeof model).toBe('object');
    });

    it('should set model values and reflect them in fields', () => {
        const model = new Objekt({
            'field.text': 'integration test',
        });
        form.setModel(model);
        const result = form.getModel();
        expect(result['field.text']).toBe('integration test');
    });

    it('should find field by model name', () => {
        const field = form.findByModel('field.text');
        expect(field).toBeDefined();
    });

    it('should return falsy for non-existent field', () => {
        const field = form.findByModel('nonexistent.field');
        expect(field).toBeFalsy();
    });

    it('should report validity consistently', () => {
        const isValid = form.isValid();
        const isInvalid = form.isInvalid();
        expect(isValid).toBe(!isInvalid);
    });

    it('should lock and unlock all fields without error', () => {
        expect(() => {
            form.lock();
            form.unlock();
        }).not.toThrow();
    });

    it('should reset form and maintain structure', () => {
        const model = new Objekt({
            'field.text': 'to be reset',
        });
        form.setModel(model);
        expect(() => form.reset()).not.toThrow();
    });

    it('should check validity without error', () => {
        expect(() => form.checkValidity()).not.toThrow();
    });

    it('should refresh all fields without error', () => {
        expect(() => form.refresh()).not.toThrow();
    });
});
