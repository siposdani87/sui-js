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
  /* if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js', {scope: './'})
      .then(function(registration) {
        console.log('Service Worker Registered', registration);

      });
   } */
};

