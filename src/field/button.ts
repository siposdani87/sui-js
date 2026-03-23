import type { Knot } from '../core';
import { sui } from '../utils/render';
import { BaseField } from './baseField';

/**
 * Generic button with click event support.
 *
 * Extends {@link BaseField} to render a raised accent button. Click events are forwarded through the `eventClick` handler.
 *
 * @example
 * const button = new Button(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export class Button extends BaseField<HTMLInputElement> {
    /**
     * Creates a new Button instance.
     *
     * @param {Knot<HTMLInputElement>} input The button input element.
     */
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
    }

    /**
     * Sets the button name attribute.
     */
    protected override _init(): void {
        this.input.setAttribute('name', 'button');
    }

    /**
     * Renders the button with raised accent classes and attaches the click listener.
     */
    override render(): void {
        this.input.addClass([
            'sui-button',
            'sui-button--raised',
            'sui-button--accent',
        ]);

        this.input.addEventListener('click', (knot) => {
            this.emit('click', knot);
        });

        this.refresh();
    }

    /**
     * Refreshes the button component.
     */
    override refresh() {
        sui(this.input);
    }
}
