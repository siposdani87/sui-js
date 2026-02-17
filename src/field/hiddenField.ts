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

    override render(): void {
        // empty method
    }

    override refresh() {
        // empty method
    }
}
