import { Listener } from '../utils';
/**
 * @class
 * @template T
 */
export declare class Item<T extends HTMLElement = HTMLElement> {
    node: T;
    parentNode: any;
    listenerStoreKey: string;
    /**
     * @param {?T|string} node
     * @param {!Item=} opt_parentNode
     */
    constructor(node: (T | string) | null, opt_parentNode?: Item | undefined);
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
    _handleClassList(cssClasses: Array<any> | string, callback: Function): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    addClass(cssClasses: Array<any> | string): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    removeClass(cssClasses: Array<any> | string): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    toggleClass(cssClasses: Array<any> | string): void;
    /**
     * @return {!Array<string>}
     */
    getClasses(): Array<string>;
    /**
     * @param {string} attribute
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined=} opt_value
     * @return {undefined}
     */
    setAttribute(attribute: string, opt_value?: (object | Function | Array<any> | boolean | number | string | null | undefined) | undefined): void;
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
    addEventListener(eventName: string, opt_callback: Function | undefined): Function;
    /**
     * @private
     * @param {string} eventName
     * @param {!Function=} listener
     * @return {undefined}
     */
    _addListenerToStore(eventName: string, listener: Function | undefined): void;
    /**
     * @private
     * @param {string} eventName
     * @return {!Array<Listener>}
     */
    _getListenersFromStore(eventName: string): Array<Listener>;
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
     * @param {string} tagName
     * @return {!Item}
     */
    createElement(tagName: string): Item;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    appendChild(node: Item): void;
    /**
     * @return {undefined}
     */
    removeChildren(): void;
    /**
     * @return {boolean}
     */
    hasChildren(): boolean;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    removeChild(node: Item): void;
    /**
     * @return {undefined}
     */
    remove(): void;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    insert(node: Item): void;
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    beforeChild(node: Item): boolean;
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    afterChild(node: Item): boolean;
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    insertBefore(node: Item): boolean;
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    insertAfter(node: Item): boolean;
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    replaceChild(node: Item): boolean;
    /**
     * @return {!Item}
     */
    getNextSibling(): Item;
    /**
     * @export
     * @param {!string} text
     * @return {undefined}
     */
    setHtml(text: string): void;
    /**
     * @export
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
     * @return {?Item}
     */
    getParentNode(): Item | null;
    /**
     * @return {?HTMLElement}
     */
    _getParentElement(): HTMLElement | null;
    /**
     * @return {?CSSStyleDeclaration}
     */
    getComputedStyle(): CSSStyleDeclaration | null;
    /**
     * @return {!Object}
     */
    getStyle(): Object;
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
    /**
     * @param {boolean=} opt_deep
     * @return {?Item}
     */
    cloneNode(opt_deep?: boolean | undefined): Item | null;
    /**
     * @deprecated
     * @return {undefined}
     */
    clearNode(): void;
}
