import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Knot, Promize } from '../core';
import { mdl } from '../utils/render';

/**
 * @class
 * @extends {BaseModal}
 */
export class Dialog extends BaseModal {
    http: Http;
    options: Objekt;
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http: Http, opt_options: Object | undefined = {}) {
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
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            id: '#dialog',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
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
     * @param {string} url
     * @return {!Promize}
     */
    loadTemplate(url: string): Promize {
        this._reset();
        const deferred = new Deferred();
        this.http.get(url).then(
            (data) => {
                const node = this._handleDom(data);
                deferred.resolve(node);
            },
            (data) => {
                const node = this._handleMessage(data);
                deferred.reject(node);
                this.open();
            },
        );
        return deferred.promise();
    }
    /**
     * @param {!Knot} dom
     * @return {!Knot}
     */
    private _handleMessage(dom: Knot): Knot {
        const messageNode = new Query('.message', dom).getKnot();
        const title = new Query('title', dom).getKnot();
        this._setTitle(title.getText());
        this.modalBody.insert(messageNode);
        mdl(messageNode);
        return messageNode;
    }
    /**
     * @param {!Knot} dom
     * @return {!Knot}
     */
    private _handleDom(dom: Knot): Knot {
        const titleNode = new Query('#title', dom).getKnot();
        if (!titleNode.isEmpty()) {
            this._setTitle(titleNode.getText());
        }

        const contentNode = new Query('#content', dom).getKnot();
        this.modalBody.insert(contentNode);
        mdl(contentNode);

        this._handleActions(dom);

        return contentNode;
    }
    /**
     * @param {!Knot} dom
     * @return {undefined}
     */
    private _handleActions(dom: Knot): void {
        this.modalFooter.removeClass('hidden');

        const actionNode = new Query('#action', dom).getKnot();
        if (!actionNode.isEmpty()) {
            const buttons = new Query('button', actionNode);
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

            this.modalFooter.insert(actionNode);
            mdl(actionNode);
        } else {
            this.modalFooter.removeChildren();
            this.modalFooter.addClass('hidden');
        }
    }
}
