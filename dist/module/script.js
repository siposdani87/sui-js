import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * Dynamic script loader that appends `<script>` tags to the document
 * `<head>`. Each script is identified by a unique ID; loading a script
 * that already exists (by ID) resolves immediately without duplicating
 * the tag.
 *
 * The loader integrates with {@link ProgressBar} to show and hide
 * progress during script loading.
 *
 * @see {@link ProgressBar}
 * @see {@link Style}
 * @category Module
 *
 * @example
 * const script = new Script(progressBar);
 * script.load('google-maps', 'https://maps.googleapis.com/maps/api/js', {
 *     key: 'API_KEY',
 * }).then(() => {
 *     // Google Maps API is ready
 * });
 */
export class Script {
    /**
     * Creates a new Script loader instance.
     *
     * @param {ProgressBar} progressBar - The progress bar instance used to
     *     indicate loading activity.
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults.
     */
    constructor(progressBar, opt_options = {}) {
        this.progressBar = progressBar;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    /**
     * Queries the `<head>` element where script tags will be appended.
     */
    _init() {
        this.head = new Query('head').getKnot();
    }
    /**
     * Loads a JavaScript file by appending a `<script>` tag to the document
     * head. If a script with the given ID already exists in the DOM, the
     * returned promise resolves immediately without creating a duplicate.
     *
     * @param {string} id - A unique identifier for the script element. Used
     *     both as the element ID and to check for existing scripts.
     * @param {string} url - The URL of the JavaScript file to load.
     * @param {object | undefined} opt_params - Optional query string
     *     parameters appended to the URL.
     * @param {boolean | undefined} opt_async - When true, sets the `async`
     *     attribute on the script tag.
     * @param {boolean | undefined} opt_defer - When true, sets the `defer`
     *     attribute on the script tag.
     * @returns {Promize} A promise that resolves when the script loads
     *     successfully, or rejects on error.
     *
     * @example
     * script.load('analytics', '/js/analytics.js', { v: '2' }, true);
     */
    load(id, url, opt_params, opt_async = false, opt_defer = false) {
        this.progressBar.show();
        const deferred = new Deferred();
        const script = new Query('#' + id);
        if (script.size() > 0) {
            this.progressBar.hide();
            deferred.resolve();
        }
        else {
            const scriptKnot = new Knot('script');
            scriptKnot.setId(id);
            scriptKnot.setAttribute('src', urlWithQueryString(url, opt_params));
            // TODO: check there is a good performance solution for script load
            if (opt_async) {
                scriptKnot.setAttribute('async');
            }
            if (opt_defer) {
                scriptKnot.setAttribute('defer');
            }
            scriptKnot.setAttribute('onload', () => {
                this.progressBar.hide();
                deferred.resolve();
            });
            scriptKnot.setAttribute('onerror', () => {
                this.progressBar.hide();
                deferred.reject();
            });
            this.head.appendChild(scriptKnot);
        }
        return deferred.promise();
    }
    /**
     * Removes a previously loaded script element from the DOM by its ID.
     * If no element with the given ID exists or the element is empty,
     * this method does nothing.
     *
     * @param {string} id - The ID of the script element to remove.
     *
     * @example
     * script.remove('analytics');
     */
    remove(id) {
        const script = new Query('#' + id).getKnot();
        if (!script.isEmpty()) {
            script.remove();
        }
    }
}
