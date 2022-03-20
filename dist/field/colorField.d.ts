import { BaseField } from './baseField';
import { Canvas } from '../component/canvas';
import { Popup } from '../component/popup';
import { Tooltip } from '../component/tooltip';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class ColorField extends BaseField {
    tooltip: Tooltip;
    previewNode: Item;
    colorNode: Item;
    popup: Popup;
    canvas: Canvas;
    image: Item<HTMLImageElement>;
    colors: string[][];
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: Item, label: Item, error: Item, inputBlock: Item);
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
