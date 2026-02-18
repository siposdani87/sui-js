import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Knot } from '../core';
import { mdl } from '../utils/render';

/**
 * Full dialog modal that loads its content from a server endpoint via
 * {@link Http}. Extends {@link BaseModal} to provide template-based
 * dialog rendering with automatic extraction of title, content, and
 * action buttons from the fetched HTML.
 *
 * The server response is expected to contain elements with specific IDs:
 * - `#title` -- the dialog title text
 * - `#content` -- the main dialog body content
 * - `#action` -- container with one or two `<button>` elements
 *     (one button maps to OK; two buttons map to Cancel + OK)
 *
 * On HTTP error, the dialog extracts and displays the `.message` element
 * from the error response and opens automatically.
 *
 * @example
 * const dialog = new Dialog(http);
 * dialog.loadTemplate('/api/edit-user/42').then(
 *     (contentKnot) => {
 *         dialog.eventOK = () => saveUser(contentKnot);
 *         dialog.open();
 *     },
 *     (errorKnot) => {
 *         console.error('Failed to load dialog');
 *     },
 * );
 *
 * @see {@link BaseModal}
 * @see {@link Http}
 * @see {@link Confirm}
 * @category Module
 */
export class Dialog extends BaseModal {
    http: Http;
    options!: Objekt;

    /**
     * Creates a new Dialog instance.
     *
     * @param http The HTTP client used to fetch dialog templates from
     *     the server.
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `id` (CSS selector for the dialog element,
     *     defaults to `'#dialog'`).
     */
    constructor(http: Http, opt_options: object | undefined = {}) {
        super();
        this.http = http;
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
            id: '#dialog',
        });
        this.options.merge(opt_options);
    }

    /**
     * Initializes DOM references for the dialog modal elements.
     */
    private _init(): void {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id, this.body).getKnot();
        this.modalWindow = new Query('#dialog-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }

    /**
     * Fetches an HTML template from the given URL and populates the
     * dialog with the extracted title, content, and action buttons.
     *
     * On success, the returned {@link Promize} resolves with the content
     * {@link Knot} (the `#content` element from the response). The caller
     * is responsible for calling `open()` after setting up event callbacks.
     *
     * On failure, the dialog automatically opens with the error message
     * content, and the returned promise rejects with the message
     * {@link Knot}.
     *
     * @param url The server endpoint URL to fetch the dialog template from.
     * @returns A {@link Promize} that resolves with the content Knot on
     *     success, or rejects with the message Knot on failure.
     *
     * @example
     * dialog.loadTemplate('/api/confirm-delete').then(
     *     (contentKnot) => {
     *         dialog.eventOK = () => performDelete();
     *         dialog.open();
     *     },
     *     (errorKnot) => {
     *         // Dialog already opened with error message
     *     },
     * );
     */
    loadTemplate(url: string) {
        this._reset();
        const deferred = new Deferred<Knot, Knot>();
        this.http.get(url).then(
            (data) => {
                const knot = this._handleDom(data.get('raw'));
                deferred.resolve(knot);
            },
            (data) => {
                const knot = this._handleMessage(data.get('raw'));
                deferred.reject(knot);
                this.open();
            },
        );
        return deferred.promise();
    }

    /**
     * Extracts and displays the error message from a failed HTTP response.
     *
     * @param dom The raw response DOM containing a `.message` element.
     * @returns The message Knot inserted into the modal body.
     */
    private _handleMessage(dom: Knot): Knot {
        const messageKnot = new Query('.message', dom).getKnot();
        const title = new Query('title', dom).getKnot();
        this._setTitle(title.getText());
        this.modalBody.insert(messageKnot);
        mdl(messageKnot);
        return messageKnot;
    }

    /**
     * Extracts title, content, and actions from a successful response
     * DOM and populates the dialog.
     *
     * @param dom The raw response DOM containing `#title`, `#content`,
     *     and optionally `#action` elements.
     * @returns The content Knot inserted into the modal body.
     */
    private _handleDom(dom: Knot): Knot {
        const titleKnot = new Query('#title', dom).getKnot();
        if (!titleKnot.isEmpty()) {
            this._setTitle(titleKnot.getText());
        }

        const contentKnot = new Query('#content', dom).getKnot();
        this.modalBody.insert(contentKnot);
        mdl(contentKnot);

        this._handleActions(dom);

        return contentKnot;
    }

    /**
     * Extracts action buttons from the response DOM and sets up click
     * handlers. With one button, it maps to the OK action with primary
     * styling. With two buttons, the first maps to Cancel (accent) and
     * the second to OK (primary). If no `#action` element is found, the
     * footer is hidden.
     *
     * @param dom The raw response DOM containing an `#action` element
     *     with `<button>` children.
     */
    private _handleActions(dom: Knot): void {
        this.modalFooter.removeClass('hidden');

        const actionKnot = new Query('#action', dom).getKnot();
        if (!actionKnot.isEmpty()) {
            const buttons = new Query('button', actionKnot);
            const size = buttons.size();
            let actions = [this._actionOK.bind(this)];
            let cssClasses = ['mdl-button--primary'];
            if (size === 2) {
                actions = [
                    this._actionCancel.bind(this),
                    this._actionOK.bind(this),
                ];
                cssClasses = ['mdl-button--accent', 'mdl-button--primary'];
            }
            buttons.each((button, i) => {
                const buttonClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                ].concat([cssClasses[i]]);
                button.addClass(buttonClasses);
                button.addEventListener('click', actions[i]);
            });

            this.modalFooter.insert(actionKnot);
            mdl(actionKnot);
        } else {
            this.modalFooter.removeChildren();
            this.modalFooter.addClass('hidden');
        }
    }
}
