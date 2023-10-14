import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { mdl } from '../utils/render';
export class Confirm extends BaseModal {
    constructor(opt_options = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: '#confirm',
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id).getKnot();
        this.modalWindow = new Query('#confirm-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }
    load(message, okText, opt_cancelText = '', opt_title = '', opt_type = 'normal') {
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
            const cancelButton = new Knot('button');
            cancelButton.setAttribute('type', 'button');
            cancelButton.setHtml(opt_cancelText);
            cancelButton.addClass(cancelCssClasses);
            cancelButton.addEventListener('click', this._actionCancel.bind(this));
            this.modalFooter.appendChild(cancelButton);
        }
        const okCssClasses = [
            'mdl-button',
            'mdl-js-button',
            'mdl-js-ripple-effect',
            'mdl-button--primary',
        ];
        const okButton = new Knot('button');
        okButton.setAttribute('type', 'button');
        okButton.setHtml(okText);
        okButton.addClass(okCssClasses);
        okButton.addEventListener('click', this._actionOK.bind(this));
        this.modalFooter.appendChild(okButton);
        mdl(this.modalFooter);
    }
}
