goog.provide('SUI.lib.GeoLocation');

goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.GeoLocation}
 */
SUI.lib.GeoLocation = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype._init = function() {
  this.options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: Infinity
  };
};

/**
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype.setWatcher = function() {
  this.watcherId = navigator.geolocation.watchPosition((position) => {
    this._handlePosition(position);
  }, (error) => {
    this._handleError(error);
  }, this.options);
};


/**
 * @return {!SUI.Promise}
 */
SUI.lib.GeoLocation.prototype.getPosition = function() {
  var deferred = new SUI.Deferred();
  navigator.geolocation.getCurrentPosition((position) => {
    deferred.resolve([position.coords.latitude, position.coords.longitude]);
  }, (error) => {
    deferred.reject([null, null]);
  }, this.options);
  return deferred.promise();
};

/**
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype.clearWatcher = function() {
  navigator.geolocation.clearWatch(this.watcherId);
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} message
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype.eventChange = function(latitude, longitude, message) {
  console.warn('SUI.lib.GeoLocation.eventChange()', latitude, longitude, message);
};

/**
 * @private
 * @param {!Object} position
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype._handlePosition = function(position) {
  var message = 'User allowed the request for GeoLocation.';
  this.eventChange(position.coords.latitude, position.coords.longitude, message);
};

/**
 * @private
 * @param {!Object} error
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype._handleError = function(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      this.eventError('User denied the request for GeoLocation.', 'permission_denied');
      break;
    case error.POSITION_UNAVAILABLE:
      this.eventError('Location information is unavailable.', 'position_unavailable');
      break;
    case error.TIMEOUT:
      this.eventError('The request to get user location timed out.', 'timeout');
      break;
    default:
      this.eventError('An unknown error occurred.', 'unknown');
      break;
  }
};

/**
 * @param {string} message
 * @param {string} code
 * @return {undefined}
 */
SUI.lib.GeoLocation.prototype.eventError = function(message, code) {
  console.warn('SUI.lib.GeoLocation.eventError()', message, code);
};
