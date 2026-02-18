import { eq, format, isFunction, isPureObject, noop } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { Knot } from '../core';
import { mdl } from '../utils/render';

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
export class Flash {
    container!: Knot;
    options!: Objekt;

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
    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * Initializes the flash container DOM reference.
     */
    private _init(): void {
        this.container = new Query(this.options.id).getKnot();
    }

    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: '#flashes',
            duration: 4000,
            closableTypes: ['error'],
        });
        this.options.merge(opt_options);
    }

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
    private _getFlashKnot(
        type: string,
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        const flashKnot = this.container.createElement('div');
        flashKnot.setAttribute('data-id', opt_id || generateId('flash'));
        flashKnot.addClass(['flash', type]);
        flashKnot.setHtml(message);
        if (
            this._isClosable(type, opt_closeCallback) &&
            !eq(opt_duration, Infinity)
        ) {
            const buttonKnot = this._getCloseButton(
                flashKnot,
                opt_closeCallback,
            );
            flashKnot.beforeChild(buttonKnot);
        }
        return flashKnot;
    }

    /**
     * Creates an MDL-styled close button for a flash message.
     *
     * @param flashKnot The flash element that this button will close.
     * @param opt_closeCallback Callback invoked when the button is clicked.
     * @returns The close button Knot element.
     */
    private _getCloseButton(
        flashKnot: Knot,
        opt_closeCallback: ((() => void) | null) | undefined = null,
    ): Knot {
        const buttonKnot = flashKnot.createElement('button');
        buttonKnot.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);

        const buttonIcon = buttonKnot.createElement('em');
        buttonIcon.addClass('material-icons');
        buttonIcon.setHtml('close');

        buttonKnot.appendChild(buttonIcon);

        buttonKnot.addEventListener('click', () => {
            this.remove(flashKnot, opt_closeCallback);
        });

        mdl(buttonKnot);

        return buttonKnot;
    }

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
    private _add(
        type: string,
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        this.removeById(opt_id);
        const flashKnot = this._getFlashKnot(
            type,
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
        this.container.appendChild(flashKnot);
        if (
            !this._isClosable(type, opt_closeCallback) &&
            !eq(opt_duration, Infinity)
        ) {
            flashKnot.addClass('closable');
            flashKnot.addEventListener('click', () => {
                this.remove(flashKnot, opt_closeCallback);
            });
            window.setTimeout(() => {
                this.remove(flashKnot, opt_closeCallback);
            }, opt_duration || this.options.duration);
        }
        return flashKnot;
    }

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
    removeById(opt_id: string | undefined = '') {
        if (opt_id) {
            const selector = format('[data-id={0}]', [opt_id]);
            const flashes = new Query(selector, this.container);
            flashes.each((flash) => {
                this.container.removeChild(flash);
            });
        }
    }

    /**
     * Determines whether a flash message type should show a close button.
     * A type is closable if it appears in the `closableTypes` option
     * array or if a close callback function is provided.
     *
     * @param type The message type to check.
     * @param opt_closeCallback The close callback, if any.
     * @returns True if the flash should display a close button.
     */
    private _isClosable(
        type: string,
        opt_closeCallback: ((() => void) | null) | undefined = null,
    ): boolean {
        return (
            this.options.closableTypes.indexOf(type) !== -1 ||
            isFunction(opt_closeCallback)
        );
    }

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
    remove(
        flash: Knot,
        opt_closeCallback: ((() => void) | null) | undefined = null,
    ): void {
        if (isFunction(opt_closeCallback)) {
            opt_closeCallback();
        }
        this.container.removeChild(flash);
    }

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
    addSuccess(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        return this._add(
            'success',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

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
    addInfo(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        return this._add(
            'info',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

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
    addWarning(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        return this._add(
            'warning',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

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
    addError(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        return this._add(
            'error',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

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
    addMessage(
        message: { type: string; content: string; closable?: boolean },
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot | null {
        if (isPureObject(message)) {
            const closeCallback = message.closable ? noop : opt_closeCallback;
            return this._add(
                message.type,
                message.content,
                opt_duration,
                closeCallback,
                opt_id,
            );
        }
        return null;
    }

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
    addDefault(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: ((() => void) | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        return this._add(
            'default',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
}
