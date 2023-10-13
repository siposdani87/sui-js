import { format } from '../utils/operation';
import { Tooltip } from '../component/tooltip';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { generateId, md5 } from '../utils/coder';
import { mdl } from '../utils/render';

/**
 * @class
 */
export class Helper {
    /**
     * @param {string} name
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
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
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
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
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
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
     * @param {!Knot} linkKnot
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
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
     * @param {string} name
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
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
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
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
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
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
     * @param {!Knot} buttonKnot
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
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
                        opt_callback(buttonKnot.getId(), buttonKnot);
                    });
                }

                this._setTooltip(buttonKnot, opt_description);
            } else {
                buttonKnot.remove();
            }
        }
    }
    /**
     * @param {string} iconName
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
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
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
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
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
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
     * @param {!Knot} buttonKnot
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
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
                        opt_callback(buttonKnot.getId(), buttonKnot);
                    });
                }

                this._setTooltip(buttonKnot, opt_description);
            } else {
                buttonKnot.remove();
            }
        }
    }
    /**
     * @private
     * @param {string} iconName
     * @param {!Knot} parentKnot
     * @return {undefined}
     */
    private _createIconKnot(iconName: string, parentKnot: Knot): void {
        const iconKnot = new Knot('em');
        iconKnot.addClass('material-icons');
        iconKnot.setHtml(iconName);
        parentKnot.appendChild(iconKnot);
    }
    /**
     * @param {!Knot} knot
     * @param {string=} opt_description
     * @return {undefined}
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
     * @param {!Knot} imageKnot
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
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
