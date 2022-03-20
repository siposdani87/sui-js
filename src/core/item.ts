import {
    contain,
    convert,
    each,
    eachArray,
    eq,
    isArray,
    isFunction,
    isObject,
    isString,
    isUndefined,
    noop,
    typeCast,
} from '../utils/operation';
import { consoleWarn } from '../utils/log';
import { Listener } from '../utils';

/**
 * @class
 * @template T
 */
export class Item<T extends HTMLElement = HTMLElement> {
    node: T;
    parentNode: any;
    listenerStoreKey: string;
    /**
     * @param {?T|string} node
     * @param {!Item=} opt_parentNode
     */
    constructor(node: (T | HTMLElement | string) | null, opt_parentNode?: Item | undefined) {
        if (isString(node)) {
            if (
                contain(/** @type {string} */(node) as string, '<') &&
                contain(/** @type {string} */(node) as string, '</')
            ) {
                const template = document.createElement('template');
                template.innerHTML = node as string;
                node = template.content.firstElementChild as any as T;
            } else {
                node = document.createElement(
                    /** @type {string} */(node) as string,
                ) as any as T;
            }
        }
        this.node = /** @type {!T} */ node as T;
        this.parentNode = opt_parentNode;
        this.listenerStoreKey = '_listeners';
    }
    /**
     * @param {string} attribute
     * @param {boolean|number|string} value
     * @return {undefined}
     */
    set(attribute: string, value: boolean | number | string): void {
        if (eq(attribute, 'id')) {
            this.setId(value);
        } else {
            this.setAttribute(attribute, value);
        }
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    merge(properties: Object): void {
        each(properties, (value, attribute) => {
            this.set(attribute, value);
        });
    }
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute: string): any {
        if (eq(attribute, 'id')) {
            return this.getId();
        }
        return this.getAttribute(attribute);
    }
    /**
     * @return {!T}
     */
    getNode(): T {
        return this.node;
    }
    /**
     * @return {string}
     */
    getTagName(): string {
        return this.node.tagName.toLowerCase();
    }
    /**
     * @return {string|null}
     */
    getId(): string | null {
        return this.node.id || null;
    }
    /**
     * @param {boolean|number|string} id
     * @return {undefined}
     */
    setId(id: boolean | number | string): void {
        this.node.id = convert(id, 'string');
    }
    /**
     * @param {boolean|number|string} htmlFor
     * @return {undefined}
     */
    setFor(htmlFor: boolean | number | string): void {
        (this.node as any as HTMLLabelElement).htmlFor = convert(
            htmlFor,
            'string',
        );
        this.setAttribute('for', htmlFor);
    }
    /**
     * @return {string|null}
     */
    getFor(): string | null {
        return (
            (this.node as any as HTMLLabelElement).htmlFor ||
            /** @type {string} */(this).getAttribute('for')
        );
    }
    /**
     * @param {string} cssClass
     * @return {boolean}
     */
    hasClass(cssClass: string): boolean {
        return this.node.classList.contains(cssClass);
    }
    /**
     * @param {!Array|string} cssClasses
     * @param {!Function} callback
     * @return {undefined}
     */
    _handleClassList(
        cssClasses: Array<any> | string,
        callback: Function,
    ): void {
        if (isArray(cssClasses)) {
            each(cssClasses, (cssClass) => {
                callback(cssClass);
            });
        } else {
            callback(cssClasses);
        }
    }
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    addClass(cssClasses: Array<any> | string): void {
        this._handleClassList(cssClasses, (cssClass) => {
            if (cssClass && !this.hasClass(cssClass)) {
                this.node.classList.add(cssClass);
            }
        });
    }
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    removeClass(cssClasses: Array<any> | string): void {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.remove(cssClass);
        });
    }
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    toggleClass(cssClasses: Array<any> | string): void {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.toggle(cssClass);
        });
    }
    /**
     * @return {!Array<string>}
     */
    getClasses(): Array<string> {
        return this.node.classList.value.split(' ');
    }
    /**
     * @param {string} attribute
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined=} opt_value
     * @return {undefined}
     */
    setAttribute(
        attribute: string,
        opt_value?:
            | (
                  | object
                  | Function
                  | Array<any>
                  | boolean
                  | number
                  | string
                  | null
                  | undefined
              )
            | undefined,
    ): void {
        const value = isUndefined(opt_value) ? attribute : opt_value;
        if (isFunction(value)) {
            this.node[attribute] = value;
        } else if (contain(attribute, 'data-') && isObject(value)) {
            this.node.setAttribute(attribute, JSON.stringify(value));
        } else {
            this.node.setAttribute(
                attribute,
                /** @type {string} */(value) as string,
            );
        }
    }
    /**
     * @param {string} attribute
     * @return {*}
     */
    getAttribute(attribute: string): any {
        const data = this.node.getAttribute(attribute);
        if (
            contain(attribute, 'data-') &&
            data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))
        ) {
            return JSON.parse(data) || null;
        }
        return typeCast(data || null);
    }
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    removeAttribute(attribute: string): void {
        this.node.removeAttribute(attribute);
    }
    /**
     * @param {string} attribute
     * @return {boolean}
     */
    hasAttribute(attribute: string): boolean {
        return this.node.hasAttribute(attribute);
    }
    /**
     * @param {string} eventName
     * @param {!Function=} opt_callback
     * @return {!Function}
     */
    addEventListener(
        eventName: string,
        opt_callback: Function | undefined,
    ): Function {
        let listener: any = noop();
        if (opt_callback) {
            listener = (event) => {
                event.stopPropagation();
                if (!opt_callback(this, event)) {
                    event.preventDefault();
                }
            };
            this.node.addEventListener(eventName, listener);
            this._addListenerToStore(eventName, listener);
        }
        return listener;
    }
    /**
     * @private
     * @param {string} eventName
     * @param {!Function=} listener
     * @return {undefined}
     */
    _addListenerToStore(
        eventName: string,
        listener: Function | undefined,
    ): void {
        if (!this.node[this.listenerStoreKey]) {
            this.node[this.listenerStoreKey] = {};
        }
        if (!this.node[this.listenerStoreKey][eventName]) {
            this.node[this.listenerStoreKey][eventName] = [];
        }
        this.node[this.listenerStoreKey][eventName].push(listener);
    }
    /**
     * @private
     * @param {string} eventName
     * @return {!Array<Listener>}
     */
    private _getListenersFromStore(eventName: string): Array<Listener> {
        if (
            this.node[this.listenerStoreKey] ||
            this.node[this.listenerStoreKey][eventName]
        ) {
            return this.node[this.listenerStoreKey][eventName];
        }
        return [];
    }
    /**
     * @param {string} eventName
     * @param {Listener} listener
     * @return {undefined}
     */
    removeEventListener(
        eventName: keyof GlobalEventHandlersEventMap,
        listener: Listener,
    ): void {
        this.node.removeEventListener(eventName, listener);
    }
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    removeEventListeners(eventName: keyof GlobalEventHandlersEventMap): void {
        const listeners = this._getListenersFromStore(eventName);
        eachArray(listeners, (listener) => {
            this.removeEventListener(eventName, listener);
        });
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    dispatchEvent(event: Event): void {
        this.node.dispatchEvent(event);
    }
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    trigger(eventName: string): void {
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
        const event = new Event(eventName);
        this.dispatchEvent(event);
    }
    /**
     * @template T
     * @param {string} tagName
     * @return {!Item}
     */
    createElement<K extends HTMLElement = HTMLElement>(tagName: string): Item<K> {
        const node = document.createElement(tagName);
        return new Item<K>(node, this);
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    appendChild(node: Item): void {
        this.node.appendChild(node.getNode());
    }
    /**
     * @return {undefined}
     */
    removeChildren(): void {
        while (this.hasChildren()) {
            this.node.removeChild(this.node.firstChild);
        }
    }
    /**
     * @return {boolean}
     */
    hasChildren(): boolean {
        return this.node.hasChildNodes();
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    removeChild(node: Item): void {
        if (this.hasChildren()) {
            try {
                this.node.removeChild(node.getNode());
            } catch (e) {
                consoleWarn(e);
            }
        }
    }
    /**
     * @return {undefined}
     */
    remove(): void {
        const parentElement = this._getParentElement();
        if (!this.isEmpty() && parentElement) {
            parentElement.removeChild(this.node);
        }
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    insert(node: Item): void {
        this.removeChildren();
        this.appendChild(node);
    }
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    beforeChild(node: Item): boolean {
        const referenceNode =
            this.node.firstChild || this.node.firstElementChild;
        if (referenceNode) {
            this.node.insertBefore(node.getNode(), referenceNode);
            return true;
        }
        // TODO: refactor to use other technique
        this.node.insertBefore(node.getNode(), referenceNode);
        return false;
    }
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    afterChild(node: Item): boolean {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.appendChild(node.getNode());
            return true;
        }
        return false;
    }
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    insertBefore(node: Item): boolean {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(node.getNode(), this.node);
            return true;
        }
        return false;
    }
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    insertAfter(node: Item): boolean {
        const nextSiblingNode = this.getNextSibling();
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(
                node.getNode(),
                nextSiblingNode.getNode(),
            );
            return true;
        }
        return false;
    }
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    replaceChild(node: Item): boolean {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.replaceChild(node.getNode(), this.node);
            return true;
        }
        return false;
    }
    /**
     * @return {!Item}
     */
    getNextSibling(): Item {
        const referenceNode =
            this.node.nextSibling || this.node.nextElementSibling;
        return new Item(/** @type {T} */(referenceNode) as T);
    }
    /**
     * @export
     * @param {!string} text
     * @return {undefined}
     */
    setHtml(text: string): void {
        this.node.innerHTML = text;
    }
    /**
     * @export
     * @param {boolean=} opt_isInner
     * @return {string}
     */
    getHtml(opt_isInner: boolean | undefined = false): string {
        if (!this.isEmpty()) {
            return opt_isInner ? this.node.innerHTML : this.node.outerHTML;
        }
        return '';
    }
    /**
     * @param {string} text
     * @return {undefined}
     */
    setText(text: string): void {
        this.node.nodeValue = text;
    }
    /**
     * @return {string}
     */
    getText(): string {
        return this.node.textContent;
    }
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setData(name: string, value: any): void {
        if (!this.isEmpty()) {
            let data = value;
            if (!isString(value)) {
                data = JSON.stringify(value);
            }
            this.node.dataset[name] = data;
        }
    }
    /**
     * @param {string} name
     * @return {*}
     */
    getData(name: string): any {
        let data = this.node.dataset[name];
        if (data && (eq(data[0], '[') || eq(data[0], '{'))) {
            data = JSON.parse(data);
        }
        return typeCast(data);
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    removeData(name: string): void {
        if (!this.isEmpty()) {
            delete this.node.dataset[name];
            this.node.removeAttribute('data-' + name);
        }
    }
    /**
     * @return {?Item}
     */
    getParentNode(): Item | null {
        const parentElement = this._getParentElement();
        if (parentElement) {
            return new Item(parentElement);
        }
        return null;
    }
    /**
     * @return {?HTMLElement}
     */
    private _getParentElement(): HTMLElement | null {
        if (this.parentNode && !this.parentNode.isEmpty()) {
            return this.parentNode.getNode();
        } else if (this.node) {
            return this.node.parentElement;
        }
        return null;
    }
    /**
     * @return {?CSSStyleDeclaration}
     */
    getComputedStyle(): CSSStyleDeclaration | null {
        return window.getComputedStyle(this.node);
    }
    /**
     * @return {!CSSStyleDeclaration}
     */
    getStyle(): CSSStyleDeclaration {
        return this.node.style;
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setStyle(properties: Object): void {
        each(properties, (value, propertyName) => {
            this.node.style.setProperty(propertyName, value, '');
        });
    }
    /**
     * @param {!Array} properties
     * @return {undefined}
     */
    removeStyle(properties: Array<any>): void {
        each(properties, (property) => {
            this.node.style.removeProperty(property);
        });
    }
    /**
     * @return {boolean}
     */
    isEmpty(): boolean {
        return !this.node;
    }
    /**
     * @return {boolean}
     */
    exists(): boolean {
        return document.body.contains(this.node);
    }
    /**
     * @override
     * @param {boolean=} opt_isRoot
     * @return {string}
     */
    toString(opt_isRoot: boolean | undefined = true): string {
        if (opt_isRoot) {
            return this.node.outerHTML;
        }
        return this.node.innerHTML;
    }
    /**
     * @param {boolean=} opt_deep
     * @return {?Item}
     */
    cloneNode(opt_deep: boolean | undefined = false): Item | null {
        if (!this.isEmpty()) {
            const cloneNode = this.node.cloneNode(opt_deep) as HTMLElement;
            return new Item(cloneNode, this.parentNode);
        }
        return null;
    }
    /**
     * @deprecated
     * @return {undefined}
     */
    clearNode(): void {
        const cloneNode = this.cloneNode(true);
        if (cloneNode) {
            this.replaceChild(cloneNode);
            this.node = cloneNode.getNode() as T;
        }
    }
}
