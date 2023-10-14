import { Knot } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

export class SubmitButton extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
        this._init();
    }

    private _init(): void {
        this.input.setAttribute('name', 'submit');
    }

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

    refresh() {
        mdl(this.input);
    }
}
