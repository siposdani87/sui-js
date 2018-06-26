goog.provide('SUI.lib.AppCache');

goog.require('SUI');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.AppCache}
 */
SUI.lib.AppCache = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.AppCache.prototype._init = function() {
  this.appCache = window.applicationCache;
  if (this.appCache) {
    this._attachEvent();
  } else {
    this.eventMissingFeatures(['window.applicationCache']);
  }
};

/**
 * @param {!Array} features
 * @return {undefined}
 */
SUI.lib.AppCache.prototype.eventMissingFeatures = function(features) {
  console.warn('SUI.lib.AppCache.eventMissingFeatures()', features);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.AppCache.prototype._attachEvent = function() {
  this.appCache.addEventListener('updateready', () => {
    if (this.appCache.status === this.appCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  });


  let handleCacheEvent = (e) => {
    // console.log(e);
  };

  let handleCacheError = (e) => {
    // alert('Error: Cache failed to update!');
  };

  // Fired after the first cache of the manifest.
  this.appCache.addEventListener('cached', handleCacheEvent, false);

  // Checking for an update. Always the first event fired in the sequence.
  this.appCache.addEventListener('checking', handleCacheEvent, false);

  // An update was found. The browser is fetching resources.
  this.appCache.addEventListener('downloading', handleCacheEvent, false);

  // The manifest returns 404 or 410, the download failed,
  // or the manifest changed while the download was in progress.
  this.appCache.addEventListener('error', handleCacheError, false);

  // Fired after the first download of the manifest.
  this.appCache.addEventListener('noupdate', handleCacheEvent, false);

  // Fired if the manifest file returns a 404 or 410.
  // This results in the application cache being deleted.
  this.appCache.addEventListener('obsolete', handleCacheEvent, false);

  // Fired for each resource listed in the manifest as it is being fetched.
  this.appCache.addEventListener('progress', handleCacheEvent, false);

  // Fired when the manifest resources have been newly redownloaded.
  this.appCache.addEventListener('updateready', handleCacheEvent, false);
};

/**
 * @return {string}
 */
SUI.lib.AppCache.prototype.getState = function() {
  let result;
  switch (this.appCache.status) {
    case this.appCache.UNCACHED: // UNCACHED == 0
      result = 'UNCACHED';
      break;
    case this.appCache.IDLE: // IDLE == 1
      result = 'IDLE';
      break;
    case this.appCache.CHECKING: // CHECKING == 2
      result = 'CHECKING';
      break;
    case this.appCache.DOWNLOADING: // DOWNLOADING == 3
      result = 'DOWNLOADING';
      break;
    case this.appCache.UPDATEREADY: // UPDATEREADY == 4
      result = 'UPDATEREADY';
      break;
    case this.appCache.OBSOLETE: // OBSOLETE == 5
      result = 'OBSOLETE';
      break;
    default:
      result = 'UKNOWN CACHE STATUS';
      break;
  }
  return result;
};

/**
 * @return {undefined}
 */
SUI.lib.AppCache.prototype.update = function() {
  this.appCache.update();
};

/**
 * @return {undefined}
 */
SUI.lib.AppCache.prototype.abort = function() {
  this.appCache.abort();
};

/**
 * @return {undefined}
 */
SUI.lib.AppCache.prototype.swapCache = function() {
  this.appCache.swapCache();
};
