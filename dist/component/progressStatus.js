import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
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
export class ProgressStatus {
    /**
     * @description Creates a new ProgressStatus bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the progress status element.
     * @param {object} [opt_options] - Configuration options (successStyle, infoStyle, warningStyle, errorStyle).
     */
    constructor(dom, opt_selector = '.progress-status', opt_options = {}) {
        this.progressStatusKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @description Merges user options with default style class names.
     * @param {object} [opt_options] - Configuration overrides.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            successStyle: 'success',
            infoStyle: 'info',
            warningStyle: 'warning',
            errorStyle: 'error',
        });
        this.options.merge(opt_options);
    }
    /**
     * @description Queries the icon and text child elements.
     */
    _init() {
        this.iconKnot = new Query('.icon', this.progressStatusKnot).getKnot();
        this.textKnot = new Query('.text', this.progressStatusKnot).getKnot();
    }
    /**
     * @description Applies a status CSS class, updates the text, and optionally sets the icon.
     * @param {string} cssClass - The CSS class for the status state.
     * @param {string} text - The status text to display.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     */
    _setStatus(cssClass, text, opt_icon = '') {
        this.progressStatusKnot.removeClass([
            this.options.errorStyle,
            this.options.successStyle,
            this.options.infoStyle,
            this.options.warningStyle,
        ]);
        this.progressStatusKnot.addClass(cssClass);
        this.textKnot.setHtml(text);
        if (opt_icon) {
            this.iconKnot.setHtml(opt_icon);
        }
    }
    /**
     * @description Sets the status to success state with the given text and optional icon.
     * @param {string} text - The success message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setSuccess('Operation completed', 'check_circle');
     */
    setSuccess(text, opt_icon = '') {
        this._setStatus(this.options.successStyle, text, opt_icon);
    }
    /**
     * @description Sets the status to info state with the given text and optional icon.
     * @param {string} text - The info message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setInfo('Processing...', 'info');
     */
    setInfo(text, opt_icon = '') {
        this._setStatus(this.options.infoStyle, text, opt_icon);
    }
    /**
     * @description Sets the status to warning state with the given text and optional icon.
     * @param {string} text - The warning message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setWarning('Disk space low', 'warning');
     */
    setWarning(text, opt_icon = '') {
        this._setStatus(this.options.warningStyle, text, opt_icon);
    }
    /**
     * @description Sets the status to error state with the given text and optional icon.
     * @param {string} text - The error message text.
     * @param {string} [opt_icon] - Optional Material Design icon name.
     *
     * @example
     * status.setError('Connection failed', 'error');
     */
    setError(text, opt_icon = '') {
        this._setStatus(this.options.errorStyle, text, opt_icon);
    }
}
