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
        opt_callback: Function | undefined,
        opt_href: string | undefined = 'javascript:void(0)',
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['link'],
    ): Knot {
        const linkNode = new Knot('a');
        linkNode.setHtml(name);
        this.linkElement(
            linkNode,
            opt_callback,
            opt_href,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return linkNode;
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
        opt_callback: Function | undefined,
        opt_cssClasses: string[] | undefined = [],
    ): void {
        const linkNodes = new Query(selector, dom);
        linkNodes.each((linkNode) => {
            this.linkElement(
                linkNode,
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
        opt_callback: Function | undefined,
        opt_href: string | undefined = '',
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [],
    ): Knot {
        const linkNode = new Query(selector, dom).getKnot();
        this.linkElement(
            linkNode,
            opt_callback,
            opt_href,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return linkNode;
    }
    /**
     * @param {!Knot} linkNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    linkElement(
        linkNode: Knot,
        opt_callback: Function | undefined,
        opt_href: string | undefined = '',
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [],
    ): void {
        if (!linkNode.isEmpty()) {
            if (opt_allowAccess) {
                linkNode.addClass(opt_cssClasses);

                if (!linkNode.getId()) {
                    linkNode.setId(generateId('link'));
                } else {
                    linkNode.removeEventListeners('click');
                }
                if (opt_href) {
                    linkNode.setAttribute('href', opt_href);
                }
                if (opt_callback) {
                    const href = linkNode.getAttribute('href');
                    linkNode.addEventListener('click', () => {
                        opt_callback(href, linkNode);
                    });
                }

                this._setTooltip(linkNode, opt_description);
            } else {
                linkNode.remove();
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
        callback: Function,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): Knot {
        const buttonNode = new Knot('button');
        buttonNode.setHtml(name);
        this.buttonElement(
            buttonNode,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonNode;
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
        opt_callback: Function | undefined,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): void {
        const buttonNodes = new Query(selector, dom);
        buttonNodes.each((buttonNode) => {
            this.buttonElement(
                buttonNode,
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
        callback: Function,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): Knot {
        const buttonNode = new Query(selector, dom).getKnot();
        this.buttonElement(
            buttonNode,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonNode;
    }
    /**
     * @param {!Knot} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    buttonElement(
        buttonNode: Knot,
        opt_callback: Function | undefined,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = ['mdl-button--primary'],
    ): void {
        if (!buttonNode.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonNode.getId()) {
                    buttonNode.setId(generateId('button'));
                } else {
                    const oldCssClasses = buttonNode.getData('cssClasses');
                    buttonNode.removeClass(oldCssClasses);
                    buttonNode.removeEventListeners('click');
                }
                const cssClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                    'mdl-button--raised',
                ].concat(opt_cssClasses);
                buttonNode.setData('cssClasses', cssClasses);
                buttonNode.addClass(cssClasses);
                if (opt_callback) {
                    buttonNode.addEventListener('click', () => {
                        opt_callback(buttonNode.getId(), buttonNode);
                    });
                }

                this._setTooltip(buttonNode, opt_description);
            } else {
                buttonNode.remove();
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
        callback: Function,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): Knot {
        const buttonNode = new Knot('button');
        this._createIconNode(iconName, buttonNode);
        this.iconButtonElement(
            buttonNode,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonNode;
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
        const buttonNodes = new Query(selector, dom);
        buttonNodes.each((buttonNode) => {
            this.iconButtonElement(
                buttonNode,
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
        callback: Function,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): Knot {
        const buttonNode = new Query(selector, dom).getKnot();
        this.iconButtonElement(
            buttonNode,
            callback,
            opt_description,
            opt_allowAccess,
            opt_cssClasses,
        );
        return buttonNode;
    }
    /**
     * @param {!Knot} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    iconButtonElement(
        buttonNode: Knot,
        opt_callback: Function | undefined,
        opt_description: string | undefined = '',
        opt_allowAccess: boolean | undefined = true,
        opt_cssClasses: string[] | undefined = [
            'mdl-button--accent',
            'mdl-button--fab',
            'mdl-button--mini-fab',
        ],
    ): void {
        if (!buttonNode.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonNode.getId()) {
                    buttonNode.setId(generateId('button'));
                } else {
                    const oldCssClasses = buttonNode.getData('cssClasses');
                    buttonNode.removeClass(oldCssClasses);
                    buttonNode.removeEventListeners('click');
                }
                const cssClasses = [
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                    'mdl-button--icon',
                ].concat(opt_cssClasses);
                buttonNode.setData('cssClasses', cssClasses);
                buttonNode.addClass(cssClasses);
                if (opt_callback) {
                    buttonNode.addEventListener('click', () => {
                        opt_callback(buttonNode.getId(), buttonNode);
                    });
                }

                this._setTooltip(buttonNode, opt_description);
            } else {
                buttonNode.remove();
            }
        }
    }
    /**
     * @private
     * @param {string} iconName
     * @param {!Knot} parentNode
     * @return {undefined}
     */
    private _createIconNode(iconName: string, parentNode: Knot): void {
        const iconNode = new Knot('em');
        iconNode.addClass('material-icons');
        iconNode.setHtml(iconName);
        parentNode.appendChild(iconNode);
    }
    /**
     * @param {!Knot} node
     * @param {string=} opt_description
     * @return {undefined}
     */
    private _setTooltip(
        node: Knot,
        opt_description: string | undefined = '',
    ): void {
        if (opt_description) {
            node.setAttribute('title', opt_description);
        }
        const tooltip = new Tooltip(node);
        tooltip.render(opt_description);
        mdl(node);
    }
    /**
     * @param {!Knot} imageNode
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
     */
    setGravatar(
        imageNode: Knot,
        defaultImageUrl: string,
        email: string,
        opt_size: number | undefined = 500,
        opt_rating: string | undefined = 'g',
    ): void {
        const src = format(
            'https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404',
            [md5(email), opt_size, opt_rating],
        );
        imageNode.setAttribute('src', src);
        imageNode.setAttribute(
            'onError',
            format("this.onerror=null;this.src='{0}';", [defaultImageUrl]),
        );
    }
}
