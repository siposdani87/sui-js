import { Item } from '../core/item';
/**
 * @class
 */
export declare class Helper {
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @param {string} name
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createLink(name: any, opt_callback: any, opt_href?: string, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): Item;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleLink(selector: any, dom: any, opt_callback: any, opt_cssClasses?: any[]): void;
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
    link(selector: any, dom: any, opt_callback: any, opt_href?: string, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: any[]): any;
    /**
     * @param {!Item} linkNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    linkElement(linkNode: any, opt_callback: any, opt_href?: string, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: any[]): void;
    /**
     * @param {string} name
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createButton(name: any, callback: any, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): Item;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleButton(selector: any, dom: any, opt_callback: any, opt_cssClasses?: string[]): void;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    button(selector: any, dom: any, callback: any, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): any;
    /**
     * @param {!Item} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    buttonElement(buttonNode: any, opt_callback: any, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): void;
    /**
     * @param {string} iconName
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createIconButton(iconName: any, callback: any, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): Item;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleIconButton(selector: any, dom: any, opt_cssClasses?: string[]): void;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    iconButton(selector: any, dom: any, callback: any, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): any;
    /**
     * @param {!Item} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    iconButtonElement(buttonNode: any, opt_callback: any, opt_description?: string, opt_allowAccess?: boolean, opt_cssClasses?: string[]): void;
    /**
     * @private
     * @param {string} iconName
     * @param {!Item} parentNode
     * @return {undefined}
     */
    _createIconNode(iconName: any, parentNode: any): void;
    /**
     * @param {!Item} node
     * @param {string=} opt_description
     * @return {undefined}
     */
    _setTooltip(node: any, opt_description?: string): void;
    /**
     * @param {!Item} imageNode
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
     */
    setGravatar(imageNode: any, defaultImageUrl: any, email: any, opt_size?: number, opt_rating?: string): void;
}
