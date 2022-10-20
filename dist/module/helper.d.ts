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
     * @param {!Knot} linkKnot
     * @param {!Function=} opt_callback
     * @param {string=} opt_href
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    linkElement(linkKnot: Knot, opt_callback: Function | undefined, opt_href?: string | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
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
     * @param {!Knot} buttonKnot
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    buttonElement(buttonKnot: Knot, opt_callback: Function | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
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
     * @param {!Knot} buttonKnot
     * @param {!Function=} opt_callback
     * @param {string=} opt_description
     * @param {boolean=} opt_allowAccess
     * @param {!Array=} opt_cssClasses
     * @return {undefined}
     */
    iconButtonElement(buttonKnot: Knot, opt_callback: Function | undefined, opt_description?: string | undefined, opt_allowAccess?: boolean | undefined, opt_cssClasses?: string[] | undefined): void;
    /**
     * @private
     * @param {string} iconName
     * @param {!Knot} parentKnot
     * @return {undefined}
     */
    private _createIconKnot;
    /**
     * @param {!Knot} knot
     * @param {string=} opt_description
     * @return {undefined}
     */
    private _setTooltip;
    /**
     * @param {!Knot} imageKnot
     * @param {string} defaultImageUrl
     * @param {string} email
     * @param {number=} opt_size
     * @param {string=} opt_rating
     * @return {undefined}
     */
    setGravatar(imageKnot: Knot, defaultImageUrl: string, email: string, opt_size?: number | undefined, opt_rating?: string | undefined): void;
}
