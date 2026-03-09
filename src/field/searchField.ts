import { BaseField } from './baseField';
import { Knot } from '../core/knot';

/**
 * @description Expandable search input field with clear button and enter key handling.
 *
 * @example
 * const searchField = new SearchField(inputKnot, labelKnot, errorKnot, inputBlockKnot);
 * searchField.on('enter', (value) => { console.log('Search:', value); });
 * searchField.render();
 *
 * @see {@link BaseField}
 *
 * @category Field
 */
export class SearchField extends BaseField<HTMLInputElement> {
    holderKnot!: Knot;

    /**
     * @description Initializes keyup and change event listeners on the input.
     */
    protected override _init(): void {
        this.input.addEventListener('keyup', (input, event) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            if (event.key === 'Enter') {
                this.emit('enter', inputNode.value);
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
     * @description Builds the expandable SUI search field layout with icon, holder, label, and clear button.
     * @override
     */
    override render(): void {
        this.inputBlock.addClass([
            'search-field',
            'sui-textfield',
            'sui-textfield--expandable',
        ]);
        this.input.addClass(['sui-textfield__input']);

        this.label.addClass(['sui-button', 'sui-button--icon']);
        const iconKnot = new Knot('em');
        iconKnot.addClass(['material-icons', 'search-button']);
        iconKnot.setHtml('search');
        this.label.insert(iconKnot);

        this.holderKnot = new Knot('div');
        this.holderKnot.addClass('sui-textfield__expandable-holder');
        this.holderKnot.appendChild(this.input);
        this.inputBlock.appendChild(this.holderKnot);

        const labelKnot = new Knot('label');
        labelKnot.addClass('sui-textfield__label');
        this.holderKnot.appendChild(labelKnot);

        this._initClearButton();
        this.refresh();
    }

    /**
     * @description Marks the field as invalid when required and empty, then upgrades SUI components.
     * @override
     */
    override refresh() {
        this._refreshBase();
    }

    /**
     * @description Creates a clear button that resets the field value and triggers eventEnter.
     */
    private _initClearButton(): void {
        const clearButton = new Knot('button');
        clearButton.setAttribute('type', 'button');
        clearButton.addClass(['icon-button', 'material-icons', 'clear-button']);
        clearButton.setHtml('clear');
        clearButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                this.inputBlock.removeClass(['is-dirty', 'is-focused']);
                this.setValue('');
                this.emit('enter', '');
            }
        });
        this.holderKnot.appendChild(clearButton);
    }
}
