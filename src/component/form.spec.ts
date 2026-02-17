import { Query } from '../core';
import { Objekt } from '../core/objekt';
import { Form } from './form';

describe('Form', () => {
    let form: Form;

    beforeEach(() => {
        const knot = new Query('.template-view').getKnot();
        form = new Form(knot);
    });

    it('should be instance of Form', () => {
        expect(form).toBeInstanceOf(Form);
    });

    describe('getModel', () => {
        it('should return an object', () => {
            const model = form.getModel();
            expect(model).toBeDefined();
            expect(typeof model).toBe('object');
        });
    });

    describe('setModel', () => {
        it('should set model values', () => {
            const model = new Objekt({
                'field.text': 'new value',
            });
            form.setModel(model);
            const result = form.getModel();
            expect(result['field.text']).toBe('new value');
        });
    });

    describe('isValid/isInvalid', () => {
        it('should return boolean from isValid', () => {
            expect(typeof form.isValid()).toBe('boolean');
        });

        it('should return boolean from isInvalid', () => {
            expect(typeof form.isInvalid()).toBe('boolean');
        });

        it('should have opposite values', () => {
            expect(form.isValid()).toBe(!form.isInvalid());
        });
    });

    describe('findByModel', () => {
        it('should find field by name', () => {
            const field = form.findByModel('field.text');
            expect(field).toBeDefined();
        });

        it('should return null for non-existent field', () => {
            const field = form.findByModel('nonexistent');
            expect(field).toBeFalsy();
        });
    });

    describe('lock/unlock', () => {
        it('should lock all fields without error', () => {
            expect(() => form.lock()).not.toThrow();
        });

        it('should unlock all fields without error', () => {
            expect(() => form.unlock()).not.toThrow();
        });
    });

    describe('reset', () => {
        it('should reset form without error', () => {
            expect(() => form.reset()).not.toThrow();
        });
    });

    describe('checkValidity', () => {
        it('should check validity without error', () => {
            expect(() => form.checkValidity()).not.toThrow();
        });
    });

    describe('refresh', () => {
        it('should refresh without error', () => {
            expect(() => form.refresh()).not.toThrow();
        });
    });

    describe('event methods', () => {
        it('should have eventSubmit', () => {
            expect(typeof form.eventSubmit).toBe('function');
        });

        it('should have eventReset', () => {
            expect(typeof form.eventReset).toBe('function');
        });

        it('should have eventButton', () => {
            expect(typeof form.eventButton).toBe('function');
        });
    });
});
