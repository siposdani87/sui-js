import { isUndefined, contain, eq } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Http } from '../module';

/**
 * Navigation link manager supporting icons, images, counters, and text links.
 *
 * @description Builds and manages a collection of navigation items that can include
 * Material Design icons, SVG/bitmap images, numeric counters, or plain text labels.
 * Each item supports click actions, enable/disable states, active highlighting,
 * and show/hide visibility control.
 *
 * @example
 * const nav = new Navigation(http, {});
 * nav.add(new Objekt({ id: 'home', icon: 'home', title: 'Home', action: (href) => {} }));
 * nav.add(new Objekt({ id: 'profile', image: '/avatar.png', title: 'Profile', action: (href) => {} }));
 * nav.bindToContainer(containerKnot);
 * nav.setActive('home');
 *
 * @see {@link Collection}
 * @see {@link Objekt}
 * @see {@link Http}
 * @category Component
 */
export class Navigation {
    http?: Http;
    options!: Objekt;
    container!: Collection<Objekt>;
    linkKnotKey!: string;

    /**
     * @param opt_http - Optional {@link Http} instance used for fetching SVG images.
     * @param opt_options - Configuration options merged via {@link Objekt}.
     */
    constructor(opt_http?: Http, opt_options: object | undefined = {}) {
        this.http = opt_http;
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * Merges user-provided options with defaults.
     * @param opt_options - Configuration options to merge.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    /**
     * Initializes the item collection and the link knot storage key.
     */
    private _init(): void {
        this.container = new Collection();

        this.linkKnotKey = 'node';
    }

    /**
     * Adds a navigation item, automatically selecting the appropriate type (image, icon, counter, or text).
     *
     * @description Inspects the item's properties to determine the rendering type:
     * image if 'image' is set, icon if 'icon' is set, counter if 'counter' is set,
     * otherwise falls back to plain text. Disables the item if the 'disabled' property is true.
     *
     * @param item - An {@link Objekt} with properties: id, title, href, action, and optionally
     *     image, icon, counter, disabled.
     *
     * @example
     * nav.add(new Objekt({
     *     id: 'settings',
     *     icon: 'settings',
     *     title: 'Settings',
     *     href: '/settings',
     *     action: (href) => router.navigate(href),
     * }));
     */
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

    /**
     * Creates a navigation item with a numeric or text counter badge.
     *
     * @param id - Unique identifier for the item.
     * @param counter - The counter value to display.
     * @param title - Display label for the item, or null for no label.
     * @param action - Click handler function receiving the href.
     * @param opt_href - Link URL (defaults to empty string).
     * @param opt_data - Additional data to associate with the item.
     *
     * @example
     * nav.addCounter('notifications', '5', 'Alerts', (href) => {}, '/alerts');
     */
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

    /**
     * Creates a navigation item with a Material Design icon.
     *
     * @param id - Unique identifier for the item.
     * @param icon - Material Design icon name (e.g. 'home', 'settings').
     * @param title - Display label for the item, or null for no label.
     * @param action - Click handler function receiving the href.
     * @param opt_href - Link URL (defaults to empty string).
     * @param opt_data - Additional data to associate with the item.
     *
     * @example
     * nav.addIcon('home', 'home', 'Home', (href) => {}, '/');
     */
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

    /**
     * Creates a navigation item with an image (SVG loaded via {@link Http} or a bitmap img tag).
     *
     * @param id - Unique identifier for the item.
     * @param image - Image URL. SVG files are fetched and inlined; other formats use an img tag.
     * @param title - Display label for the item, or null for no label.
     * @param action - Click handler function receiving the href.
     * @param opt_href - Link URL (defaults to empty string).
     * @param opt_data - Additional data to associate with the item.
     *
     * @example
     * nav.addImage('logo', '/logo.svg', 'Home', (href) => {}, '/');
     */
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
            this.http!
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

    /**
     * Creates a navigation item with a plain text label only.
     *
     * @param id - Unique identifier for the item.
     * @param title - Display label for the item.
     * @param action - Click handler function receiving the href.
     * @param opt_href - Link URL (defaults to empty string).
     * @param opt_data - Additional data to associate with the item.
     *
     * @example
     * nav.addText('about', 'About Us', (href) => {}, '/about');
     */
    addText(
        id: string,
        title: string,
        action: Function,
        opt_href: string | undefined = '',
        opt_data: object | undefined = {},
    ): void {
        this._setKnot(id, title, action, opt_href, opt_data);
    }

    /**
     * Creates the link knot element, attaches the click handler, and stores the item in the collection.
     * @param id - Unique identifier for the item.
     * @param title - Display label, or null for no label.
     * @param action - Click handler function.
     * @param opt_href - Link URL.
     * @param opt_data - Additional data to associate with the item.
     * @returns The created item {@link Objekt}.
     */
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

    /**
     * Iterates over all navigation items in the collection.
     *
     * @param next - Callback invoked with each item {@link Objekt}.
     *
     * @example
     * nav.each((item) => {
     *     console.log(item.get('id'), item.get('title'));
     * });
     */
    each(next: Function): void {
        this.container.each((item) => {
            next(item);
        });
    }

    /**
     * Appends all navigation link knots to the specified container, replacing its children.
     *
     * @param containerKnot - The parent {@link Knot} to render navigation items into.
     *
     * @example
     * nav.bindToContainer(new Query('.nav-container').getKnot());
     */
    bindToContainer(containerKnot: Knot): void {
        containerKnot.removeChildren();
        this.each((item: Objekt) => {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            containerKnot.appendChild(linkKnot);
        });
    }

    /**
     * Disables a navigation item by ID, preventing click interactions.
     *
     * @param id - The item identifier to disable.
     *
     * @example
     * nav.setDisabled('settings');
     */
    setDisabled(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            this._disabled(item);
        }
    }

