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
    let address = inputNode.value;

    if (SUI.eq(event.keyCode, 13)) {
      this._search(address);
    } else {
      input.trigger('change');
    }
  });

  this.input.addEventListener('change', (input) => {
    let inputNode = input.getNode();
    let address = inputNode.value;
    let location = this.getValue();
    location['address'] = address;
    this.modelChange(location);
    this.checkValidity();
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Location.prototype._initButtons = function() {
  let upButton = new SUI.Node('a');
  upButton.setAttribute('href', 'javascript:void(0)');
  upButton.addClass(['pin-drop', 'material-icons']);
  upButton.setHtml('pin_drop');
  upButton.addEventListener('click', () => {
    let inputNode = this.input.getNode();
    let address = inputNode.value;
    this._search(address);
  });
  this.inputBlock.appendChild(upButton);
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
      'address': address,
      'latitude': position['latitude'],
      'longitude': position['longitude'],
    };
    this.setValue(location);
    this.modelChange(location);
    this.map.removeMarker(0);
    this.map.createMarker(0, '', 'marker', position['latitude'], position['longitude']);
    this.map.setCenter(position['latitude'], position['longitude']);
    this.checkValidity();
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
  SUI.mdl(this.inputBlock);

  let mapNode = new SUI.Node('div');
  mapNode.addClass('map');

  this.inputBlock.appendChild(mapNode);

  this.map = new SUI.GoogleMap(this.inputBlock);
  this.map.setMarkers({
    'draggable': true,
  });
  this.map.setMarkerIcon('marker', this.icon);
  this.map.eventMapClick = (latitude, longitude) => {
    this._updateValue(latitude, longitude);
    this.map.removeMarker(0);
    this.map.createMarker(0, '', 'marker', latitude, longitude);
  };
  this.map.eventMarkerRightClick = () => {
    this._updateValue(null, null);
    this.map.removeMarker(0);
  };
  this.map.eventMarkerChanged = (data, latitude, longitude) => {
    this._updateValue(latitude, longitude);
    this.map.updateMarker(0, '', 'marker', latitude, longitude);
  };

  let location = /** @type {!Object} */ (this.getValue());
  if (!SUI.isNull(location['latitude']) && !SUI.isNull(location['longitude'])) {
    this.map.createMarker(0, '', 'marker', location['latitude'], location['longitude']);
  }

  setTimeout(() => {
    this.map.triggerResize();
    this.map.setCenter(location['latitude'], location['longitude'], false);
  }, 500);
};

/**
 * @private
 * @param {number|null} latitude
 * @param {number|null} longitude
 * @return {undefined}
 */
SUI.widget.Location.prototype._updateValue = function(latitude, longitude) {
  let location = /** @type {!Object} */ (this.getValue());
  location['latitude'] = latitude;
  location['longitude'] = longitude;
  this.setValue(location);
};

/**
 * @override
 * @param {!Object|!Function|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Location.prototype.setValue = function(value) {
  this.input.setAttribute('value', value['address']);
  this.input.setData('value', value);
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
