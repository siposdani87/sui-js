import { BaseField } from './baseField';
import { Canvas } from '../component/canvas';
import { Popup } from '../component/popup';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
export declare class ColorField extends BaseField<HTMLInputElement> {
    tooltip: Tooltip;
    previewKnot: Knot;
    colorKnot: Knot;
    popup: Popup;
    canvas: Canvas;
    image: Knot<HTMLImageElement>;
    colors: string[][];
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    render(): void;
    refresh(): void;
    private _initInput;
    private _initPreview;
    private _draw;
    private _initImage;
    private _setMaterialColors;
}
