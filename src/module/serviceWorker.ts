import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class ServiceWorker {
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
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
    }
    /**
     * @param {!Array} features
     * @return {undefined}
     */
    eventMissingFeatures(features) {
        consoleWarn('ServiceWorker.eventMissingFeatures()', features);
    }
}
