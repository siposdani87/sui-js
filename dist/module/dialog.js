import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { mdl } from '../utils/render';
/**
 * @class
 * @extends {BaseModal}
 */
export class Dialog extends BaseModal {
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http, opt_options = {}) {
        super();
        this.http = http;
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: '#dialog',
        });
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id, this.body).getKnot();
        this.modalWindow = new Query('#dialog-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }
    /**
     * @param {string} url
     * @return {!Promize}
     */
    loadTemplate(url) {
        this._reset();
        const deferred = new Deferred();
        this.http.get(url).then((data) => {
            const knot = this._handleDom(data);
            deferred.resolve(knot);
        }, (data) => {
            const knot = this._handleMessage(data);
            deferred.reject(knot);
            this.open();
        });
        return deferred.promise();
    }
    /**
     * @param {!Knot} dom
     * @return {!Knot}
     */
    _handleMessage(dom) {
        const messageKnot = new Query('.message', dom).getKnot();
        const title = new Query('title', dom).getKnot();
        this._setTitle(title.getText());
        this.modalBody.insert(messageKnot);
        mdl(messageKnot);
        return messageKnot;
    }
    /**
     * @param {!Knot} dom
     * @return {!Knot}
     */
    _handleDom(dom) {
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
     * @param {!Knot} dom
     * @return {undefined}
     */
    _handleActions(dom) {
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
        }
        else {
            this.modalFooter.removeChildren();
            this.modalFooter.addClass('hidden');
        }
    }
}
