goog.provide('SUI.Location');

goog.require('SUI');
goog.require('SUI.GoogleMap');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Location}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.Location = function(input, label, error, inputBlock) {
  SUI.Location.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.Location, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._init = function() {
  this.inputBlock.addClass('location-widget');
  this._initButtons();

  this.icon = this.input.getData('icon');

  this.input.addEventListener('keyup', (input, event) => {
    const inputNode = input.getNode();

    if (SUI.eq(event.keyCode, 13)) {
      this.eventSearch(inputNode.value);
    } else {
      input.trigger('change');
    }
    return true;
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    const location = this.getValue();
    location['address'] = SUI.typeCast(inputNode.value);
    this._setDataValue(/** @type {!Object} */(location));
    this.modelChange(location);
    return true;
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._initButtons = function() {
  this._initSearchButton();
  this._initAdvancedButton();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._initSearchButton = function() {
  const searchButton = new SUI.Node('a');
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
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._initAdvancedButton = function() {
  this.advancedButton = new SUI.Node('a');
  this.advancedButton.setAttribute('href', 'javascript:void(0)');
  this.advancedButton.addClass(['advanced-button', 'material-icons']);
  this.advancedButton.setHtml('settings');
  this.advancedButton.addEventListener('click', () => {
    if (this.isEnabled()) {
      this._toggleAdvancedInputs();
    }
  });
  this.actionContainerNode.appendChild(this.advancedButton);
};

/**
 * @param {string} address
 * @return {undefined}
 */
SUI.Location.prototype.search = function(address) {
  this.map.searchAddress(address).then((locations) => {
    const position = locations[0];
    const location = {
      'address': SUI.typeCast(address),
      'latitude': position['latitude'],
      'longitude': position['longitude'],
    };
    this.setValue(location);
  }, () => {
    // this.setError('No location', true);
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.Location.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass('mdl-textfield__input');
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }

  this._renderAdvancedInputs();
  this._renderMap();
  this._setDefaultValue();

  this.refresh();
};

/**
 * @override
 */
SUI.Location.prototype.refresh = function() {
  if (this.isDisabled()) {
    this.mapLockNode.addClass('map-lock');
  } else {
    this.mapLockNode.removeClass('map-lock');
  }
  SUI.mdl(this.inputBlock);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._toggleAdvancedInputs = function() {
  this.advancedButton.toggleClass('active');
  this.advancedNode.toggleClass('hidden');
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._renderAdvancedInputs = function() {
  this.advancedNode = new SUI.Node('div');
  this.advancedNode.addClass(['advanced', 'row', 'hidden']);
  this.inputBlock.appendChild(this.advancedNode);

  this.latitudeInput = this._renderAdvancedInput(SUI.generateId('latitude'), /** @type {string} */ (this.input.getData('latitude')), (inputNode) => {
    const location = /** @type {!Object} */ (this.getValue());
    const latitude = inputNode.getNode().value;
    location['latitude'] = latitude;
    this.setValue(location);
  });
  this.longitudeInput = this._renderAdvancedInput(SUI.generateId('longitude'), /** @type {string} */ (this.input.getData('longitude')), (inputNode) => {
    const location = /** @type {!Object} */ (this.getValue());
    const longitude = inputNode.getNode().value;
    location['longitude'] = longitude;
    this.setValue(location);
  });
};

/**
 * @private
 * @param {string} id
 * @param {string} labelText
 * @param {function(!SUI.Node):undefined} callback
 * @return {!SUI.Node}
 */
SUI.Location.prototype._renderAdvancedInput = function(id, labelText, callback) {
  const blockNode = new SUI.Node('div');
  blockNode.addClass('col-6');
  this.advancedNode.appendChild(blockNode);

  const boxNode = new SUI.Node('div');
  boxNode.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  blockNode.appendChild(boxNode);

  const advancedLabel = new SUI.Node('label');
  advancedLabel.setFor(id);
  advancedLabel.addClass('mdl-textfield__label');
  advancedLabel.setHtml(labelText);
  boxNode.appendChild(advancedLabel);

  const advancedInput = new SUI.Node('input');
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
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._renderMap = function() {
  const mapNode = new SUI.Node('div');
  mapNode.addClass('map');
  this.inputBlock.appendChild(mapNode);

  this.mapLockNode = new SUI.Node('div');
  this.mapLockNode.addClass('map-lock');
  this.inputBlock.appendChild(this.mapLockNode);

  this.map = new SUI.GoogleMap(this.inputBlock, '.map', {
    zoom: 12,
    scrollwheel: true,
  });
  this.map.setMarkers({
    'draggable': true,
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
};

/**
 * @param {string} mapTypeId
 * @return {undefined}
 */
SUI.Location.prototype.setMapType = function(mapTypeId) {
  this.map.setMapType(mapTypeId);
};

/**
 * @param {string} mapTypeId
 * @param {string} mapTypeName
 * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
 * @return {undefined}
 */
SUI.Location.prototype.setCustomMapStyle = function(mapTypeId, mapTypeName, mapStyles) {
  this.map.setCustomMapStyle(mapTypeId, mapTypeName, mapStyles);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Location.prototype._setDefaultValue = function() {
  const location = /** @type {!Object} */ (this.getValue());
  if (!SUI.isNull(location['latitude']) && !SUI.isNull(location['longitude'])) {
    this.map.setCenter(location['latitude'], location['longitude']);
    this.map.createMarker(0, '', 'marker', location['latitude'], location['longitude']);
    this._setDataValue(location);
  }
};

/**
 * @param {number|null} latitude
 * @param {number|null} longitude
 * @return {undefined}
 */
SUI.Location.prototype.updatePosition = function(latitude, longitude) {
  const location = /** @type {!Object} */ (this.getValue());
  location['latitude'] = latitude;
  location['longitude'] = longitude;
  this.setValue(location);
};

/**
 * @private
 * @param {!Object} value
 * @return {undefined}
 */
SUI.Location.prototype._setDataValue = function(value) {
  this.latitudeInput.getNode().value = value['latitude'] || '';
  this.longitudeInput.getNode().value = value['longitude'] || '';
  this.input.setAttribute('value', value['address'] || '');
  this.input.setData('value', value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.Location.prototype.setValue = function(value) {
  this._setDataValue(/** @type {!Object} */(value));
  this.map.removeMarker(0);
  if (!SUI.isNull(value['latitude']) && !SUI.isNull(value['longitude'])) {
    this.map.setCenter(value['latitude'], value['longitude']);
    if (this.map.getMarker(0)) {
      this.map.updateMarker(0, '', 'marker', value['latitude'], value['longitude']);
    } else {
      this.map.createMarker(0, '', 'marker', value['latitude'], value['longitude']);
    }
  }
  this.input.trigger('change');
};

/**
 * @override
 * @return {*}
 */
SUI.Location.prototype.getValue = function() {
  const value = this.input.getData('value');
  return SUI.typeCast(value);
};

/**
 * @param {string} address
 * @return {undefined}
 */
SUI.Location.prototype.eventSearch = function(address) {
  SUI.consoleInfo('SUI.Location.eventSearch()', address);
};
