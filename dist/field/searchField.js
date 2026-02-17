import { eq } from '../utils/operation';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { consoleDebug } from '../utils/log';
/**
 * @description Expandable search input field with clear button and enter key handling.
 *
 * @example
 * const searchField = new SearchField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * searchField.eventEnter = (value) => { console.log('Search:', value); };
 * searchField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export class SearchField extends BaseField {
    /**
     * @description Creates a new SearchField instance.
     * @param {Knot<HTMLInputElement>} input - The search input element.
     * @param {Knot} label - The label element.
     * @param {Knot} error - The error message element.
     * @param {Knot} inputBlock - The container block element.
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @description Initializes keyup and change event listeners on the input.
     */
    _init() {
        this.input.addEventListener('keyup', (input, event) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            if (eq(event.keyCode, 13)) {
                this.eventEnter(inputNode.value);
            }
            return true;
        });
        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }
    /**
     * @description Builds the expandable MDL search field layout with icon, holder, label, and clear button.
     * @override
     */
    render() {
        this.inputBlock.addClass([
            'search-field',
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--expandable',
        ]);
        this.input.addClass(['mdl-textfield__input']);
        this.label.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);
        const iconKnot = new Knot('em');
        iconKnot.addClass(['material-icons', 'search-button']);
        iconKnot.setHtml('search');
        this.label.insert(iconKnot);
        this.holderKnot = new Knot('div');
        this.holderKnot.addClass('mdl-textfield__expandable-holder');
        this.holderKnot.appendChild(this.input);
        this.inputBlock.appendChild(this.holderKnot);
        const labelKnot = new Knot('label');
        labelKnot.addClass('mdl-textfield__label');
        this.holderKnot.appendChild(labelKnot);
        this._initClearButton();
        this.refresh();
    }
    /**
     * @description Marks the field as invalid when required and empty, then upgrades MDL components.
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        mdl(this.inputBlock);
    }
    /**
     * @description Creates a clear button that resets the field value and triggers eventEnter.
     */
    _initClearButton() {
        const clearButton = new Knot('a');
        clearButton.setAttribute('href', 'javascript:void(0)');
        clearButton.addClass(['material-icons', 'clear-button']);
        clearButton.setHtml('clear');
        clearButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.inputBlock.removeClass(['is-dirty', 'is-focused']);
                this.setValue('');
                this.eventEnter('');
            }
        });
        this.holderKnot.appendChild(clearButton);
    }
    /**
     * @description Called when the user presses Enter or clears the search field. Override to handle search submission.
     * @param {string} value - The current search input value.
     */
    eventEnter(value) {
        consoleDebug('Search.eventEnter()', value);
    }
}
