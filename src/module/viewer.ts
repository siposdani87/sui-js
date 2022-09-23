import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';

/**
 * @class
 * @extends {BaseModal}
 */
export class Viewer extends BaseModal {
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
            id: '#viewer',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.body = new Query('body').getItem();
        this.modal = new Query(this.options.id, this.body).getItem();
        this.modalWindow = new Query('#viewer-window', this.modal).getItem();
        this.modalHeader = new Query('.modal-header', this.modal).getItem();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getItem();
        this.modalBody = new Query('.modal-body', this.modal).getItem();
        this.modalFooter = new Query('.modal-footer', this.modal).getItem();
    }
    /**
     * @param {string} imageUrl
     * @param {string=} opt_title
     * @return {undefined}
     */
    loadImage(imageUrl: string, opt_title: string | undefined = ''): void {
        this._reset();

        this._setImage(imageUrl);
        this._setTitle(opt_title);

        this.open();
    }
    /**
     * @param {string} imageUrl
     * @return {undefined}
     */
    private _setImage(imageUrl: string): void {
        const imageNode = new Item('img');
        imageNode.setAttribute('src', imageUrl);

        this.modalBody.appendChild(imageNode);
    }
}
