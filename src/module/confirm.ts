import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { mdl } from '../utils/render';

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
export class Confirm extends BaseModal {
    options!: Objekt;

    /**
     * Creates a new Confirm instance.
     *
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `id` (CSS selector for the confirm element,
     *     defaults to `'#confirm'`).
     */
    constructor(opt_options: object | undefined = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }

    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: '#confirm',
        });
        this.options.merge(opt_options);
    }

    /**
     * Initializes DOM references for the confirm modal elements.
     */
    private _init(): void {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id).getKnot();
        this.modalWindow = new Query('#confirm-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }

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
    load(
        message: string,
        okText: string,
        opt_cancelText: string | undefined = '',
        opt_title: string | undefined = '',
        opt_type: string | undefined = 'normal',
    ) {
        this._reset();
        this._setTitle(opt_title);

        this.modalWindow.removeClass([
            'normal',
            'info',
            'warning',
            'error',
            'success',
            'choice',
        ]);
        this.modalWindow.addClass(opt_type);

        this.modalBody.setHtml(message);

        this.modalFooter.removeChildren();

        if (opt_cancelText) {
            const cancelCssClasses = [
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ];
            if (opt_type === 'choice') {
                cancelCssClasses.push('mdl-button--primary');
            }
            const cancelButton = new Knot<HTMLButtonElement>('button');
            cancelButton.setAttribute('type', 'button');
            cancelButton.setHtml(opt_cancelText);
            cancelButton.addClass(cancelCssClasses);
            cancelButton.addEventListener(
                'click',
                this._actionCancel.bind(this),
            );
            this.modalFooter.appendChild(cancelButton);
        }

        const okCssClasses = [
            'mdl-button',
            'mdl-js-button',
            'mdl-js-ripple-effect',
            'mdl-button--primary',
        ];
        const okButton = new Knot<HTMLButtonElement>('button');
        okButton.setAttribute('type', 'button');
        okButton.setHtml(okText);
        okButton.addClass(okCssClasses);
        okButton.addEventListener('click', this._actionOK.bind(this));
        this.modalFooter.appendChild(okButton);

        mdl(this.modalFooter);
    }
}
