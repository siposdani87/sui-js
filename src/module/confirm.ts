import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseModal}
 */
export class Confirm extends BaseModal {
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            id: '#confirm',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
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
     * @param {string} message
     * @param {string} okText
     * @param {string=} opt_cancelText
     * @param {string=} opt_title
     * @param {string=} opt_type
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
            const cancelButton = new Knot('button');
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
        const okButton = new Knot('button');
        okButton.setAttribute('type', 'button');
        okButton.setHtml(okText);
        okButton.addClass(okCssClasses);
        okButton.addEventListener('click', this._actionOK.bind(this));
        this.modalFooter.appendChild(okButton);

        mdl(this.modalFooter);
    }
}
