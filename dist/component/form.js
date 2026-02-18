import { inArray, isSame, isUndefined, remove } from '../utils/operation';
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { FormField } from './formField';
import { consoleDebug } from '../utils/log';
/**
 * @description Manages a collection of form fields with model binding, validation, and
 * event handling. Extends {@link Collection} to provide field iteration, lookup, and lifecycle management.
 *
 * @example
 * const form = new Form(dom, 'form');
 * form.setModel(new Objekt({ name: 'John', email: 'john@example.com' }));
 * form.eventSubmit = (model, knot) => {
 *     http.post('/api/users', model);
 * };
 *
 * @see {@link BaseField} for individual field implementations
 * @see {@link Collection} for the base collection interface
 * @see {@link Objekt} for the model data wrapper
 *
 * @category Component
 */
export class Form extends Collection {
    /**
     * @description Creates a new Form instance bound to the form element found within the given DOM node.
     *
     * @param {Knot} dom - The parent DOM node containing the form element.
     * @param {string} [opt_selector='form'] - CSS selector to locate the form element.
     */
    constructor(dom, opt_selector = 'form') {
        const formKnot = new Query(opt_selector, dom).getKnot();
        formKnot.setAttribute('novalidate');
        super([], FormField, {
            parent: formKnot,
        });
        this.formKnot = formKnot;
        this._init();
    }
    /**
     * @description Initializes the form model, field selectors, and event handlers.
     */
    _init() {
        this.previousModel = new Objekt();
        this.model = new Objekt();
        this.initFields = [];
        this.buttonClasses = [
            'input[type=submit]:not(.init-field)',
            'input[type=button]:not(.init-field)',
            'input[type=reset]:not(.init-field)',
            'button:not(.init-field)',
        ];
        this.fieldClasses = [
            '.input-block input:not([type="hidden"])+input:not([type="hidden"])',
            '.input-block:not(.init-field)',
            'form > input[type=hidden]:not(.init-field)',
        ];
        this._initFields();
        this._initFormEvent();
    }
    /**
     * @description Binds keydown, submit, and reset event listeners to the form element.
     */
    _initFormEvent() {
        this.formKnot.addEventListener('keydown', (_knot, event) => {
            const textArea = /textarea/i.test((event.target || event.srcElement).tagName);
            if (!(textArea ||
                (event.keyCode || event.which || event.charCode || 0) !== 13)) {
                event.preventDefault();
            }
            return true;
        });
        this._initSubmitFormEvent();
        this._initResetFormEvent();
    }
    /**
     * @description Binds the form submit event, validates, and delegates to {@link eventSubmit}.
     */
    _initSubmitFormEvent() {
        this.formKnot.addEventListener('submit', (knot, event) => {
            event.preventDefault();
            if (this.checkValidity(true)) {
                this.eventSubmit(this.model, knot);
            }
        });
    }
    /**
     * @description Binds the form reset event and delegates to {@link eventReset}.
     */
    _initResetFormEvent() {
        this.formKnot.addEventListener('reset', (knot, event) => {
            event.preventDefault();
            this.eventReset(this.model, knot);
        });
    }
    /**
     * @description Discovers, initializes, and binds form fields and buttons from the DOM.
     */
    _initFields() {
        const fields = new Query(this.fieldClasses.concat(this.buttonClasses).join(', '), this.formKnot).getItems();
        this.load(fields);
        const updatedFields = [];
        const initFields = [];
        this.each((field) => {
            const fieldName = field.getName();
            if (inArray(this.initFields, fieldName)) {
                if (!inArray(updatedFields, fieldName)) {
                    field.refresh();
                    field.setValue(field.getValue());
                    updatedFields.push(fieldName);
                }
            }
            else {
                field.modelChange = (value) => {
                    this._fieldValueChange(field, value);
                };
                field.getPreviousValue = () => {
                    this._getPreviousValue(field);
                };
                field.eventClick = (knot) => {
                    this.eventButton(this.model, knot);
                };
                if (!inArray(updatedFields, fieldName)) {
                    this._setValue(fieldName, field.getValue());
                    updatedFields.push(fieldName);
                }
                field.render();
                if (!inArray(initFields, fieldName)) {
                    initFields.push(fieldName);
                }
            }
        });
        this.initFields = this.initFields.concat(initFields);
    }
    /**
     * @description Merges the given model into the form, updates all field values, and runs validation.
     *
     * @param {Objekt} model - The data model to merge into the form.
     * @param {boolean} [opt_force=true] - Whether to force validation on all fields.
     * @param {boolean} [opt_showMessage=false] - Whether to display validation messages.
     *
     * @example
     * form.setModel(new Objekt({ name: 'Jane', age: 30 }));
     */
    setModel(model, opt_force = true, opt_showMessage = false) {
        this.previousModel = this.model.copy();
        this.model.merge(model);
        this.each((field) => {
            const name = field.getName();
            const value = this.model.get(name);
            if (!isUndefined(value)) {
                field.setValue(value);
                field.checkValidity(opt_force, opt_showMessage);
            }
        });
    }
    /**
     * @description Returns the current form data model.
     *
     * @returns {Objekt} The form's data model containing all field values.
     *
     * @example
     * const data = form.getModel();
     * console.log(data.get('name'));
     */
    getModel() {
        return this.model;
    }
    /**
     * @description Clears all field values and resets the form model.
     *
     * @param {boolean} [opt_force=true] - Whether to force validation after reset.
     * @param {boolean} [opt_showMessage=false] - Whether to display validation messages.
     *
     * @example
     * form.reset();
     */
    reset(opt_force = true, opt_showMessage = false) {
        this.each((field) => {
            field.setValue();
            field.checkValidity(opt_force, opt_showMessage);
        });
        this.previousModel = this.model.copy();
        this.model.clear();
    }
    /**
     * @description Sets a field value in the model and tracks the previous value.
     * @param {string} name - The field name.
     * @param {*} value - The new value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _setValue(name, value) {
        const currentValue = this._getValue(name);
        if (!isSame(value, currentValue)) {
            this.previousModel.set(name, currentValue);
            this.model.set(name, value);
        }
    }
    /**
     * @description Retrieves the current value of a field from the model.
     * @param {string} name - The field name.
     * @returns {*} The current field value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _getValue(name) {
        return this.model.get(name);
    }
    /**
     * @description Retrieves the previous value of a field from the previous model snapshot.
     * @param {BaseField<HTMLInputElement>} field - The field instance.
     * @returns {*} The previous field value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _getPreviousValue(field) {
        const fieldName = field.getName();
        return this.previousModel.get(fieldName);
    }
    /**
     * @description Handles a field value change by updating the model and triggering validation.
     * @param {BaseField<HTMLInputElement>} field - The field that changed.
     * @param {*} value - The new field value.
     */
    _fieldValueChange(field, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value) {
        const fieldName = field.getName();
        const currentValue = this._getValue(fieldName);
        if (!isSame(value, currentValue)) {
            this._setValue(fieldName, value);
            field.eventChange(value, currentValue);
        }
        this.checkValidity(true, false);
    }
    /**
     * @description Applies server-side validation errors to the corresponding form fields.
     *
     * @param {object} data - An object mapping field names to arrays of error messages.
     *
     * @example
     * form.setErrors({ email: ['Email is required'], name: ['Name is too short'] });
     */
    setErrors(data) {
        const errors = new Objekt(data);
        this.each((field) => {
            const name = field.getName();
            const error = errors.get(name, []);
            field.setError(error.join(', '), true);
        });
    }
    /**
     * @description Validates all form fields and returns the overall validity state.
     *
     * @param {boolean} [opt_force=false] - Whether to force re-validation on all fields.
     * @param {boolean} [opt_showMessage=true] - Whether to display validation messages.
     * @returns {boolean} True if all fields are valid.
     *
     * @example
     * if (form.checkValidity()) {
     *     // submit the form
     * }
     */
    checkValidity(opt_force = false, opt_showMessage = true) {
        this.each((field) => {
            field.checkValidity(opt_force, opt_showMessage);
        });
        return this.formKnot.getNode().checkValidity();
    }
    /**
     * @description Checks whether the form is currently valid by forcing validation on all fields.
     *
     * @returns {boolean} True if the form passes validation.
     *
     * @example
     * if (form.isValid()) {
     *     // proceed with submission
     * }
     */
    isValid() {
        return this.checkValidity(true);
    }
    /**
     * @description Checks whether the form is currently invalid.
     *
     * @returns {boolean} True if the form fails validation.
     *
     * @example
     * if (form.isInvalid()) {
     *     flash.addError('Please fix the errors');
     * }
     */
    isInvalid() {
        return !this.isValid();
    }
    /**
     * @description Removes fields that no longer exist in the DOM and re-initializes any new fields.
     *
     * @example
     * // After dynamically adding fields to the DOM
     * form.refresh();
     */
    refresh() {
        this.deleteAllByCondition((field) => {
            const exists = field.exists();
            if (!exists) {
                const fieldName = field.getName();
                this.model.remove(fieldName);
                remove(this.initFields, fieldName);
            }
            return !exists;
        });
        this._initFields();
    }
    /**
     * @description Finds a form field by its model binding name.
     *
     * @typeParam T - The expected field type, defaults to BaseField.
     * @param {string} name - The model property name bound to the field.
     * @returns {T} The matching field instance.
     *
     * @example
     * const emailField = form.findByModel<TextField>('email');
     */
    findByModel(name) {
        return this.findByCondition((item) => {
            return item.getName() === name;
        });
    }
    /**
     * @description Disables all form fields, preserving their original disabled state for later unlock.
     *
     * @example
     * form.lock();
     * // submit data...
     * form.unlock();
     */
    lock() {
        this.each((field) => {
            field.disabled = field.isDisabled();
        });
        this.each((field) => {
            field.setDisabled(true);
        });
    }
    /**
     * @description Restores each field's disabled state to what it was before {@link lock} was called.
     *
     * @example
     * form.unlock();
     */
    unlock() {
        this.each((field) => {
            field.setDisabled(field.disabled);
        });
    }
    /**
     * @description Called when the form is submitted and passes validation. Override to handle submission.
     * @param {Objekt} model - The current form data model.
     * @param {Knot} knot - The form DOM element.
     */
    eventSubmit(model, knot) {
        consoleDebug('Form.eventSubmit()', model, knot);
    }
    /**
     * @description Called when the form reset button is clicked. Override to handle reset logic.
     * @param {Objekt} model - The current form data model.
     * @param {Knot} knot - The form DOM element.
     */
    eventReset(model, knot) {
        consoleDebug('Form.eventReset()', model, knot);
    }
    /**
     * @description Called when a non-submit/non-reset button inside the form is clicked. Override to handle button actions.
     * @param {Objekt} model - The current form data model.
     * @param {Knot} knot - The button DOM element.
     */
    eventButton(model, knot) {
        consoleDebug('Form.eventButton()', model, knot);
    }
}
