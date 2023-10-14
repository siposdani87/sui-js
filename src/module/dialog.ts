import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Knot } from '../core';
import { mdl } from '../utils/render';

export class Dialog extends BaseModal {
    http: Http;
    options: Objekt;

    constructor(http: Http, opt_options: Object | undefined = {}) {
        super();
        this.http = http;
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }

    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({
            id: '#dialog',
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id, this.body).getKnot();
        this.modalWindow = new Query('#dialog-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }

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

    private _handleMessage(dom: Knot): Knot {
        const messageKnot = new Query('.message', dom).getKnot();
        const title = new Query('title', dom).getKnot();
        this._setTitle(title.getText());
        this.modalBody.insert(messageKnot);
        mdl(messageKnot);
        return messageKnot;
    }

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
