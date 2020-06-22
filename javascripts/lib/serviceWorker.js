goog.provide('SUI.lib.ServiceWorker');

goog.require('SUI');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.ServiceWorker}
 */
SUI.lib.ServiceWorker = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.ServiceWorker.prototype._init = function() {
  if ('serviceWorker' in navigator) {
    /* navigator.serviceWorker
      .register('service-worker.js', {scope: './'})
      .then((registration) => {
        console.info('Service worker registered', registration);
      }, (error) => {
        console.info('Service worker registration failed', error);
      }); */
  } else {
    this.eventMissingFeatures(['navigator.serviceWorker']);
  }
};

/**
 * @param {!Array} features
 * @return {undefined}
 */
SUI.lib.ServiceWorker.prototype.eventMissingFeatures = function(features) {
  console.warn('SUI.lib.ServiceWorker.eventMissingFeatures()', features);
};
