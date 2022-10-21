import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Page {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options) {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.document = document;
        this.document.addEventListener('click', (event) => {
            const target = new Knot(event.target);
            this.eventClick(target, event);
        });
    }
    /**
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title) {
        this.document.title = title;
    }
    /**
     * @param {!Knot} target
     * @param {!Event} event
     * @return {undefined}
     */
    eventClick(target, event) {
        consoleWarn('Document.eventClick()', target, event);
    }
    /**
     * @param {string} email
     * @param {string=} opt_subject
     * @return {undefined}
     */
    mailTo(email, opt_subject = '') {
        this.document.location.href =
            'mailto:' + email + '?subject=' + opt_subject;
    }
}
