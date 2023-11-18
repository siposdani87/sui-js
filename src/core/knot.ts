import {
    contain,
    each,
    eachArray,
    eachObject,
    eq,
    isArray,
    isFunction,
    isInfinity,
    isString,
    isUndefined,
    noop,
    typeCast,
} from '../utils/operation';
import { consoleWarn } from '../utils/log';
import { Listener } from '../utils';

export class Knot<T extends HTMLElement = HTMLElement> {
    node: T;
    parentKnot: Knot | undefined;
    listenerStoreKey: string;

    constructor(
        node: (T | HTMLElement | string) | null,
        opt_parentKnot?: Knot | undefined,
    ) {
        if (isString(node)) {
            if (contain(node, '<') && contain(node, '</')) {
                const template = document.createElement('template');
                template.innerHTML = node;
                node = template.content.firstElementChild as any as T;
            } else {
                node = document.createElement(node) as any as T;
            }
        }
        this.node = node as T;
        this.parentKnot = opt_parentKnot;
        this.listenerStoreKey = '_listeners';
    }

    setParentKnot(parentKnot: Knot | undefined): void {
        this.parentKnot = parentKnot;
    }

    set(attribute: string, value: boolean | number | string): void {
        if (eq(attribute, 'id')) {
            this.setId(value);
        } else {
            this.setAttribute(attribute, value);
        }
    }

    merge(properties: Object): void {
        eachObject(properties, (value, attribute) => {
            this.set(attribute, value);
        });
    }

    get(attribute: string): any {
        if (eq(attribute, 'id')) {
            return this.getId();
        }
        return this.getAttribute(attribute);
    }

    getNode(): T {
        return this.node;
    }

    getTagName(): string {
        return this.node.tagName.toLowerCase();
    }

    getId(): string | null {
        return this.node.id || null;
    }

    setId(id: boolean | number | string): void {
        this.node.id = id.toString();
    }

    setFor(htmlFor: boolean | number | string): void {
        (this.node as any as HTMLLabelElement).htmlFor = htmlFor.toString();
        this.setAttribute('for', htmlFor);
    }

    getFor(): string | null {
        return (
            (this.node as any as HTMLLabelElement).htmlFor ||
            this.getAttribute('for')
        );
    }

    hasClass(cssClass: string): boolean {
        return this.node.classList.contains(cssClass);
    }

