import { isUndefined, contain, eq } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Http } from '../module';

export class Navigation {
    http?: Http;
    options: Objekt;
    container: Collection<Objekt>;
    linkKnotKey: string;

    constructor(opt_http?: Http, opt_options: object | undefined = {}) {
        this.http = opt_http;
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.container = new Collection();

        this.linkKnotKey = 'node';
    }

    add(item: Objekt): void {
        const id = item.get<string>('id');
        const image = item.get<string>('image');
        const icon = item.get<string>('icon');
        const title = item.get<string>('title');
        const counter = item.get<string>('counter');
        const href = item.get<string>('href');
        const action = item.get<Function>('action');
        const disabled = item.get<boolean>('disabled');

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

    addCounter(
        id: string,
        counter: string,
        title: string | null,
        action: Function,
        opt_href: string | undefined = '',
        opt_data: object | undefined = {},
    ): void {
        const item = this._setKnot(id, title, action, opt_href, opt_data);
        const counterSpan = new Knot('span');
        counterSpan.addClass('counter');
        counterSpan.setHtml(counter);

        const linkKnot = item.get<Knot>(this.linkKnotKey);
        linkKnot.beforeChild(counterSpan);
    }

    addIcon(
        id: string,
        icon: string,
        title: string | null,
        action: Function,
        opt_href: string | undefined = '',
        opt_data: object | undefined = {},
    ): void {
        const item = this._setKnot(id, title, action, opt_href, opt_data);
        const iconKnot = new Knot('em');
        iconKnot.addClass(['material-icons']);
        iconKnot.setHtml(icon);

        const imageSpan = new Knot('span');
        imageSpan.addClass('image');
        imageSpan.appendChild(iconKnot);

        const linkKnot = item.get<Knot>(this.linkKnotKey);
        linkKnot.beforeChild(imageSpan);
    }

    addImage(
        id: string,
        image: string,
        title: string | null,
        action: Function,
        opt_href: string | undefined = '',
        opt_data: object | undefined = {},
    ): void {
        const item = this._setKnot(id, title, action, opt_href, opt_data);

        const imageSpan = new Knot('span');
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
                    const svgTag = new Query('svg', data.get('raw')).getKnot();
                    imageSpan.appendChild(svgTag);
                });
        } else {
            const imageTag = new Knot('img');
            imageTag.setAttribute('src', image);
            if (title) {
                imageTag.setAttribute('alt', title);
            }
            imageSpan.appendChild(imageTag);
        }

        const linkKnot = item.get<Knot>(this.linkKnotKey);
        linkKnot.beforeChild(imageSpan);
    }

    addText(
        id: string,
        title: string,
        action: Function,
        opt_href: string | undefined = '',
        opt_data: object | undefined = {},
    ): void {
        this._setKnot(id, title, action, opt_href, opt_data);
    }

    private _setKnot(
        id: string,
        title: string | null,
        action: Function,
        opt_href: string | undefined = '',
        opt_data: object | undefined = {},
    ): Objekt {
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

    each(next: Function): void {
        this.container.each((item) => {
            next(item);
        });
    }

    bindToContainer(containerKnot: Knot): void {
        containerKnot.removeChildren();
        this.each((item) => {
            const linkKnot = item.get(this.linkKnotKey);
            containerKnot.appendChild(linkKnot);
        });
    }

    setDisabled(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            this._disabled(item);
        }
    }

    private _disabled(item: Objekt): void {
        const linkKnot = item.get<Knot>(this.linkKnotKey);
        linkKnot.addClass('disabled');
        linkKnot.removeEventListener('click', item.get('listener'));
        linkKnot.setAttribute('href', 'javascript:void(0)');
    }

    setEnabled(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            this._enabled(item);
        }
    }

    private _enabled(item: Objekt): void {
        this._disabled(item);
        const linkKnot = item.get<Knot>(this.linkKnotKey);
        linkKnot.removeClass('disabled');
        const action = item.get<Function>('action');
        const href = item.get<string>('href');
        linkKnot.setAttribute('href', href);
        const listener = linkKnot.addEventListener('click', () => {
            action(href);
        });
        item.set('listener', listener);
    }

    setActive(id: string): void {
        this.each((item) => {
            const linkKnot = item.get(this.linkKnotKey);
            linkKnot.removeClass('active');
            const itemId = item.get('id');
            if (
                (itemId[itemId.length - 1] === '.' && contain(id, itemId)) ||
                eq(id, itemId)
            ) {
                linkKnot.addClass('active');
            }
        });
    }

    setAllInactive(): void {
        this.each((item) => {
            const linkKnot = item.get(this.linkKnotKey);
            linkKnot.removeClass('active');
        });
    }

    show(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            linkKnot.removeClass('hidden');
            this._enabled(item);
        }
    }

    hide(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            linkKnot.addClass('hidden');
            this._disabled(item);
        }
    }
}
