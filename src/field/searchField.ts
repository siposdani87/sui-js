import { eq } from '../utils/operation';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { consoleWarn } from '../utils/log';

/**
 * @class
 * @extends {BaseField}
 */
export class SearchField extends BaseField<HTMLInputElement> {
    holderNode: Knot;
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
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
     * @override
     * @return {undefined}
     */
    render(): void {
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
        const iconNode = new Knot('em');
        iconNode.addClass(['material-icons', 'search-button']);
        iconNode.setHtml('search');
        this.label.insert(iconNode);

        this.holderNode = new Knot('div');
        this.holderNode.addClass('mdl-textfield__expandable-holder');
        this.holderNode.appendChild(this.input);
        this.inputBlock.appendChild(this.holderNode);

        const labelNode = new Knot('label');
        labelNode.addClass('mdl-textfield__label');
        this.holderNode.appendChild(labelNode);

        this._initClearButton();
        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }

        mdl(this.inputBlock);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initClearButton(): void {
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
        this.holderNode.appendChild(clearButton);
    }
    /**
     * @param {string} value
     * @return {undefined}
     */
    eventEnter(value: string): void {
        consoleWarn('Search.eventEnter()', value);
    }
}
