import { isUndefined, contain, eq } from '../utils/operation';
import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Http } from '../module';

/**
 * @class
 */
export class Navigation {
    http: Http;
    options: Objekt;
    container: Collection<Objekt>;
    linkNodeKey: string;
    /**
     * @param {!Http=} opt_http
     * @param {!Object=} opt_options
     */
    constructor(opt_http: Http | undefined, opt_options: Object | undefined = {}) {
        this.http = opt_http;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.container = /** @type {!Collection<!Objekt>} */ new Collection();

        this.linkNodeKey = 'node';
    }
    /**
     * @param {!Objekt} item
     * @return {undefined}
     */
    add(item: Objekt): void {
        const id = /** @type {string} */(item).get<string>('id');
        const image = /** @type {string} */(item).get<string>('image');
        const icon = /** @type {string} */(item).get<string>('icon');
        const title = /** @type {string} */(item).get<string>('title');
        const counter = /** @type {string} */(item).get<string>('counter');
        const href = /** @type {string} */(item).get<string>('href');
        const action = /** @type {!Function} */ item.get<Function>('action');
        const disabled = /** @type {boolean} */(item).get<boolean>('disabled');

        if (image) {
            this.addImage(id, image, title, action, href, item);
        } else if (icon) {
            this.addIcon(id, icon, title, action, href, item);
        } else if (!isUndefined(counter)) {
            this.addCounter(id, counter, title, action, href, item);
        } else {
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
    addCounter(id: string, counter: string, title: string | null, action: Function, opt_href: string | undefined = '', opt_data: Object | undefined = {}): void {
        const item = this._setItem(id, title, action, opt_href, opt_data);
        const counterSpan = new Item('span');
        counterSpan.addClass('counter');
        counterSpan.setHtml(counter);

        const linkNode = item.get<Item>(this.linkNodeKey);
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
    addIcon(id: string, icon: string, title: string | null, action: Function, opt_href: string | undefined = '', opt_data: Object | undefined = {}): void {
        const item = this._setItem(id, title, action, opt_href, opt_data);
        const iconNode = new Item('em');
        iconNode.addClass(['material-icons']);
        iconNode.setHtml(icon);

        const imageSpan = new Item('span');
        imageSpan.addClass('image');
        imageSpan.appendChild(iconNode);

        const linkNode = item.get<Item>(this.linkNodeKey);
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
    addImage(id: string, image: string, title: string | null, action: Function, opt_href: string | undefined = '', opt_data: Object | undefined = {}): void {
        const item = this._setItem(id, title, action, opt_href, opt_data);

        const imageSpan = new Item('span');
        imageSpan.addClass('image');

        if (image.indexOf('.svg') !== -1) {
            this.http
                .get(
                    image,
                    {},
                    {
                        Authorization: '',
                        'X-Requested-With': '',
                    },
                )
                .then((data) => {
                    const svgTag = new Query('svg', data).getItem();
                    imageSpan.appendChild(svgTag);
                });
        } else {
            const imageTag = new Item('img');
            imageTag.setAttribute('src', image);
            if (title) {
                imageTag.setAttribute('alt', title);
            }
            imageSpan.appendChild(imageTag);
        }

        const linkNode = item.get<Item>(this.linkNodeKey);
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
    addText(id: string, title: string, action: Function, opt_href: string | undefined = '', opt_data: Object | undefined = {}): void {
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
    _setItem(id: string, title: string | null, action: Function, opt_href: string | undefined = '', opt_data: Object | undefined = {}): Objekt {
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
    each(next: Function): void {
        this.container.each((item) => {
            next(item);
        });
    }
    /**
     * @param {!Item} containerNode
     * @return {undefined}
     */
    bindToContainer(containerNode: Item): void {
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
    setDisabled(id: string): void {
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
    _disabled(item: Objekt): void {
        const linkNode = item.get<Item>(this.linkNodeKey);
        linkNode.addClass('disabled');
        linkNode.removeEventListener('click', item.get('listener'));
        linkNode.setAttribute('href', 'javascript:void(0)');
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    setEnabled(id: string): void {
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
    _enabled(item: Objekt): void {
        this._disabled(item);
        const linkNode = item.get<Item>(this.linkNodeKey);
        linkNode.removeClass('disabled');
        const action =
            /** @type {function(string):undefined} */ item.get<Function>('action');
        const href = /** @type {string} */(item).get<string>('href');
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
    setActive(id: string): void {
        this.each((item) => {
            const linkNode = item.get(this.linkNodeKey);
            linkNode.removeClass('active');
            const itemId = item.get('id');
            if (
                (itemId[itemId.length - 1] === '.' && contain(id, itemId)) ||
                eq(id, itemId)
            ) {
                linkNode.addClass('active');
            }
        });
    }
    /**
     * @return {undefined}
     */
    setAllInactive(): void {
        this.each((item) => {
            const linkNode = item.get(this.linkNodeKey);
            linkNode.removeClass('active');
        });
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    show(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            const linkNode = item.get<Item>(this.linkNodeKey);
            linkNode.removeClass('hidden');
            this._enabled(item);
        }
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    hide(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            const linkNode = item.get<Item>(this.linkNodeKey);
            linkNode.addClass('hidden');
            this._disabled(item);
        }
    }
}
