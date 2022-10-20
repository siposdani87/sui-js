import { BaseField } from './baseField';
import { Canvas } from '../component/canvas';
import { Popup } from '../component/popup';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
/**
 * @class
 * @extends {BaseField}
 */
export declare class ColorField extends BaseField<HTMLInputElement> {
    tooltip: Tooltip;
    previewNode: Knot;
    colorNode: Knot;
    popup: Popup;
    canvas: Canvas;
    image: Knot<HTMLImageElement>;
    colors: string[][];
    /**
     * @param {!Knot} input
     * @param {!Knot} label
     * @param {!Knot} error
     * @param {!Knot} inputBlock
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @override
     */
    render(): void;
    /**
     * @override
     */
    refresh(): void;
    /**
     * @private
     * @return {undefined}
     */
    private _initInput;
    /**
     * @private
     * @return {undefined}
     */
    private _initPreview;
    /**
     * @private
     * @return {undefined}
     */
    private _draw;
    /**
     * @private
     * @return {undefined}
     */
    private _initImage;
    /**
     * @private
     * @return {undefined}
     */
    private _setMaterialColors;
}
