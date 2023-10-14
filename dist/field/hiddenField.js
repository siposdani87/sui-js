import { BaseField } from './baseField';
export class HiddenField extends BaseField {
    constructor(input) {
        super(input);
        this._init();
    }
    _init() {
        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            this.modelChange(inputNode.value);
            return true;
        });
    }
    render() {
        // empty method
    }
    refresh() {
        // empty method
    }
}
