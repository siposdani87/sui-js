import { contain, each, eachArray, eq, isArray, isFunction, isObject, isString, isUndefined, noop, typeCast, } from '../utils/operation';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Item {
    /**
     * @param {?Element|string} node
     * @param {!Item=} opt_parentNode
     */
    constructor(node, opt_parentNode) {
        if (isString(node)) {
            if (contain(/** @type {string} */ node, '<') &&
                contain(/** @type {string} */ node, '</')) {
                const template = document.createElement('template');
                template.innerHTML = node;
                node = template.content.firstElementChild;
            }
            else {
                node = document.createElement(/** @type {string} */ node);
            }
        }
        this.node = /** @type {!Element} */ node;
        this.parentNode = opt_parentNode;
        this.listenerStoreKey = '_listeners';
    }
    /**
     * @param {string} attribute
     * @param {boolean|number|string} value
     * @return {undefined}
     */
    set(attribute, value) {
        if (eq(attribute, 'id')) {
            this.setId(value);
        }
        else {
            this.setAttribute(attribute, value);
        }
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    merge(properties) {
        each(properties, (value, attribute) => {
            this.set(attribute, value);
        });
    }
    /**
     * @param {string} attribute
     * @return {*}
     */
    get(attribute) {
        if (eq(attribute, 'id')) {
            return this.getId();
        }
        return this.getAttribute(attribute);
    }
    /**
     * @return {!Element}
     */
    getNode() {
        return this.node;
    }
    /**
     * @return {string}
     */
    getTagName() {
        return this.node.tagName.toLowerCase();
    }
    /**
     * @return {string|null}
     */
    getId() {
        return this.node.id || null;
    }
    /**
     * @param {boolean|number|string} id
     * @return {undefined}
     */
    setId(id) {
        this.node.id = id;
    }
    /**
     * @param {boolean|number|string} htmlFor
     * @return {undefined}
     */
    setFor(htmlFor) {
        this.node.htmlFor = htmlFor;
        this.setAttribute('for', htmlFor);
    }
    /**
     * @return {string|null}
     */
    getFor() {
        return (this.node.htmlFor || /** @type {string} */ this.getAttribute('for'));
    }
    /**
     * @param {string} cssClass
     * @return {boolean}
     */
    hasClass(cssClass) {
        return this.node.classList.contains(cssClass);
    }
    /**
     * @param {!Array|string} cssClasses
     * @param {!Function} callback
     * @return {undefined}
     */
    _handleClassList(cssClasses, callback) {
        if (isArray(cssClasses)) {
            each(cssClasses, (cssClass) => {
                callback(cssClass);
            });
        }
        else {
            callback(cssClasses);
        }
    }
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    addClass(cssClasses) {
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
    removeClass(cssClasses) {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.remove(cssClass);
        });
    }
    /**
     * @param {!Array|string} cssClasses
     * @return {undefined}
     */
    toggleClass(cssClasses) {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.toggle(cssClass);
        });
    }
    /**
     * @return {!Array}
     */
    getClasses() {
        return this.node.classList.value.split(' ');
    }
    /**
     * @param {string} attribute
     * @param {!Object|!Function|!Array|boolean|number|string|null|undefined=} opt_value
     * @return {undefined}
     */
    setAttribute(attribute, opt_value) {
        const value = isUndefined(opt_value) ? attribute : opt_value;
        if (isFunction(value)) {
            this.node[attribute] = value;
        }
        else if (contain(attribute, 'data-') && isObject(value)) {
            this.node.setAttribute(attribute, JSON.stringify(value));
        }
        else {
            this.node.setAttribute(attribute, /** @type {string} */ value);
        }
    }
    /**
     * @param {string} attribute
     * @return {*}
     */
    getAttribute(attribute) {
        const data = this.node.getAttribute(attribute);
        if (contain(attribute, 'data-') &&
            data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))) {
            return JSON.parse(data) || null;
        }
        return typeCast(data || null);
    }
    /**
     * @param {string} attribute
     * @return {undefined}
     */
    removeAttribute(attribute) {
        this.node.removeAttribute(attribute);
    }
    /**
     * @param {string} attribute
     * @return {boolean}
     */
    hasAttribute(attribute) {
        return this.node.hasAttribute(attribute);
    }
    /**
     * @param {string} eventName
     * @param {!Function=} opt_callback
     * @return {!Function}
     */
    addEventListener(eventName, opt_callback) {
        let listener = noop();
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
    _addListenerToStore(eventName, listener) {
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
     * @return {!Array}
     */
    _getListenerToStore(eventName) {
        if (this.node[this.listenerStoreKey] ||
            this.node[this.listenerStoreKey][eventName]) {
            return this.node[this.listenerStoreKey][eventName];
        }
        return [];
    }
    /**
     * @param {string} eventName
     * @param {!Function} listener
     * @return {undefined}
     */
    removeEventListener(eventName, listener) {
        this.node.removeEventListener(eventName, listener);
    }
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    removeEventListeners(eventName) {
        const listeners = this._getListenerToStore(eventName);
        eachArray(listeners, (listener) => {
            this.removeEventListener(eventName, listener);
        });
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    dispatchEvent(event) {
        this.node.dispatchEvent(event);
    }
    /**
     * @param {string} eventName
     * @return {undefined}
     */
    trigger(eventName) {
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
        const event = new Event(eventName);
        this.dispatchEvent(event);
    }
    /**
     * @param {string} tagName
     * @return {!Item}
     */
    createElement(tagName) {
        const node = document.createElement(tagName);
        return new Item(node, this);
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    appendChild(node) {
        this.node.appendChild(node.getNode());
    }
    /**
     * @return {undefined}
     */
    removeChildren() {
        while (this.hasChildren()) {
            this.node.removeChild(this.node.firstChild);
        }
    }
    /**
     * @return {boolean}
     */
    hasChildren() {
        return this.node.hasChildNodes();
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    removeChild(node) {
        if (this.hasChildren()) {
            try {
                this.node.removeChild(node.getNode());
            }
            catch (e) {
                consoleWarn(e);
            }
        }
    }
    /**
     * @return {undefined}
     */
    remove() {
        const parentElement = this._getParentElement();
        if (!this.isEmpty() && parentElement) {
            parentElement.removeChild(this.node);
        }
    }
    /**
     * @param {!Item} node
     * @return {undefined}
     */
    insert(node) {
        this.removeChildren();
        this.appendChild(node);
    }
    /**
     * @param {!Item} node
     * @return {boolean}
     */
    beforeChild(node) {
        const referenceNode = this.node.firstChild || this.node.firstElementChild;
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
    afterChild(node) {
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
    insertBefore(node) {
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
    insertAfter(node) {
        const nextSiblingNode = this.getNextSibling();
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(node.getNode(), nextSiblingNode.getNode());
            return true;
        }
        return false;
    }
    /**
     * @deprecated
     * @param {!Item} node
     * @return {boolean}
     */
    replaceChild(node) {
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
    getNextSibling() {
        const referenceNode = this.node.nextSibling || this.node.nextElementSibling;
        return new Item(/** @type {!Element} */ referenceNode);
    }
    /**
     * @export
     * @param {!Element|string|number} text
     * @return {undefined}
     */
    setHtml(text) {
        this.node.innerHTML = text;
    }
    /**
     * @export
     * @param {boolean=} opt_isInner
     * @return {string}
     */
    getHtml(opt_isInner = false) {
        if (!this.isEmpty()) {
            return opt_isInner ? this.node.innerHTML : this.node.outerHTML;
        }
        return '';
    }
    /**
     * @param {string} text
     * @return {undefined}
     */
    setText(text) {
        this.node.nodeValue = text;
    }
    /**
     * @return {string}
     */
    getText() {
        return this.node.textContent;
    }
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setData(name, value) {
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
    getData(name) {
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
    removeData(name) {
        if (!this.isEmpty()) {
            delete this.node.dataset[name];
            this.node.removeAttribute('data-' + name);
        }
    }
    /**
     * @return {?Item}
     */
    getParentNode() {
        const parentElement = this._getParentElement();
        if (parentElement) {
            return new Item(parentElement);
        }
        return null;
    }
    /**
     * @return {?Element}
     */
    _getParentElement() {
        if (this.parentNode && !this.parentNode.isEmpty()) {
            return this.parentNode.getNode();
        }
        else if (this.node) {
            return this.node.parentElement;
        }
        return null;
    }
    /**
     * @return {?CSSStyleDeclaration}
     */
    getComputedStyle() {
        return window.getComputedStyle(this.node);
    }
    /**
     * @return {!Object}
     */
    getStyle() {
        return this.node.style;
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setStyle(properties) {
        each(properties, (value, propertyName) => {
            this.node.style.setProperty(propertyName, value, '');
        });
    }
    /**
     * @param {!Array} properties
     * @return {undefined}
     */
    removeStyle(properties) {
        each(properties, (property) => {
            this.node.style.removeProperty(property);
        });
    }
    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.node;
    }
    /**
     * @return {boolean}
     */
    exists() {
        return document.body.contains(this.node);
    }
    /**
     * @override
     * @param {boolean=} opt_isRoot
     * @return {string}
     */
    toString(opt_isRoot = true) {
        if (opt_isRoot) {
            return this.node.outerHTML;
        }
        return this.node.innerHTML;
    }
    /**
     * @param {boolean=} opt_deep
     * @return {?Item}
     */
    cloneNode(opt_deep = false) {
        if (!this.isEmpty()) {
            const cloneNode = this.node.cloneNode(opt_deep);
            return new Item(cloneNode, this.parentNode);
        }
        return null;
    }
    /**
     * @deprecated
     * @return {undefined}
     */
    clearNode() {
        const cloneNode = this.cloneNode(true);
        if (cloneNode) {
            this.replaceChild(cloneNode);
            this.node = cloneNode.getNode();
        }
    }
}
