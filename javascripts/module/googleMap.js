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
SUI.GoogleMap.prototype._setOptions = function(opt_options = {}) {
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
  return new google.maps.StyledMapType([
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
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._init = function() {
  this.markerIcons = {};

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

  this._bindEventsToMap();
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToMap = function() {
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
 * @param {!SUI.Object} polygonData
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @param {number} computeArea
 * @param {{latitude: number, longitude: number}} center
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonChanged = function(polygonData, points, computeArea, center) {

};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @param {!Object=} opt_polygonData
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createPolygon = function(id, title, points, opt_polygonData = {}, opt_options = {}) {
  let polygonData = new SUI.Object(opt_polygonData);
  let options = new SUI.Object(this.polygonOptions);
  options.merge(opt_options);

  let polygon = new google.maps.Polygon(options.copy(true));
  polygon.setMap(this.map);
  polygonData.setRaw('_polygon', polygon);
  this._addPointsToPolygon(polygonData, points);

  let latLng = this._getCenterOfPolygon(polygonData);
  let mapText = SUI.mapText(title, new google.maps.LatLng(latLng.latitude, latLng.longitude), this.map);
  polygonData.setRaw('_map_text', mapText);

  this.polygons.push(polygonData);

  this._bindEventsToPolygon(polygon, polygonData);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @param {!Object=} opt_polygonData
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.updatePolygon = function(id, title, points, opt_polygonData = {}, opt_options = {}) {
  let polygonData = this.getPolygon(id);
  SUI.each(opt_polygonData, (value, key) => {
    if (!SUI.inArray(['_polygon', '_bounds', '_map_text'], key)) {
      polygonData.set(key, value);
    }
  });

  let polygon = /** @type {google.maps.Polygon} */ (polygonData.get('_polygon'));
  polygon.setOptions(opt_options);
  this._addPointsToPolygon(polygonData, points);

  let latLng = this._getCenterOfPolygon(polygonData);
  let mapText = polygonData.get('_map_text');
  mapText.set('text', title);
  mapText.set('position', new google.maps.LatLng(latLng.latitude, latLng.longitude));
};

/**
 * @param {string|number} id
 * @return {!SUI.Object}
 */
SUI.GoogleMap.prototype.getPolygon = function(id) {
  return this.polygons.findById(id);
};

/**
 * @param {string|number} id
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removePolygon = function(id) {
  let polygonData = this.getPolygon(id);
  if (polygonData) {
    let polygon = polygonData.get('_polygon');
    polygon.setMap(null);
    this.polygons.deleteById(id);
  }
};

/**
 * @param {!Function=} opt_callback
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removeAllPolygon = function(opt_callback = SUI.noop) {
  this.polygons.each((polygonData) => {
    let polygon = polygonData.get('_polygon');
    polygon.setMap(null);
    opt_callback(polygonData);
  });
  this.polygons.clear();
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @param {!SUI.Object} polygonData
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToPolygon = function(polygon, polygonData) {
  polygon.addListener('rightclick', (event) => {
    if (event.vertex) {
      let path = polygon.getPath();
      path.removeAt(event.vertex);
    } else {
      let vertex = event.latLng;
      this.eventPolygonRightClick(polygonData, vertex.lat(), vertex.lng(), event);
    }
  });

  polygon.addListener('click', (event) => {
    let vertex = event.latLng;
    this.eventPolygonClick(polygonData, vertex.lat(), vertex.lng(), event);
  });

  this._bindEventsToPolygonPath(polygon, polygonData);
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @param {!SUI.Object} polygonData
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToPolygonPath = function(polygon, polygonData) {
  let path = polygon.getPath();

  if (path) {
    path.addListener('insert_at', () => {
      this._callPolygonChangeEvent(polygon, polygonData);
    });
    path.addListener('set_at', () => {
      this._callPolygonChangeEvent(polygon, polygonData);
    });
    path.addListener('remove_at', () => {
      this._callPolygonChangeEvent(polygon, polygonData);
    });
  }
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @param {!SUI.Object} polygonData
 * @return {undefined}
 */
SUI.GoogleMap.prototype._callPolygonChangeEvent = function(polygon, polygonData) {
  let points = this._getPointsFromPolygon(polygonData);
  this._setBoundsByPoints(polygonData, points);

  let latLng = this._getCenterOfPolygon(polygonData);
  let mapText = polygonData.get('_map_text');
  mapText.set('position', new google.maps.LatLng(latLng.latitude, latLng.longitude));

  this.eventPolygonChanged(polygonData, points, this._getComputeArea(polygon), latLng);
};

/**
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonClick = function(polygonData, latitude, longitude, event) {

};

/**
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonRightClick = function(polygonData, latitude, longitude, event) {

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
 * @private
 * @param {!SUI.Object} polygonData
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @return {undefined}
 */
SUI.GoogleMap.prototype._addPointsToPolygon = function(polygonData, points) {
  let polygon = /** @type {google.maps.Polygon} */ (polygonData.get('_polygon'));
  let path = this._convertPointsToPath(points);
  polygon.setPath(path);
  this._bindEventsToPolygonPath(polygon, polygonData);
  this._setBoundsByPath(polygonData, path);
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
 * @param {!SUI.Object} polygonData
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @return {undefined}
 */
SUI.GoogleMap.prototype._setBoundsByPoints = function(polygonData, points) {
  let path = this._convertPointsToPath(points);
  this._setBoundsByPath(polygonData, path);
};

/**
 * @private
 * @param {!SUI.Object} polygonData
 * @param {!Array<google.maps.LatLng>} path
 * @return {undefined}
 */
SUI.GoogleMap.prototype._setBoundsByPath = function(polygonData, path) {
  let bounds = new google.maps.LatLngBounds();
  if (path.length > 0) {
    SUI.each(path, (vertex) => {
      bounds.extend(vertex);
    });
  }
  polygonData.setRaw('_bounds', bounds);
};

/**
 * @private
 * @param {!SUI.Object} polygonData
 * @return {{latitude: number, longitude: number}}
 */
SUI.GoogleMap.prototype._getCenterOfPolygon = function(polygonData) {
  let bounds = /** @type {google.maps.LatLngBounds} */ (polygonData.get('_bounds'));
  let vertex = bounds.getCenter();
  return {
    'latitude': vertex.lat(),
    'longitude': vertex.lng(),
  };
};

/**
 * @param {!SUI.Object} polygonData
 * @return {undefined}
 */
SUI.GoogleMap.prototype.fitPolygonToMap = function(polygonData) {
  let bounds = /** @type {google.maps.LatLngBounds} */ (polygonData.get('_bounds'));
  if (bounds) {
    let center = bounds.getCenter();
    this.map.setCenter(center);
    this.map.fitBounds(bounds);
  }
};

/**
 * @private
 * @param {!SUI.Object} polygonData
 * @return {!Array<{latitude: number, longitude: number}>}
 */
SUI.GoogleMap.prototype._getPointsFromPolygon = function(polygonData) {
  let polygon = /** @type {google.maps.Polygon} */ (polygonData.get('_polygon'));
  let path = /** @type {!Array<google.maps.LatLng>} */ (polygon.getPath().getArray());
  this._setBoundsByPath(polygonData, path);
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
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @return {undefined}
 */
SUI.GoogleMap.prototype.addPointToPolygon = function(polygonData, latitude, longitude) {
  let polygon = /** @type {google.maps.Polygon} */ (polygonData.get('_polygon'));
  let path = polygon.getPath();
  path.push(new google.maps.LatLng(latitude, longitude));
};

/**
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setMarkers = function(opt_options = {}) {
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
SUI.GoogleMap.prototype.setPolygons = function(opt_options = {}) {
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
 * @param {!Object=} opt_markerData
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createOrUpdateMarker = function(id, title, iconName, latitude, longitude, opt_markerData = {}) {
  let marker = this.getMarker(id);
  if (marker) {
    this.updateMarker(id, title, iconName, latitude, longitude, opt_markerData);
  } else {
    this.createMarker(id, title, iconName, latitude, longitude, opt_markerData);
  }
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_markerData
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createMarker = function(id, title, iconName, latitude, longitude, opt_markerData = {}) {
  let markerData = new SUI.Object(opt_markerData);
  if (!markerData.get('id')) {
    markerData.set('id', id);
  }

  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    icon: this.markerIcons[iconName].icon,
    shape: this.markerIcons[iconName].shape,
    title: SUI.convert(title, 'string'),
    zIndex: this.markers.length,
    draggable: this.markerOptions.draggable,
    map: this.map,
  });
  markerData.setRaw('_marker', marker);

  let mapLabel = SUI.mapLabel(marker, title);
  markerData.setRaw('_map_label', mapLabel);

  this.markers.push(markerData);

  this._bindEventsToMarker(marker, markerData, mapLabel);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} x
 * @param {number} y
 * @param {!Object=} markerData
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createMarkerByXY = function(id, title, iconName, x, y, markerData = {}) {
  let point = new google.maps.Point(x, y);
  let projection = this.overlay.getProjection();
  let location = projection.fromContainerPixelToLatLng(point);

  this.createMarker(id, title, iconName, location.lat(), location.lng(), markerData);
};

/**
 * @param {google.maps.Marker} marker
 * @param {!SUI.Object} markerData
 * @param {!Object} mapLabel
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToMarker = function(marker, markerData, mapLabel) {
  marker.addListener('click', (event) => {
    this.eventMarkerClick(markerData, event);
  });

  marker.addListener('rightclick', (event) => {
    this.eventMarkerRightClick(markerData, event);
  });

  marker.addListener('dragend', (event) => {
    if (this.markerOptions.draggable) {
      let vertex = marker.getPosition();
      let latitude = vertex.lat();
      let longitude = vertex.lng();

      markerData.remove('_marker');
      markerData.remove('_map_label');
      let copyData = markerData.copy();
      markerData.setRaw('_marker', marker);
      markerData.setRaw('_map_label', mapLabel);
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
 * @param {!Object=} opt_markerData
 * @return {undefined}
 */
SUI.GoogleMap.prototype.updateMarker = function(id, title, iconName, latitude, longitude, opt_markerData = {}) {
  let markerData = this.getMarker(id);
  SUI.each(opt_markerData, (value, key) => {
    if (!SUI.inArray(['_map_label', '_marker'], key)) {
      markerData.set(key, value);
    }
  });
  let text = /** @type {string} */ (SUI.convert(title, 'string'));

  let marker = /** @type {google.maps.Marker} */ (markerData.get('_marker'));
  let markerIcon = this.markerIcons[iconName];

  marker.setIcon(markerIcon.icon);
  marker.setShape(markerIcon.shape);
  marker.setTitle(text);
  marker.setPosition(new google.maps.LatLng(latitude, longitude));

  let mapLabel = markerData.get('_map_label');
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
    let marker = markerData.get('_marker');
    marker.setMap(null);
    this.markers.deleteById(id);
  }
};

/**
 * @param {!Function=} opt_callback
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removeAllMarker = function(opt_callback = SUI.noop) {
  this.markers.each((markerData) => {
    let marker = markerData.get('_marker');
    marker.setMap(null);
    opt_callback(markerData);
  });
  this.markers.clear();
};

/**
 * @param {!Object} markerData
 * @param {string} content
 * @return {undefined}
 */
SUI.GoogleMap.prototype.openInfoWindow = function(markerData, content) {
  let marker = /** @type {google.maps.Marker} */ (markerData.get('_marker'));
  let infoWindow = new google.maps.InfoWindow({
    content: content,
  });
  infoWindow.open(this.map, marker);
};

/**
 * @param {!Object} markerData
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerClick = function(markerData, event) {

};

/**
 * @param {!Object} markerData
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerRightClick = function(markerData, event) {

};

/**
 * @param {!SUI.Object} markerData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerChanged = function(markerData, latitude, longitude, event) {

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
