goog.provide('SUI.GoogleMap');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Deferred');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Promise');
goog.require('SUI.Query');

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
  const _self = this;
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
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE],
    },
  });
  this.options.merge(opt_options);
  this.options = this.options.copy(true);
};

/**
 * @return {string}
 */
SUI.GoogleMap.prototype.getMapType = function() {
  return this.map.getMapTypeId();
};

/**
 * @param {string} mapTypeId
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setMapType = function(mapTypeId) {
  this.map.setMapTypeId(mapTypeId);
};

/**
 * @param {string} mapTypeId
 * @param {string} mapTypeName
 * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setCustomMapStyle = function(mapTypeId, mapTypeName, mapStyles) {
  const styledMapType = new google.maps.StyledMapType(mapStyles, {
    name: mapTypeName,
  });
  this.map.mapTypes.set(mapTypeId, styledMapType);
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

  this._unbindEventsToMap();
  this._bindEventsToMap();
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToMap = function() {
  this.map.addListener('click', (event) => {
    const vertex = event.latLng;
    this.eventMapClick(vertex.lat(), vertex.lng(), event);
  });

  this.map.addListener('maptypeid_changed', (event) => {
    this.eventMapTypeChange(this.getMapType(), event);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.GoogleMap.prototype._unbindEventsToMap = function() {
  google.maps.event.clearInstanceListeners(this.map);
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
  SUI.consoleInfo('SUI.GoogleMap.eventPolygonChanged()', polygonData, points, computeArea, center);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @param {!Object=} opt_polygonData
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createOrUpdatePolygon = function(id, title, points, opt_polygonData = {}, opt_options = {}) {
  const polygon = this.getPolygon(id);
  if (polygon) {
    this.updatePolygon(id, title, points, opt_polygonData, opt_options);
  } else {
    this.createPolygon(id, title, points, opt_polygonData, opt_options);
  }
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
  const polygonData = new SUI.Object(opt_polygonData);
  if (!polygonData.get('id')) {
    polygonData.set('id', id);
  }
  const options = new SUI.Object(this.polygonOptions);
  options.merge(opt_options);

  const polygon = new google.maps.Polygon(options.copy(true));
  polygon.setMap(this.map);
  polygonData.setRaw('_polygon', polygon);
  this._addPointsToPolygon(polygonData, points);

  const latLng = this._getCenterOfPolygon(polygonData);
  const mapText = SUI.mapText(title, new google.maps.LatLng(latLng.latitude, latLng.longitude), this.map);
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
  const polygonData = this.getPolygon(id);
  SUI.each(this._cleanPolygonData(opt_polygonData), (value, key) => {
    polygonData.set(key, value);
  });

  const polygon = /** @type {!google.maps.Polygon} */ (polygonData.get('_polygon'));
  polygon.setOptions(opt_options);
  this._addPointsToPolygon(polygonData, points);

  const latLng = this._getCenterOfPolygon(polygonData);
  const mapText = polygonData.get('_map_text');
  mapText.set('text', title);
  mapText.set('position', new google.maps.LatLng(latLng.latitude, latLng.longitude));
};

/**
 * @param {!Object} polygonData
 * @return {!SUI.Object}
 */
SUI.GoogleMap.prototype._cleanPolygonData = function(polygonData) {
  const cleanData = new SUI.Object();
  SUI.each(polygonData, (value, key) => {
    if (!SUI.inArray(['_polygon', '_map_text', '_bounds'], key)) {
      cleanData.set(key, value);
    }
  });
  return cleanData;
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
  const polygonData = this.getPolygon(id);
  if (polygonData) {
    const mapText = polygonData.get('_map_text');
    mapText.set('map', null);
    const polygon = /** @type {!google.maps.Polygon} */ (polygonData.get('_polygon'));
    polygon.setMap(null);
    this._unbindEventsToPolygon(polygon);
    this.polygons.deleteById(id);
  }
};

