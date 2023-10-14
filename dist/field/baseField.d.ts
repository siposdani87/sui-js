import { Knot } from '../core/knot';
import { Tooltip } from '../component/tooltip';
import { Form } from '../component';
export declare class BaseField<T extends HTMLInputElement> {
    input: Knot<T>;
    label: Knot;
    error: Knot;
    inputBlock: Knot;
    form?: Form;
    errorTooltip: Tooltip;
    infoContainerKnot: Knot;
    actionContainerKnot: Knot;
    disabled: boolean;
    constructor(input: Knot<T>, opt_label?: Knot | undefined, opt_error?: Knot | undefined, opt_inputBlock?: Knot | undefined, opt_form?: Form | undefined);
    eventChange(value: any, previousValue: any): void;
    eventClick(knot: Knot): void;
    render(): void;
    refresh(): void;
    modelChange(value: any): void;
    getPreviousValue(): any;
    getName(): string;
    getValue(): any;
    protected _getAttributeName(inputName: string): string;
    setError(opt_message?: string | undefined, opt_isCustomError?: boolean | undefined): void;
    checkValidity(opt_force?: boolean | undefined, opt_showMessage?: boolean | undefined): void;
    isValidityValid(): boolean;
    isValid(): boolean;
    private _getUpgradedKnot;
    setValue(value?: any): void;
    exists(): boolean;
    existsInput(): boolean;
    existsInputBlock(): boolean;
    get(attribute: string): any;
    isRequired(): boolean;
    setRequired(state: boolean): void;
    isEnabled(): boolean;
    isDisabled(): boolean;
    setDisabled(state: boolean): void;
    isVisible(): boolean;
    setVisibility(state: boolean): void;
    show(): void;
    hide(): void;
    setLabel(text: string): void;
    private _setInfoContainer;
    private _setActionContainer;
    private _setInfo;
    protected _setAdditionalLabel(label: Knot | undefined): void;
    protected _getLabelRequiredText(labelText: string): string;
    private _setMutation;
}
