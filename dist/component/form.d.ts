import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
/**
 * @class
 * @export
 * @extends {Collection}
 */
export declare class Form extends Collection {
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
    constructor(dom: any, opt_selector?: string);
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
    setModel(model: any, opt_force?: boolean, opt_showMessage?: boolean): void;
    /**
     * @return {!Objekt}
     */
    getModel(): Objekt;
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
     */
    reset(opt_force?: boolean, opt_showMessage?: boolean): void;
    /**
     * @private
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    _setValue(name: any, value: any): void;
    /**
     * @private
     * @param {string} name
     * @return {*}
     */
    _getValue(name: any): any;
    /**
     * @private
     * @param {!BaseField} field
     * @return {*}
     */
    _getPreviousValue(field: any): any;
    /**
     * @private
     * @param {!BaseField} field
     * @param {*} value
     * @return {undefined}
     */
    _fieldValueChange(field: any, value: any): void;
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    setErrors(data: any): void;
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {boolean}
     */
    checkValidity(opt_force?: boolean, opt_showMessage?: boolean): any;
    /**
     * @return {boolean}
     */
    isValid(): any;
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
    findByModel(value: any): any;
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventSubmit(model: any, node: any): void;
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventReset(model: any, node: any): void;
    /**
     * @param {!Objekt} model
     * @param {!Item} node
     * @return {undefined}
     */
    eventButton(model: any, node: any): void;
    /**
     * @return {undefined}
     */
    lock(): void;
    /**
     * @return {undefined}
     */
    unlock(): void;
}
