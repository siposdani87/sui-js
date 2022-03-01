import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.ServiceWorker');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.ServiceWorker}
 */
SUI.ServiceWorker = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.ServiceWorker.prototype._init = function() {
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
SUI.ServiceWorker.prototype.eventMissingFeatures = function(features) {
  SUI.consoleWarn('SUI.ServiceWorker.eventMissingFeatures()', features);
};
