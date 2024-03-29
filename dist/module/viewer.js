import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
export class Viewer extends BaseModal {
    constructor(opt_options = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: '#viewer',
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id, this.body).getKnot();
        this.modalWindow = new Query('#viewer-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }
    loadImage(imageUrl, opt_title = '') {
        this._reset();
        this._setImage(imageUrl);
        this._setTitle(opt_title);
        this.open();
    }
    _setImage(imageUrl) {
        const imageKnot = new Knot('img');
        imageKnot.setAttribute('src', imageUrl);
        this.modalBody.appendChild(imageKnot);
    }
}
