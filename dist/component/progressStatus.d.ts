import { Knot } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @description Status indicator component that displays success, info, warning, or error states
 * with configurable icon and text.
 *
 * @example
 * const status = new ProgressStatus(containerKnot, '.progress-status');
 * status.setSuccess('Upload complete', 'check_circle');
 * status.setError('Upload failed', 'error');
 *
 * @category Component
 */
export declare class ProgressStatus {
    progressStatusKnot: Knot;
    options: Objekt;
    iconKnot: Knot;
    textKnot: Knot;
    /**
     * @description Creates a new ProgressStatus bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the progress status element.
     * @param {object} [opt_options] - Configuration options (successStyle, infoStyle, warningStyle, errorStyle).
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: object | undefined);
    /**
     * @description Merges user options with default style class names.
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions;
    /**
     * @description Queries the icon and text child elements.
     */
    private _init;
    /**
     * @description Applies a status CSS class, updates the text, and optionally sets the icon.
     * @param {string} cssClass - The CSS class for the status state.
     * @param {string} text - The status text to display.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     */
    private _setStatus;
    /**
     * @description Sets the status to success state with the given text and optional icon.
     * @param {string} text - The success message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setSuccess('Operation completed', 'check_circle');
     */
    setSuccess(text: string, opt_icon?: string | undefined): void;
    /**
     * @description Sets the status to info state with the given text and optional icon.
     * @param {string} text - The info message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setInfo('Processing...', 'info');
     */
    setInfo(text: string, opt_icon?: string | undefined): void;
    /**
     * @description Sets the status to warning state with the given text and optional icon.
     * @param {string} text - The warning message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setWarning('Disk space low', 'warning');
     */
    setWarning(text: string, opt_icon?: string | undefined): void;
    /**
     * @description Sets the status to error state with the given text and optional icon.
     * @param {string} text - The error message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setError('Connection failed', 'error');
     */
    setError(text: string, opt_icon?: string | undefined): void;
}