    private _handleClassList(
        cssClasses: Array<string> | string,
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

    addClass(cssClasses: Array<string> | string): void {
        this._handleClassList(cssClasses, (cssClass) => {
            if (cssClass && !this.hasClass(cssClass)) {
                this.node.classList.add(cssClass);
            }
        });
    }

    removeClass(cssClasses: Array<string> | string): void {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.remove(cssClass);
        });
    }

    toggleClass(cssClasses: Array<string> | string): void {
        this._handleClassList(cssClasses, (cssClass) => {
            this.node.classList.toggle(cssClass);
        });
    }

    getClasses(): Array<string> {
        return this.node.classList.value.split(' ');
    }

    setAttribute(
        attribute: string,
        opt_value?:
            | (
                  | Object
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
        const value =
            !contain(attribute, 'data-') && isUndefined(opt_value)
                ? attribute
                : opt_value;
        if (isFunction(value)) {
            this.node[attribute] = value;
        } else if (
            contain(attribute, 'data-') &&
            !isString(value) &&
            !isInfinity(value)
        ) {
            this.node.setAttribute(attribute, JSON.stringify(value));
        } else {
            this.node.setAttribute(attribute, value as string);
        }
    }

    getAttribute(attribute: string): any {
        const data = this.node.getAttribute(attribute);
        if (
            contain(attribute, 'data-') &&
            data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))
        ) {
            return JSON.parse(data);
        }
        return typeCast(data);
    }

    removeAttribute(attribute: string): void {
        this.node.removeAttribute(attribute);
    }

    hasAttribute(attribute: string): boolean {
        return this.node.hasAttribute(attribute);
    }

    addEventListener(
        eventName: string,
        opt_callback?: (knot: Knot<T>, event: any) => any,
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

    private _addListenerToStore(eventName: string, listener: Function): void {
        if (!this.node[this.listenerStoreKey]) {
            this.node[this.listenerStoreKey] = {};
        }
        if (!this.node[this.listenerStoreKey][eventName]) {
            this.node[this.listenerStoreKey][eventName] = [];
        }
        this.node[this.listenerStoreKey][eventName].push(listener);
    }

    private _getListenersFromStore(eventName: string): Listener[] {
        if (
            this.node[this.listenerStoreKey] ||
            this.node[this.listenerStoreKey][eventName]
        ) {
            return this.node[this.listenerStoreKey][eventName];
        }
        return [];
    }

    removeEventListener(
        eventName: keyof GlobalEventHandlersEventMap,
        listener: Listener,
    ): void {
        this.node.removeEventListener(eventName, listener);
    }

    removeEventListeners(eventName: keyof GlobalEventHandlersEventMap): void {
        const listeners = this._getListenersFromStore(eventName);
        eachArray(listeners, (listener) => {
            this.removeEventListener(eventName, listener);
        });
    }

    dispatchEvent(event: Event): void {
        this.node.dispatchEvent(event);
    }

    trigger(eventName: string): void {
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
        const event = new Event(eventName);
        this.dispatchEvent(event);
    }

    createElement<K extends HTMLElement = HTMLElement>(
        tagName: string,
    ): Knot<K> {
        const node = document.createElement(tagName);
        return new Knot<K>(node, this);
    }

    appendChild(knot: Knot): void {
        this.node.appendChild(knot.getNode());
    }

    removeChildren(): void {
        while (this.hasChildren()) {
            this.node.removeChild(this.node.firstChild);
        }
    }

    hasChildren(): boolean {
        return this.node.hasChildNodes();
    }

    removeChild(knot: Knot): void {
        if (this.hasChildren()) {
            try {
                this.node.removeChild(knot.getNode());
            } catch (e) {
                consoleWarn(e);
            }
        }
    }

    remove(): void {
        const parentElement = this._getParentElement();
        if (!this.isEmpty() && parentElement) {
            parentElement.removeChild(this.node);
        }
    }

    insert(knot: Knot): void {
        this.removeChildren();
        this.appendChild(knot);
    }

    beforeChild(knot: Knot): boolean {
        const referenceKnot =
            this.node.firstChild || this.node.firstElementChild;
        if (referenceKnot) {
            this.node.insertBefore(knot.getNode(), referenceKnot);
            return true;
        }
        // TODO: refactor to use other technique
        this.node.insertBefore(knot.getNode(), referenceKnot);
        return false;
    }

    afterChild(knot: Knot): boolean {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.appendChild(knot.getNode());
            return true;
        }
        return false;
    }

    insertBefore(knot: Knot): boolean {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(knot.getNode(), this.node);
            return true;
        }
        return false;
    }

    insertAfter(knot: Knot): boolean {
        const nextSiblingKnot = this.getNextSibling();
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.insertBefore(
                knot.getNode(),
                nextSiblingKnot.getNode(),
            );
            return true;
        }
        return false;
    }

    replaceChild(knot: Knot): boolean {
        const parentElement = this._getParentElement();
        if (parentElement) {
            parentElement.replaceChild(knot.getNode(), this.node);
            return true;
        }
        return false;
    }

    getNextSibling(): Knot {
        const referenceKnot =
            this.node.nextSibling || this.node.nextElementSibling;
        return new Knot(referenceKnot as T);
    }

    setHtml(text: string): void {
        this.node.innerHTML = text;
    }

    getHtml(opt_isInner: boolean | undefined = false): string {
        if (!this.isEmpty()) {
            return opt_isInner ? this.node.innerHTML : this.node.outerHTML;
        }
        return '';
    }

    setText(text: string): void {
        this.node.nodeValue = text;
    }

    getText(): string {
        return this.node.textContent;
    }

    setData(name: string, value: any): void {
        if (!this.isEmpty()) {
            let data = value;
            if (!isString(value) && !isInfinity(value)) {
                data = JSON.stringify(value);
            }
            this.node.dataset[name] = data;
        }
    }

    getData(name: string): any {
        let data = this.node.dataset[name];
        if (
            data &&
            (eq(data[0], '"') || eq(data[0], '[') || eq(data[0], '{'))
        ) {
            data = JSON.parse(data);
        }
        return typeCast(data);
    }

    removeData(name: string): void {
        if (!this.isEmpty()) {
            delete this.node.dataset[name];
            this.node.removeAttribute('data-' + name);
        }
    }

    getParentKnot(): Knot | null {
        const parentElement = this._getParentElement();
        if (parentElement) {
            return new Knot(parentElement);
        }
        return null;
    }

    private _getParentElement(): HTMLElement | null {
        if (this.parentKnot && !this.parentKnot.isEmpty()) {
            return this.parentKnot.getNode();
        } else if (this.node) {
            return this.node.parentElement;
        }
        return null;
    }

    getComputedStyle(): CSSStyleDeclaration | null {
        return window.getComputedStyle(this.node);
    }

    getStyle(): CSSStyleDeclaration {
        return this.node.style;
    }

    setStyle(properties: Object): void {
        eachObject(properties, (value, propertyName) => {
            this.node.style.setProperty(propertyName, value, '');
        });
    }

    removeStyle(properties: Array<any>): void {
        each(properties, (property) => {
            this.node.style.removeProperty(property);
        });
    }

    isEmpty(): boolean {
        return !this.node;
    }

    exists(): boolean {
        return document.body.contains(this.node);
    }

    toString(opt_isRoot: boolean | undefined = true): string {
        if (opt_isRoot) {
            return this.node.outerHTML;
        }
        return this.node.innerHTML;
    }
}
