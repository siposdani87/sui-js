import { Knot } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

export class ResetButton extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
        this._init();
    }

    private _init(): void {
        this.input.setAttribute('name', 'reset');
    }

    render(): void {
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