    /**
     * Applies the disabled state to an item: adds CSS class, removes listener, and clears href.
     * @param item - The item {@link Objekt} to disable.
     */
    private _disabled(item: Objekt): void {
        const linkKnot = item.get<Knot>(this.linkKnotKey);
        linkKnot.addClass('disabled');
        linkKnot.removeEventListener('click', item.get('listener'));
        linkKnot.setAttribute('href', 'javascript:void(0)');
    }

    /**
     * Enables a navigation item by ID, restoring click interactions.
     *
     * @param id - The item identifier to enable.
     *
     * @example
     * nav.setEnabled('settings');
     */
    setEnabled(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            this._enabled(item);
        }
    }

    /**
     * Restores the enabled state on an item: removes disabled class, re-attaches listener and href.
     * @param item - The item {@link Objekt} to enable.
     */
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

    /**
     * Sets the active state on matching navigation items by ID.
     *
     * @description Marks items as active if their ID matches exactly, or if the item ID
     * ends with '.' and the given ID starts with that prefix (wildcard matching).
     *
     * @param id - The item identifier (or prefix) to activate.
     *
     * @example
     * nav.setActive('home');
     * nav.setActive('settings.general'); // also activates 'settings.' prefix items
     */
    setActive(id: string): void {
        this.each((item: Objekt) => {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            linkKnot.removeClass('active');
            const itemId = item.get<string>('id');
            if (
                (itemId[itemId.length - 1] === '.' && contain(id, itemId)) ||
                eq(id, itemId)
            ) {
                linkKnot.addClass('active');
            }
        });
    }

    /**
     * Removes the active state from all navigation items.
     *
     * @example
     * nav.setAllInactive();
     */
    setAllInactive(): void {
        this.each((item: Objekt) => {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            linkKnot.removeClass('active');
        });
    }

    /**
     * Shows a hidden navigation item and enables it.
     *
     * @param id - The item identifier to show.
     *
     * @example
     * nav.show('admin');
     */
    show(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            linkKnot.removeClass('hidden');
            this._enabled(item);
        }
    }

    /**
     * Hides a navigation item and disables it.
     *
     * @param id - The item identifier to hide.
     *
     * @example
     * nav.hide('admin');
     */
    hide(id: string): void {
        const item = this.container.findById(id);
        if (item) {
            const linkKnot = item.get<Knot>(this.linkKnotKey);
            linkKnot.addClass('hidden');
            this._disabled(item);
        }
    }
}
