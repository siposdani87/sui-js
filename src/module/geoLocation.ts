import { consoleWarn } from "../base";
import { Deferred } from "../core/deferred";

/**
 * @constructor
 * @this {GeoLocation}
 */
export const GeoLocation = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
GeoLocation.prototype._init = function() {
  this.options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: Infinity,
  };
};

/**
 * @return {undefined}
 */
GeoLocation.prototype.setWatcher = function() {
  this.watcherId = navigator.geolocation.watchPosition((position) => {
    this._handlePosition(position);
  }, (error) => {
    this._handleError(error);
  }, this.options);
};


/**
 * @return {!Promize}
 */
GeoLocation.prototype.getPosition = function() {
  const deferred = new Deferred();
  navigator.geolocation.getCurrentPosition((position) => {
    deferred.resolve([position.coords.latitude, position.coords.longitude]);
  }, (_error) => {
    deferred.reject([null, null]);
  }, this.options);
  return deferred.promise();
};

/**
 * @return {undefined}
 */
GeoLocation.prototype.clearWatcher = function() {
  navigator.geolocation.clearWatch(this.watcherId);
};

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} message
 * @return {undefined}
 */
GeoLocation.prototype.eventChange = function(latitude, longitude, message) {
  consoleWarn('GeoLocation.eventChange()', latitude, longitude, message);
};

/**
 * @private
 * @param {!Object} position
 * @return {undefined}
 */
GeoLocation.prototype._handlePosition = function(position) {
  const message = 'User allowed the request for GeoLocation.';
  this.eventChange(position.coords.latitude, position.coords.longitude, message);
};

/**
 * @private
 * @param {!Object} error
 * @return {undefined}
 */
GeoLocation.prototype._handleError = function(error) {
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
GeoLocation.prototype.eventError = function(message, code) {
  consoleWarn('GeoLocation.eventError()', message, code);
};
