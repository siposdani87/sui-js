import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Emitter } from '../core/emitter';
/**
 * Document-level utilities for managing the page title, handling
 * document-wide click events, and triggering common browser actions
 * such as opening the email client.
 *
 * Page registers a document-level click listener that wraps the event
 * target in a {@link Knot} and emits a `'click'` event. This enables
 * centralized click handling for analytics, delegation, or global UI
 * behaviors.
 *
 * @example
 * const page = new Page();
 *
 * page.setTitle('My Application');
 *
 * page.on('click', (target, event) => {
 *     if (target.hasClass('track')) {
 *         analytics.trackClick(target);
 *     }
 * });
 *
 * page.mailTo('support@example.com', 'Help Request');
 *
 * @see {@link Knot}
 * @see {@link Objekt}
 * @see {@link Emitter}
 * @category Module
 */
export class Page extends Emitter {
    /**
     * Creates a new Page instance and registers a document-level click
     * event listener.
     *
     * @param opt_options Configuration options to merge with defaults.
     */
    constructor(opt_options = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    _setOptions(opt_options) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    /**
     * Stores a reference to the document and registers the
     * document-level click event listener.
     */
    _init() {
        this.document = document;
        this._onClick = (event) => {
            const target = new Knot(event.target);
            this.emit('click', target, event);
        };
        this.document.addEventListener('click', this._onClick);
    }
    /**
     * Removes the document-level click event listener registered during
     * initialization. Call this method to clean up when the Page
     * instance is no longer needed.
     */
    destroy() {
        this.document.removeEventListener('click', this._onClick);
    }
    /**
     * Sets the document title displayed in the browser tab.
     *
     * @param title The page title string to display.
     *
     * @example
     * page.setTitle('Dashboard - My App');
     */
    setTitle(title) {
        this.document.title = title;
    }
    /**
     * Opens the user's default email client with a new message
     * pre-addressed to the given email and optionally pre-filled
     * with a subject line.
     *
     * @param email The recipient email address.
     * @param opt_subject The email subject line. Defaults to empty.
     *
     * @example
     * page.mailTo('support@example.com', 'Bug Report');
     */
    mailTo(email, opt_subject = '') {
        this.document.location.href =
            'mailto:' + email + '?subject=' + opt_subject;
    }
}
