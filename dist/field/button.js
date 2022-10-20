import { mdl } from '../utils/render';
import { BaseField } from './baseField';
/**
 * @class
 * @extends {BaseField}
 */
export class Button extends BaseField {
    /**
     * @param {!Knot} input
     */
    constructor(input) {
        super(input);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.input.setAttribute('name', 'button');
    }
    /**
     * @override
     * @return {undefined}
     */
    render() {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--raised',
            'mdl-js-ripple-effect',
            'mdl-button--accent',
        ]);
        this.input.addEventListener('click', (knot) => {
            this.eventClick(knot);
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
