import { mdl } from '../utils/render';
import { BaseField } from './baseField';
export class ResetButton extends BaseField {
    constructor(input) {
        super(input);
        this._init();
    }
    _init() {
        this.input.setAttribute('name', 'reset');
    }
    render() {
        this.input.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-js-ripple-effect',
        ]);
        this.refresh();
    }
    refresh() {
        mdl(this.input);
    }
}
