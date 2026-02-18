import { BaseField } from './baseField';
/**
 * Hidden form input field with no visible rendering.
 *
 * @description Extends {@link BaseField} to provide a hidden input that participates
 * in form data without rendering any visible UI. Changes to the hidden input
 * value are propagated through the model change mechanism.
 *
 * @example
 * const hiddenField = new HiddenField(inputKnot);
 *
 * @see {@link BaseField}
 * @category Field
 */
export class HiddenField extends BaseField {
    /**
     * Creates a new HiddenField instance.
     *
     * @param {Knot<HTMLInputElement>} input The hidden input element.
     */
    constructor(input) {
        super(input);
        this._init();
    }
    /**
     * Initializes the change event listener on the hidden input.
     */
    _init() {
        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }
    /**
     * No-op render since the field is hidden.
     */
    render() {
        // empty method
    }
    /**
     * No-op refresh since the field is hidden.
     */
    refresh() {
        // empty method
    }
}
