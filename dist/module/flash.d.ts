import { Objekt } from '../core/objekt';
import { Knot } from '../core';
/**
 * Flash message notification system for displaying temporary, styled
 * messages to the user. Supports multiple message types (`'success'`,
 * `'info'`, `'warning'`, `'error'`, `'default'`) with configurable
 * auto-dismiss duration and close behavior.
 *
 * Messages are categorized as either closable or non-closable based on
 * the `closableTypes` option (defaults to `['error']`). Closable messages
 * display an explicit close button and remain visible until the user
 * dismisses them. Non-closable messages auto-dismiss after the configured
 * duration and can be clicked anywhere to dismiss early.
 *
 * Setting `opt_duration` to `Infinity` prevents both auto-dismiss and
 * the close button from appearing, creating a persistent notification.
 *
 * Each flash message can be assigned a custom `opt_id` for later
 * programmatic removal via `removeById()`. When a new message is added
 * with an existing ID, the previous message with that ID is removed
 * first.
 *
 * @example
 * const flash = new Flash({ duration: 5000 });
 *
 * flash.addSuccess('Item saved successfully.');
 * flash.addError('Failed to save item.', 0, () => {
 *     retryOperation();
 * });
 *
 * @example
 * // Add a message from a server response object
 * flash.addMessage({ type: 'warning', content: 'Session expiring soon.' });
 *
 * @example
 * // Remove a specific flash by ID
 * flash.addInfo('Uploading...', Infinity, null, 'upload-progress');
 * // Later, when upload completes:
 * flash.removeById('upload-progress');
 *
 * @see {@link Knot}
 * @see {@link Objekt}
 * @category Module
 */
export declare class Flash {
    container: Knot;
    options: Objekt;
    /**
     * Creates a new Flash instance.
     *
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `id` (CSS selector for the flash container,
     *     defaults to `'#flashes'`), `duration` (auto-dismiss time in
     *     milliseconds for non-closable messages, defaults to `4000`),
     *     `closableTypes` (array of message types that show a close
     *     button, defaults to `['error']`).
     */
    constructor(opt_options?: object | undefined);
    /**
     * Initializes the flash container DOM reference.
     */
    private _init;
    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    private _setOptions;
    /**
     * Creates a flash message DOM element with the given type, content,
     * and optional close button.
     *
     * @param type The message type CSS class (e.g., 'success', 'error').
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     * @param opt_id Custom identifier for the flash element.
     * @returns The created flash Knot element.
     */
    private _getFlashKnot;
    /**
     * Creates an MDL-styled close button for a flash message.
     *
     * @param flashKnot The flash element that this button will close.
     * @param opt_closeCallback Callback invoked when the button is clicked.
     * @returns The close button Knot element.
     */
    private _getCloseButton;
    /**
     * Creates and appends a flash message to the container. If an
     * `opt_id` is provided, any existing flash with that ID is removed
     * first. Non-closable messages get a click-to-dismiss handler and
     * auto-dismiss after the configured duration.
     *
     * @param type The message type CSS class (e.g., 'success', 'error').
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is removed.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element.
     */
    private _add;
    /**
     * Removes all flash messages with the given data-id attribute from
     * the container.
     *
     * @param opt_id The data-id value of the flash messages to remove.
     *     When empty, no action is taken.
     *
     * @example
     * flash.removeById('upload-progress');
     */
    removeById(opt_id?: string | undefined): void;
    /**
     * Determines whether a flash message type should show a close button.
     * A type is closable if it appears in the `closableTypes` option
     * array or if a close callback function is provided.
     *
     * @param type The message type to check.
     * @param opt_closeCallback The close callback, if any.
     * @returns True if the flash should display a close button.
     */
    private _isClosable;
    /**
     * Removes a flash message from the container and invokes the
     * optional close callback.
     *
     * @param flash The flash Knot element to remove.
     * @param opt_closeCallback Optional callback to invoke before
     *     removing the element.
     *
     * @example
     * const flashKnot = flash.addInfo('Processing...');
     * // Later, remove it programmatically:
     * flash.remove(flashKnot);
     */
    remove(flash: Knot, opt_closeCallback?: ((() => void) | null) | undefined): void;
    /**
     * Adds a success-type flash message.
     *
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element.
     *
     * @example
     * flash.addSuccess('Profile updated successfully.');
     */
    addSuccess(message: string, opt_duration?: number | undefined, opt_closeCallback?: ((() => void) | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * Adds an info-type flash message.
     *
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element.
     *
     * @example
     * flash.addInfo('New version available.');
     */
    addInfo(message: string, opt_duration?: number | undefined, opt_closeCallback?: ((() => void) | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * Adds a warning-type flash message.
     *
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element.
     *
     * @example
     * flash.addWarning('Disk space is running low.');
     */
    addWarning(message: string, opt_duration?: number | undefined, opt_closeCallback?: ((() => void) | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * Adds an error-type flash message. Error messages are closable by
     * default (they display a close button and do not auto-dismiss).
     *
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element.
     *
     * @example
     * flash.addError('Failed to save changes. Please try again.');
     *
     * @example
     * // Error with a retry callback
     * flash.addError('Connection lost.', 0, () => {
     *     reconnect();
     * });
     */
    addError(message: string, opt_duration?: number | undefined, opt_closeCallback?: ((() => void) | null) | undefined, opt_id?: string | undefined): Knot;
    /**
     * Adds a flash message from a structured message object. The object
     * must contain `type` and `content` properties. When the `closable`
     * property is true, the message uses a no-op close callback to
     * force closable behavior regardless of its type.
     *
     * @param message The message object with `type` (flash type string),
     *     `content` (HTML message text), and optional `closable` flag.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     *     Overridden by a no-op when `message.closable` is true.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element, or null if the message
     *     parameter is not a valid plain object.
     *
     * @example
     * // From a server response
     * flash.addMessage({
     *     type: 'success',
     *     content: 'Operation completed.',
     * });
     *
     * @example
     * // Closable message regardless of type
     * flash.addMessage({
     *     type: 'info',
     *     content: 'Please review the changes.',
     *     closable: true,
     * });
     */
    addMessage(message: {
        type: string;
        content: string;
        closable?: boolean;
    }, opt_duration?: number | undefined, opt_closeCallback?: ((() => void) | null) | undefined, opt_id?: string | undefined): Knot | null;
    /**
     * Adds a default-type flash message with no special styling.
     *
     * @param message The HTML content of the flash message.
     * @param opt_duration Auto-dismiss duration in milliseconds. When 0,
     *     the default duration from options is used.
     * @param opt_closeCallback Callback invoked when the flash is closed.
     * @param opt_id Custom identifier for deduplication and programmatic
     *     removal.
     * @returns The created flash Knot element.
     *
     * @example
     * flash.addDefault('Action completed.');
     */
    addDefault(message: string, opt_duration?: number | undefined, opt_closeCallback?: ((() => void) | null) | undefined, opt_id?: string | undefined): Knot;
}
