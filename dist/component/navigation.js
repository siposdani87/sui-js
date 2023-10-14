import { isUndefined, contain, eq } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
export class Navigation {
    constructor(opt_http, opt_options = {}) {
        this.http = opt_http;
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    _init() {
        this.container = new Collection();
        this.linkKnotKey = 'node';
    }
    add(item) {
        const id = item.get('id');
        const image = item.get('image');
        const icon = item.get('icon');
        const title = item.get('title');
        const counter = item.get('counter');
        const href = item.get('href');
        const action = item.get('action');
        const disabled = item.get('disabled');
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
    addCounter(id, counter, title, action, opt_href = '', opt_data = {}) {
        const item = this._setKnot(id, title, action, opt_href, opt_data);
        const counterSpan = new Knot('span');
        counterSpan.addClass('counter');
        counterSpan.setHtml(counter);
        const linkKnot = item.get(this.linkKnotKey);
        linkKnot.beforeChild(counterSpan);
    }
    addIcon(id, icon, title, action, opt_href = '', opt_data = {}) {
        const item = this._setKnot(id, title, action, opt_href, opt_data);
        const iconKnot = new Knot('em');
        iconKnot.addClass(['material-icons']);
        iconKnot.setHtml(icon);
        const imageSpan = new Knot('span');
        imageSpan.addClass('image');
        imageSpan.appendChild(iconKnot);
        const linkKnot = item.get(this.linkKnotKey);
        linkKnot.beforeChild(imageSpan);
    }
    addImage(id, image, title, action, opt_href = '', opt_data = {}) {
        const item = this._setKnot(id, title, action, opt_href, opt_data);
        const imageSpan = new Knot('span');
        imageSpan.addClass('image');
        if (image.indexOf('.svg') !== -1) {
            this.http
                .get(image, {}, {
                Authorization: '',
                'X-Requested-With': '',
            })
                .then((data) => {
                const svgTag = new Query('svg', data.get('raw')).getKnot();
                imageSpan.appendChild(svgTag);
            });
        }
        else {
            const imageTag = new Knot('img');
            imageTag.setAttribute('src', image);
            if (title) {
                imageTag.setAttribute('alt', title);
            }
            imageSpan.appendChild(imageTag);
        }
        const linkKnot = item.get(this.linkKnotKey);
        linkKnot.beforeChild(imageSpan);
    }
    addText(id, title, action, opt_href = '', opt_data = {}) {
        this._setKnot(id, title, action, opt_href, opt_data);
    }
    _setKnot(id, title, action, opt_href = '', opt_data = {}) {
        const linkKnot = new Knot('a');
        if (title) {
            const titleSpan = new Knot('span');
            titleSpan.addClass('title');
            titleSpan.setHtml(title);
            linkKnot.appendChild(titleSpan);
        }
        linkKnot.setAttribute('href', opt_href || 'javascript:void(0)');
        const href = linkKnot.getAttribute('href');
        const listener = linkKnot.addEventListener('click', () => {
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
        item.setRaw(this.linkKnotKey, linkKnot);
        this.container.push(item);
        return item;
    }
    each(next) {
        this.container.each((item) => {
            next(item);
        });
    }
    bindToContainer(containerKnot) {
        containerKnot.removeChildren();
        this.each((item) => {
            const linkKnot = item.get(this.linkKnotKey);
            containerKnot.appendChild(linkKnot);
        });
    }
    setDisabled(id) {
        const item = this.container.findById(id);
        if (item) {
            this._disabled(item);
        }
    }
    _disabled(item) {
        const linkKnot = item.get(this.linkKnotKey);
        linkKnot.addClass('disabled');
        linkKnot.removeEventListener('click', item.get('listener'));
        linkKnot.setAttribute('href', 'javascript:void(0)');
    }
    setEnabled(id) {
        const item = this.container.findById(id);
        if (item) {
            this._enabled(item);
        }
    }
    _enabled(item) {
        this._disabled(item);
        const linkKnot = item.get(this.linkKnotKey);
        linkKnot.removeClass('disabled');
        const action = item.get('action');
        const href = item.get('href');
        linkKnot.setAttribute('href', href);
        const listener = linkKnot.addEventListener('click', () => {
            action(href);
        });
        item.set('listener', listener);
    }
    setActive(id) {
        this.each((item) => {
            const linkKnot = item.get(this.linkKnotKey);
            linkKnot.removeClass('active');
            const itemId = item.get('id');
            if ((itemId[itemId.length - 1] === '.' && contain(id, itemId)) ||
                eq(id, itemId)) {
                linkKnot.addClass('active');
            }
        });
    }
    setAllInactive() {
        this.each((item) => {
            const linkKnot = item.get(this.linkKnotKey);
            linkKnot.removeClass('active');
        });
    }
    show(id) {
        const item = this.container.findById(id);
        if (item) {
            const linkKnot = item.get(this.linkKnotKey);
            linkKnot.removeClass('hidden');
            this._enabled(item);
        }
    }
    hide(id) {
        const item = this.container.findById(id);
        if (item) {
            const linkKnot = item.get(this.linkKnotKey);
            linkKnot.addClass('hidden');
            this._disabled(item);
        }
    }
}
