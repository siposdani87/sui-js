/// <reference types="google.maps" />
import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Knot } from '../core/knot';
import { IconOptions } from '../utils';
/**
 * @class
 * @extends {BaseField}
 */
export declare class LocationField extends BaseField<HTMLInputElement> {
    icon: IconOptions;
    advancedButton: Knot;
    map: GoogleMap;
    mapLockKnot: Knot;
    advancedKnot: Knot;
    latitudeInput: Knot<HTMLInputElement>;
    longitudeInput: Knot<HTMLInputElement>;
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
     * @private
     * @return {undefined}
     */
    private _initButtons;
    /**
     * @private
     * @return {undefined}
     */
    private _initSearchButton;
    /**
     * @private
     * @return {undefined}
     */
    private _initAdvancedButton;
    /**
     * @param {string} address
     * @return {undefined}
     */
    search(address: string): void;
    /**
     * @override
     * @return {undefined}
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
    private _toggleAdvancedInputs;
    /**
     * @private
     * @return {undefined}
     */
    private _renderAdvancedInputs;
    /**
     * @private
     * @param {string} id
     * @param {string} labelText
     * @param {function(!Knot):undefined} callback
     * @return {!Knot<HTMLInputElement>}
     */
    private _renderAdvancedInput;
    /**
     * @private
     * @return {undefined}
     */
    private _renderMap;
    /**
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId: string): void;
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
     */
    setCustomMapStyle(mapTypeId: string, mapTypeName: string, mapStyles: Array<google.maps.MapTypeStyle | null>): void;
    /**
     * @private
     * @return {undefined}
     */
    private _setDefaultValue;
    /**
     * @param {number|null} latitude
     * @param {number|null} longitude
     * @return {undefined}
     */
    updatePosition(latitude: number | null, longitude: number | null): void;
    /**
     * @private
     * @param {!Object} value
     * @return {undefined}
     */
    private _setDataValue;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @param {string} address
     * @return {undefined}
     */
    eventSearch(address: string): void;
}
