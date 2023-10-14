import { eq } from '../utils/operation';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';
import { Knot } from '../core/knot';
import { consoleDebug } from '../utils/log';
export class SearchField extends BaseField {
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
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
    refresh() {
        if (this.isRequired() && this.getValue() === '') {
            this.inputBlock.addClass('is-invalid');
        }
        mdl(this.inputBlock);
    }
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
    eventEnter(value) {
        consoleDebug('Search.eventEnter()', value);
    }
}
