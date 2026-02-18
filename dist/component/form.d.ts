import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { BaseField } from '../field';
import { Knot } from '../core';
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
export declare class Form extends Collection<BaseField<HTMLInputElement>> {
    formKnot: Knot<HTMLFormElement>;
    previousModel: Objekt;
    model: Objekt;
    initFields: string[];
    buttonClasses: string[];
    fieldClasses: string[];
    /**
     * @description Creates a new Form instance bound to the form element found within the given DOM node.
     *
     * @param {Knot} dom - The parent DOM node containing the form element.
     * @param {string} [opt_selector='form'] - CSS selector to locate the form element.
     */
    constructor(dom: Knot, opt_selector?: string | undefined);
    /**
     * @description Initializes the form model, field selectors, and event handlers.
     */
    private _init;
    /**
     * @description Binds keydown, submit, and reset event listeners to the form element.
     */
    private _initFormEvent;
    /**
     * @description Binds the form submit event, validates, and delegates to {@link eventSubmit}.
     */
    private _initSubmitFormEvent;
    /**
     * @description Binds the form reset event and delegates to {@link eventReset}.
     */
    private _initResetFormEvent;
    /**
     * @description Discovers, initializes, and binds form fields and buttons from the DOM.
     */
    private _initFields;
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
    setModel(model: Objekt, opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    /**
     * @description Returns the current form data model.
     *
     * @returns {Objekt} The form's data model containing all field values.
     *
     * @example
     * const data = form.getModel();
     * console.log(data.get('name'));
     */
    getModel(): Objekt;
    /**
     * @description Clears all field values and resets the form model.
     *
     * @param {boolean} [opt_force=true] - Whether to force validation after reset.
     * @param {boolean} [opt_showMessage=false] - Whether to display validation messages.
     *
     * @example
     * form.reset();
     */
    reset(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    /**
     * @description Sets a field value in the model and tracks the previous value.
     * @param {string} name - The field name.
     * @param {*} value - The new value.
     */
    private _setValue;
    /**
     * @description Retrieves the current value of a field from the model.
     * @param {string} name - The field name.
     * @returns {*} The current field value.
     */
    private _getValue;
    /**
     * @description Retrieves the previous value of a field from the previous model snapshot.
     * @param {BaseField<HTMLInputElement>} field - The field instance.
     * @returns {*} The previous field value.
     */
    private _getPreviousValue;
    /**
     * @description Handles a field value change by updating the model and triggering validation.
     * @param {BaseField<HTMLInputElement>} field - The field that changed.
     * @param {*} value - The new field value.
     */
    private _fieldValueChange;
    /**
     * @description Applies server-side validation errors to the corresponding form fields.
     *
     * @param {object} data - An object mapping field names to arrays of error messages.
     *
     * @example
     * form.setErrors({ email: ['Email is required'], name: ['Name is too short'] });
     */
    setErrors(data: object): void;
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
    checkValidity(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): boolean;
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
    isValid(): boolean;
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
    isInvalid(): boolean;
    /**
     * @description Removes fields that no longer exist in the DOM and re-initializes any new fields.
     *
     * @example
     * // After dynamically adding fields to the DOM
     * form.refresh();
     */
    refresh(): void;
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
    findByModel<T = BaseField<HTMLInputElement>>(name: string): T;
    /**
     * @description Disables all form fields, preserving their original disabled state for later unlock.
     *
     * @example
     * form.lock();
     * // submit data...
     * form.unlock();
     */
    lock(): void;
    /**
     * @description Restores each field's disabled state to what it was before {@link lock} was called.
     *
     * @example
     * form.unlock();
     */
    unlock(): void;
    /**
     * @description Called when the form is submitted and passes validation. Override to handle submission.
     * @param {Objekt} model - The current form data model.
     * @param {Knot} knot - The form DOM element.
     */
    eventSubmit(model: Objekt, knot: Knot): void;
    /**
     * @description Called when the form reset button is clicked. Override to handle reset logic.
     * @param {Objekt} model - The current form data model.
     * @param {Knot} knot - The form DOM element.
     */
    eventReset(model: Objekt, knot: Knot): void;
    /**
     * @description Called when a non-submit/non-reset button inside the form is clicked. Override to handle button actions.
     * @param {Objekt} model - The current form data model.
     * @param {Knot} knot - The button DOM element.
     */
    eventButton(model: Objekt, knot: Knot): void;
}
