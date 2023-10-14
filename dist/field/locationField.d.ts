/// <reference types="google.maps" />
import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Knot } from '../core/knot';
import { IconOptions } from '../utils';
export declare class LocationField extends BaseField<HTMLInputElement> {
    icon: IconOptions;
    advancedButton: Knot;
    map: GoogleMap;
    mapLockKnot: Knot;
    advancedKnot: Knot;
    latitudeInput: Knot<HTMLInputElement>;
    longitudeInput: Knot<HTMLInputElement>;
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    private _init;
    private _initButtons;
    private _initSearchButton;
    private _initAdvancedButton;
    search(address: string): void;
    render(): void;
    refresh(): void;
    private _toggleAdvancedInputs;
    private _renderAdvancedInputs;
    private _renderAdvancedInput;
    private _renderMap;
    setMapType(mapTypeId: string): void;
    setCustomMapStyle(mapTypeId: string, mapTypeName: string, mapStyles: Array<google.maps.MapTypeStyle | null>): void;
    private _setDefaultValue;
    updatePosition(latitude: number | null, longitude: number | null): void;
    private _setDataValue;
    setValue(value: Object | Function | Array<any> | boolean | number | string | null | undefined): void;
    getValue(): any;
    eventSearch(address: string): void;
}
