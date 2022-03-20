import { Item } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class ResetButton extends BaseField {
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
    private _init(): void {
        this.input.setAttribute('name', 'reset');
    }
    /**
     * @override
     * @return {undefined}
     */
    render(): void {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-js-ripple-effect',
        ]);
        this.refresh();
    }
    /**
     * @override
     */
    refresh() {
        mdl(this.input);
    }
}
