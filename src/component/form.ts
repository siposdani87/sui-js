import { inArray, isSame, isUndefined, remove } from '../utils/operation';
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { FormField } from './formField';
import { consoleWarn } from '../utils/log';

/**
 * @class
 * @export
 * @extends {Collection}
 */
export class Form extends Collection {
    formNode: any;
    previousModel: Objekt;
    model: Objekt;
    initFields: any[];
    buttonClasses: string[];
    fieldClasses: string[];
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     */
    constructor(dom, opt_selector = 'form') {
        const formNode = new Query(opt_selector, dom).getItem();
        formNode.setAttribute('novalidate');
        super([], FormField, {
            parent: formNode,
        });
        this.formNode = formNode;

        this._init();
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    _initFormEvent() {
        this.formNode.addEventListener('keydown', (node, event) => {
            const textArea = /textarea/i.test(
                (event.target || event.srcElement).tagName,
            );
            if (
                !(
                    textArea ||
                    (event.keyCode || event.which || event.charCode || 0) !== 13
                )
            ) {
                event.preventDefault();
            }
            return true;
        });

        this._initSubmitFormEvent();
        this._initResetFormEvent();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initSubmitFormEvent() {
        this.formNode.addEventListener('submit', (node, event) => {
            event.preventDefault();
            if (this.checkValidity(true)) {
                this.eventSubmit(this.model, node);
            }
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initResetFormEvent() {
        this.formNode.addEventListener('reset', (node, event) => {
            event.preventDefault();
            this.eventReset(this.model, node);
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initFields() {
        const fields = new Query(
            this.fieldClasses.concat(this.buttonClasses).join(', '),
            this.formNode,
        ).getItems();
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
            } else {
                field.modelChange = (value) => {
                    this._fieldValueChange(field, value);
                };
                field.getPreviousValue = () => {
                    this._getPreviousValue(field);
                };
                field.eventClick = (node) => {
                    this.eventButton(this.model, node);
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
     * @param {!Objekt} model
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
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
     * @return {!Objekt}
     */
    getModel() {
        return this.model;
    }
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
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
     * @private
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    _setValue(name, value) {
        const currentValue = this._getValue(name);
        if (!isSame(value, currentValue)) {
            this.previousModel.set(name, currentValue);
            this.model.set(name, value);
        }
    }
    /**
     * @private
     * @param {string} name
     * @return {*}
     */
    _getValue(name) {
        return this.model.get(name);
    }
    /**
     * @private
     * @param {!BaseField} field
     * @return {*}
     */
    _getPreviousValue(field) {
        const fieldName = field.getName();
        return this.previousModel.get(fieldName);
    }
    /**
     * @private
     * @param {!BaseField} field
     * @param {*} value
     * @return {undefined}
     */
    _fieldValueChange(field, value) {
        const fieldName = field.getName();
        const currentValue = this._getValue(fieldName);
        if (!isSame(value, currentValue)) {
            this._setValue(fieldName, value);
            field.eventChange(value, currentValue);
        }
        this.checkValidity(true, false);
    }
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    setErrors(data) {
        const errors = new Objekt(data);
        this.each((field) => {
            const name = field.getName();
            const error = errors.get<String[]>(name, []);
            field.setError(error.join(', '), true);
        });
    }
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {boolean}
     */
    checkValidity(opt_force = false, opt_showMessage = true) {
        this.each((field) => {
            field.checkValidity(opt_force, opt_showMessage);
        });
        return this.formNode.getNode().checkValidity();
    }
    /**
     * @return {boolean}
     */
    isValid() {
        return this.checkValidity(true);
    }
    /**
     * @return {boolean}
     */
    isInvalid() {
        return !this.isValid();
    }
    /**
     * @return {undefined}
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
     * @param {string} value
     * @return {!BaseField}
     */
    findByModel(value) {
        return this.findByCondition((item, i) => {
            const modelName = this.get(i, 'model');
            return modelName === value;
        });
    }
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventSubmit(model, node) {
        consoleWarn('Form.eventSubmit()', model, node);
    }
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventReset(model, node) {
        consoleWarn('Form.eventReset()', model, node);
    }
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventButton(model, node) {
        consoleWarn('Form.eventButton()', model, node);
    }
    /**
     * @return {undefined}
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
     * @return {undefined}
     */
    unlock() {
        this.each((field) => {
            field.setDisabled(field.disabled);
        });
    }
}
