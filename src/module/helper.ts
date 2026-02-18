import { format } from '../utils/operation';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { generateId, md5 } from '../utils/coder';
import { mdl } from '../utils/render';

/**
 * UI element factory for creating and enhancing styled links, buttons,
 * and icon buttons with Material Design Lite classes. Helper provides
 * a consistent API for building interactive UI elements with click
 * handlers, tooltips, and access control.
 *
 * Methods follow a triplet pattern for each element type:
 * - `create*()` -- Creates a new DOM element from scratch.
 * - `*()` -- Selects an existing element by CSS selector and enhances it.
 * - `multiple*()` -- Selects and enhances all matching elements.
 *
 * Each method supports an `opt_allowAccess` parameter that removes
 * the element from the DOM when set to `false`, and an
 * `opt_description` parameter for adding a {@link Tooltip}.
 *
 * @example
 * const helper = new Helper();
 *
 * // Create a new link element
 * const link = helper.createLink('Click me', (href, knot) => {
 *     console.log('Clicked:', href);
 * });
 *
 * // Enhance an existing button in the DOM
 * helper.button('.save-btn', containerKnot, (id, button) => {
 *     console.log('Saving...');
 * }, 'Save changes');
 *
 * // Create an icon button with a Material icon
 * const iconBtn = helper.createIconButton('delete', (id, button) => {
 *     console.log('Deleted');
 * }, 'Delete item');
 *
 * @see {@link Knot}
 * @see {@link Query}
 * @see {@link Tooltip}
 * @category Module
 */
