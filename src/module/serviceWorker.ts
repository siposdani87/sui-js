import { consoleWarn } from "../base";

/**
 * @constructor
 * @this {ServiceWorker}
 */
export const ServiceWorker = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
ServiceWorker.prototype._init = function() {
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
ServiceWorker.prototype.eventMissingFeatures = function(features) {
  consoleWarn('ServiceWorker.eventMissingFeatures()', features);
};
