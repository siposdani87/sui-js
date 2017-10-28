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
 * @return {undefined}
 */
SUI.GoogleMap.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object({
    center: {
      lat: 47.6,
      lng: 17.533333,
    },
    zoom: 8,
    scrollwheel: false,
    streetViewControl: false,
    // disableDefaultUI: true,
    scaleControl: true,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN], // 'custom'
    },
  });
  this.options.merge(opt_options);
  this.options = this.options.copy(true);
};

/**
 * @private
 * @return {!google.maps.StyledMapType}
 */
SUI.GoogleMap.prototype._getCustomMapType = function() {
  let mapType = new google.maps.StyledMapType([
    {
      stylers: [
        // {hue: '#890000'},
        {visibility: 'simplified'},
        // {gamma: 0.5},
        // {weight: 0.5}
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {visibility: 'off'},
      ],
    }, /* ,
     {
     featureType: 'water',
     stylers: [
     {color: '#2196F3'}
     ]
     }*/
  ], {
      name: 'Custom',
    }
  );
  return mapType;
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._init = function() {
  this.markerIcons = {};
  this.markers = [];
  this.bounds = null;

  this._initMap();
  this._initOverlay();
  this.setMarkers();
  this.setPolygons();
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._initMap = function() {
  this.map = new google.maps.Map(this.mapNode.getNode(), this.options);

  let customMapType = this._getCustomMapType();
  this.map.mapTypes.set('custom', customMapType);

  this.map.addListener('click', (event) => {
    let vertex = event.latLng;
    this.eventMapClick(vertex.lat(), vertex.lng(), event);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._initOverlay = function() {
  this.overlay = new google.maps.OverlayView();
  this.overlay.draw = function() {
  };
  this.overlay.setMap(this.map);
};

/**
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @param {number} computeArea
 * @param {{latitude: number, longitude: number}} center
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonChanged = function(points, computeArea, center) {
  console.warn('SUI.GoogleMap.eventPolygonChanged()', points, computeArea, center);
};

/**
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setPolygon = function(opt_options) {
  let options = new SUI.Object({
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.2,
    editable: false,
  });
  options.merge(opt_options);

  this.polygon = new google.maps.Polygon(options.copy(true));
  this.polygon.setMap(this.map);

  this._bindEventsToPolygon(this.polygon);
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToPolygon = function(polygon) {
  polygon.addListener('rightclick', (event) => {
    if (event.vertex) {
      let path = polygon.getPath();
      path.removeAt(event.vertex);
    }
  });

  polygon.addListener('click', (event) => {
    let vertex = event.latLng;
    this.eventPolygonClick(vertex.lat(), vertex.lng(), event);
  });

  this._bindEventsToPolygonPath(polygon);
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToPolygonPath = function(polygon) {
  let path = polygon.getPath();
  if (path) {
    path.addListener('insert_at', () => {
      this._callPolygonChangeEvent(polygon);
    });
    path.addListener('set_at', () => {
      this._callPolygonChangeEvent(polygon);
    });
    path.addListener('remove_at', () => {
      this._callPolygonChangeEvent(polygon);
    });
  }
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @return {undefined}
 */
SUI.GoogleMap.prototype._callPolygonChangeEvent = function(polygon) {
  let points = this._getPointsFromPolygon(polygon);
  this._setBoundsByPoints(points);
  this.eventPolygonChanged(points, this._getComputeArea(polygon), this.getCenterOfPolygon());
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonClick = function(latitude, longitude, event) {

};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMapClick = function(latitude, longitude, event) {

};

/**
 * @param {!google.maps.Polygon} polygon
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @return {undefined}
 */
SUI.GoogleMap.prototype.addPointsToPolygon = function(polygon, points) {
  let path = this._convertPointsToPath(points);
  polygon.setPath(path);
  this._setBoundsByPath(path);
  this._fitBoundsToMap();

  this._bindEventsToPolygonPath(polygon);
};

/**
 * @private
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @return {!Array<google.maps.LatLng>}
 */
SUI.GoogleMap.prototype._convertPointsToPath = function(points) {
  let path = [];
  SUI.each(points, (point) => {
    let vertex = new google.maps.LatLng(point.latitude, point.longitude);
    path.push(vertex);
  });
  return path;
};

/**
 * @private
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @return {undefined}
 */
SUI.GoogleMap.prototype._setBoundsByPoints = function(points) {
  let path = this._convertPointsToPath(points);
  this._setBoundsByPath(path);
};

/**
 * @private
 * @param {!Array<google.maps.LatLng>} path
 * @return {undefined}
 */
SUI.GoogleMap.prototype._setBoundsByPath = function(path) {
  this.bounds = null;
  if (path.length > 0) {
    this.bounds = new google.maps.LatLngBounds();
    SUI.each(path, (vertex) => {
      this.bounds.extend(vertex);
    });
  }
};

/**
 * @return {{latitude: number, longitude: number}}
 */
SUI.GoogleMap.prototype.getCenterOfPolygon = function() {
  let vertex = this.bounds.getCenter();
  return {
    'latitude': vertex.lat(),
    'longitude': vertex.lng(),
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._fitBoundsToMap = function() {
  if (this.bounds) {
    let center = this.bounds.getCenter();
    this.map.setCenter(center);
    this.map.fitBounds(this.bounds);
  }
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @return {!Array<{latitude: number, longitude: number}>}
 */
SUI.GoogleMap.prototype._getPointsFromPolygon = function(polygon) {
  let path = /** @type {!Array<google.maps.LatLng>} */ (polygon.getPath().getArray());
  this._setBoundsByPath(path);
  let points = [];
  SUI.each(path, (vertex) => {
    points.push({
      latitude: vertex.lat(),
      longitude: vertex.lng(),
    });
  });
  return points;
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @return {number}
 */
SUI.GoogleMap.prototype._getComputeArea = function(polygon) {
  let path = polygon.getPath();
  return google.maps.geometry.spherical.computeArea(path);
};

/**
 * @param {!google.maps.Polygon} polygon
 * @param {number} latitude
 * @param {number} longitude
 * @return {undefined}
 */
SUI.GoogleMap.prototype.addPointToPolygon = function(polygon, latitude, longitude) {
  let path = polygon.getPath();
  path.push(new google.maps.LatLng(latitude, longitude));
};

/**
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setMarkers = function(opt_options) {
  this.markers = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());

  this.markerOptions = new SUI.Object({
    draggable: false,
  });
  this.markerOptions.merge(opt_options);
};

/**
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setPolygons = function(opt_options) {
  this.polygons = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());

  this.polygonOptions = new SUI.Object({
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.2,
    editable: false,
  });
  this.polygonOptions.merge(opt_options);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createOrUpdateMarker = function(id, title, iconName, latitude, longitude, opt_data = {}) {
  let marker = this.getMarker(id);
  if (marker) {
    this.updateMarker(id, title, iconName, latitude, longitude, opt_data);
  } else {
    this.createMarker(id, title, iconName, latitude, longitude, opt_data);
  }
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createMarker = function(id, title, iconName, latitude, longitude, opt_data = {}) {
  let data = new SUI.Object(opt_data);
  data.set('id', id);

  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    icon: this.markerIcons[iconName].icon,
    shape: this.markerIcons[iconName].shape,
    title: SUI.convert(title, 'string'),
    zIndex: this.markers.length,
    draggable: this.markerOptions.draggable,
    map: this.map,
  });

  data.setRaw('marker', marker);

  let mapLabel = SUI.mapLabel(marker, title);
  data.setRaw('map_label', mapLabel);

  this.markers.push(data);

  this._bindEventsToMarker(marker, data, mapLabel);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} x
 * @param {number} y
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createMarkerByXY = function(id, title, iconName, x, y, opt_data = {}) {
  let point = new google.maps.Point(x, y);
  let projection = this.overlay.getProjection();
  let location = projection.fromContainerPixelToLatLng(point);

  this.createMarker(id, title, iconName, location.lat(), location.lng(), opt_data);
};

/**
 * @param {google.maps.Marker} marker
 * @param {!SUI.Object} data
 * @param {!Object} mapLabel
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToMarker = function(marker, data, mapLabel) {
  marker.addListener('click', (event) => {
    this.eventMarkerClick(data, event);
  });

  marker.addListener('rightclick', (event) => {
    this.eventMarkerRightClick(data, event);
  });

  marker.addListener('dragend', (event) => {
    if (this.markerOptions.draggable) {
      let vertex = marker.getPosition();
      let latitude = vertex.lat();
      let longitude = vertex.lng();

      data.remove('marker');
      data.remove('map_label');
      let copyData = data.copy();
      data.setRaw('marker', marker);
      data.setRaw('map_label', mapLabel);
      this.eventMarkerChanged(copyData, latitude, longitude, event);
    }
  });
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.GoogleMap.prototype.updateMarker = function(id, title, iconName, latitude, longitude, opt_data = {}) {
  let text = SUI.convert(title, 'string');

  let data = this.getMarker(id);
  SUI.each(opt_data, (value, key) => {
    if (!SUI.inArray(['map_label', 'marker'], key)) {
      data.set(key, value);
    }
  });

  let marker = data.get('marker');
  let markerIcon = this.markerIcons[iconName];

  marker.setIcon(markerIcon.icon);
  marker.setShape(markerIcon.shape);
  marker.setTitle(text);
  marker.setPosition(new google.maps.LatLng(latitude, longitude));

  let mapLabel = data.get('map_label');
  mapLabel.set('text', text);
};

/**
 * @param {string|number} id
 * @return {!SUI.Object}
 */
SUI.GoogleMap.prototype.getMarker = function(id) {
  return this.markers.findById(id);
};

/**
 * @param {string|number} id
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removeMarker = function(id) {
  let markerData = this.getMarker(id);
  if (markerData) {
    let marker = markerData.get('marker');
    marker.setMap(null);

    this.markers.deleteById(id);
  }
};

/**
 * @param {!Object} data
 * @param {string} content
 * @return {undefined}
 */
SUI.GoogleMap.prototype.openInfoWindow = function(data, content) {
  let marker = /** @type {!google.maps.MVCObject} */ (data.get('marker', null));
  let infoWindow = new google.maps.InfoWindow({
    content: content,
  });
  infoWindow.open(this.map, marker);
};

/**
 * @param {!Object} data
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerClick = function(data, event) {

};

/**
 * @param {!Object} data
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerRightClick = function(data, event) {

};

/**
 * @param {!SUI.Object} data
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerChanged = function(data, latitude, longitude, event) {

};

/**
 * @param {string} name
 * @param {!Object} iconOptions
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setMarkerIcon = function(name, iconOptions) {
  // https://developers.google.com/maps/documentation/javascript/examples/marker-symbol-custom
  let icon = {
    url: iconOptions.url,
    size: new google.maps.Size(iconOptions.size[0], iconOptions.size[1]),
    origin: new google.maps.Point(iconOptions.origin[0], iconOptions.origin[1]),
    anchor: new google.maps.Point(iconOptions.anchor[0], iconOptions.anchor[1]),
  };

  let shape = {
    coords: iconOptions.coords,
    type: 'poly',
  };

  this.markerIcons[name] = {
    icon: icon,
    shape: shape,
  };
};

/**
 * @param {string} query
 * @return {!SUI.Promise}
 */
SUI.GoogleMap.prototype.searchAddress = function(query) {
  let deferred = new SUI.Deferred();
  let geoCoder = new google.maps.Geocoder();
  geoCoder.geocode({address: query}, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      let points = [];
      SUI.each(results, (result) => {
        let point = {
          'address': result.formatted_address,
          'latitude': result.geometry.location.lat(),
          'longitude': result.geometry.location.lng(),
        };
        points.push(point);
      });
      deferred.resolve([points]);
    } else {
      deferred.reject();
    }
  });
  return deferred.promise();
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {boolean=} opt_boundCheck
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setCenter = function(latitude, longitude, opt_boundCheck = true) {
  let position = new google.maps.LatLng(latitude, longitude);
  if (opt_boundCheck) {
    if (!this.map.getBounds().contains(position)) {
      this.map.setCenter(position);
    }
  } else {
    this.map.setCenter(position);
  }
};

/**
 * @return {{latitude: number, longitude: number}}
 */
SUI.GoogleMap.prototype.getCenter = function() {
  let vertex = this.map.getCenter();
  return {
    'latitude': vertex.lat(),
    'longitude': vertex.lng(),
  };
};

/**
 * @return {undefined}
 */
SUI.GoogleMap.prototype.triggerResize = function() {
  google.maps.event.trigger(this.map, 'resize');
};

/**
 * @param {number} radiusPx
 * @return {number}
 */
SUI.GoogleMap.prototype.getDinamicRadius = function(radiusPx) {
  let point1 = new google.maps.Point(0, 0);
  let point2 = new google.maps.Point(radiusPx, radiusPx);

  let projection = this.overlay.getProjection();
  let location1 = projection.fromContainerPixelToLatLng(point1);
  let location2 = projection.fromContainerPixelToLatLng(point2);

  let latLng1 = new google.maps.LatLng(location1.lat(), location1.lng());
  let latLng2 = new google.maps.LatLng(location2.lat(), location2.lng());

  return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
};
