import { inArray, isSame, isUndefined, remove } from '../utils/operation';
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { FormField } from './formField';
import { consoleDebug } from '../utils/log';
import { BaseField } from '../field';
import { Knot } from '../core';

export class Form extends Collection<BaseField<HTMLInputElement>> {
    formKnot: Knot<HTMLFormElement>;
    previousModel: Objekt;
    model: Objekt;
    initFields: string[];
    buttonClasses: string[];
    fieldClasses: string[];

    constructor(dom: Knot, opt_selector: string | undefined = 'form') {
        const formKnot = new Query<HTMLFormElement>(
            opt_selector,
            dom,
        ).getKnot();
        formKnot.setAttribute('novalidate');
        super([], FormField, {
            parent: formKnot,
        });
        this.formKnot = formKnot;

        this._init();
    }

    private _init(): void {
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

    private _initFormEvent(): void {
        this.formKnot.addEventListener('keydown', (_knot, event) => {
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

    private _initSubmitFormEvent(): void {
        this.formKnot.addEventListener('submit', (knot, event) => {
            event.preventDefault();
            if (this.checkValidity(true)) {
                this.eventSubmit(this.model, knot);
            }
        });
    }

    private _initResetFormEvent(): void {
        this.formKnot.addEventListener('reset', (knot, event) => {
            event.preventDefault();
            this.eventReset(this.model, knot);
        });
    }

    private _initFields(): void {
        const fields = new Query(
            this.fieldClasses.concat(this.buttonClasses).join(', '),
            this.formKnot,
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

    setModel(
        model: Objekt,
        opt_force: boolean | undefined = true,
        opt_showMessage: boolean | undefined = false,
    ): void {
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

    getModel(): Objekt {
        return this.model;
    }

    reset(
        opt_force: boolean | undefined = true,
        opt_showMessage: boolean | undefined = false,
    ): void {
        this.each((field) => {
            field.setValue();
            field.checkValidity(opt_force, opt_showMessage);
        });
        this.previousModel = this.model.copy();
        this.model.clear();
    }

    private _setValue(name: string, value: any): void {
        const currentValue = this._getValue(name);
        if (!isSame(value, currentValue)) {
            this.previousModel.set(name, currentValue);
            this.model.set(name, value);
        }
    }

    private _getValue(name: string): any {
        return this.model.get(name);
    }

    private _getPreviousValue(field: BaseField<HTMLInputElement>): any {
        const fieldName = field.getName();
        return this.previousModel.get(fieldName);
    }

    private _fieldValueChange(
        field: BaseField<HTMLInputElement>,
        value: any,
    ): void {
        const fieldName = field.getName();
        const currentValue = this._getValue(fieldName);
        if (!isSame(value, currentValue)) {
            this._setValue(fieldName, value);
            field.eventChange(value, currentValue);
        }
        this.checkValidity(true, false);
    }

    setErrors(data: Object): void {
        const errors = new Objekt(data);
        this.each((field) => {
            const name = field.getName();
            const error = errors.get<string[]>(name, []);
            field.setError(error.join(', '), true);
        });
    }

    checkValidity(
        opt_force: boolean | undefined = false,
        opt_showMessage: boolean | undefined = true,
    ): boolean {
        this.each((field) => {
            field.checkValidity(opt_force, opt_showMessage);
        });
        return this.formKnot.getNode().checkValidity();
    }

    isValid(): boolean {
        return this.checkValidity(true);
    }

    isInvalid(): boolean {
        return !this.isValid();
    }

    refresh(): void {
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

    findByModel<T = BaseField<HTMLInputElement>>(name: string): T {
        return this.findByCondition((item) => {
            return item.getName() === name;
        }) as any as T;
    }

    lock(): void {
        this.each((field) => {
            field.disabled = field.isDisabled();
        });
        this.each((field) => {
            field.setDisabled(true);
        });
    }

    unlock(): void {
        this.each((field) => {
            field.setDisabled(field.disabled);
        });
    }

    eventSubmit(model: Objekt, knot: Knot): void {
        consoleDebug('Form.eventSubmit()', model, knot);
    }

    eventReset(model: Objekt, knot: Knot): void {
        consoleDebug('Form.eventReset()', model, knot);
    }

    eventButton(model: Objekt, knot: Knot): void {
        consoleDebug('Form.eventButton()', model, knot);
    }
}
