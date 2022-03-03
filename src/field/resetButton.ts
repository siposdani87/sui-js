import { mdl } from '../utils/operation';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class ResetButton extends BaseField {
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
        this.input.setAttribute('name', 'reset');
    }
    /**
     * @override
     * @return {undefined}
     */
    render() {
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
