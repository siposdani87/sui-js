import { contain, each, eachArray, eachObject, eq, isArray, isFunction, isInfinity, isString, isUndefined, noop, typeCast, } from '../utils/operation';
import { consoleWarn } from '../utils/log';
export class Knot {
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
    set(attribute, value) {
        if (eq(attribute, 'id')) {
            this.setId(value);
        }
        else {
            this.setAttribute(attribute, value);
        }
    }
    merge(properties) {
        eachObject(properties, (value, attribute) => {
            this.set(attribute, value);
        });
    }
    get(attribute) {
        if (eq(attribute, 'id')) {
            return this.getId();
        }
        return this.getAttribute(attribute);
    }
    getNode() {
        return this.node;
    }
    getTagName() {
        return this.node.tagName.toLowerCase();
    }
    getId() {
        return this.node.id || null;
    }
    setId(id) {
        this.node.id = id.toString();
    }
    setFor(htmlFor) {
        this.node.htmlFor = htmlFor.toString();
        this.setAttribute('for', htmlFor);
    }
    getFor() {
        return (this.node.htmlFor ||
            this.getAttribute('for'));
    }
    hasClass(cssClass) {
        return this.node.classList.contains(cssClass);
    }
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
    addClass(cssClasses) {
        this._handleClassList(cssClasses, (cssClass) => {
            if (cssClass && !this.hasClass(cssClass)) {
                this.node.classList.add(cssClass);
            }
        });
    }
    removeClass(cssClasses) {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.remove(cssClass);
        });
    }
    toggleClass(cssClasses) {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.toggle(cssClass);
        });
    }
    getClasses() {
        return this.node.classList.value.split(' ');
    }
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
    getAttribute(attribute) {
        const data = this.node.getAttribute(attribute);
        if (contain(attribute, 'data-') &&
            data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))) {
            return JSON.parse(data);
        }
        return typeCast(data);
    }
    removeAttribute(attribute) {
        this.node.removeAttribute(attribute);
    }
    hasAttribute(attribute) {
        return this.node.hasAttribute(attribute);
    }
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
    _addListenerToStore(eventName, listener) {
        if (!this.node[this.listenerStoreKey]) {
            this.node[this.listenerStoreKey] = {};
        }
        if (!this.node[this.listenerStoreKey][eventName]) {
            this.node[this.listenerStoreKey][eventName] = [];
        }
        this.node[this.listenerStoreKey][eventName].push(listener);
    }
    _getListenersFromStore(eventName) {
        if (this.node[this.listenerStoreKey] ||
            this.node[this.listenerStoreKey][eventName]) {
            return this.node[this.listenerStoreKey][eventName];
        }
        return [];
    }
    removeEventListener(eventName, listener) {
        this.node.removeEventListener(eventName, listener);
    }
    removeEventListeners(eventName) {
        const listeners = this._getListenersFromStore(eventName);
        eachArray(listeners, (listener) => {
            this.removeEventListener(eventName, listener);
        });
    }
    dispatchEvent(event) {
        this.node.dispatchEvent(event);
    }
    trigger(eventName) {
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
        const event = new Event(eventName);
        this.dispatchEvent(event);
    }
    createElement(tagName) {
        const node = document.createElement(tagName);
        return new Knot(node, this);
    }
    appendChild(knot) {
        this.node.appendChild(knot.getNode());
    }
    removeChildren() {
        while (this.hasChildren()) {
            this.node.removeChild(this.node.firstChild);
        }
    }
    hasChildren() {
        return this.node.hasChildNodes();
    }
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
    remove() {
        const parentElement = this._getParentElement();
        if (!this.isEmpty() && parentElement) {
            parentElement.removeChild(this.node);
        }
    }
    insert(knot) {
        this.removeChildren();
        this.appendChild(knot);
    }
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
    afterChild(knot) {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.appendChild(knot.getNode());
            return true;
        }
        return false;
    }
    insertBefore(knot) {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(knot.getNode(), this.node);
            return true;
        }
        return false;
    }
    insertAfter(knot) {
        const nextSiblingKnot = this.getNextSibling();
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(knot.getNode(), nextSiblingKnot.getNode());
            return true;
        }
        return false;
    }
    replaceChild(knot) {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.replaceChild(knot.getNode(), this.node);
            return true;
        }
        return false;
    }
    getNextSibling() {
        const referenceKnot = this.node.nextSibling || this.node.nextElementSibling;
        return new Knot(referenceKnot);
    }
    setHtml(text) {
        this.node.innerHTML = text;
    }
    getHtml(opt_isInner = false) {
        if (!this.isEmpty()) {
            return opt_isInner ? this.node.innerHTML : this.node.outerHTML;
        }
        return '';
    }
    setText(text) {
        this.node.nodeValue = text;
    }
    getText() {
        return this.node.textContent;
    }
    setData(name, value) {
        if (!this.isEmpty()) {
            let data = value;
            if (!isString(value) && !isInfinity(value)) {
                data = JSON.stringify(value);
            }
            this.node.dataset[name] = data;
        }
    }
    getData(name) {
        let data = this.node.dataset[name];
        if (data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))) {
            data = JSON.parse(data);
        }
        return typeCast(data);
    }
    removeData(name) {
        if (!this.isEmpty()) {
            delete this.node.dataset[name];
            this.node.removeAttribute('data-' + name);
        }
    }
    getParentKnot() {
        const parentElement = this._getParentElement();
        if (parentElement) {
            return new Knot(parentElement);
        }
        return null;
    }
    _getParentElement() {
        if (this.parentKnot && !this.parentKnot.isEmpty()) {
            return this.parentKnot.getNode();
        }
        else if (this.node) {
            return this.node.parentElement;
        }
        return null;
    }
    getComputedStyle() {
        return window.getComputedStyle(this.node);
    }
    getStyle() {
        return this.node.style;
    }
    setStyle(properties) {
        eachObject(properties, (value, propertyName) => {
            this.node.style.setProperty(propertyName, value, '');
        });
    }
    removeStyle(properties) {
        each(properties, (property) => {
            this.node.style.removeProperty(property);
        });
    }
    isEmpty() {
        return !this.node;
    }
    exists() {
        return document.body.contains(this.node);
    }
    toString(opt_isRoot = true) {
        if (opt_isRoot) {
            return this.node.outerHTML;
        }
        return this.node.innerHTML;
    }
}
