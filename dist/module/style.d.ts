import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ProgressBar } from './progressBar';
/**
 * Dynamic stylesheet loader that appends `<link>` tags to the document
 * `<head>`. Each stylesheet is identified by a unique ID; loading a
 * stylesheet that already exists (by ID) resolves immediately without
 * duplicating the tag.
 *
 * The loader integrates with {@link ProgressBar} to show and hide
 * progress during stylesheet loading.
 *
 * @see {@link ProgressBar}
 * @see {@link Script}
 * @category Module
 *
 * @example
 * const style = new Style(progressBar);
 * style.load('theme-dark', '/css/dark-theme.css').then(() => {
 *     // Dark theme stylesheet is applied
 * });
 */
export declare class Style {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    /**
     * Creates a new Style loader instance.
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
     * Queries the `<head>` element where link tags will be appended.
     */
    private _init;
    /**
     * Loads a CSS stylesheet by appending a `<link>` tag to the document
     * head. If a link with the given ID already exists in the DOM, the
     * returned promise resolves immediately without creating a duplicate.
     *
     * @param {string} id - A unique identifier for the link element. Used
     *     both as the element ID and to check for existing stylesheets.
     * @param {string} url - The URL of the CSS file to load.
     * @param {object | undefined} opt_params - Optional query string
     *     parameters appended to the URL.
     * @param {string | undefined} opt_rel - The `rel` attribute value
     *     for the link tag. Defaults to 'stylesheet'.
     * @param {string | undefined} opt_media - The `media` attribute value
     *     for the link tag. Defaults to 'all'.
     * @returns {Promize} A promise that resolves with `true` when the
     *     stylesheet loads successfully, or rejects with `false` on error.
     *
     * @example
     * style.load('print-css', '/css/print.css', {}, 'stylesheet', 'print');
     */
    load(id: string, url: string, opt_params?: object, opt_rel?: string | undefined, opt_media?: string | undefined): import("..").Promize<boolean, boolean>;
    /**
     * Removes a previously loaded stylesheet element from the DOM by its
     * ID. If no element with the given ID exists or the element is empty,
     * this method does nothing.
     *
     * @param {string} id - The ID of the link element to remove.
     *
     * @example
     * style.remove('theme-dark');
     */
    remove(id: string): void;
}
