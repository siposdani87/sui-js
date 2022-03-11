import { Item } from '../core';
import { mdl } from '../utils/operation';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class Button extends BaseField {
    /**
     * @param {!Item} input
     */
    constructor(input: Item) {
        super(input);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.input.setAttribute('name', 'button');
    }
    /**
     * @override
     * @return {undefined}
     */
    render(): void {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--raised',
            'mdl-js-ripple-effect',
            'mdl-button--accent',
        ]);

        this.input.addEventListener('click', (node) => {
            this.eventClick(node);
        });

        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        mdl(this.input);
    }
}
