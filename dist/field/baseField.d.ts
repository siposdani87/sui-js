import { Item } from '../core/item';
import { Tooltip } from '../component/tooltip';
import { Form } from '../component';
/**
 * @class
 */
export declare class BaseField {
    input: any;
    label: any;
    error: any;
    inputBlock: any;
    form?: Form;
    errorTooltip: Tooltip;
    infoContainerNode: Item;
    actionContainerNode: Item;
    disabled: boolean;
    /**
     * @param {!Item} input
     * @param {!Item=} opt_label
     * @param {!Item=} opt_error
     * @param {!Item=} opt_inputBlock
     * @param {!Form=} opt_form
     */
    constructor(input: Item, opt_label?: Item | undefined, opt_error?: Item | undefined, opt_inputBlock?: Item | undefined, opt_form?: Form | undefined);
    /**
     * @param {*} value
     * @param {*} previousValue
     */
    eventChange(value: any, previousValue: any): void;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    eventClick(node: Item): void;
    /**
     * @return {undefined}
     */
    render(): void;
    /**
     * @return {undefined}
     */
    refresh(): void;
    /**
     * @param {*} value
     */
    modelChange(value: any): void;
    /**
     * @return {*}
     */
    getPreviousValue(): any;
    /**
     * @return {string}
     */
    getName(): string;
    /**
     * @return {*}
     */
    getValue(): any;
    /**
     * @protected
     * @param {string} inputName
     * @return {string}
     */
    _getAttributeName(inputName: string): string;
    /**
     * @param {string=} opt_message
     * @param {boolean=} opt_isCustomError
     * @return {undefined}
     */
    setError(opt_message?: string | undefined, opt_isCustomError?: boolean | undefined): void;
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
     */
    checkValidity(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    /**
     * @return {boolean}
     */
    isValidityValid(): boolean;
    /**
     * @return {boolean}
     */
    isValid(): boolean;
    /**
     * @private
     * @return {!Item}
     */
    _getUpgradedNode(): Item;
    /**
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value?: any): void;
    /**
     * @return {boolean}
     */
    exists(): boolean;
    /**
     * @return {boolean}
     */
    existsInput(): boolean;
    /**
     * @return {boolean}
     */
    existsInputBlock(): boolean;
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute: string): any;
    /**
     * @return {boolean}
     */
    isRequired(): boolean;
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setRequired(state: boolean): void;
    /**
     * @return {boolean}
     */
    isEnabled(): boolean;
    /**
     * @return {boolean}
     */
    isDisabled(): boolean;
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: boolean): void;
    /**
     * @return {boolean}
     */
    isVisible(): boolean;
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setVisibility(state: boolean): void;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
    /**
     * @param {string} text
     * @return {undefined}
     */
    setLabel(text: string): void;
    /**
     * @private
     * @return {undefined}
     */
    _setInfoContainer(): void;
    /**
     * @private
     * @return {undefined}
     */
    _setActionContainer(): void;
    /**
     * @private
     * @param {!Item} label
     * @return {undefined}
     */
    _setInfo(label: Item): void;
    /**
     * @protected
     * @param {!Item|undefined} label
     * @return {undefined}
     */
    _setAdditionalLabel(label: Item | undefined): void;
    /**
     * @protected
     * @param {string} labelText
     * @return {string}
     */
    _getLabelRequiredText(labelText: string): string;
    /**
     * @private
     * @return {undefined}
     */
    _setMutation(): void;
}
