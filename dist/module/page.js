import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
export class Page {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    _init() {
        this.document = document;
        this.document.addEventListener('click', (event) => {
            const target = new Knot(event.target);
            this.eventClick(target, event);
        });
    }
    setTitle(title) {
        this.document.title = title;
    }
    eventClick(target, event) {
        consoleDebug('Document.eventClick()', target, event);
    }
    mailTo(email, opt_subject = '') {
        this.document.location.href =
            'mailto:' + email + '?subject=' + opt_subject;
    }
}
