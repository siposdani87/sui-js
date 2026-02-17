import { eq, typeCast, isNull } from '../utils/operation';
import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Knot } from '../core/knot';
import { consoleDebug } from '../utils/log';
import { generateId } from '../utils/coder';
import { IconOptions } from '../utils';
import { mdl } from '../utils/render';

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
export class LocationField extends BaseField<HTMLInputElement> {
    /** Icon options for the map marker, read from the input's `data-icon` attribute. */
    icon!: IconOptions;
    /** Button element that toggles the advanced lat/lng inputs. */
    advancedButton!: Knot;
    /** Embedded {@link GoogleMap} instance for location selection. */
    map!: GoogleMap;
    /** Overlay element that prevents map interaction when the field is disabled. */
    mapLockKnot!: Knot;
    /** Container for the advanced latitude/longitude input elements. */
    advancedKnot!: Knot;
    /** Text input for manual latitude entry. */
    latitudeInput!: Knot<HTMLInputElement>;
    /** Text input for manual longitude entry. */
    longitudeInput!: Knot<HTMLInputElement>;

    /**
     * @param input The underlying `<input>` element wrapped in a {@link Knot}.
     * @param label The associated label element.
     * @param error The element used to display validation errors.
     * @param inputBlock The block-level container wrapping the entire field.
     */
    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

    /**
     * Initializes buttons, icon options, and address/change event listeners.
     */
    private _init(): void {
        this.inputBlock.addClass('location-field');
        this._initButtons();

        this.icon = this.input.getData('icon');

        this.input.addEventListener('keyup', (input, event) => {
            const inputNode = input.getNode();

            if (eq(event.keyCode, 13)) {
                this.eventSearch(inputNode.value);
            } else {
                input.trigger('change');
            }
            return true;
        });

        this.input.addEventListener('change', (input) => {
            const inputNode = input.getNode();
            const location = this.getValue() as Record<string, any>;
            location['address'] = typeCast(inputNode.value);
            this._setDataValue(location);
            this.modelChange(location);
            return true;
        });
    }

    /**
     * Creates the search and advanced-toggle action buttons.
     */
    private _initButtons(): void {
        this._initSearchButton();
        this._initAdvancedButton();
    }

