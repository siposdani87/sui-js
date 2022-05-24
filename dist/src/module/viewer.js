import { Tooltip } from '../component/tooltip';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
/**
 * @class
 * @extends {BaseModal}
 */
export class Viewer extends BaseModal {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
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
    _setOptions(opt_options = {}) {
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
    _init() {
        this.body = new Query('body').getItem();
        this.modal = new Query(this.options.id, this.body).getItem();
        this.modalWindow = new Query('#viewer-window', this.modal).getItem();
        this.modalHeader = new Query('.modal-header', this.modal).getItem();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getItem();
        this.modalBody = new Query('.modal-body', this.modal).getItem();
        this.modalFooter = new Query('.modal-footer', this.modal).getItem();
        this.tooltip = new Tooltip(this.modalTitle, 'BOTTOM');
        this.tooltip.render();
    }
    /**
     * @param {string} imageUrl
     * @param {string=} opt_title
     * @return {undefined}
     */
    loadImage(imageUrl, opt_title = '') {
        this._reset();
        this._setImage(imageUrl);
        this._setTitle(opt_title);
        this.open();
    }
    /**
     * @param {string} imageUrl
     * @return {undefined}
     */
    _setImage(imageUrl) {
        const imageNode = new Item('img');
        imageNode.setAttribute('src', imageUrl);
        this.modalBody.appendChild(imageNode);
    }
}
