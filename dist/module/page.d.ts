import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * Document-level utilities for managing the page title, handling
 * document-wide click events, and triggering common browser actions
 * such as opening the email client.
 *
 * Page registers a document-level click listener that wraps the event
 * target in a {@link Knot} and dispatches to the overridable
 * {@link eventClick} method. This enables centralized click handling
 * for analytics, delegation, or global UI behaviors.
 *
 * @example
 * const page = new Page();
 *
 * page.setTitle('My Application');
 *
 * page.eventClick = (target, event) => {
 *     if (target.hasClass('track')) {
 *         analytics.trackClick(target);
 *     }
 * };
 *
 * page.mailTo('support@example.com', 'Help Request');
 *
 * @see {@link Knot}
 * @see {@link Objekt}
 * @category Module
 */
export declare class Page {
    options: Objekt;
    document: Document;
    /**
     * Creates a new Page instance and registers a document-level click
     * event listener.
     *
     * @param opt_options Configuration options to merge with defaults.
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    private _setOptions;
    /**
     * Stores a reference to the document and registers the
     * document-level click event listener.
     */
    private _init;
    /**
     * Sets the document title displayed in the browser tab.
     *
     * @param title The page title string to display.
     *
     * @example
     * page.setTitle('Dashboard - My App');
     */
    setTitle(title: string): void;
    /**
     * Called when any element in the document is clicked. Override this
     * method to implement centralized click handling such as event
     * delegation, analytics tracking, or global UI behaviors.
     *
     * @param target The clicked element wrapped in a {@link Knot}.
     * @param event The native click event.
     */
    eventClick(target: Knot, event: Event): void;
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
    mailTo(email: string, opt_subject?: string | undefined): void;
}
