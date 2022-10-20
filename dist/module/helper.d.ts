import { Knot } from '../core/knot';
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
     * @return {!Knot}
     */
    createLink(name: string, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    /**
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleLink(selector: string, dom: Knot, opt_callback: Function | undefined, opt_cssClasses?: string[] | undefined): void;
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
    link(selector: string, dom: Knot, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    /**
     * @param {!Knot} linkNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    linkElement(linkNode: Knot, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    /**
     * @param {string} name
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
     */
    createButton(name: string, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    /**
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function=} opt_callback
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleButton(selector: string, dom: Knot, opt_callback: Function | undefined, opt_cssClasses?: string[] | undefined): void;
    /**
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
     */
    button(selector: string, dom: Knot, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    /**
     * @param {!Knot} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    buttonElement(buttonNode: Knot, opt_callback: Function | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    /**
     * @param {string} iconName
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
     */
    createIconButton(iconName: string, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    /**
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    multipleIconButton(selector: string, dom: Knot, opt_cssClasses?: string[] | undefined): void;
    /**
     * @param {string} selector
     * @param {!Knot} dom
     * @param {!Function} callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {!Knot}
     */
    iconButton(selector: string, dom: Knot, callback: Function, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): Knot;
    /**
     * @param {!Knot} buttonNode
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    iconButtonElement(buttonNode: Knot, opt_callback: Function | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    /**
     * @private
     * @param {string} iconName
     * @param {!Knot} parentNode
     * @return {undefined}
     */
    private _createIconNode;
    /**
     * @param {!Knot} node
     * @param {string=} opt_description
     * @return {undefined}
     */
    private _setTooltip;
    /**
     * @param {!Knot} imageNode
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
     */
    setGravatar(imageNode: Knot, defaultImageUrl: string, email: string, opt_size?: number | undefined, opt_rating?: string | undefined): void;
}
