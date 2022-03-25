import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { BaseField } from '../field';
import { Item } from '../core';
/**
 * @class
 * @extends {Collection}
 */
export declare class Form extends Collection<BaseField> {
    formNode: Item<HTMLFormElement>;
    previousModel: Objekt;
    model: Objekt;
    initFields: string[];
    buttonClasses: string[];
    fieldClasses: string[];
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     */
    constructor(dom: Item, opt_selector?: string | undefined);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initFormEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initSubmitFormEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initResetFormEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initFields;
    /**
     * @param {!Objekt} model
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
     */
    setModel(model: Objekt, opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    /**
     * @return {!Objekt}
     */
    getModel(): Objekt;
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
     */
    reset(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    /**
     * @private
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    private _setValue;
    /**
     * @private
     * @param {string} name
     * @return {*}
     */
    private _getValue;
    /**
     * @private
     * @param {!BaseField} field
     * @return {*}
     */
    private _getPreviousValue;
    /**
     * @private
     * @param {!BaseField} field
     * @param {*} value
     * @return {undefined}
     */
    private _fieldValueChange;
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    setErrors(data: Object): void;
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {boolean}
     */
    checkValidity(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): boolean;
    /**
     * @return {boolean}
     */
    isValid(): boolean;
    /**
     * @return {boolean}
     */
    isInvalid(): boolean;
    /**
     * @return {undefined}
     */
    refresh(): void;
    /**
     * @param {string} value
     * @return {!BaseField}
     */
    findByModel<T = BaseField>(value: string): T;
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventSubmit(model: Objekt, node: Item): void;
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventReset(model: Objekt, node: Item): void;
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventButton(model: Objekt, node: Item): void;
    /**
     * @return {undefined}
     */
    lock(): void;
    /**
     * @return {undefined}
     */
    unlock(): void;
}
