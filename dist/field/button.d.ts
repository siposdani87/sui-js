import { Knot } from '../core';
import { BaseField } from './baseField';
/**
 * Generic button with click event support.
 *
 * @description Extends {@link BaseField} to render a Material Design Lite raised
 * accent button. Click events are forwarded through the `eventClick` handler.
 *
 * @example
 * const button = new Button(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export declare class Button extends BaseField<HTMLInputElement> {
    /**
     * Creates a new Button instance.
     *
     * @param {Knot<HTMLInputElement>} input The button input element.
     */
    constructor(input: Knot<HTMLInputElement>);
    /**
     * Sets the button name attribute.
     */
    private _init;
    /**
     * Renders the button with MDL raised accent classes and attaches the click listener.
     */
    render(): void;
    /**
     * Refreshes the MDL button component.
     */
    refresh(): void;
}