export class Helper {
    /**
     * Creates a new anchor (`<a>`) element with the given display name
     * and enhances it with click handling, tooltip, and CSS classes
     * via {@link linkElement}.
     *
     * @param name The text content to display inside the link.
     * @param opt_callback Called with the link's `href` and the
     *     {@link Knot} when clicked.
     * @param opt_href The URL for the `href` attribute. Defaults to
     *     `'javascript:void(0)'`.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses CSS classes to add to the link element.
     * @returns The created anchor {@link Knot}.
     *
     * @example
     * const link = helper.createLink('Home', (href, knot) => {
     *     console.log('Navigate to:', href);
     * }, '/home', 'Go to homepage');
     */
    createLink(
        name: string,
        opt_callback: (href: string, linkKnot: Knot) => void | undefined,
        opt_href: string | undefined = 'javascript:void(0)',
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['link'],
    ): Knot {
        const linkKnot = new Knot('a');
        linkKnot.setHtml(name);
        this.linkElement(
            linkKnot,
            opt_callback,
            opt_href,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return linkKnot;
    }

    /**
     * Selects all elements matching the CSS selector within the given
     * DOM container and enhances each as a link via {@link linkElement}.
     *
     * @param selector CSS selector to match link elements.
     * @param dom The parent {@link Knot} to search within.
     * @param opt_callback Called with the link's `href` and the
     *     {@link Knot} when any matched link is clicked.
     * @param opt_cssClasses CSS classes to add to each matched element.
     */
    multipleLink(
        selector: string,
        dom: Knot,
        opt_callback: (href: string, linkKnot: Knot) => void | undefined,
        opt_cssClasses: string[] | undefined = [],
    ): void {
        const linkKnots = new Query(selector, dom);
        linkKnots.each((linkKnot) => {
            this.linkElement(
                linkKnot,
                opt_callback,
                '',
                '',
                true,
                opt_cssClasses,
            );
        });
    }

    /**
     * Selects a single element matching the CSS selector within the
     * given DOM container and enhances it as a link via
     * {@link linkElement}.
     *
     * @param selector CSS selector to match the link element.
     * @param dom The parent {@link Knot} to search within.
     * @param opt_callback Called with the link's `href` and the
     *     {@link Knot} when clicked.
     * @param opt_href The URL for the `href` attribute.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses CSS classes to add to the link element.
     * @returns The selected and enhanced anchor {@link Knot}.
     *
     * @example
     * const link = helper.link('.nav-home', containerKnot, (href, knot) => {
     *     router.navigate(href);
     * }, '/home', 'Go to homepage');
     */
    link(
        selector: string,
        dom: Knot,
        opt_callback: (href: string, linkKnot: Knot) => void | undefined,
        opt_href: string | undefined = '',
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [],
    ): Knot {
        const linkKnot = new Query(selector, dom).getKnot();
        this.linkElement(
            linkKnot,
            opt_callback,
            opt_href,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return linkKnot;
    }

    /**
     * Enhances an existing anchor {@link Knot} with CSS classes, click
     * handling, and a tooltip. Generates an ID if the element does not
     * have one. If the element already has an ID, existing click
     * listeners are removed before attaching the new handler.
     *
     * When `opt_allowAccess` is `false`, the element is removed from
     * the DOM entirely.
     *
     * @param linkKnot The anchor {@link Knot} to enhance.
     * @param opt_callback Called with the link's `href` and the
     *     {@link Knot} when clicked.
     * @param opt_href The URL for the `href` attribute.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses CSS classes to add to the link element.
     */
    linkElement(
        linkKnot: Knot,
        opt_callback: (href: string, linkKnot: Knot) => void | undefined,
        opt_href: string | undefined = '',
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [],
    ): void {
        if (!linkKnot.isEmpty()) {
            if (opt_allowAccess) {
                linkKnot.addClass(opt_cssClasses);

                if (!linkKnot.getId()) {
                    linkKnot.setId(generateId('link'));
                } else {
                    linkKnot.removeEventListeners('click');
                }
                if (opt_href) {
                    linkKnot.setAttribute('href', opt_href);
                }
                if (opt_callback) {
                    const href = linkKnot.getAttribute('href');
                    linkKnot.addEventListener('click', () => {
                        opt_callback(href, linkKnot);
                    });
                }

                this._setTooltip(linkKnot, opt_description);
            } else {
                linkKnot.remove();
            }
        }
    }

    /**
     * Creates a new `<button>` element with the given display name
     * and enhances it with Material Design Lite classes, click handling,
     * and a tooltip via {@link buttonElement}.
     *
     * @param name The text content to display inside the button.
     * @param callback Called with the button's ID and the {@link Knot}
     *     when clicked.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses Additional MDL CSS classes to add.
     * @returns The created button {@link Knot}.
     *
     * @example
     * const btn = helper.createButton('Save', (id, button) => {
     *     console.log('Button clicked:', id);
     * }, 'Save the form');
     */
    createButton(
        name: string,
        callback: (id: string, button: Knot) => void,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): Knot {
        const buttonKnot = new Knot<HTMLButtonElement>('button');
        buttonKnot.setHtml(name);
        this.buttonElement(
            buttonKnot,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonKnot;
    }

    /**
     * Selects all elements matching the CSS selector within the given
     * DOM container and enhances each as a button via
     * {@link buttonElement}.
     *
     * @param selector CSS selector to match button elements.
     * @param dom The parent {@link Knot} to search within.
     * @param opt_callback Called with the button's ID and the
     *     {@link Knot} when any matched button is clicked.
     * @param opt_cssClasses Additional MDL CSS classes to add.
     */
    multipleButton(
        selector: string,
        dom: Knot,
        opt_callback?: (id: string, button: Knot) => void,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): void {
        const buttonKnots = new Query(selector, dom);
        buttonKnots.each((buttonKnot) => {
            this.buttonElement(
                buttonKnot,
                opt_callback,
                '',
                true,
                opt_cssClasses,
            );
        });
    }

    /**
     * Selects a single element matching the CSS selector within the
     * given DOM container and enhances it as a button via
     * {@link buttonElement}.
     *
     * @param selector CSS selector to match the button element.
     * @param dom The parent {@link Knot} to search within.
     * @param callback Called with the button's ID and the {@link Knot}
     *     when clicked.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses Additional MDL CSS classes to add.
     * @returns The selected and enhanced button {@link Knot}.
     *
     * @example
     * const btn = helper.button('.submit-btn', formKnot, (id, button) => {
     *     console.log('Submitting form...');
     * }, 'Submit form');
     */
    button(
        selector: string,
        dom: Knot,
        callback: (id: string, button: Knot) => void,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): Knot {
        const buttonKnot = new Query(selector, dom).getKnot();
        this.buttonElement(
            buttonKnot,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonKnot;
    }

    /**
     * Enhances an existing button {@link Knot} with Material Design Lite
     * classes, click handling, and a tooltip. Applies base MDL button
     * classes (`mdl-button`, `mdl-js-button`, `mdl-js-ripple-effect`,
     * `mdl-button--raised`) plus any additional classes provided.
     *
     * When the element already has an ID, existing CSS classes and click
     * listeners are removed before re-applying. When `opt_allowAccess`
     * is `false`, the element is removed from the DOM entirely.
     *
     * @param buttonKnot The button {@link Knot} to enhance.
     * @param opt_callback Called with the button's ID and the
     *     {@link Knot} when clicked.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses Additional MDL CSS classes to add.
     */
    buttonElement(
        buttonKnot: Knot,
        opt_callback?: (id: string, button: Knot) => void,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): void {
        if (!buttonKnot.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonKnot.getId()) {
                    buttonKnot.setId(generateId('button'));
                } else {
                    const oldCssClasses = buttonKnot.getData('cssClasses');
                    buttonKnot.removeClass(oldCssClasses);
                    buttonKnot.removeEventListeners('click');
                }
                const cssClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                    'mdl-button--raised',
                ].concat(opt_cssClasses);
                buttonKnot.setData('cssClasses', cssClasses);
                buttonKnot.addClass(cssClasses);
                if (opt_callback) {
                    buttonKnot.addEventListener('click', () => {
                        opt_callback(buttonKnot.getId()!, buttonKnot);
                    });
                }

                this._setTooltip(buttonKnot, opt_description);
            } else {
                buttonKnot.remove();
            }
        }
    }

    /**
     * Creates a new `<button>` element with a Material icon and enhances
     * it with icon button styling, click handling, and a tooltip via
     * {@link iconButtonElement}.
     *
     * @param iconName The Material icon name (e.g., `'delete'`, `'edit'`).
     * @param callback Called with the button's ID and the {@link Knot}
     *     when clicked.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses Additional MDL CSS classes for icon button
     *     styling.
     * @returns The created icon button {@link Knot}.
     *
     * @example
     * const deleteBtn = helper.createIconButton('delete', (id, button) => {
     *     console.log('Delete clicked');
     * }, 'Delete this item');
     */
    createIconButton(
        iconName: string,
        callback: (id: string, button: Knot) => void,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): Knot {
        const buttonKnot = new Knot<HTMLButtonElement>('button');
        this._createIconKnot(iconName, buttonKnot);
        this.iconButtonElement(
            buttonKnot,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonKnot;
    }

    /**
     * Selects all elements matching the CSS selector within the given
     * DOM container and enhances each as an icon button via
     * {@link iconButtonElement}.
     *
     * @param selector CSS selector to match icon button elements.
     * @param dom The parent {@link Knot} to search within.
     * @param opt_cssClasses Additional MDL CSS classes for icon button
     *     styling.
     */
    multipleIconButton(
        selector: string,
        dom: Knot,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): void {
        const buttonKnots = new Query(selector, dom);
        buttonKnots.each((buttonKnot) => {
            this.iconButtonElement(
                buttonKnot,
                undefined,
                undefined,
                true,
                opt_cssClasses,
            );
        });
    }

    /**
     * Selects a single element matching the CSS selector within the
     * given DOM container and enhances it as an icon button via
     * {@link iconButtonElement}.
     *
     * @param selector CSS selector to match the icon button element.
     * @param dom The parent {@link Knot} to search within.
     * @param callback Called with the button's ID and the {@link Knot}
     *     when clicked.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses Additional MDL CSS classes for icon button
     *     styling.
     * @returns The selected and enhanced icon button {@link Knot}.
     *
     * @example
     * const editBtn = helper.iconButton('.edit-btn', containerKnot,
     *     (id, button) => {
     *         console.log('Editing...');
     *     },
     *     'Edit item',
     * );
     */
    iconButton(
        selector: string,
        dom: Knot,
        callback: (id: string, button: Knot) => void,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): Knot {
        const buttonKnot = new Query(selector, dom).getKnot();
        this.iconButtonElement(
            buttonKnot,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonKnot;
    }

    /**
     * Enhances an existing button {@link Knot} with icon button styling.
     * Applies base MDL classes (`mdl-button`, `mdl-js-button`,
     * `mdl-js-ripple-effect`, `mdl-button--icon`) plus any additional
     * classes provided.
     *
     * When the element already has an ID, existing CSS classes and click
     * listeners are removed before re-applying. When `opt_allowAccess`
     * is `false`, the element is removed from the DOM entirely.
     *
     * @param buttonKnot The button {@link Knot} to enhance.
     * @param opt_callback Called with the button's ID and the
     *     {@link Knot} when clicked.
     * @param opt_description Tooltip text shown on hover.
     * @param opt_allowAccess When `false`, the element is removed
     *     from the DOM instead of being enhanced.
     * @param opt_cssClasses Additional MDL CSS classes for icon button
     *     styling.
     */
    iconButtonElement(
        buttonKnot: Knot,
        opt_callback?: (id: string, button: Knot) => void,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): void {
        if (!buttonKnot.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonKnot.getId()) {
                    buttonKnot.setId(generateId('button'));
                } else {
                    const oldCssClasses = buttonKnot.getData('cssClasses');
                    buttonKnot.removeClass(oldCssClasses);
                    buttonKnot.removeEventListeners('click');
                }
                const cssClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                    'mdl-button--icon',
                ].concat(opt_cssClasses);
                buttonKnot.setData('cssClasses', cssClasses);
                buttonKnot.addClass(cssClasses);
                if (opt_callback) {
                    buttonKnot.addEventListener('click', () => {
                        opt_callback(buttonKnot.getId()!, buttonKnot);
                    });
                }

                this._setTooltip(buttonKnot, opt_description);
            } else {
                buttonKnot.remove();
            }
        }
    }

