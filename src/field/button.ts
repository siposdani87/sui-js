import { Knot } from '../core';
import { mdl } from '../utils/render';
import { BaseField } from './baseField';

export class Button extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
        this._init();
    }

    private _init(): void {
        this.input.setAttribute('name', 'button');
    }

    override render(): void {
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

    override refresh() {
        mdl(this.input);
    }
}