/**
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removeAllPolygon = function() {
  this.polygons.each((polygonData) => {
    const polygon = /** @type {!google.maps.Polygon} */ (polygonData.get('_polygon'));
    polygon.setMap(null);
    const mapText = polygonData.get('_map_text');
    mapText.set('map', null);
    this._unbindEventsToPolygon(polygon);
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
  const cleanPolygonData = this._cleanPolygonData(polygonData);

  polygon.addListener('rightclick', (event) => {
    if (event.vertex) {
      const path = polygon.getPath();
      path.removeAt(event.vertex);
    } else {
      const vertex = event.latLng;
      this.eventPolygonRightClick(cleanPolygonData, vertex.lat(), vertex.lng(), event);
    }
  });

  polygon.addListener('click', (event) => {
    const vertex = event.latLng;
    this.eventPolygonClick(cleanPolygonData, vertex.lat(), vertex.lng(), event);
  });

  polygon.addListener('dblclick', (event) => {
    const vertex = event.latLng;
    this.eventPolygonDoubleClick(cleanPolygonData, vertex.lat(), vertex.lng(), event);
  });

  this._bindEventsToPolygonPath(polygon, polygonData);
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @return {undefined}
 */
SUI.GoogleMap.prototype._unbindEventsToPolygon = function(polygon) {
  google.maps.event.clearInstanceListeners(polygon);
  this._unbindEventsToPolygonPath(polygon);
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @param {!SUI.Object} polygonData
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToPolygonPath = function(polygon, polygonData) {
  const path = polygon.getPath();
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
 * @return {undefined}
 */
SUI.GoogleMap.prototype._unbindEventsToPolygonPath = function(polygon) {
  const path = polygon.getPath();
  if (path) {
    google.maps.event.clearInstanceListeners(path);
  }
};

/**
 * @private
 * @param {!google.maps.Polygon} polygon
 * @param {!SUI.Object} polygonData
 * @return {undefined}
 */
SUI.GoogleMap.prototype._callPolygonChangeEvent = function(polygon, polygonData) {
  const points = this._getPointsFromPolygon(polygonData);
  this._setBoundsByPoints(polygonData, points);

  const mapText = polygonData.get('_map_text');
  const latLng = this._getCenterOfPolygon(polygonData);
  mapText.set('position', new google.maps.LatLng(latLng.latitude, latLng.longitude));

  const cleanPolygonData = this._cleanPolygonData(polygonData);
  this.eventPolygonChanged(cleanPolygonData, points, this._getComputeArea(polygon), latLng);
};

/**
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonClick = function(polygonData, latitude, longitude, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventPolygonClick()', polygonData, latitude, longitude, event);
};

/**
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonDoubleClick = function(polygonData, latitude, longitude, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventPolygonDoubleClick()', polygonData, latitude, longitude, event);
};

/**
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventPolygonRightClick = function(polygonData, latitude, longitude, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventPolygonRightClick()', polygonData, latitude, longitude, event);
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMapClick = function(latitude, longitude, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventMapClick()', latitude, longitude, event);
};

/**
 * @param {string} mapType
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMapTypeChange = function(mapType, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventMapTypeChange()', mapType, event);
};

/**
 * @private
 * @param {!SUI.Object} polygonData
 * @param {!Array<{latitude: number, longitude: number}>} points
 * @return {undefined}
 */
SUI.GoogleMap.prototype._addPointsToPolygon = function(polygonData, points) {
  const polygon = /** @type {!google.maps.Polygon} */ (polygonData.get('_polygon'));
  const path = this._convertPointsToPath(points);
  polygon.setPath(path);
  this._bindEventsToPolygonPath(polygon, polygonData);
  this._setBoundsByPath(polygonData, path);
};

/**
 * @private
 * @param {!Array<{latitude: number, longitude: number, weight: (number|undefined)}>} points
 * @return {!Array<!google.maps.LatLng>}
 */
SUI.GoogleMap.prototype._convertPointsToPath = function(points) {
  const path = [];
  SUI.each(points, (point) => {
    let vertex = new google.maps.LatLng(point.latitude, point.longitude);
    if (!SUI.isUndefined(point.weight)) {
      vertex = {
        'location': vertex,
        'weight': point.weight,
      };
    }
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
  const path = this._convertPointsToPath(points);
  this._setBoundsByPath(polygonData, path);
};

/**
 * @private
 * @param {!SUI.Object} polygonData
 * @param {!Array<!google.maps.LatLng>} path
 * @return {undefined}
 */
SUI.GoogleMap.prototype._setBoundsByPath = function(polygonData, path) {
  const bounds = new google.maps.LatLngBounds();
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
  const bounds = /** @type {!google.maps.LatLngBounds} */ (polygonData.get('_bounds'));
  const vertex = bounds.getCenter();
  return {
    'latitude': vertex.lat(),
    'longitude': vertex.lng(),
  };
};

/**
 * @param {string|number} polygonId
 * @return {undefined}
 */
SUI.GoogleMap.prototype.fitPolygonToMap = function(polygonId) {
  const polygonData = this.getPolygon(polygonId);
  if (polygonData) {
    const bounds = /** @type {!google.maps.LatLngBounds} */ (polygonData.get('_bounds'));
    if (bounds) {
      const center = bounds.getCenter();
      this.map.setCenter(center);
      this.map.fitBounds(bounds);
    }
  }
};


/**
 * @private
 * @param {!SUI.Object} polygonData
 * @return {!Array<{latitude: number, longitude: number}>}
 */
SUI.GoogleMap.prototype._getPointsFromPolygon = function(polygonData) {
  const polygon = /** @type {!google.maps.Polygon} */ (polygonData.get('_polygon'));
  const path = /** @type {!Array<!google.maps.LatLng>} */ (polygon.getPath().getArray());
  this._setBoundsByPath(polygonData, path);
  const points = [];
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
  const path = polygon.getPath();
  return google.maps.geometry.spherical.computeArea(path);
};

/**
 * @param {!SUI.Object} polygonData
 * @param {number} latitude
 * @param {number} longitude
 * @return {undefined}
 */
SUI.GoogleMap.prototype.addPointToPolygon = function(polygonData, latitude, longitude) {
  const polygon = /** @type {!google.maps.Polygon} */ (polygonData.get('_polygon'));
  const path = polygon.getPath();
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
SUI.GoogleMap.prototype.setHeatmap = function(opt_options = {}) {
  const gradient = [
    'rgba(102, 255, 0, 0)',
    'rgba(102, 255, 0, 1)',
    'rgba(147, 255, 0, 1)',
    'rgba(193, 255, 0, 1)',
    'rgba(238, 255, 0, 1)',
    'rgba(244, 227, 0, 1)',
    'rgba(249, 198, 0, 1)',
    'rgba(255, 170, 0, 1)',
    'rgba(255, 113, 0, 1)',
    'rgba(255, 57, 0, 1)',
    'rgba(255, 0, 0, 1)',
  ];

  this.heatmapOptions = new SUI.Object({
    opacity: 0.6,
    radius: null,
    gradient: gradient,
  });
  this.heatmapOptions.merge(opt_options);
};

/**
 * @param {!Array<{latitude: number, longitude: number, weight: (number|undefined)}>} points
 * @param {!Object=} opt_heatmapOptions
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createHeatmap = function(points, opt_heatmapOptions = {}) {
  this.heatmap = new google.maps.visualization.HeatmapLayer({
    data: this._convertPointsToPath(points),
    map: this.map,
  });

  this.heatmapOptions.merge(opt_heatmapOptions);
  SUI.eachObject(this.heatmapOptions, (value, property) => {
    this.heatmap.set(property, value);
  });
};

/**
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removeHeatmap = function() {
  if (this.heatmap) {
    this.heatmap.setMap(null);
  }
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
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createOrUpdateMarker = function(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
  const marker = this.getMarker(id);
  if (marker) {
    this.updateMarker(id, title, iconName, latitude, longitude, opt_markerData, opt_options);
  } else {
    this.createMarker(id, title, iconName, latitude, longitude, opt_markerData, opt_options);
  }
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_markerData
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.createMarker = function(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
  const markerData = new SUI.Object(opt_markerData);
  if (!markerData.get('id')) {
    markerData.set('id', id);
  }
  const options = new SUI.Object(this.markerOptions);
  options.merge(opt_options);

  const text = /** @type {string} */ (SUI.convert(title, 'string'));
  const marker = new google.maps.Marker(options.copy(true));
  marker.setPosition(new google.maps.LatLng(latitude, longitude));
  marker.setIcon(this.markerIcons[iconName].icon);
  marker.setShape(this.markerIcons[iconName].shape);
  marker.setTitle(text);
  marker.setMap(this.map);
  markerData.setRaw('_marker', marker);

  const mapLabel = SUI.mapLabel(marker, text);
  markerData.setRaw('_map_label', mapLabel);

  this.markers.push(markerData);

  this._bindEventsToMarker(marker, markerData);
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
  const point = new google.maps.Point(x, y);
  const projection = this.overlay.getProjection();
  const location = projection.fromContainerPixelToLatLng(point);

  this.createMarker(id, title, iconName, location.lat(), location.lng(), markerData);
};

/**
 * @param {!google.maps.Marker} marker
 * @param {!SUI.Object} markerData
 * @return {undefined}
 */
SUI.GoogleMap.prototype._bindEventsToMarker = function(marker, markerData) {
  const cleanMarkerData = this._cleanMarkerData(markerData);

  marker.addListener('click', (event) => {
    this.eventMarkerClick(cleanMarkerData, event);
  });

  marker.addListener('dblclick', (event) => {
    this.eventMarkerDoubleClick(cleanMarkerData, event);
  });

  marker.addListener('rightclick', (event) => {
    this.eventMarkerRightClick(cleanMarkerData, event);
  });

  marker.addListener('drag', (_event) => {
    const vertex = marker.getPosition();
    const mapLabel = markerData.get('_map_label');
    mapLabel.set('position', vertex);
  });

  marker.addListener('dragend', (event) => {
    const vertex = marker.getPosition();
    const latitude = vertex.lat();
    const longitude = vertex.lng();
    this.eventMarkerChanged(cleanMarkerData, latitude, longitude, event);
  });
};

/**
 * @param {!google.maps.Marker} marker
 * @return {undefined}
 */
SUI.GoogleMap.prototype._unbindEventsToMarker = function(marker) {
  google.maps.event.clearInstanceListeners(marker);
};

/**
 * @param {string|number} id
 * @param {string} title
 * @param {string} iconName
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object=} opt_markerData
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.GoogleMap.prototype.updateMarker = function(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
  const markerData = this.getMarker(id);
  SUI.each(this._cleanMarkerData(opt_markerData), (value, key) => {
    markerData.set(key, value);
  });
  const text = /** @type {string} */ (SUI.convert(title, 'string'));
  const marker = /** @type {!google.maps.Marker} */ (markerData.get('_marker'));
  marker.setOptions(opt_options);

  const markerIcon = this.markerIcons[iconName];
  marker.setIcon(markerIcon.icon);
  marker.setShape(markerIcon.shape);
  marker.setTitle(text);
  marker.setPosition(new google.maps.LatLng(latitude, longitude));

  const mapLabel = markerData.get('_map_label');
  mapLabel.set('text', text);
};

/**
 * @param {!Object} markerData
 * @return {!SUI.Object}
 */
SUI.GoogleMap.prototype._cleanMarkerData = function(markerData) {
  const cleanData = new SUI.Object();
  SUI.each(markerData, (value, key) => {
    if (!SUI.inArray(['_marker', '_map_label'], key)) {
      cleanData.set(key, value);
    }
  });
  return cleanData;
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
  const markerData = this.getMarker(id);
  if (markerData) {
    const mapLabel = markerData.get('_map_label');
    mapLabel.setMap(null);
    const marker = /** @type {!google.maps.Marker} */ (markerData.get('_marker'));
    marker.setMap(null);
    this._unbindEventsToMarker(marker);
    this.markers.deleteById(id);
  }
};

/**
 * @return {undefined}
 */
SUI.GoogleMap.prototype.removeAllMarker = function() {
  this.markers.each((markerData) => {
    const mapLabel = markerData.get('_map_label');
    mapLabel.setMap(null);
    const marker = /** @type {!google.maps.Marker} */ (markerData.get('_marker'));
    marker.setMap(null);
    this._unbindEventsToMarker(marker);
  });
  this.markers.clear();
};

/**
 * @param {string|number} markerId
 * @return {undefined}
 */
SUI.GoogleMap.prototype.fitMarkerToMap = function(markerId) {
  const markerData = this.getMarker(markerId);
  if (markerData) {
    const marker = /** @type {!google.maps.Marker} */ (markerData.get('_marker'));
    const vertex = marker.getPosition();
    const latitude = vertex.lat();
    const longitude = vertex.lng();
    this.setCenter(latitude, longitude);
  }
};

/**
 * @param {string|number} markerId
 * @param {string} content
 * @return {undefined}
 */
SUI.GoogleMap.prototype.openInfoWindow = function(markerId, content) {
  const markerData = this.getMarker(markerId);
  const marker = /** @type {!google.maps.Marker} */ (markerData.get('_marker'));
  const infoWindow = new google.maps.InfoWindow({
    content: /** @type {string} */ (SUI.convert(content, 'string')),
  });
  infoWindow.open(this.map, marker);
};

/**
 * @param {!SUI.Object} markerData
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerClick = function(markerData, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventMarkerClick()', markerData, event);
};

/**
 * @param {!SUI.Object} markerData
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerDoubleClick = function(markerData, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventMarkerDoubleClick()', markerData, event);
};

/**
 * @param {!SUI.Object} markerData
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerRightClick = function(markerData, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventMarkerRightClick()', markerData, event);
};

/**
 * @param {!SUI.Object} markerData
 * @param {number} latitude
 * @param {number} longitude
 * @param {!Object} event
 * @return {undefined}
 */
SUI.GoogleMap.prototype.eventMarkerChanged = function(markerData, latitude, longitude, event) {
  SUI.consoleInfo('SUI.GoogleMap.eventMarkerChanged()', markerData, latitude, longitude, event);
};

/**
 * @param {string} name
 * @param {!Object} iconOptions
 * @return {undefined}
 */
SUI.GoogleMap.prototype.setMarkerIcon = function(name, iconOptions) {
  // https://developers.google.com/maps/documentation/javascript/examples/marker-symbol-custom
  const icon = {
    url: iconOptions.url,
    size: new google.maps.Size(iconOptions.size[0], iconOptions.size[1]),
    origin: new google.maps.Point(iconOptions.origin[0], iconOptions.origin[1]),
    anchor: new google.maps.Point(iconOptions.anchor[0], iconOptions.anchor[1]),
  };

  const shape = {
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
  const deferred = new SUI.Deferred();
  const geoCoder = new google.maps.Geocoder();
  geoCoder.geocode({address: SUI.convert(query, 'string')}, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const points = [];
      SUI.each(results, (result) => {
        const point = {
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
SUI.GoogleMap.prototype.setCenter = function(latitude, longitude, opt_boundCheck = false) {
  const position = new google.maps.LatLng(latitude, longitude);
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
  const vertex = this.map.getCenter();
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
  const point1 = new google.maps.Point(0, 0);
  const point2 = new google.maps.Point(radiusPx, radiusPx);

  const projection = this.overlay.getProjection();
  const location1 = projection.fromContainerPixelToLatLng(point1);
  const location2 = projection.fromContainerPixelToLatLng(point2);

  const latLng1 = new google.maps.LatLng(location1.lat(), location1.lng());
  const latLng2 = new google.maps.LatLng(location2.lat(), location2.lng());

  return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
};
