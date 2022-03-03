import { mdl, format } from '../utils/operation';
import { Tooltip } from '../component/tooltip';
import { Item } from '../core/item';
import { Query } from '../core/query';
import { generateId, md5 } from '../utils/coder';
/**
 * @class
 */
export class Helper {
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() { }
    /**
     * @param {string} name
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createLink(name, opt_callback, opt_href = 'javascript:void(0)', opt_description = '', opt_allowAccess = true, opt_cssClasses = ['link']) {
        const linkNode = new Item('a');
        linkNode.setHtml(name);
        this.linkElement(linkNode, opt_callback, opt_href, opt_description, opt_allowAccess, opt_cssClasses);
        return linkNode;
    }
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleLink(selector, dom, opt_callback, opt_cssClasses = []) {
        const linkNodes = new Query(selector, dom);
        linkNodes.each((linkNode) => {
            this.linkElement(linkNode, opt_callback, '', '', true, opt_cssClasses);
        });
    }
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    link(selector, dom, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true, opt_cssClasses = []) {
        const linkNode = new Query(selector, dom).getItem();
        this.linkElement(linkNode, opt_callback, opt_href, opt_description, opt_allowAccess, opt_cssClasses);
        return linkNode;
    }
    /**
     * @param {!Item} linkNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    linkElement(linkNode, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true, opt_cssClasses = []) {
        if (!linkNode.isEmpty()) {
            if (opt_allowAccess) {
                linkNode.addClass(opt_cssClasses);
                if (!linkNode.getId()) {
                    linkNode.setId(generateId('link'));
                }
                else {
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
            }
            else {
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
     * @return {!Item}
     */
    createButton(name, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
        const buttonNode = new Item('button');
        buttonNode.setHtml(name);
        this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonNode;
    }
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleButton(selector, dom, opt_callback, opt_cssClasses = ['mdl-button--primary']) {
        const buttonNodes = new Query(selector, dom);
        buttonNodes.each((buttonNode) => {
            this.buttonElement(buttonNode, opt_callback, '', true, opt_cssClasses);
        });
    }
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    button(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
        const buttonNode = new Query(selector, dom).getItem();
        this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonNode;
    }
    /**
     * @param {!Item} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    buttonElement(buttonNode, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
        if (!buttonNode.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonNode.getId()) {
                    buttonNode.setId(generateId('button'));
                }
                else {
                    const oldCssClasses = 
                    /** @type {!Array} */ buttonNode.getData('cssClasses');
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
            }
            else {
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
     * @return {!Item}
     */
    createIconButton(iconName, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        const buttonNode = new Item('button');
        this._createIconNode(iconName, buttonNode);
        this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonNode;
    }
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleIconButton(selector, dom, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        const buttonNodes = new Query(selector, dom);
        buttonNodes.each((buttonNode) => {
            this.iconButtonElement(buttonNode, undefined, undefined, true, opt_cssClasses);
        });
    }
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    iconButton(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        const buttonNode = new Query(selector, dom).getItem();
        this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
        return buttonNode;
    }
    /**
     * @param {!Item} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    iconButtonElement(buttonNode, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = [
        'mdl-button--accent',
        'mdl-button--fab',
        'mdl-button--mini-fab',
    ]) {
        if (!buttonNode.isEmpty()) {
            if (opt_allowAccess) {
                if (!buttonNode.getId()) {
                    buttonNode.setId(generateId('button'));
                }
                else {
                    const oldCssClasses = 
                    /** @type {!Array} */ buttonNode.getData('cssClasses');
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
            }
            else {
                buttonNode.remove();
            }
        }
    }
    /**
     * @private
     * @param {string} iconName
     * @param {!Item} parentNode
     * @return {undefined}
     */
    _createIconNode(iconName, parentNode) {
        const iconNode = new Item('em');
        iconNode.addClass('material-icons');
        iconNode.setHtml(iconName);
        parentNode.appendChild(iconNode);
    }
    /**
     * @param {!Item} node
     * @param {string=} opt_description
     * @return {undefined}
     */
    _setTooltip(node, opt_description = '') {
        if (opt_description) {
            node.setAttribute('title', opt_description);
        }
        const tooltip = new Tooltip(node);
        tooltip.render(opt_description);
        mdl(node);
    }
    /**
     * @param {!Item} imageNode
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
     */
    setGravatar(imageNode, defaultImageUrl, email, opt_size = 500, opt_rating = 'g') {
        const src = format('https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404', [md5(email), opt_size, opt_rating]);
        imageNode.setAttribute('src', src);
        imageNode.setAttribute('onError', format("this.onerror=null;this.src='{0}';", [defaultImageUrl]));
    }
}
