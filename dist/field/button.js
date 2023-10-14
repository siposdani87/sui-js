import { mdl } from '../utils/render';
import { BaseField } from './baseField';
export class Button extends BaseField {
    constructor(input) {
        super(input);
        this._init();
    }
    _init() {
        this.input.setAttribute('name', 'button');
    }
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
    refresh() {
        mdl(this.input);
    }
}
