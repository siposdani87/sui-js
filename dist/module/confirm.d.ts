import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
/**
 * Confirmation dialog modal with customizable message, action buttons,
 * and type-based styling. Extends {@link BaseModal} to provide a simple
 * confirm/cancel interaction pattern.
 *
 * Supported type values control the visual style of the confirmation
 * window: `'normal'`, `'info'`, `'warning'`, `'error'`, `'success'`,
 * and `'choice'`. The `'choice'` type applies primary styling to the
 * cancel button as well, indicating both options are equally valid.
 *
 * After calling `load()`, set `eventOK` and optionally `eventCancel`
 * callbacks before calling `open()` to display the confirmation.
 *
 * @example
 * const confirm = new Confirm();
 * confirm.load(
 *     'Are you sure you want to delete this item?',
 *     'Delete',
 *     'Cancel',
 *     'Confirm Deletion',
 *     'warning',
 * );
 * confirm.eventOK = () => deleteItem(itemId);
 * confirm.open();
 *
 * @example
 * // Choice-type confirmation with two equally weighted options
 * confirm.load(
 *     'Save as draft or publish now?',
 *     'Publish',
 *     'Save Draft',
 *     'Save Options',
 *     'choice',
 * );
 * confirm.eventOK = () => publish();
 * confirm.eventCancel = () => saveDraft();
 * confirm.open();
 *
 * @see {@link BaseModal}
 * @see {@link Dialog}
 * @category Module
 */
export declare class Confirm extends BaseModal {
    options: Objekt;
    /**
     * Creates a new Confirm instance.
     *
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `id` (CSS selector for the confirm element,
     *     defaults to `'#confirm'`).
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    private _setOptions;
    /**
     * Initializes DOM references for the confirm modal elements.
     */
    private _init;
    /**
     * Sets up the confirmation dialog with a message, action buttons,
     * and type-based styling. Resets any previous event callbacks,
     * applies the type class to the modal window, renders the message
     * in the body, and creates OK and optional Cancel buttons in the
     * footer.
     *
     * The caller should set `eventOK` and `eventCancel` callbacks after
     * calling this method, then call `open()` to display the dialog.
     *
     * @param message The HTML message content to display in the dialog
     *     body.
     * @param okText The label text for the OK/confirm button.
     * @param opt_cancelText The label text for the Cancel button. When
     *     empty or omitted, no cancel button is rendered.
     * @param opt_title The title text for the dialog header. When empty
     *     or omitted, the header is hidden.
     * @param opt_type The visual style type for the confirmation window.
     *     One of `'normal'`, `'info'`, `'warning'`, `'error'`,
     *     `'success'`, or `'choice'`. Defaults to `'normal'`.
     *
     * @example
     * confirm.load('Discard unsaved changes?', 'Discard', 'Keep Editing');
     * confirm.eventOK = () => discardChanges();
     * confirm.open();
     */
    load(message: string, okText: string, opt_cancelText?: string | undefined, opt_title?: string | undefined, opt_type?: string | undefined): void;
}
