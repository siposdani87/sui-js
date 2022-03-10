/**
 * @class
 */
export declare class BaseField {
    input: any;
    label: any;
    error: any;
    inputBlock: any;
    form: any;
    errorTooltip: any;
    infoContainerNode: any;
    actionContainerNode: any;
    disabled: boolean;
    /**
     * @param {!Item} input
     * @param {!Item=} opt_label
     * @param {!Item=} opt_error
     * @param {!Item=} opt_inputBlock
     * @param {!Form=} opt_form
     */
    constructor(input: any, opt_label?: any, opt_error?: any, opt_inputBlock?: any, opt_form?: any);
    /**
     * @param {*} value
     * @param {*} previousValue
     */
    eventChange(value: any, previousValue: any): void;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    eventClick(node: any): void;
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
    getName(): any;
    /**
     * @return {*}
     */
    getValue(): any;
    /**
     * @protected
     * @param {string} inputName
     * @return {string}
     */
    _getAttributeName(inputName: any): any;
    /**
     * @param {string=} opt_message
     * @param {boolean=} opt_isCustomError
     * @return {undefined}
     */
    setError(opt_message?: string, opt_isCustomError?: boolean): void;
    /**
     * @param {boolean=} opt_force
     * @param {boolean=} opt_showMessage
     * @return {undefined}
     */
    checkValidity(opt_force?: boolean, opt_showMessage?: boolean): void;
    /**
     * @return {boolean}
     */
    isValidityValid(): any;
    /**
     * @return {boolean}
     */
    isValid(): any;
    /**
     * @private
     * @return {!Item}
     */
    _getUpgradedNode(): any;
    /**
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value?: any): void;
    /**
     * @return {boolean}
     */
    exists(): any;
    /**
     * @return {boolean}
     */
    existsInput(): any;
    /**
     * @return {boolean}
     */
    existsInputBlock(): any;
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute: any): any;
    /**
     * @return {boolean}
     */
    isRequired(): any;
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setRequired(state: any): void;
    /**
     * @return {boolean}
     */
    isEnabled(): boolean;
    /**
     * @return {boolean}
     */
    isDisabled(): any;
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setDisabled(state: any): void;
    /**
     * @return {boolean}
     */
    isVisible(): boolean;
    /**
     * @param {boolean} state
     * @return {undefined}
     */
    setVisibility(state: any): void;
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
    setLabel(text: any): void;
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
    _setInfo(label: any): void;
    /**
     * @protected
     * @param {!Item|undefined} label
     * @return {undefined}
     */
    _setAdditionalLabel(label: any): void;
    /**
     * @protected
     * @param {string} labelText
     * @return {string}
     */
    _getLabelRequiredText(labelText: any): any;
    /**
     * @private
     * @return {undefined}
     */
    _setMutation(): void;
}
