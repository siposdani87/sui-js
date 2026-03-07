import { BaseField } from './baseField';
/**
 * @description URL input field with optional protocol prefix display (e.g., "https://").
 *
 * @example
 * const urlField = new UrlField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * urlField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export declare class UrlField extends BaseField<HTMLInputElement> {
    protocol: string;
    /**
     * @description Initializes the field by reading the protocol data attribute and attaching input event listeners.
     */
    protected _init(): void;
    /**
     * @description Applies SUI textfield classes and renders the protocol prefix span if configured.
     * @override
     */
    render(): void;
    /**
     * @description Marks the field as invalid when required and empty, then upgrades SUI components.
     * @override
     */
    refresh(): void;
}