    /**
     * Creates a Material icon `<em>` element with the given icon name
     * and appends it to the parent element.
     *
     * @param iconName The Material icon name to display.
     * @param parentKnot The parent {@link Knot} to append the icon to.
     */
    private _createIconKnot(iconName: string, parentKnot: Knot): void {
        const iconKnot = new Knot('em');
        iconKnot.addClass('material-icons');
        iconKnot.setHtml(iconName);
        parentKnot.appendChild(iconKnot);
    }

    /**
     * Sets a tooltip on the given element. If a description string is
     * provided, it is also set as the `title` attribute. Initializes
     * a {@link Tooltip} component and upgrades the element via MDL.
     *
     * @param knot The {@link Knot} to attach the tooltip to.
     * @param opt_description The tooltip text to display.
     */
    private _setTooltip(
        knot: Knot,
        opt_description: string | undefined = '',
    ): void {
        if (opt_description) {
            knot.setAttribute('title', opt_description);
        }
        const tooltip = new Tooltip(knot);
        tooltip.render(opt_description);
        mdl(knot);
    }

    /**
     * Sets a Gravatar image on the given image {@link Knot} based on
     * the provided email address. Uses MD5 hashing of the email for
     * the Gravatar URL. Falls back to the provided default image URL
     * if the Gravatar request returns a 404.
     *
     * @param imageKnot The image {@link Knot} to set the `src` on.
     * @param defaultImageUrl Fallback image URL used when no Gravatar
     *     exists for the email.
     * @param email The email address to generate the Gravatar from.
     * @param opt_size The requested image size in pixels. Defaults to 500.
     * @param opt_rating The content rating filter. Defaults to `'g'`.
     *
     * @example
     * const img = new Knot('img');
     * helper.setGravatar(img, '/default-avatar.png', 'user@example.com');
     */
    setGravatar(
        imageKnot: Knot,
        defaultImageUrl: string,
        email: string,
        opt_size: number | undefined = 500,
        opt_rating: string | undefined = 'g',
    ): void {
        const src = format(
            'https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404',
            [md5(email), opt_size, opt_rating],
        );
        imageKnot.setAttribute('src', src);
        imageKnot.setAttribute(
            'onError',
            format("this.onerror=null;this.src='{0}';", [defaultImageUrl]),
        );
    }
}
