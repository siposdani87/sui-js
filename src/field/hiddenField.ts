import { Item } from '../core';
import { BaseField } from './baseField';

/**
 * @class
 * @extends {BaseField}
 */
export class HiddenField extends BaseField {
    /**
     * @param {!Item} input
     */
    constructor(input: Item) {
        super(input);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }
    /**
     * @override
     * @return {undefined}
     */
    render(): void {
        // empty method
    }
    /**
     * @override
     */
    refresh() {
        // empty method
    }
}
