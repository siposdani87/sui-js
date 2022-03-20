import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Document {
    options: Objekt;
    document: globalThis.Document;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined): void {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.document = document;
        this.document.addEventListener('click', (event) => {
            const target = new Item(
                /** @type {!Element} */ event.target as HTMLElement,
            );
            this.eventClick(target, event);
        });
    }
    /**
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title: string): void {
        this.document.title = title;
    }
    /**
     * @param {!Item} target
     * @param {!Event} event
     * @return {undefined}
     */
    eventClick(target: Item, event: Event): void {
        consoleWarn('Document.eventClick()', target, event);
    }
    /**
     * @param {string} email
     * @param {string=} opt_subject
     * @return {undefined}
     */
    mailTo(email: string, opt_subject: string | undefined = ''): void {
        this.document.location.href =
            'mailto:' + email + '?subject=' + opt_subject;
    }
}
