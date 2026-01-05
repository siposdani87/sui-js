import { BaseField } from './baseField';
import { Knot } from '../core/knot';
export declare class TextareaField extends BaseField<HTMLInputElement> {
    richText: Knot;
    richTextKnot: HTMLElement;
    toolbarKnot: Knot;
    htmlMode: boolean;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    render(): void;
    private _renderRichText;
    private _isRichText;
    private _renderToolbarButtons;
    private _renderToolbarButton;
    private _setHtmlMode;
    private _isHtmlMode;
    private _formatDoc;
    private _setDocMode;
    refresh(): void;
    private _setValue;
    setValue(value: object | Function | Array<any> | boolean | number | string | null | undefined): void;
    getValue(): any;
}
