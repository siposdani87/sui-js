/// <reference types="google.maps" />
import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Item } from '../core/item';
import { IconOptions } from '../utils';
/**
 * @class
 * @extends {BaseField}
 */
export declare class LocationField extends BaseField {
    icon: IconOptions;
    advancedButton: Item;
    map: GoogleMap;
    mapLockNode: Item;
    advancedNode: Item;
    latitudeInput: Item<HTMLInputElement>;
    longitudeInput: Item<HTMLInputElement>;
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
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initButtons(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initSearchButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initAdvancedButton(): void;
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
    _toggleAdvancedInputs(): void;
    /**
     * @private
     * @return {undefined}
     */
    _renderAdvancedInputs(): void;
    /**
     * @private
     * @param {string} id
     * @param {string} labelText
     * @param {function(!Item):undefined} callback
     * @return {!Item<HTMLInputElement>}
     */
    _renderAdvancedInput(id: string, labelText: string, callback: (arg0: Item<HTMLInputElement>) => void): Item<HTMLInputElement>;
    /**
     * @private
     * @return {undefined}
     */
    _renderMap(): void;
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
    _setDefaultValue(): void;
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
    _setDataValue(value: Object): void;
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
