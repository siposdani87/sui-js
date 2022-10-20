import { Knot } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class Button extends BaseField<HTMLInputElement> {
    /**
     * @param {!Knot} input
     */
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
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
