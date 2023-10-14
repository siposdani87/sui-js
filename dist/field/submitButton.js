import { mdl } from '../utils/render';
import { BaseField } from './baseField';
export class SubmitButton extends BaseField {
    constructor(input) {
        super(input);
        this._init();
    }
    _init() {
        this.input.setAttribute('name', 'submit');
    }
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
    refresh() {
        mdl(this.input);
    }
}
