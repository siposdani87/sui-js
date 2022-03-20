import { Item } from '../core/item';
/**
 * @class
 */
export declare class Helper {
    /**
     * @param {string} name
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createLink(name: string, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): Item;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleLink(selector: string, dom: Item, opt_callback: Function | undefined, opt_cssClasses?: Array<any> | undefined): void;
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
    link(selector: string, dom: Item, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): Item;
    /**
     * @param {!Item} linkNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    linkElement(linkNode: Item, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): void;
    /**
     * @param {string} name
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createButton(name: string, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): Item;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleButton(selector: string, dom: Item, opt_callback: Function | undefined, opt_cssClasses?: Array<any> | undefined): void;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    button(selector: string, dom: Item, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): Item;
    /**
     * @param {!Item} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    buttonElement(buttonNode: Item, opt_callback: Function | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): void;
    /**
     * @param {string} iconName
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    createIconButton(iconName: string, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): Item;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleIconButton(selector: string, dom: Item, opt_cssClasses?: Array<any> | undefined): void;
    /**
     * @param {string} selector
     * @param {!Item} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Item}
     */
    iconButton(selector: string, dom: Item, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): Item;
    /**
     * @param {!Item} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    iconButtonElement(buttonNode: Item, opt_callback: Function | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: Array<any> | undefined): void;
    /**
     * @private
     * @param {string} iconName
     * @param {!Item} parentNode
     * @return {undefined}
     */
    private _createIconNode;
    /**
     * @param {!Item} node
     * @param {string=} opt_description
     * @return {undefined}
     */
    private _setTooltip;
    /**
     * @param {!Item} imageNode
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
     */
    setGravatar(imageNode: Item, defaultImageUrl: string, email: string, opt_size?: number | undefined, opt_rating?: string | undefined): void;
}
