import { BaseField } from './baseField';
import { Canvas } from '../component/canvas';
import { Popup } from '../component/popup';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class ColorField extends BaseField {
    tooltip: any;
    previewNode: any;
    colorNode: Item;
    popup: Popup;
    canvas: Canvas;
    image: any;
    colors: any;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input: any, label: any, error: any, inputBlock: any);
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
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
    _initInput(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initPreview(): void;
    /**
     * @private
     * @return {undefined}
     */
    _draw(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initImage(): void;
    /**
     * @private
     * @return {undefined}
     */
    _setMaterialColors(): void;
}
