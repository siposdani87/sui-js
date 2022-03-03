import { eq, typeCast, mdl, isNull } from '../utils/operation';
import { BaseField } from './baseField';
import { GoogleMap } from '../component/googleMap';
import { Item } from '../core/item';
import { consoleInfo } from '../utils/log';
import { generateId } from '../utils/coder';

/**
 * @class
 * @extends {BaseField}
 */
export class LocationField extends BaseField {
    icon: any;
    advancedButton: Item;
    map: any;
    mapLockNode: any;
    advancedNode: any;
    latitudeInput: Item;
    longitudeInput: Item;
    /**
     * @param {!Item} input
     * @param {!Item} label
     * @param {!Item} error
     * @param {!Item} inputBlock
     */
    constructor(input, label, error, inputBlock) {
        super(input, label, error, inputBlock);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
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
            this._setDataValue(/** @type {!Object} */ location);
            this.modelChange(location);
            return true;
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initButtons() {
        this._initSearchButton();
        this._initAdvancedButton();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initSearchButton() {
        const searchButton = new Item('a');
        searchButton.setAttribute('href', 'javascript:void(0)');
        searchButton.addClass(['search-button', 'material-icons']);
        searchButton.setHtml('pin_drop');
        searchButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                const inputNode = this.input.getNode();
                this.eventSearch(inputNode.value);
            }
        });
        this.actionContainerNode.appendChild(searchButton);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initAdvancedButton() {
        this.advancedButton = new Item('a');
        this.advancedButton.setAttribute('href', 'javascript:void(0)');
        this.advancedButton.addClass(['advanced-button', 'material-icons']);
        this.advancedButton.setHtml('settings');
        this.advancedButton.addEventListener('click', () => {
            if (this.isEnabled()) {
                this._toggleAdvancedInputs();
            }
        });
        this.actionContainerNode.appendChild(this.advancedButton);
    }
    /**
     * @param {string} address
     * @return {undefined}
     */
    search(address) {
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
     * @override
     * @return {undefined}
     */
    render() {
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
     * @override
     */
    refresh() {
        if (this.isDisabled()) {
            this.mapLockNode.addClass('map-lock');
        } else {
            this.mapLockNode.removeClass('map-lock');
        }
        mdl(this.inputBlock);
    }
    /**
     * @private
     * @return {undefined}
     */
    _toggleAdvancedInputs() {
        this.advancedButton.toggleClass('active');
        this.advancedNode.toggleClass('hidden');
    }
    /**
     * @private
     * @return {undefined}
     */
    _renderAdvancedInputs() {
        this.advancedNode = new Item('div');
        this.advancedNode.addClass(['advanced', 'row', 'hidden']);
        this.inputBlock.appendChild(this.advancedNode);

        this.latitudeInput = this._renderAdvancedInput(
            generateId('latitude'),
            /** @type {string} */ this.input.getData('latitude'),
            (inputNode) => {
                const location = /** @type {!Object} */ this.getValue();
                const latitude = inputNode.getNode().value;
                location['latitude'] = latitude;
                this.setValue(location);
            },
        );
        this.longitudeInput = this._renderAdvancedInput(
            generateId('longitude'),
            /** @type {string} */ this.input.getData('longitude'),
            (inputNode) => {
                const location = /** @type {!Object} */ this.getValue();
                const longitude = inputNode.getNode().value;
                location['longitude'] = longitude;
                this.setValue(location);
            },
        );
    }
    /**
     * @private
     * @param {string} id
     * @param {string} labelText
     * @param {function(!Item):undefined} callback
     * @return {!Item}
     */
    _renderAdvancedInput(id, labelText, callback) {
        const blockNode = new Item('div');
        blockNode.addClass('col-6');
        this.advancedNode.appendChild(blockNode);

        const boxNode = new Item('div');
        boxNode.addClass([
            'mdl-textfield',
            'mdl-js-textfield',
            'mdl-textfield--floating-label',
        ]);
        blockNode.appendChild(boxNode);

        const advancedLabel = new Item('label');
        advancedLabel.setFor(id);
        advancedLabel.addClass('mdl-textfield__label');
        advancedLabel.setHtml(labelText);
        boxNode.appendChild(advancedLabel);

        const advancedInput = new Item('input');
        advancedInput.setId(id);
        advancedInput.setAttribute('type', 'text');
        advancedInput.addClass('mdl-textfield__input');
        boxNode.appendChild(advancedInput);

        this._setAdditionalLabel(advancedLabel);
        advancedInput.addEventListener('change', (input) => {
            callback(input);
            return true;
        });

        return advancedInput;
    }
    /**
     * @private
     * @return {undefined}
     */
    _renderMap() {
        const mapNode = new Item('div');
        mapNode.addClass('map');
        this.inputBlock.appendChild(mapNode);

        this.mapLockNode = new Item('div');
        this.mapLockNode.addClass('map-lock');
        this.inputBlock.appendChild(this.mapLockNode);

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
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId) {
        this.map.setMapType(mapTypeId);
    }
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
     */
    setCustomMapStyle(mapTypeId, mapTypeName, mapStyles) {
        this.map.setCustomMapStyle(mapTypeId, mapTypeName, mapStyles);
    }
    /**
     * @private
     * @return {undefined}
     */
    _setDefaultValue() {
        const location = /** @type {!Object} */ this.getValue();
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
     * @param {number|null} latitude
     * @param {number|null} longitude
     * @return {undefined}
     */
    updatePosition(latitude, longitude) {
        const location = /** @type {!Object} */ this.getValue();
        location['latitude'] = latitude;
        location['longitude'] = longitude;
        this.setValue(location);
    }
    /**
     * @private
     * @param {!Object} value
     * @return {undefined}
     */
    _setDataValue(value) {
        this.latitudeInput.getNode().value = value['latitude'] || '';
        this.longitudeInput.getNode().value = value['longitude'] || '';
        this.input.setAttribute('value', value['address'] || '');
        this.input.setData('value', value);
    }
    /**
     * @override
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
     * @return {undefined}
     */
    setValue(value) {
        this._setDataValue(/** @type {!Object} */ value);
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
    /**
     * @override
     * @return {*}
     */
    getValue() {
        const value = this.input.getData('value');
        return typeCast(value);
    }
    /**
     * @param {string} address
     * @return {undefined}
     */
    eventSearch(address) {
        consoleInfo('Location.eventSearch()', address);
    }
}
