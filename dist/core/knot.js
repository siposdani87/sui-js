import { contain, each, eachArray, eachObject, eq, isArray, isFunction, isInfinity, isString, isUndefined, noop, typeCast, } from '../utils/operation';
import { consoleWarn } from '../utils/log';
/**
 * @class
 * @template T
 */
export class Knot {
    /**
     * @param {?T|string} node
     * @param {!Knot=} opt_parentKnot
     */
    constructor(node, opt_parentKnot) {
        if (isString(node)) {
            if (contain(node, '<') && contain(node, '</')) {
                const template = document.createElement('template');
                template.innerHTML = node;
                node = template.content.firstElementChild;
            }
            else {
                node = document.createElement(node);
            }
        }
        this.node = node;
        this.parentKnot = opt_parentKnot;
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
        eachObject(properties, (value, attribute) => {
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
     * @return {!T}
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
        this.node.id = id.toString();
    }
    /**
     * @param {boolean|number|string} htmlFor
     * @return {undefined}
     */
    setFor(htmlFor) {
        this.node.htmlFor = htmlFor.toString();
        this.setAttribute('for', htmlFor);
    }
    /**
     * @return {string|null}
     */
    getFor() {
        return (this.node.htmlFor ||
            this.getAttribute('for'));
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
     * @return {!Array<string>}
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
        const value = !contain(attribute, 'data-') && isUndefined(opt_value)
            ? attribute
            : opt_value;
        if (isFunction(value)) {
            this.node[attribute] = value;
        }
        else if (contain(attribute, 'data-') &&
            !isString(value) &&
            !isInfinity(value)) {
            this.node.setAttribute(attribute, JSON.stringify(value));
        }
        else {
            this.node.setAttribute(attribute, value);
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
            return JSON.parse(data);
        }
        return typeCast(data);
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
     * @param {!Function} listener
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
     * @return {!Array<Listener>}
     */
    _getListenersFromStore(eventName) {
        if (this.node[this.listenerStoreKey] ||
            this.node[this.listenerStoreKey][eventName]) {
            return this.node[this.listenerStoreKey][eventName];
        }
        return [];
    }
    /**
     * @param {string} eventName
     * @param {Listener} listener
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
        const listeners = this._getListenersFromStore(eventName);
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
     * @template T
     * @param {string} tagName
     * @return {!Knot}
     */
    createElement(tagName) {
        const node = document.createElement(tagName);
        return new Knot(node, this);
    }
    /**
     * @param {!Knot} knot
     * @return {undefined}
     */
    appendChild(knot) {
        this.node.appendChild(knot.getNode());
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
     * @param {!Knot} knot
     * @return {undefined}
     */
    removeChild(knot) {
        if (this.hasChildren()) {
            try {
                this.node.removeChild(knot.getNode());
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
     * @param {!Knot} knot
     * @return {undefined}
     */
    insert(knot) {
        this.removeChildren();
        this.appendChild(knot);
    }
    /**
     * @param {!Knot} knot
     * @return {boolean}
     */
    beforeChild(knot) {
        const referenceKnot = this.node.firstChild || this.node.firstElementChild;
        if (referenceKnot) {
            this.node.insertBefore(knot.getNode(), referenceKnot);
            return true;
        }
        // TODO: refactor to use other technique
        this.node.insertBefore(knot.getNode(), referenceKnot);
        return false;
    }
    /**
     * @deprecated
     * @param {!Knot} knot
     * @return {boolean}
     */
    afterChild(knot) {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.appendChild(knot.getNode());
            return true;
        }
        return false;
    }
    /**
     * @param {!Knot} knot
     * @return {boolean}
     */
    insertBefore(knot) {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(knot.getNode(), this.node);
            return true;
        }
        return false;
    }
    /**
     * @param {!Knot} knot
     * @return {boolean}
     */
    insertAfter(knot) {
        const nextSiblingKnot = this.getNextSibling();
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(knot.getNode(), nextSiblingKnot.getNode());
            return true;
        }
        return false;
    }
    /**
     * @deprecated
     * @param {!Knot} knot
     * @return {boolean}
     */
    replaceChild(knot) {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.replaceChild(knot.getNode(), this.node);
            return true;
        }
        return false;
    }
    /**
     * @return {!Knot}
     */
    getNextSibling() {
        const referenceKnot = this.node.nextSibling || this.node.nextElementSibling;
        return new Knot(referenceKnot);
    }
    /**
     * @param {!string} text
     * @return {undefined}
     */
    setHtml(text) {
        this.node.innerHTML = text;
    }
    /**
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
            if (!isString(value) && !isInfinity(value)) {
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
        if (data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))) {
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
     * @return {?Knot}
     */
    getParentKnot() {
        const parentElement = this._getParentElement();
        if (parentElement) {
            return new Knot(parentElement);
        }
        return null;
    }
    /**
     * @return {?HTMLElement}
     */
    _getParentElement() {
        if (this.parentKnot && !this.parentKnot.isEmpty()) {
            return this.parentKnot.getNode();
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
     * @return {!CSSStyleDeclaration}
     */
    getStyle() {
        return this.node.style;
    }
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setStyle(properties) {
        eachObject(properties, (value, propertyName) => {
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
}
