goog.provide('SUI.GoogleMap');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.GoogleMap}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 * @param {!Object=} opt_options
 */
SUI.GoogleMap = function(dom, opt_selector = '.map', opt_options = {}) {
  this.mapNode = new SUI.Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @returns {undefined}
 */
SUI.GoogleMap.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    center: {
      lat: 47.6,
      lng: 17.533333
    },
    zoom: 8,
    scrollwheel: false,
    streetViewControl: false,
    //disableDefaultUI: true,
    scaleControl: true,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN] // 'custom'
    }
  });
  this.options.merge(opt_options);
  this.options = this.options.copy(true);
};

/**
 * @returns {!google.maps.StyledMapType}
 * @private
 */
SUI.GoogleMap.prototype._getCustomMapType = function() {

  var mapType = new google.maps.StyledMapType([
    {
      stylers: [
        //{hue: '#890000'},
        {visibility: 'simplified'}
        //{gamma: 0.5},
        //{weight: 0.5}
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {visibility: 'off'}
      ]
    }/*,
     {
     featureType: 'water',
     stylers: [
     {color: '#2196F3'}
     ]
     }*/
  ], {
    name: 'Custom'
  });

  return mapType;
};

/**
 * @private
 * @returns {undefined}
 */
SUI.GoogleMap.prototype._init = function() {

  this.markerIcons = {};
  this.markers = [];

  this.map = new google.maps.Map(this.mapNode.getNode(), this.options);

  var customMapType = this._getCustomMapType();
  this.map.mapTypes.set('custom', customMapType);


  this.map.addListener('click', function(event) {
    var coords = event.latLng;
    this.eventMapClick(coords.lat(), coords.lng(), event);
  }.bind(this));

  this.setMarkers();
};

/**
 * @param {!Array} vertices
 * @param {number} computeArea
 */
SUI.GoogleMap.prototype.eventPolygonChanged = function(vertices, computeArea) {
  console.warn('SUI.GoogleMap.eventPolygonChanged()', vertices, computeArea);
};

/**
 * @param {!Object=} opt_options
 */
SUI.GoogleMap.prototype.setPolygon = function(opt_options) {

  var options = new SUI.Object({
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.2,
    editable: false
  });
  options.merge(opt_options);

  this.polygon = new google.maps.Polygon(options.copy(true));
  this.polygon.setMap(this.map);

  this.polygon.addListener('rightclick', function(event) {
    if (event.vertex) {
      var vertices = this.polygon.getPath();
      vertices.removeAt(event.vertex);
    }
  }.bind(this));


  this.polygon.addListener('click', function(event) {
    var coords = event.latLng;
    this.eventPolygonClick(coords.lat(), coords.lng(), event);
  }.bind(this));

  this._bindEventToPolygonPath();
};

/**
 * @private
 */
SUI.GoogleMap.prototype._bindEventToPolygonPath = function() {
  this.polygon.getPath().addListener('insert_at', function() {
    this.eventPolygonChanged(this._getVertexesFromPolygon(), this._getComputeArea());
  }.bind(this));

  this.polygon.getPath().addListener('set_at', function() {
    this.eventPolygonChanged(this._getVertexesFromPolygon(), this._getComputeArea());
  }.bind(this));

  this.polygon.getPath().addListener('remove_at', function() {
    this.eventPolygonChanged(this._getVertexesFromPolygon(), this._getComputeArea());
  }.bind(this));
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 */
SUI.GoogleMap.prototype.eventPolygonClick = function(latitude, longitude, event) {

};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 */
SUI.GoogleMap.prototype.eventMapClick = function(latitude, longitude, event) {

};

/**
 * @param {!Array} points
 */
SUI.GoogleMap.prototype.setArea = function(points) {
  var paths = [];
  SUI.each(points, function(point) {
    paths.push(new google.maps.LatLng(point.latitude, point.longitude));
  });
  this.polygon.setPath(paths);

  this._setBounds(paths);

  this._bindEventToPolygonPath();
};

/**
 * @param {!Array} paths
 * @private
 */
SUI.GoogleMap.prototype._setBounds = function(paths) {
  if (paths.length > 0) {
    var bounds = new google.maps.LatLngBounds();

    SUI.each(paths, function(path) {
      bounds.extend(path);
    });

    var center = bounds.getCenter();

    this.map.setCenter(center);
    this.map.fitBounds(bounds);
  }
};

/**
 * @returns {!Array<{latitude: number, longitude: number}>}
 * @private
 */
SUI.GoogleMap.prototype._getVertexesFromPolygon = function() {
  var vertices = this.polygon.getPath().getArray();
  var points = [];
  SUI.each(vertices, function(vertex) {
    points.push({
      latitude: vertex.lat(),
      longitude: vertex.lng()
    });
  });
  return points;
};

/**
 * @returns {number}
 * @private
 */
SUI.GoogleMap.prototype._getComputeArea = function() {
  var path = this.polygon.getPath();
  return google.maps.geometry.spherical.computeArea(path);
};

/**
 * @param {number} latitude
 * @param {number} longitude
 */
SUI.GoogleMap.prototype.addVertexToPolygon = function(latitude, longitude) {
  var path = this.polygon.getPath();
  path.push(new google.maps.LatLng(latitude, longitude));
};

/**
 * @param {!Object=} opt_options
 */
SUI.GoogleMap.prototype.setMarkers = function(opt_options) {

  this.markers = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());

  this.markerOptions = new SUI.Object({
    draggable: false
  });
  this.markerOptions.merge(opt_options);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_data
 */
SUI.GoogleMap.prototype.addMarker = function(id, title, iconName, latitude, longitude, opt_data) {
  var data = new SUI.Object(opt_data);
  data.set('id', id);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    icon: this.markerIcons[iconName].icon,
    shape: this.markerIcons[iconName].shape,
    title: SUI.convert(title, 'string'),
    zIndex: this.markers.length,
    draggable: this.markerOptions.draggable,
    map: this.map
  });

  data.setRaw('marker', marker);

  var mapLabel = SUI.mapLabel(marker, title);
  data.setRaw('map_label', mapLabel);

  this.markers.push(data);

  marker.addListener('click', function(event) {
    this.eventMarkerClick(data, event);
  }.bind(this));

  marker.addListener('rightclick', function(event) {
    this.eventMarkerRightClick(data, event);
  }.bind(this));

  marker.addListener('dragend', function(event) {
    if (this.markerOptions.draggable) {
      var position = marker.getPosition();
      var latitude = position.lat();
      var longitude = position.lng();

      data.remove('marker');
      data.remove('map_label');
      var copyData = data.copy();
      data.setRaw('marker', marker);
      data.setRaw('map_label', mapLabel);
      this.eventMarkerChanged(copyData, latitude, longitude, event);
    }
  }.bind(this));
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!SUI.Object=} opt_data
 */
