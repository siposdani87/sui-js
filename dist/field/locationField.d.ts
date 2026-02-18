import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Knot } from '../core/knot';
import { IconOptions } from '../utils';
/**
 * Location picker field with an embedded {@link GoogleMap}, geocoding search,
 * and manual latitude/longitude inputs.  The user can search for an address,
 * click the map, or drag a marker to set the location.
 *
 * @example
 * const input = new Query<HTMLInputElement>('input.location', formKnot).getKnot();
 * const field = new LocationField(input, label, error, inputBlock);
 * field.render();
 * field.eventSearch = (address) => field.search(address);
 *
 * @see {@link BaseField}
 * @see {@link GoogleMap}
 * @category Field
 */
export declare class LocationField extends BaseField<HTMLInputElement> {
    /** Icon options for the map marker, read from the input's `data-icon` attribute. */
    icon: IconOptions;
    /** Button element that toggles the advanced lat/lng inputs. */
    advancedButton: Knot;
    /** Embedded {@link GoogleMap} instance for location selection. */
    map: GoogleMap;
    /** Overlay element that prevents map interaction when the field is disabled. */
    mapLockKnot: Knot;
    /** Container for the advanced latitude/longitude input elements. */
    advancedKnot: Knot;
    /** Text input for manual latitude entry. */
    latitudeInput: Knot<HTMLInputElement>;
    /** Text input for manual longitude entry. */
    longitudeInput: Knot<HTMLInputElement>;
    /**
     * @param input The underlying `<input>` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     */
    constructor(input: Knot<HTMLInputElement>, label: Knot, error: Knot, inputBlock: Knot);
    /**
     * Initializes buttons, icon options, and address/change event listeners.
     */
    private _init;
    /**
     * Creates the search and advanced-toggle action buttons.
     */
    private _initButtons;
    /**
     * Creates the search button and binds its click to trigger geocoding.
     */
    private _initSearchButton;
    /**
     * Creates the advanced-toggle button that shows/hides lat/lng inputs.
     */
    private _initAdvancedButton;
    /**
     * Geocodes the given address using the embedded map and updates the
     * field value with the first result.
     *
     * @param address The address string to geocode.
     *
     * @example
     * locationField.search('Budapest, Hungary');
     */
    search(address: string): void;
    /**
     * Applies MDL text-field classes, renders the advanced inputs, map, and
     * default value, then refreshes the visual state.
     *
     * @override
     */
    render(): void;
    /**
     * Toggles the map lock overlay based on the disabled state and upgrades
     * MDL components.
     *
     * @override
     */
    refresh(): void;
    /**
     * Toggles visibility of the advanced latitude/longitude input panel.
     */
    private _toggleAdvancedInputs;
    /**
     * Creates the advanced panel containing latitude and longitude inputs.
     */
    private _renderAdvancedInputs;
    /**
     * Creates a single labelled MDL text input for the advanced panel.
     *
     * @param id Unique DOM id for the input element.
     * @param labelText Display label for the input.
     * @param callback Handler invoked on change with the input {@link Knot}.
     * @returns The created input {@link Knot}.
     */
    private _renderAdvancedInput;
    /**
     * Creates the map container and embedded {@link GoogleMap}, configuring
     * marker icons and map interaction events.
     */
    private _renderMap;
    /**
     * Changes the map type (e.g. satellite, terrain) on the embedded map.
     *
     * @param mapTypeId The Google Maps map type identifier.
     *
     * @example
     * locationField.setMapType('satellite');
     */
    setMapType(mapTypeId: string): void;
    /**
     * Applies a custom styled map type to the embedded map.
     *
     * @param mapTypeId Unique identifier for the custom map type.
     * @param mapTypeName Display name shown in the map type selector.
     * @param mapStyles Array of Google Maps style rules.
     *
     * @example
     * locationField.setCustomMapStyle('dark', 'Dark Mode', darkStyles);
     */
    setCustomMapStyle(mapTypeId: string, mapTypeName: string, mapStyles: Array<google.maps.MapTypeStyle | null>): void;
    /**
     * Reads the initial location from the field value and places a marker
     * on the map if coordinates are present.
     */
    private _setDefaultValue;
    /**
     * Updates the stored latitude/longitude and refreshes the marker.
     *
     * @param latitude The new latitude, or `null` to clear.
     * @param longitude The new longitude, or `null` to clear.
     *
     * @example
     * locationField.updatePosition(47.4979, 19.0402);
     */
    updatePosition(latitude: number | null, longitude: number | null): void;
    /**
     * Synchronizes the location data into the advanced inputs and the
     * hidden input's data attribute.
     *
     * @param value Location object with `address`, `latitude`, and `longitude` keys.
     */
    private _setDataValue;
    /**
     * Sets the location value, updates the advanced inputs, repositions the
     * map center and marker, and triggers a change event.
     *
     * @param value A location object with `address`, `latitude`, and `longitude` keys.
     * @override
     */
    setValue(value: object | Array<unknown> | boolean | number | string | null | undefined): void;
    /**
     * Returns the current location object stored in the input's data attribute.
     *
     * @returns The location object with `address`, `latitude`, and `longitude`.
     * @override
     */
    getValue(): any;
    /**
     * Overridable event callback invoked when the user triggers an address
     * search via Enter key or the search button.
     *
     * @param address The address string entered by the user.
     */
    eventSearch(address: string): void;
}
