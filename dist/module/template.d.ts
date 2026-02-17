import { Objekt } from '../core/objekt';
import { Http } from './http';
import { Knot } from '../core';
/**
 * SPA template loader that fetches page content from the server via
 * {@link Http} and inserts it into the view container. Supports
 * client-side caching based on `data-template-url` and `data-locale`
 * attributes to avoid redundant fetches during SPA navigation.
 *
 * When `load()` is called, the template checks whether the requested
 * URL and locale match the currently loaded content. If they match
 * (and `opt_force` is false), the existing `.page-content` element is
 * returned immediately without an HTTP request. Otherwise, the content
 * is fetched from the server and inserted into the view container.
 *
 * On error responses, the `.message` element is extracted from the
 * response and passed to the overridable `eventError()` hook.
 *
 * @example
 * const template = new Template(http, {
 *     selector: '.template-view',
 *     locale: 'en-US',
 * });
 *
 * template.load('/pages/dashboard').then(
 *     (pageKnot) => {
 *         initDashboard(pageKnot);
 *     },
 *     (errorKnot) => {
 *         console.error('Page load failed');
 *     },
 * );
 *
 * @see {@link Http}
 * @see {@link Knot}
 * @category Module
 */
export declare class Template {
    http: Http;
    options: Objekt<{
        selector: string;
        locale: string;
    }>;
    viewKnot: Knot;
    /**
     * Creates a new Template instance.
     *
     * @param http The HTTP client used to fetch page templates from
     *     the server.
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `selector` (CSS selector for the view
     *     container, defaults to `'.template-view'`), `locale`
     *     (current locale string, defaults to `navigator.language`).
     */
    constructor(http: Http, opt_options?: object | undefined);
    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    private _setOptions;
    /**
     * Initializes the view container DOM reference from the configured
     * selector.
     */
    private _init;
    /**
     * Returns the main view container {@link Knot} where page content
     * is rendered.
     *
     * @returns The view container Knot element.
     *
     * @example
     * const viewContainer = template.getViewKnot();
     * viewContainer.addClass('loading');
     */
    getViewKnot(): Knot;
    /**
     * Loads page content from the given URL into the view container.
     *
     * When `opt_force` is false (the default), the method first checks
     * the `data-template-url` and `data-locale` attributes on the view
     * container. If both match the requested URL and current locale, the
     * existing `.page-content` element is returned without making an
     * HTTP request.
     *
     * Otherwise, an HTTP GET request is made to fetch the content. On
     * success, the response's `.page-content` element is extracted and
     * inserted into the view container. On failure, the error content is
     * passed to `eventError()`.
     *
     * @param url The server endpoint URL to fetch the page template from.
     * @param opt_force When true, bypasses the cache check and always
     *     fetches from the server. Defaults to false.
     * @returns A {@link Promize} that resolves with the page content
     *     {@link Knot} on success, or rejects with the error content
     *     Knot on failure.
     *
     * @example
     * template.load('/pages/settings').then((pageKnot) => {
     *     initSettingsPage(pageKnot);
     * });
     *
     * @example
     * // Force reload, bypassing the cache
     * template.load('/pages/settings', true).then((pageKnot) => {
     *     initSettingsPage(pageKnot);
     * });
     */
    load(url: string, opt_force?: boolean | undefined): import("../core").Promize<Knot<HTMLElement>, Knot<HTMLElement>>;
    /**
     * Extracts the `.page-content` element from the response DOM and
     * delegates to `_updateDOM()` for insertion or error handling.
     *
     * @param data The raw response DOM from the HTTP request.
     * @param isError Whether the response represents an error.
     * @returns The extracted page content Knot.
     */
    _spaNavigate(data: Knot, isError: boolean): Knot;
    /**
     * Inserts the page content into the view container, or extracts
     * and dispatches the error message via `eventError()`.
     *
     * @param knot The page content Knot to insert.
     * @param isError Whether to treat the content as an error response.
     */
    private _updateDOM;
    /**
     * Overridable hook called when a template load results in an error.
     * The default implementation logs the error to the console. Override
     * this method to display error messages in the UI (e.g., via
     * {@link Flash}).
     *
     * @param message An object containing the error `type` (CSS class)
     *     and `content` (error text) extracted from the response.
     *
     * @example
     * template.eventError = (message) => {
     *     flash.addError(message.content);
     * };
     */
    eventError(message: {
        type: string;
        content: string;
    }): void;
}
