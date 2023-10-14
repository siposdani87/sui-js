import { inArray, isSame, isUndefined, remove } from '../utils/operation';
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { FormField } from './formField';
import { consoleDebug } from '../utils/log';
export class Form extends Collection {
    constructor(dom, opt_selector = 'form') {
        const formKnot = new Query(opt_selector, dom).getKnot();
        formKnot.setAttribute('novalidate');
        super([], FormField, {
            parent: formKnot,
        });
        this.formKnot = formKnot;
        this._init();
    }
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
    _initSubmitFormEvent() {
        this.formKnot.addEventListener('submit', (knot, event) => {
            event.preventDefault();
            if (this.checkValidity(true)) {
                this.eventSubmit(this.model, knot);
            }
        });
    }
    _initResetFormEvent() {
        this.formKnot.addEventListener('reset', (knot, event) => {
            event.preventDefault();
            this.eventReset(this.model, knot);
        });
    }
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
    getModel() {
        return this.model;
    }
    reset(opt_force = true, opt_showMessage = false) {
        this.each((field) => {
            field.setValue();
            field.checkValidity(opt_force, opt_showMessage);
        });
        this.previousModel = this.model.copy();
        this.model.clear();
    }
    _setValue(name, value) {
        const currentValue = this._getValue(name);
        if (!isSame(value, currentValue)) {
            this.previousModel.set(name, currentValue);
            this.model.set(name, value);
        }
    }
    _getValue(name) {
        return this.model.get(name);
    }
    _getPreviousValue(field) {
        const fieldName = field.getName();
        return this.previousModel.get(fieldName);
    }
    _fieldValueChange(field, value) {
        const fieldName = field.getName();
        const currentValue = this._getValue(fieldName);
        if (!isSame(value, currentValue)) {
            this._setValue(fieldName, value);
            field.eventChange(value, currentValue);
        }
        this.checkValidity(true, false);
    }
    setErrors(data) {
        const errors = new Objekt(data);
        this.each((field) => {
            const name = field.getName();
            const error = errors.get(name, []);
            field.setError(error.join(', '), true);
        });
    }
    checkValidity(opt_force = false, opt_showMessage = true) {
        this.each((field) => {
            field.checkValidity(opt_force, opt_showMessage);
        });
        return this.formKnot.getNode().checkValidity();
    }
    isValid() {
        return this.checkValidity(true);
    }
    isInvalid() {
        return !this.isValid();
    }
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
    findByModel(name) {
        return this.findByCondition((item) => {
            return item.getName() === name;
        });
    }
    lock() {
        this.each((field) => {
            field.disabled = field.isDisabled();
        });
        this.each((field) => {
            field.setDisabled(true);
        });
    }
    unlock() {
        this.each((field) => {
            field.setDisabled(field.disabled);
        });
    }
    eventSubmit(model, knot) {
        consoleDebug('Form.eventSubmit()', model, knot);
    }
    eventReset(model, knot) {
        consoleDebug('Form.eventReset()', model, knot);
    }
    eventButton(model, knot) {
        consoleDebug('Form.eventButton()', model, knot);
    }
}
