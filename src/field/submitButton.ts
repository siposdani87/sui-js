import { Item } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class SubmitButton extends BaseField {
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
        this.input.setAttribute('name', 'submit');
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
            'mdl-button--primary',
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
