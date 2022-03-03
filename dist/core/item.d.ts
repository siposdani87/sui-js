/**
 * @class
 */
export declare class Item {
    node: any;
    parentNode: any;
    listenerStoreKey: string;
    /**
     * @param {?Element|string} node
     * @param {!Item=} opt_parentNode
     */
    constructor(node: any, opt_parentNode?: any);
    /**
     * @param {string} attribute
     * @param {boolean|number|string} value
     * @return {undefined}
     */
    set(attribute: any, value: any): void;
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    merge(properties: any): void;
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute: any): any;
    /**
     * @return {!Element}
     */
    getNode(): any;
    /**
     * @return {string}
     */
    getTagName(): any;
    /**
     * @return {string|null}
     */
    getId(): any;
    /**
     * @param {boolean|number|string} id
     * @return {undefined}
     */
    setId(id: any): void;
    /**
     * @param {boolean|number|string} htmlFor
     * @return {undefined}
     */
    setFor(htmlFor: any): void;
    /**
     * @return {string|null}
     */
    getFor(): any;
    /**
     * @param {string} cssClass
     * @return {boolean}
     */
    hasClass(cssClass: any): any;
    /**
     * @param {!Array|string} cssClasses
     * @param {!Function} callback
     * @return {undefined}
     */
    _handleClassList(cssClasses: any, callback: any): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    addClass(cssClasses: any): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    removeClass(cssClasses: any): void;
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    toggleClass(cssClasses: any): void;
    /**
     * @return {!Array}
     */
    getClasses(): any;
    /**
     * @param {string} attribute
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined=} opt_value
     * @return {undefined}
     */
    setAttribute(attribute: any, opt_value?: any): void;
    /**
     * @param {string} attribute
     * @return {*}
     */
    getAttribute(attribute: any): any;
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    removeAttribute(attribute: any): void;
    /**
     * @param {string} attribute
     * @return {boolean}
     */
    hasAttribute(attribute: any): any;
    /**
     * @param {string} eventName
     * @param {!Function=} opt_callback
     * @return {!Function}
     */
    addEventListener(eventName: any, opt_callback: any): any;
    /**
     * @private
     * @param {string} eventName
     * @param {!Function=} listener
     * @return {undefined}
     */
    _addListenerToStore(eventName: any, listener: any): void;
    /**
     * @private
     * @param {string} eventName
     * @return {!Array}
     */
    _getListenerToStore(eventName: any): any;
    /**
     * @param {string} eventName
     * @param {!Function} listener
     * @return {undefined}
     */
    removeEventListener(eventName: any, listener: any): void;
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    removeEventListeners(eventName: any): void;
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    dispatchEvent(event: any): void;
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    trigger(eventName: any): void;
    /**
     * @param {string} tagName
     * @return {!Item}
     */
    createElement(tagName: any): Item;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    appendChild(node: any): void;
    /**
     * @return {undefined}
     */
    removeChildren(): void;
    /**
     * @return {boolean}
     */
    hasChildren(): any;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    removeChild(node: any): void;
    /**
     * @return {undefined}
     */
    remove(): void;
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    insert(node: any): void;
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    beforeChild(node: any): boolean;
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    afterChild(node: any): boolean;
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    insertBefore(node: any): boolean;
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    insertAfter(node: any): boolean;
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    replaceChild(node: any): boolean;
    /**
     * @return {!Item}
     */
    getNextSibling(): Item;
    /**
     * @export
     * @param {!Element|string|number} text
     * @return {undefined}
     */
    setHtml(text: any): void;
    /**
     * @export
     * @param {boolean=} opt_isInner
     * @return {string}
     */
    getHtml(opt_isInner?: boolean): any;
    /**
     * @param {string} text
     * @return {undefined}
     */
    setText(text: any): void;
    /**
     * @return {string}
     */
    getText(): any;
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setData(name: any, value: any): void;
    /**
     * @param {string} name
     * @return {*}
     */
    getData(name: any): any;
    /**
     * @param {string} name
     * @return {undefined}
     */
    removeData(name: any): void;
    /**
     * @return {?Item}
     */
    getParentNode(): Item;
    /**
     * @return {?Element}
     */
    _getParentElement(): any;
    /**
     * @return {?CSSStyleDeclaration}
     */
    getComputedStyle(): CSSStyleDeclaration;
    /**
     * @return {!Object}
     */
    getStyle(): any;
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setStyle(properties: any): void;
    /**
     * @param {!Array} properties
     * @return {undefined}
     */
    removeStyle(properties: any): void;
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
    toString(opt_isRoot?: boolean): any;
    /**
     * @param {boolean=} opt_deep
     * @return {?Item}
     */
    cloneNode(opt_deep?: boolean): Item;
    /**
     * @deprecated
     * @return {undefined}
     */
    clearNode(): void;
}
