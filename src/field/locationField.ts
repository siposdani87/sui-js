import { eq, typeCast, isNull } from '../utils/operation';
import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Knot } from '../core/knot';
import { consoleDebug } from '../utils/log';
import { generateId } from '../utils/coder';
import { IconOptions } from '../utils';
import { mdl } from '../utils/render';

export class LocationField extends BaseField<HTMLInputElement> {
    icon: IconOptions;
    advancedButton: Knot;
    map: GoogleMap;
    mapLockKnot: Knot;
    advancedKnot: Knot;
    latitudeInput: Knot<HTMLInputElement>;
    longitudeInput: Knot<HTMLInputElement>;

    constructor(
        input: Knot<HTMLInputElement>,
        label: Knot,
        error: Knot,
        inputBlock: Knot,
    ) {
        super(input, label, error, inputBlock);
        this._init();
    }

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
            const location = this.getValue();
            location['address'] = typeCast(inputNode.value);
            this._setDataValue(location);
            this.modelChange(location);
            return true;
        });
    }

    private _initButtons(): void {
        this._initSearchButton();
        this._initAdvancedButton();
    }

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

    render(): void {
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

    refresh() {
        if (this.isDisabled()) {
            this.mapLockKnot.addClass('map-lock');
        } else {
            this.mapLockKnot.removeClass('map-lock');
        }
        mdl(this.inputBlock);
    }

    private _toggleAdvancedInputs(): void {
        this.advancedButton.toggleClass('active');
        this.advancedKnot.toggleClass('hidden');
    }

    private _renderAdvancedInputs(): void {
        this.advancedKnot = new Knot('div');
        this.advancedKnot.addClass(['advanced', 'row', 'hidden']);
        this.inputBlock.appendChild(this.advancedKnot);

        this.latitudeInput = this._renderAdvancedInput(
            generateId('latitude'),
            this.input.getData('latitude'),
            (inputKnot) => {
                const location = this.getValue();
                const latitude = inputKnot.getNode().value;
                location['latitude'] = latitude;
                this.setValue(location);
            },
        );
        this.longitudeInput = this._renderAdvancedInput(
            generateId('longitude'),
            this.input.getData('longitude'),
            (inputKnot) => {
                const location = this.getValue();
                const longitude = inputKnot.getNode().value;
                location['longitude'] = longitude;
                this.setValue(location);
            },
        );
    }

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

    setMapType(mapTypeId: string): void {
        this.map.setMapType(mapTypeId);
    }

    setCustomMapStyle(
        mapTypeId: string,
        mapTypeName: string,
        mapStyles: Array<google.maps.MapTypeStyle | null>,
    ): void {
        this.map.setCustomMapStyle(mapTypeId, mapTypeName, mapStyles);
    }

    private _setDefaultValue(): void {
        const location = this.getValue();
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

    updatePosition(latitude: number | null, longitude: number | null): void {
        const location = this.getValue();
        location['latitude'] = latitude;
        location['longitude'] = longitude;
        this.setValue(location);
    }

    private _setDataValue(value: object): void {
        this.latitudeInput.getNode().value = value['latitude'] || '';
        this.longitudeInput.getNode().value = value['longitude'] || '';
        this.input.setAttribute('value', value['address'] || '');
        this.input.setData('value', value);
    }

    setValue(
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
        this._setDataValue(value as object);
        this.map.removeMarker(0);
        if (!isNull(value['latitude']) && !isNull(value['longitude'])) {
            this.map.setCenter(value['latitude'], value['longitude']);
            if (this.map.getMarker(0)) {
                this.map.updateMarker(
                    0,
                    '',
                    'marker',
                    value['latitude'],
                    value['longitude'],
                );
            } else {
                this.map.createMarker(
                    0,
                    '',
                    'marker',
                    value['latitude'],
                    value['longitude'],
                );
            }
        }
        this.input.trigger('change');
    }

    getValue(): any {
        const value = this.input.getData('value');
        return typeCast(value);
    }

    eventSearch(address: string): void {
        consoleDebug('Location.eventSearch()', address);
    }
}