    /**
     * Creates the search button and binds its click to trigger geocoding.
     */
    private _initSearchButton(): void {
        const searchButton = new Knot('a');
        searchButton.setAttribute('href', 'javascript:void(0)');
        searchButton.addClass(['search-button', 'material-icons']);
        searchButton.setHtml('pin_drop');
        searchButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                const inputNode = this.input.getNode();
                this.eventSearch(inputNode.value);
            }
        });
        this.actionContainerKnot.appendChild(searchButton);
    }

    /**
     * Creates the advanced-toggle button that shows/hides lat/lng inputs.
     */
    private _initAdvancedButton(): void {
        this.advancedButton = new Knot('a');
        this.advancedButton.setAttribute('href', 'javascript:void(0)');
        this.advancedButton.addClass(['advanced-button', 'material-icons']);
        this.advancedButton.setHtml('settings');
        this.advancedButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                this._toggleAdvancedInputs();
            }
        });
        this.actionContainerKnot.appendChild(this.advancedButton);
    }

    /**
     * Geocodes the given address using the embedded map and updates the
     * field value with the first result.
     *
     * @param address The address string to geocode.
     *
     * @example
     * locationField.search('Budapest, Hungary');
     */
    search(address: string): void {
        this.map.searchAddress(address).then(
            (locations) => {
                const position = locations[0];
                const location = {
                    address: typeCast(address),
                    latitude: position['latitude'],
                    longitude: position['longitude'],
                };
                this.setValue(location);
            },
            () => {
                // this.setError('No location', true);
            },
        );
    }

    /**
     * Applies MDL text-field classes, renders the advanced inputs, map, and
     * default value, then refreshes the visual state.
     *
     * @override
     */
    override render(): void {
        this.inputBlock.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        this.input.addClass('mdl-textfield__input');
        if (this.label && this.label.exists()) {
            this.label.addClass('mdl-textfield__label');
        }

        this._renderAdvancedInputs();
        this._renderMap();
        this._setDefaultValue();

        this.refresh();
    }

    /**
     * Toggles the map lock overlay based on the disabled state and upgrades
     * MDL components.
     *
     * @override
     */
    override refresh() {
        if (this.isDisabled()) {
            this.mapLockKnot.addClass('map-lock');
        } else {
            this.mapLockKnot.removeClass('map-lock');
        }
        mdl(this.inputBlock);
    }

    /**
     * Toggles visibility of the advanced latitude/longitude input panel.
     */
    private _toggleAdvancedInputs(): void {
        this.advancedButton.toggleClass('active');
        this.advancedKnot.toggleClass('hidden');
    }

    /**
     * Creates the advanced panel containing latitude and longitude inputs.
     */
    private _renderAdvancedInputs(): void {
        this.advancedKnot = new Knot('div');
        this.advancedKnot.addClass(['advanced', 'row', 'hidden']);
        this.inputBlock.appendChild(this.advancedKnot);

        this.latitudeInput = this._renderAdvancedInput(
            generateId('latitude'),
            this.input.getData('latitude'),
            (inputKnot) => {
                const location = this.getValue() as Record<string, any>;
                const latitude = inputKnot.getNode().value;
                location['latitude'] = latitude;
                this.setValue(location);
            },
        );
        this.longitudeInput = this._renderAdvancedInput(
            generateId('longitude'),
            this.input.getData('longitude'),
            (inputKnot) => {
                const location = this.getValue() as Record<string, any>;
                const longitude = inputKnot.getNode().value;
                location['longitude'] = longitude;
                this.setValue(location);
            },
        );
    }

    /**
     * Creates a single labelled MDL text input for the advanced panel.
     *
     * @param id Unique DOM id for the input element.
     * @param labelText Display label for the input.
     * @param callback Handler invoked on change with the input {@link Knot}.
     * @returns The created input {@link Knot}.
     */
    private _renderAdvancedInput(
        id: string,
        labelText: string,
        callback: (arg0: Knot<HTMLInputElement>) => void,
    ): Knot<HTMLInputElement> {
        const blockKnot = new Knot('div');
        blockKnot.addClass('col-6');
        this.advancedKnot.appendChild(blockKnot);

        const boxKnot = new Knot('div');
        boxKnot.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        blockKnot.appendChild(boxKnot);

        const advancedLabel = new Knot<HTMLLabelElement>('label');
        advancedLabel.setFor(id);
        advancedLabel.addClass('mdl-textfield__label');
        advancedLabel.setHtml(labelText);
        boxKnot.appendChild(advancedLabel);

        const advancedInput = new Knot<HTMLInputElement>('input');
        advancedInput.setId(id);
        advancedInput.setAttribute('type', 'text');
        advancedInput.addClass('mdl-textfield__input');
        boxKnot.appendChild(advancedInput);

        this._setAdditionalLabel(advancedLabel);
        advancedInput.addEventListener('change', (input) => {
            callback(input);
            return true;
        });

        return advancedInput;
    }

    /**
     * Creates the map container and embedded {@link GoogleMap}, configuring
     * marker icons and map interaction events.
     */
    private _renderMap(): void {
        const mapKnot = new Knot('div');
        mapKnot.addClass('map');
        this.inputBlock.appendChild(mapKnot);

        this.mapLockKnot = new Knot('div');
        this.mapLockKnot.addClass('map-lock');
        this.inputBlock.appendChild(this.mapLockKnot);

        this.map = new GoogleMap(this.inputBlock, '.map', {
            zoom: 12,
            scrollwheel: true,
        });
        this.map.setMarkers({
            draggable: true,
        });
        this.map.setMarkerIcon('marker', this.icon);
        this.map.eventMapClick = (latitude, longitude) => {
            this.updatePosition(latitude, longitude);
        };
        this.map.eventMarkerRightClick = () => {
            this.updatePosition(null, null);
        };
        this.map.eventMarkerChanged = (_data, latitude, longitude) => {
            this.updatePosition(latitude, longitude);
        };
    }

    /**
     * Changes the map type (e.g. satellite, terrain) on the embedded map.
     *
     * @param mapTypeId The Google Maps map type identifier.
     *
     * @example
     * locationField.setMapType('satellite');
     */
    setMapType(mapTypeId: string): void {
        this.map.setMapType(mapTypeId);
    }

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
    setCustomMapStyle(
        mapTypeId: string,
        mapTypeName: string,
        mapStyles: Array<google.maps.MapTypeStyle | null>,
    ): void {
        this.map.setCustomMapStyle(mapTypeId, mapTypeName, mapStyles);
    }

    /**
     * Reads the initial location from the field value and places a marker
     * on the map if coordinates are present.
     */
    private _setDefaultValue(): void {
        const location = this.getValue() as Record<string, any>;
        if (!isNull(location['latitude']) && !isNull(location['longitude'])) {
            this.map.setCenter(location['latitude'], location['longitude']);
            this.map.createMarker(
                0,
                '',
                'marker',
                location['latitude'],
                location['longitude'],
            );
            this._setDataValue(location);
        }
    }

    /**
     * Updates the stored latitude/longitude and refreshes the marker.
     *
     * @param latitude The new latitude, or `null` to clear.
     * @param longitude The new longitude, or `null` to clear.
     *
     * @example
     * locationField.updatePosition(47.4979, 19.0402);
     */
    updatePosition(latitude: number | null, longitude: number | null): void {
        const location = this.getValue() as Record<string, any>;
        location['latitude'] = latitude;
        location['longitude'] = longitude;
        this.setValue(location);
    }

    /**
     * Synchronizes the location data into the advanced inputs and the
     * hidden input's data attribute.
     *
     * @param value Location object with `address`, `latitude`, and `longitude` keys.
     */
    private _setDataValue(value: Record<string, any>): void {
        this.latitudeInput.getNode().value = value['latitude'] || '';
        this.longitudeInput.getNode().value = value['longitude'] || '';
        this.input.setAttribute('value', value['address'] || '');
        this.input.setData('value', value);
    }

    /**
     * Sets the location value, updates the advanced inputs, repositions the
     * map center and marker, and triggers a change event.
     *
     * @param value A location object with `address`, `latitude`, and `longitude` keys.
     * @override
     */
    override setValue(
        value:
            | object
            | Function
            | Array<any>
            | boolean
            | number
            | string
            | null
            | undefined,
    ): void {
        const loc = value as Record<string, any>;
        this._setDataValue(loc);
        this.map.removeMarker(0);
        if (!isNull(loc['latitude']) && !isNull(loc['longitude'])) {
            this.map.setCenter(loc['latitude'], loc['longitude']);
            if (this.map.getMarker(0)) {
                this.map.updateMarker(
                    0,
                    '',
                    'marker',
                    loc['latitude'],
                    loc['longitude'],
                );
            } else {
                this.map.createMarker(
                    0,
                    '',
                    'marker',
                    loc['latitude'],
                    loc['longitude'],
                );
            }
        }
        this.input.trigger('change');
    }

    /**
     * Returns the current location object stored in the input's data attribute.
     *
     * @returns The location object with `address`, `latitude`, and `longitude`.
     * @override
     */
    override getValue(): any {
        const value = this.input.getData('value');
        return typeCast(value);
    }

    /**
     * Overridable event callback invoked when the user triggers an address
     * search via Enter key or the search button.
     *
     * @param address The address string entered by the user.
     */
    eventSearch(address: string): void {
        consoleDebug('Location.eventSearch()', address);
    }
}
