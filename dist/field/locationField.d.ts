import { BaseField } from './baseField';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseField}
 */
export declare class LocationField extends BaseField {
    icon: any;
    advancedButton: Item;
    map: any;
    mapLockNode: any;
    advancedNode: any;
    latitudeInput: Item<HTMLInputElement>;
    longitudeInput: Item<HTMLInputElement>;
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
    search(address: any): void;
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
    _renderAdvancedInput(id: any, labelText: any, callback: any): Item<HTMLInputElement>;
    /**
     * @private
     * @return {undefined}
     */
    _renderMap(): void;
    /**
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId: any): void;
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
     */
    setCustomMapStyle(mapTypeId: any, mapTypeName: any, mapStyles: any): void;
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
    updatePosition(latitude: any, longitude: any): void;
    /**
     * @private
     * @param {!Object} value
     * @return {undefined}
     */
    _setDataValue(value: any): void;
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value: any): void;
    /**
     * @override
     * @return {*}
     */
    getValue(): any;
    /**
     * @param {string} address
     * @return {undefined}
     */
    eventSearch(address: any): void;
}