SUI.GoogleMap.prototype.updateMarker = function(id, title, iconName, latitude, longitude, opt_data) {
  var text = SUI.convert(title, 'string');

  var data = this.getMarker(id);
  SUI.each(opt_data, (value, key) => {
    if (!SUI.inArray(['map_label', 'marker'], key)) {
      data.set(key, value);
    }
  });

  var marker = data.get('marker');
  var markerIcon = this.markerIcons[iconName];

  marker.setIcon(markerIcon.icon);
  marker.setShape(markerIcon.shape);
  marker.setTitle(text);
  marker.setPosition(new google.maps.LatLng(latitude, longitude));

  var mapLabel = data.get('map_label');
  mapLabel.set('text', text);
};

/**
 * @param {string|number} id
 * @returns {!SUI.Object}
 */
SUI.GoogleMap.prototype.getMarker = function(id) {
  return this.markers.findById(id);
};

/**
 * @param {string|number} id
 */
SUI.GoogleMap.prototype.removeMarker = function(id) {
  var markerData = this.getMarker(id);
  if (markerData) {
    var marker = markerData.get('marker');
    marker.setMap(null);

    this.markers.deleteById(id);
  }
};

/**
 * @param {!Object} data
 * @param {string} content
 * @returns {undefined}
 */
SUI.GoogleMap.prototype.openInfoWindow = function(data, content) {
  var marker = /** @type {!google.maps.MVCObject} */ (data.get('marker', null));
  var infoWindow = new google.maps.InfoWindow({
    content: content
  });
  infoWindow.open(this.map, marker);
};

/**
 * @param {!Object} data
 * @param {!Object} event
 */
SUI.GoogleMap.prototype.eventMarkerClick = function(data, event) {

};

/**
 * @param {!Object} data
 * @param {!Object} event
 */
SUI.GoogleMap.prototype.eventMarkerRightClick = function(data, event) {

};

/**
 * @param {!SUI.Object} data
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 */
SUI.GoogleMap.prototype.eventMarkerChanged = function(data, latitude, longitude, event) {

};

/**
 * @param {string} name
 * @param {!Object} iconOptions
 */
SUI.GoogleMap.prototype.setMarkerIcon = function(name, iconOptions) {
  //https://developers.google.com/maps/documentation/javascript/examples/marker-symbol-custom
  var icon = {
    url: iconOptions.url,
    size: new google.maps.Size(iconOptions.size[0], iconOptions.size[1]),
    origin: new google.maps.Point(iconOptions.origin[0], iconOptions.origin[1]),
    anchor: new google.maps.Point(iconOptions.anchor[0], iconOptions.anchor[1])
  };

  var shape = {
    coords: iconOptions.coords,
    type: 'poly'
  };

  this.markerIcons[name] = {
    icon: icon,
    shape: shape
  };
};

/**
 * @param {string} query
 * @returns {!SUI.Promise}
 */
SUI.GoogleMap.prototype.searchAddress = function(query) {
  var deferred = new SUI.Deferred();
  var geoCoder = new google.maps.Geocoder();
  geoCoder.geocode({address: query}, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      var locations = [];
      SUI.each(results, (result)=> {
        var location = {
          'address': result.formatted_address,
          'latitude': result.geometry.location.lat(),
          'longitude': result.geometry.location.lng()
        };
        locations.push(location);
      });
      deferred.resolve([locations]);
    }
    else {
      deferred.reject();
    }
  });
  return deferred.promise();
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {boolean=} opt_boundCheck
 * @returns {undefined}
 */
SUI.GoogleMap.prototype.setCenter = function(latitude, longitude, opt_boundCheck = true) {
  var position = new google.maps.LatLng(latitude, longitude);
  if (opt_boundCheck) {
    if (!this.map.getBounds().contains(position)) {
      this.map.setCenter(position);
    }
  }
  else {
    this.map.setCenter(position);
  }
};

/**
 * @returns {!Object}
 */
SUI.GoogleMap.prototype.getCenter = function() {
  let mapCenter = this.map.getCenter();
  return {
    'latitude': mapCenter.lat(),
    'longitude': mapCenter.lng()
  };
};

/**
 * @returns {undefined}
 */
SUI.GoogleMap.prototype.triggerResize = function() {
  google.maps.event.trigger(this.map, 'resize');
};