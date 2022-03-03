import { isUndefined, contain, eq } from '../utils/operation';
import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class Navigation {
    http;
    options;
    container;
    linkNodeKey;
    /**
     * @param {!Http=} opt_http
     * @param {!Object=} opt_options
     */
    constructor(opt_http, opt_options = {}) {
        this.http = opt_http;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.container = /** @type {!Collection<!Objekt>} */ new Collection();
        this.linkNodeKey = 'node';
    }
    /**
     * @param {!Objekt} item
     * @return {undefined}
     */
    add(item) {
        const id = /** @type {string} */ item.get('id');
        const image = /** @type {string} */ item.get('image');
        const icon = /** @type {string} */ item.get('icon');
        const title = /** @type {string} */ item.get('title');
        const counter = /** @type {string} */ item.get('counter');
        const href = /** @type {string} */ item.get('href');
        const action = /** @type {!Function} */ item.get('action');
        const disabled = /** @type {boolean} */ item.get('disabled');
        if (image) {
            this.addImage(id, image, title, action, href, item);
        }
        else if (icon) {
            this.addIcon(id, icon, title, action, href, item);
        }
        else if (!isUndefined(counter)) {
            this.addCounter(id, counter, title, action, href, item);
        }
        else {
            this.addText(id, title, action, href, item);
        }
        if (disabled) {
            this.setDisabled(id);
        }
    }
    /**
     * @param {string} id
     * @param {string} counter
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addCounter(id, counter, title, action, opt_href = '', opt_data = {}) {
        const item = this._setItem(id, title, action, opt_href, opt_data);
        const counterSpan = new Item('span');
        counterSpan.addClass('counter');
        counterSpan.setHtml(counter);
        const linkNode = item.get(this.linkNodeKey);
        linkNode.beforeChild(counterSpan);
    }
    /**
     * @param {string} id
     * @param {string} icon
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addIcon(id, icon, title, action, opt_href = '', opt_data = {}) {
        const item = this._setItem(id, title, action, opt_href, opt_data);
        const iconNode = new Item('em');
        iconNode.addClass(['material-icons']);
        iconNode.setHtml(icon);
        const imageSpan = new Item('span');
        imageSpan.addClass('image');
        imageSpan.appendChild(iconNode);
        const linkNode = item.get(this.linkNodeKey);
        linkNode.beforeChild(imageSpan);
    }
    /**
     * @param {string} id
     * @param {string} image
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addImage(id, image, title, action, opt_href = '', opt_data = {}) {
        const item = this._setItem(id, title, action, opt_href, opt_data);
        const imageSpan = new Item('span');
        imageSpan.addClass('image');
        if (image.indexOf('.svg') !== -1) {
            this.http
                .get(image, {}, {
                Authorization: '',
                'X-Requested-With': '',
            })
                .then((data) => {
                const svgTag = new Query('svg', data).getItem();
                imageSpan.appendChild(svgTag);
            });
        }
        else {
            const imageTag = new Item('img');
            imageTag.setAttribute('src', image);
            if (title) {
                imageTag.setAttribute('alt', title);
            }
            imageSpan.appendChild(imageTag);
        }
        const linkNode = item.get(this.linkNodeKey);
        linkNode.beforeChild(imageSpan);
    }
    /**
     * @param {string} id
     * @param {string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {undefined}
     */
    addText(id, title, action, opt_href = '', opt_data = {}) {
        this._setItem(id, title, action, opt_href, opt_data);
    }
    /**
     * @private
     * @param {string} id
     * @param {?string} title
     * @param {!Function} action
     * @param {string=} opt_href
     * @param {!Object=} opt_data
     * @return {!Objekt}
     */
    _setItem(id, title, action, opt_href = '', opt_data = {}) {
        const linkNode = new Item('a');
        if (title) {
            const titleSpan = new Item('span');
            titleSpan.addClass('title');
            titleSpan.setHtml(title);
            linkNode.appendChild(titleSpan);
        }
        linkNode.setAttribute('href', opt_href || 'javascript:void(0)');
        const href = linkNode.getAttribute('href');
        const listener = linkNode.addEventListener('click', () => {
            action(href);
        });
        const item = new Objekt(opt_data);
        item.merge({
            id: id,
            title: title,
            href: href,
            action: action,
            listener: listener,
        });
        item.setRaw(this.linkNodeKey, linkNode);
        this.container.push(item);
        return item;
    }
    /**
     * @param {!Function} next
     * @return {undefined}
     */
    each(next) {
        this.container.each((item) => {
            next(item);
        });
    }
    /**
     * @param {!Item} containerNode
     * @return {undefined}
     */
    bindToContainer(containerNode) {
        containerNode.removeChildren();
        this.each((item) => {
            const linkNode = item.get(this.linkNodeKey);
            containerNode.appendChild(linkNode);
        });
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    setDisabled(id) {
        const item = this.container.findById(id);
        if (item) {
            this._disabled(item);
        }
    }
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _disabled(item) {
        const linkNode = item.get(this.linkNodeKey);
        linkNode.addClass('disabled');
        linkNode.removeEventListener('click', item.get('listener'));
        linkNode.setAttribute('href', 'javascript:void(0)');
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    setEnabled(id) {
        const item = this.container.findById(id);
        if (item) {
            this._enabled(item);
        }
    }
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _enabled(item) {
        this._disabled(item);
        const linkNode = item.get(this.linkNodeKey);
        linkNode.removeClass('disabled');
        const action = 
        /** @type {function(string):undefined} */ item.get('action');
        const href = /** @type {string} */ item.get('href');
        linkNode.setAttribute('href', href);
        const listener = linkNode.addEventListener('click', () => {
            action(href);
        });
        item.set('listener', listener);
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    setActive(id) {
        this.each((item) => {
            const linkNode = item.get(this.linkNodeKey);
            linkNode.removeClass('active');
            const itemId = item.get('id');
            if ((itemId[itemId.length - 1] === '.' && contain(id, itemId)) ||
                eq(id, itemId)) {
                linkNode.addClass('active');
            }
        });
    }
    /**
     * @return {undefined}
     */
    setAllInactive() {
        this.each((item) => {
            const linkNode = item.get(this.linkNodeKey);
            linkNode.removeClass('active');
        });
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    show(id) {
        const item = this.container.findById(id);
        if (item) {
            const linkNode = item.get(this.linkNodeKey);
            linkNode.removeClass('hidden');
            this._enabled(item);
        }
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    hide(id) {
        const item = this.container.findById(id);
        if (item) {
            const linkNode = item.get(this.linkNodeKey);
            linkNode.addClass('hidden');
            this._disabled(item);
        }
    }
}
