import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { BaseField } from '../field';
import { Item } from '../core';
/**
 * @class
 * @export
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
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initFormEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initSubmitFormEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initResetFormEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initFields(): void;
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
    _setValue(name: string, value: any): void;
    /**
     * @private
     * @param {string} name
     * @return {*}
     */
    _getValue(name: string): any;
    /**
     * @private
     * @param {!BaseField} field
     * @return {*}
     */
    _getPreviousValue(field: BaseField): any;
    /**
     * @private
     * @param {!BaseField} field
     * @param {*} value
     * @return {undefined}
     */
    _fieldValueChange(field: BaseField, value: any): void;
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
    findByModel(value: string): BaseField;
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
