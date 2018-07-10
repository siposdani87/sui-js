goog.provide('SUI.widget.Location');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Location}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Location = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Location, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._init = function() {
  this.inputBlock.addClass('location-widget');
  this._initButtons();

  this.icon = this.input.getData('icon');

  this.input.addEventListener('keyup', (input, event) => {
    let inputNode = input.getNode();

    if (SUI.eq(event.keyCode, 13)) {
      this._search(inputNode.value);
    } else {
      input.trigger('change');
    }
  });

  this.input.addEventListener('change', (input) => {
    let inputNode = input.getNode();
    let location = this.getValue();
    location['address'] = SUI.typeCast(inputNode.value);
    this._setDataValue(/** @type {!Object} */(location));
    this.modelChange(location);
    this.checkValidity();
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._initButtons = function() {
  this._initSearchButton();
  this._initAdvancedButton();
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._initSearchButton = function() {
  let searchButton = new SUI.Node('a');
  searchButton.setAttribute('href', 'javascript:void(0)');
  searchButton.addClass(['search-button', 'material-icons']);
  searchButton.setHtml('pin_drop');
  searchButton.addEventListener('click', () => {
    let inputNode = this.input.getNode();
    this._search(inputNode.value);
  });
  this.inputBlock.appendChild(searchButton);
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._initAdvancedButton = function() {
  this.advancedButton = new SUI.Node('a');
  this.advancedButton.setAttribute('href', 'javascript:void(0)');
  this.advancedButton.addClass(['advanced-button', 'material-icons']);
  this.advancedButton.setHtml('settings');
  this.advancedButton.addEventListener('click', () => {
    this._toggleAdvancedInputs();
  });
  this.inputBlock.appendChild(this.advancedButton);
};

/**
 * @private
 * @param {string} address
 * @return {undefined}
 */
SUI.widget.Location.prototype._search = function(address) {
  this.map.searchAddress(address).then((locations) => {
    let position = locations[0];
    let location = {
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
SUI.widget.Location.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass('mdl-textfield__input');
  if (this.label) {
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
SUI.widget.Location.prototype.refresh = function() {
  SUI.mdl(this.inputBlock);
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._toggleAdvancedInputs = function() {
  this.advancedButton.toggleClass('active');
  this.advancedNode.toggleClass('hidden');
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._renderAdvancedInputs = function() {
  this.advancedNode = new SUI.Node('div');
  this.advancedNode.addClass(['advanced', 'hidden']);
  this.inputBlock.appendChild(this.advancedNode);

  this._renderLatitudeInput();
  this._renderLongitudeInput();
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._renderLatitudeInput = function() {
  let latitudeNode = new SUI.Node('div');
  latitudeNode.addClass(['mdl-textfield', 'mdl-js-textfield', 'col-6']);
  this.advancedNode.appendChild(latitudeNode);

  this.latitudeInput = new SUI.Node('input');
  this.latitudeInput.setAttribute('type', 'text');
  this.latitudeInput.addClass('mdl-textfield__input');
  latitudeNode.appendChild(this.latitudeInput);

  this.latitudeInput.addEventListener('change', (inputNode) => {
    let latitude = inputNode.getNode().value;
    let location = /** @type {!Object} */ (this.getValue());
    location['latitude'] = latitude;
    this.setValue(location);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._renderLongitudeInput = function() {
  let longitudeNode = new SUI.Node('div');
  longitudeNode.addClass(['mdl-textfield', 'mdl-js-textfield', 'col-6']);
  this.advancedNode.appendChild(longitudeNode);

  this.longitudeInput = new SUI.Node('input');
  this.longitudeInput.setAttribute('type', 'text');
  this.longitudeInput.addClass('mdl-textfield__input');
  longitudeNode.appendChild(this.longitudeInput);

  this.longitudeInput.addEventListener('change', (inputNode) => {
    let longitude = inputNode.getNode().value;
    let location = /** @type {!Object} */ (this.getValue());
    location['longitude'] = longitude;
    this.setValue(location);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._renderMap = function() {
  let mapNode = new SUI.Node('div');
  mapNode.addClass('map');

  this.inputBlock.appendChild(mapNode);

  this.map = new SUI.GoogleMap(this.inputBlock);
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
  this.map.eventMarkerChanged = (data, latitude, longitude) => {
    this.updatePosition(latitude, longitude);
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._setDefaultValue = function() {
  let location = /** @type {!Object} */ (this.getValue());
  if (!SUI.isNull(location['latitude']) && !SUI.isNull(location['longitude'])) {
    this.map.setCenter(location['latitude'], location['longitude']);
    this.map.createMarker(0, '', 'marker', location['latitude'], location['longitude']);
    this._setDataValue(location);
  }

  setTimeout(() => {
    this.map.triggerResize();
  }, 500);
};

/**
 * @param {number|null} latitude
 * @param {number|null} longitude
 * @return {undefined}
 */
SUI.widget.Location.prototype.updatePosition = function(latitude, longitude) {
  let location = /** @type {!Object} */ (this.getValue());
  location['latitude'] = latitude;
  location['longitude'] = longitude;
  this.setValue(location);
};

/**
 * @private
 * @param {!Object} value
 * @return {undefined}
 */
SUI.widget.Location.prototype._setDataValue = function(value) {
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
SUI.widget.Location.prototype.setValue = function(value) {
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
SUI.widget.Location.prototype.getValue = function() {
  let value = this.input.getData('value');
  return SUI.typeCast(value);
};
