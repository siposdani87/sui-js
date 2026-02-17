import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ProgressBar } from './progressBar';
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
export declare class Script {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    /**
     * Creates a new Script loader instance.
     *
     * @param {ProgressBar} progressBar - The progress bar instance used to
     *     indicate loading activity.
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults.
     */
    constructor(progressBar: ProgressBar, opt_options?: object | undefined);
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    private _setOptions;
    /**
     * Queries the `<head>` element where script tags will be appended.
     */
    private _init;
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
    load(id: string, url: string, opt_params?: object, opt_async?: boolean | undefined, opt_defer?: boolean | undefined): import("..").Promize<object, object>;
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
    remove(id: string): void;
}
