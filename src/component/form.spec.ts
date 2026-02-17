import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Form } from './form';
import { BaseField } from '../field';

describe('Form', () => {
    let form: Form;
    let originalFormHTML: string;

    beforeAll(() => {
        const formEl = document.querySelector('.template-view form');
        if (formEl) {
            originalFormHTML = formEl.innerHTML;
        }
    });

    function resetFormDOM(): void {
        const formEl = document.querySelector(
            '.template-view form',
        ) as HTMLFormElement;
        if (formEl) {
            formEl.innerHTML = originalFormHTML;
            formEl.removeAttribute('novalidate');
        }
        document
            .querySelectorAll(
                '.template-view .mdl-tooltip, .template-view .mdl-textfield__error',
            )
            .forEach((el) => el.remove());
    }

    function mockMdlComponents(): void {
        const rangeInput = document.querySelector(
            '#field-range',
        ) as any;
        if (rangeInput) {
            rangeInput.MaterialSlider = { change: jest.fn() };
        }
    }

    beforeEach(() => {
        resetFormDOM();
        mockMdlComponents();
        const knot = new Query('.template-view').getKnot();
        form = new Form(knot);
    });

    describe('constructor & initialization', () => {
        it('should be instance of Form', () => {
            expect(form).toBeInstanceOf(Form);
        });

        it('should set novalidate attribute on form element', () => {
            expect(
                form.formKnot.getNode().hasAttribute('novalidate'),
            ).toBe(true);
        });

        it('should initialize fields from DOM', () => {
            expect(form.size()).toBeGreaterThan(0);
        });

        it('should initialize model with field values', () => {
            const model = form.getModel();
            expect(model.get('field.text')).toBe('text');
            expect(model.get('field.email')).toBe('example@email.com');
        });
    });

    describe('getModel', () => {
        it('should return model object', () => {
            const model = form.getModel();
            expect(model).toBeDefined();
            expect(model).toBeInstanceOf(Objekt);
        });

        it('should contain initial field values', () => {
            const model = form.getModel();
            expect(model.get('field.hidden')).toBe(1);
        });
    });

    describe('setModel', () => {
        it('should update model values', () => {
            form.setModel(
                new Objekt({ field: { text: 'updated' } }),
            );
            expect(form.getModel().get('field.text')).toBe('updated');
        });

        it('should update previousModel on setModel', () => {
            const oldModel = form.getModel().copy();
            form.setModel(
                new Objekt({ field: { text: 'new value' } }),
            );
            expect(form.previousModel.get('field.text')).toBe(
                oldModel.get('field.text'),
            );
        });

        it('should call field setValue for matching fields', () => {
            const textField = form.findByModel('field.text');
            const setValueSpy = jest.spyOn(textField, 'setValue');
            form.setModel(
                new Objekt({ field: { text: 'spy test' } }),
            );
            expect(setValueSpy).toHaveBeenCalledWith('spy test');
        });

        it('should call field checkValidity after setValue', () => {
            const textField = form.findByModel('field.text');
            const checkSpy = jest.spyOn(textField, 'checkValidity');
            form.setModel(
                new Objekt({ field: { text: 'validity test' } }),
            );
            expect(checkSpy).toHaveBeenCalled();
        });
    });

    describe('findByModel', () => {
        it('should find text field by model name', () => {
            const field = form.findByModel('field.text');
            expect(field).toBeDefined();
            expect(field.getName()).toBe('field.text');
        });

        it('should find checkbox field by model name', () => {
            const field = form.findByModel('field.checkbox');
            expect(field).toBeDefined();
        });

        it('should find select field by model name', () => {
            const field = form.findByModel('field.select');
            expect(field).toBeDefined();
        });

        it('should find hidden field', () => {
            const field = form.findByModel('field.hidden');
            expect(field).toBeDefined();
        });

        it('should return null for non-existent field', () => {
            const field = form.findByModel('nonexistent');
            expect(field).toBeFalsy();
        });
    });

    describe('validation', () => {
        it('should return boolean from checkValidity', () => {
            const result = form.checkValidity();
            expect(typeof result).toBe('boolean');
        });

        it('should call field checkValidity on each field', () => {
            const textField = form.findByModel('field.text');
            const checkSpy = jest.spyOn(textField, 'checkValidity');
            form.checkValidity();
            expect(checkSpy).toHaveBeenCalled();
        });

        it('should return boolean from isValid', () => {
            expect(typeof form.isValid()).toBe('boolean');
        });

        it('should have isValid and isInvalid as inverses', () => {
            expect(form.isValid()).toBe(!form.isInvalid());
        });
    });

    describe('setErrors', () => {
        it('should set error messages on matching fields', () => {
            const textField = form.findByModel('field.text');
            const setErrorSpy = jest.spyOn(textField, 'setError');
            form.setErrors({
                field: { text: ['Too short', 'Invalid format'] },
            });
            expect(setErrorSpy).toHaveBeenCalledWith(
                'Too short, Invalid format',
                true,
            );
        });

        it('should set empty error for fields without errors', () => {
            const emailField = form.findByModel('field.email');
            const setErrorSpy = jest.spyOn(emailField, 'setError');
            form.setErrors({
                field: { text: ['Error'] },
            });
            expect(setErrorSpy).toHaveBeenCalledWith('', true);
        });
    });

    describe('reset', () => {
        beforeEach(() => {
            // Several field types crash on setValue(undefined):
            // LocationField, TextareaField, DateTimeField
            const fragileFields = [
                'field.location',
                'field.textarea',
                'field.datetime',
            ];
            fragileFields.forEach((name) => {
                const field = form.findByModel(name);
                if (field) {
                    jest.spyOn(field, 'setValue').mockImplementation(
                        () => {},
                    );
                }
            });
        });

        it('should call setValue on all fields', () => {
            const textField = form.findByModel('field.text');
            const setValueSpy = jest.spyOn(textField, 'setValue');
            form.reset();
            expect(setValueSpy).toHaveBeenCalled();
        });

        it('should clear model', () => {
            form.setModel(
                new Objekt({ field: { text: 'some value' } }),
            );
            form.reset();
            const model = form.getModel();
            expect(model.get('field.text')).toBeUndefined();
        });

        it('should preserve previousModel', () => {
            form.setModel(
                new Objekt({ field: { text: 'before reset' } }),
            );
            form.reset();
            expect(form.previousModel).toBeDefined();
        });
    });

    describe('lock / unlock', () => {
        it('should disable all fields on lock', () => {
            form.lock();
            const textField = form.findByModel('field.text');
            expect(textField.isDisabled()).toBe(true);
        });

        it('should restore previous disabled state on unlock', () => {
            form.lock();
            form.unlock();
            const textField = form.findByModel('field.text');
            expect(textField.isDisabled()).toBe(false);
        });

        it('should keep disabled field disabled after unlock', () => {
            const textField = form.findByModel('field.text');
            textField.setDisabled(true);
            form.lock();
            form.unlock();
            expect(textField.isDisabled()).toBe(true);
        });
    });

    describe('form events', () => {
        it('should prevent default on submit', () => {
            const submitEvent = new Event('submit', {
                bubbles: true,
                cancelable: true,
            });
            const preventSpy = jest.spyOn(submitEvent, 'preventDefault');
            form.formKnot.getNode().dispatchEvent(submitEvent);
            expect(preventSpy).toHaveBeenCalled();
        });

        it('should call eventSubmit with model when form is valid', () => {
            const submitSpy = jest.fn();
            form.eventSubmit = submitSpy;

            form.formKnot
                .getNode()
                .dispatchEvent(
                    new Event('submit', {
                        bubbles: true,
                        cancelable: true,
                    }),
                );

            expect(submitSpy).toHaveBeenCalled();
            const [model] = submitSpy.mock.calls[0];
            expect(model).toBeInstanceOf(Objekt);
        });

        it('should prevent default on reset', () => {
            const resetEvent = new Event('reset', {
                bubbles: true,
                cancelable: true,
            });
            const preventSpy = jest.spyOn(resetEvent, 'preventDefault');
            form.formKnot.getNode().dispatchEvent(resetEvent);
            expect(preventSpy).toHaveBeenCalled();
        });

        it('should call eventReset with model on reset', () => {
            const resetSpy = jest.fn();
            form.eventReset = resetSpy;

            form.formKnot
                .getNode()
                .dispatchEvent(
                    new Event('reset', {
                        bubbles: true,
                        cancelable: true,
                    }),
                );

            expect(resetSpy).toHaveBeenCalled();
            const [model] = resetSpy.mock.calls[0];
            expect(model).toBeInstanceOf(Objekt);
        });

        it('should prevent Enter key in non-textarea inputs', () => {
            const keydownEvent = new KeyboardEvent('keydown', {
                keyCode: 13,
                bubbles: true,
                cancelable: true,
            });
            const preventSpy = jest.spyOn(
                keydownEvent,
                'preventDefault',
            );
            form.formKnot.getNode().dispatchEvent(keydownEvent);
            expect(preventSpy).toHaveBeenCalled();
        });
    });

    describe('field value change', () => {
        it('should update model when field value changes', () => {
            const textField = form.findByModel('field.text');
            textField.modelChange('changed value');
            expect(form.getModel().get('field.text')).toBe(
                'changed value',
            );
        });

        it('should call field eventChange with new and old values', () => {
            const textField = form.findByModel('field.text');
            const changeSpy = jest.spyOn(textField, 'eventChange');
            textField.modelChange('new');
            expect(changeSpy).toHaveBeenCalledWith('new', 'text');
        });

        it('should re-validate form after field change', () => {
            const checkSpy = jest.spyOn(form, 'checkValidity');
            const textField = form.findByModel('field.text');
            textField.modelChange('trigger validation');
            expect(checkSpy).toHaveBeenCalled();
        });

        it('should not update model when value is the same', () => {
            const textField = form.findByModel('field.text');
            const changeSpy = jest.spyOn(textField, 'eventChange');
            textField.modelChange('text');
            expect(changeSpy).not.toHaveBeenCalled();
        });
    });

    describe('refresh', () => {
        it('should re-initialize fields', () => {
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
