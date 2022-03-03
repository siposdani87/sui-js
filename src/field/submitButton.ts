import { mdl } from '../utils/operation';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class SubmitButton extends BaseField {
    /**
     * @param {!Item} input
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
        this.input.setAttribute('name', 'submit');
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
