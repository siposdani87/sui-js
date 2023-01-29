import { Listener } from '../utils';
/**
 * @class
 * @template T
 */
export declare class Knot<T extends HTMLElement = HTMLElement> {
    node: T;
    parentKnot: Knot;
    listenerStoreKey: string;
    /**
     * @param {?T|string} node
     * @param {!Knot=} opt_parentKnot
     */
    constructor(node: (T | HTMLElement | string) | null, opt_parentKnot?: Knot | undefined);
    /**
     * @param {string} attribute
     * @param {boolean|number|string} value
     * @return {undefined}
     */
    set(attribute: string, value: boolean | number | string): void;
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    merge(properties: Object): void;
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute: string): any;
    /**
     * @return {!T}
     */
    getNode(): T;
    /**
     * @return {string}
     */
    getTagName(): string;
    /**
     * @return {string|null}
     */
    getId(): string | null;
    /**
     * @param {boolean|number|string} id
     * @return {undefined}
     */
    setId(id: boolean | number | string): void;
    /**
     * @param {boolean|number|string} htmlFor
     * @return {undefined}
     */
    setFor(htmlFor: boolean | number | string): void;
    /**
     * @return {string|null}
     */
    getFor(): string | null;
    /**
     * @param {string} cssClass
     * @return {boolean}
     */
    hasClass(cssClass: string): boolean;
    /**
     * @param {!Array|string} cssClasses
     * @param {!Function} callback
     * @return {undefined}
     */
    private _handleClassList;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    addClass(cssClasses: Array<string> | string): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    removeClass(cssClasses: Array<string> | string): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    toggleClass(cssClasses: Array<string> | string): void;
    /**
     * @return {!Array<string>}
     */
    getClasses(): Array<string>;
    /**
     * @param {string} attribute
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined=} opt_value
     * @return {undefined}
     */
    setAttribute(attribute: string, opt_value?: (Object | Function | Array<any> | boolean | number | string | null | undefined) | undefined): void;
    /**
     * @param {string} attribute
     * @return {*}
     */
    getAttribute(attribute: string): any;
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    removeAttribute(attribute: string): void;
    /**
     * @param {string} attribute
     * @return {boolean}
     */
    hasAttribute(attribute: string): boolean;
    /**
     * @param {string} eventName
     * @param {!Function=} opt_callback
     * @return {!Function}
     */
    addEventListener(eventName: string, opt_callback?: (knot: Knot<T>, event: any) => any): Function;
    /**
     * @private
     * @param {string} eventName
     * @param {!Function} listener
     * @return {undefined}
     */
    private _addListenerToStore;
    /**
     * @private
     * @param {string} eventName
     * @return {!Array<Listener>}
     */
    private _getListenersFromStore;
    /**
     * @param {string} eventName
     * @param {Listener} listener
     * @return {undefined}
     */
    removeEventListener(eventName: keyof GlobalEventHandlersEventMap, listener: Listener): void;
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    removeEventListeners(eventName: keyof GlobalEventHandlersEventMap): void;
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    dispatchEvent(event: Event): void;
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    trigger(eventName: string): void;
    /**
     * @template T
     * @param {string} tagName
     * @return {!Knot}
     */
    createElement<K extends HTMLElement = HTMLElement>(tagName: string): Knot<K>;
    /**
     * @param {!Knot} knot
     * @return {undefined}
     */
    appendChild(knot: Knot): void;
    /**
     * @return {undefined}
     */
    removeChildren(): void;
    /**
     * @return {boolean}
     */
    hasChildren(): boolean;
    /**
     * @param {!Knot} knot
     * @return {undefined}
     */
    removeChild(knot: Knot): void;
    /**
     * @return {undefined}
     */
    remove(): void;
    /**
     * @param {!Knot} knot
     * @return {undefined}
     */
    insert(knot: Knot): void;
    /**
     * @param {!Knot} knot
     * @return {boolean}
     */
    beforeChild(knot: Knot): boolean;
    /**
     * @deprecated
     * @param {!Knot} knot
     * @return {boolean}
     */
    afterChild(knot: Knot): boolean;
    /**
     * @param {!Knot} knot
     * @return {boolean}
     */
    insertBefore(knot: Knot): boolean;
    /**
     * @param {!Knot} knot
     * @return {boolean}
     */
    insertAfter(knot: Knot): boolean;
    /**
     * @deprecated
     * @param {!Knot} knot
     * @return {boolean}
     */
    replaceChild(knot: Knot): boolean;
    /**
     * @return {!Knot}
     */
    getNextSibling(): Knot;
    /**
     * @param {!string} text
     * @return {undefined}
     */
    setHtml(text: string): void;
    /**
     * @param {boolean=} opt_isInner
     * @return {string}
     */
    getHtml(opt_isInner?: boolean | undefined): string;
    /**
     * @param {string} text
     * @return {undefined}
     */
    setText(text: string): void;
    /**
     * @return {string}
     */
    getText(): string;
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setData(name: string, value: any): void;
    /**
     * @param {string} name
     * @return {*}
     */
    getData(name: string): any;
    /**
     * @param {string} name
     * @return {undefined}
     */
    removeData(name: string): void;
    /**
     * @return {?Knot}
     */
    getParentKnot(): Knot | null;
    /**
     * @return {?HTMLElement}
     */
    private _getParentElement;
    /**
     * @return {?CSSStyleDeclaration}
     */
    getComputedStyle(): CSSStyleDeclaration | null;
    /**
     * @return {!CSSStyleDeclaration}
     */
    getStyle(): CSSStyleDeclaration;
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setStyle(properties: Object): void;
    /**
     * @param {!Array} properties
     * @return {undefined}
     */
    removeStyle(properties: Array<any>): void;
    /**
     * @return {boolean}
     */
    isEmpty(): boolean;
    /**
     * @return {boolean}
     */
    exists(): boolean;
    /**
     * @override
     * @param {boolean=} opt_isRoot
     * @return {string}
     */
    toString(opt_isRoot?: boolean | undefined): string;
}
