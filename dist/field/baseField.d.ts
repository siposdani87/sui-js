import { Knot } from '../core/knot';
import { Tooltip } from '../component/tooltip';
import { Form } from '../component';
/**
 * @template {T}
 * @class
 */
export declare class BaseField<T extends HTMLInputElement> {
    input: Knot<T>;
    label: Knot;
    error: Knot;
    inputBlock: Knot;
    form?: Form;
    errorTooltip: Tooltip;
    infoContainerNode: Knot;
    actionContainerNode: Knot;
    disabled: boolean;
    /**
     * @param {!Knot} input
     * @param {!Knot=} opt_label
     * @param {!Knot=} opt_error
     * @param {!Knot=} opt_inputBlock
     * @param {!Form=} opt_form
     */
    constructor(input: Knot<T>, opt_label?: Knot | undefined, opt_error?: Knot | undefined, opt_inputBlock?: Knot | undefined, opt_form?: Form | undefined);
    /**
     * @param {*} value
     * @param {*} previousValue
     */
    eventChange(value: any, previousValue: any): void;
    /**
     * @param {!Knot} node
     * @return {undefined}
     */
    eventClick(node: Knot): void;
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
    protected _getAttributeName(inputName: string): string;
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
     * @return {!Knot}
     */
    private _getUpgradedNode;
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
    private _setInfoContainer;
    /**
     * @private
     * @return {undefined}
     */
    private _setActionContainer;
    /**
     * @private
     * @param {!Knot} label
     * @return {undefined}
     */
    private _setInfo;
    /**
     * @protected
     * @param {!Knot|undefined} label
     * @return {undefined}
     */
    protected _setAdditionalLabel(label: Knot | undefined): void;
    /**
     * @protected
     * @param {string} labelText
     * @return {string}
     */
    protected _getLabelRequiredText(labelText: string): string;
    /**
     * @private
     * @return {undefined}
     */
    private _setMutation;
}
