import { Knot } from '../core';
import { BaseField } from './baseField';

export class HiddenField extends BaseField<HTMLInputElement> {
    constructor(input: Knot<HTMLInputElement>) {
        super(input);
        this._init();
    }

    private _init(): void {
        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }

    render(): void {
        // empty method
    }

    refresh() {
        // empty method
    }
}
