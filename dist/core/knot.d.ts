import { Listener } from '../utils';
/**
 * DOM element wrapper that provides a convenient, chainable API for
 * manipulating HTML elements.  Every element managed by the SUI framework
 * is wrapped in a `Knot` instance, which offers attribute, class, event,
 * style, data, and DOM-tree operations while tracking a logical parent
 * that may differ from the native DOM parentNode.
 *
 * The generic parameter `T` constrains the underlying element type, giving
 * callers type-safe access to element-specific properties via
 * {@link Knot.getNode}.
 *
 * @example
 * // Create a new <div> element
 * const div = new Knot<HTMLDivElement>('div');
 * div.setId('container');
 * div.addClass('card');
 *
 * // Wrap an existing DOM element
 * const body = new Knot(document.body);
 * body.appendChild(div);
 *
 * // Parse an HTML string into a Knot
 * const link = new Knot<HTMLAnchorElement>('<a href="/home">Home</a>');
 *
 * @see {@link Query} for selecting multiple Knot elements from the DOM
 * @see {@link Objekt} for the framework's plain-object wrapper
 * @category Core
 */
export declare class Knot<T extends HTMLElement = HTMLElement> {
    /** The underlying DOM element managed by this wrapper. */
    node: T;
    /** Logical parent in the framework's element tree. */
    parentKnot: Knot | undefined;
    /** Property name used to store event listeners on the DOM node. */
    listenerStoreKey: string;
    /**
     * Creates a new Knot by wrapping an existing element, creating one from
     * a tag name, or parsing an HTML string.
     *
     * @param node Tag name (e.g. `'div'`), HTML string
     *     (e.g. `'<span>text</span>'`), an existing HTMLElement, or `null`.
     * @param opt_parentKnot Optional logical parent Knot to track in
     *     the framework's element tree.
     * @example
     * // From a tag name
     * const span = new Knot('span');
     *
     * // From an HTML fragment
     * const fragment = new Knot('<p class="intro">Hello</p>');
     *
     * // From an existing element, with a parent
     * const child = new Knot(document.getElementById('child'), parentKnot);
     */
    constructor(node: (T | HTMLElement | string) | null, opt_parentKnot?: Knot | undefined);
    /**
     * Replaces the logical parent tracked by this Knot.
     *
     * @param parentKnot The new parent Knot, or `undefined` to clear
     *     the parent reference.
     */
    setParentKnot(parentKnot: Knot | undefined): void;
    /**
     * Sets an attribute on the underlying element. If the attribute is
     * `'id'`, delegates to {@link Knot.setId} for consistent handling.
     *
     * @param attribute Attribute name to set (e.g. `'href'`, `'id'`).
     * @param value Attribute value; will be converted to a string
     *     by the underlying DOM API.
     * @example
     * knot.set('title', 'Click me');
     * knot.set('id', 'main-nav');
     */
    set(attribute: string, value: boolean | number | string): void;
    /**
     * Sets multiple attributes at once by iterating over the supplied
     * key-value pairs and delegating each to {@link Knot.set}.
     *
     * @param properties Object whose keys are attribute names and values
     *     are the corresponding attribute values.
     * @example
     * knot.merge({ id: 'logo', class: 'brand', title: 'Home' });
     */
    merge(properties: object): void;
    /**
     * Retrieves the value of an attribute. Delegates to {@link Knot.getId}
     * when the attribute is `'id'`, otherwise calls
     * {@link Knot.getAttribute}.
     *
     * @param attribute Attribute name to read.
     * @returns The attribute value, type-cast from its string
     *     representation, or `null` if the attribute does not exist.
     * @example
     * const href = knot.get('href');
     */
    get(attribute: string): any;
    /**
     * Returns the raw DOM element wrapped by this Knot, allowing direct
     * access to native DOM APIs when needed.
     *
     * @returns The underlying DOM element of type `T`.
     * @example
     * const input = knot.getNode() as HTMLInputElement;
     * input.focus();
     */
    getNode(): T;
    /**
     * Returns the lower-cased tag name of the underlying element
     * (e.g. `'div'`, `'input'`).
     *
     * @returns Lower-cased HTML tag name.
     * @example
     * const tag = knot.getTagName(); // 'div'
     */
    getTagName(): string;
    /**
     * Returns the element's `id`, or `null` if no id is set.
     *
     * @returns The element id string, or `null`.
     * @example
     * const id = knot.getId(); // 'main-nav' or null
     */
    getId(): string | null;
    /**
     * Sets the element's `id` attribute.
     *
     * @param id Value to assign as the element id; converted to a string.
     * @example
     * knot.setId('sidebar');
     */
    setId(id: boolean | number | string): void;
    /**
     * Sets the `for` attribute on a `<label>` element, linking it to a
     * form control by id. Updates both the DOM property and the HTML
     * attribute for maximum compatibility.
     *
     * @param htmlFor The id of the form control this label refers to.
     * @example
     * const label = new Knot<HTMLLabelElement>('label');
     * label.setFor('email-input');
     */
    setFor(htmlFor: boolean | number | string): void;
    /**
     * Returns the `for` attribute value from a `<label>` element.
     * Reads the DOM property first, falling back to the HTML attribute.
     *
     * @returns The associated form control id, or `null`.
     * @example
     * const targetId = label.getFor(); // 'email-input'
     */
    getFor(): string | null;
    /**
     * Checks whether the element has the given CSS class.
     *
     * @param cssClass Class name to test.
     * @returns `true` if the class is present on the element.
     * @example
     * if (knot.hasClass('active')) { ... }
     */
    hasClass(cssClass: string): boolean;
    /**
     * Iterates over one or more CSS class names and invokes the callback
     * for each individual class.
     *
     * @param cssClasses A single class name or an array of class names.
     * @param callback Function to call for each class name.
     */
    private _handleClassList;
    /**
     * Adds one or more CSS classes to the element. Classes that are
     * already present are not duplicated.
     *
     * @param cssClasses A single class name or an array of class names
     *     to add.
     * @example
     * knot.addClass('visible');
     * knot.addClass(['card', 'elevation-2']);
     */
    addClass(cssClasses: Array<string> | string): void;
    /**
     * Removes one or more CSS classes from the element.
     *
     * @param cssClasses A single class name or an array of class names
     *     to remove.
     * @example
     * knot.removeClass('hidden');
     * knot.removeClass(['fade-in', 'animate']);
     */
    removeClass(cssClasses: Array<string> | string): void;
    /**
     * Toggles one or more CSS classes on the element. Each class is
     * added if absent, or removed if present.
     *
     * @param cssClasses A single class name or an array of class names
     *     to toggle.
     * @example
     * knot.toggleClass('expanded');
     */
    toggleClass(cssClasses: Array<string> | string): void;
    /**
     * Returns all CSS classes currently applied to the element.
     *
     * @returns Array of class name strings.
     * @example
     * const classes = knot.getClasses(); // ['card', 'elevation-2']
     */
    getClasses(): Array<string>;
    /**
     * Sets a single attribute on the underlying element. Handles three
     * special cases:
     *
     * 1. **Function values** are assigned as DOM properties (e.g. event
     *    handlers).
     * 2. **`data-*` attributes** with non-string, non-Infinity values
     *    are JSON-serialized before being stored.
     * 3. All other values are set via the standard `setAttribute` API.
     *
     * When called without a value and the attribute name does not start
     * with `data-`, the attribute name is used as both name and value
     * (boolean-attribute shorthand).
     *
     * @param attribute Attribute name (e.g. `'href'`, `'data-config'`).
     * @param opt_value Value to assign. Accepts primitives, objects
     *     (JSON-serialized for data attributes), functions, arrays, or
     *     `null`/`undefined`.
     * @example
     * knot.setAttribute('href', '/about');
     * knot.setAttribute('data-options', { page: 1, limit: 20 });
     * knot.setAttribute('disabled');
     */
    setAttribute(attribute: string, opt_value?: (object | ((...args: unknown[]) => unknown) | Array<unknown> | boolean | number | string | null | undefined) | undefined): void;
    /**
     * Reads an attribute from the element. For `data-*` attributes whose
     * stored value begins with `"`, `[`, or `{`, the value is
     * JSON-parsed before being returned. All other values are run through
     * `typeCast` to convert numeric strings to numbers, etc.
     *
     * @param attribute Attribute name to read.
     * @returns The parsed or type-cast attribute value, or `null` when
     *     the attribute is not present.
     * @example
     * knot.setAttribute('data-count', 42);
     * const count = knot.getAttribute('data-count'); // 42 (number)
     */
    getAttribute(attribute: string): any;
    /**
     * Removes an attribute from the element.
     *
     * @param attribute Attribute name to remove.
     * @example
     * knot.removeAttribute('disabled');
     */
    removeAttribute(attribute: string): void;
    /**
     * Checks whether the element has the specified attribute.
     *
     * @param attribute Attribute name to test.
     * @returns `true` if the attribute exists on the element.
     * @example
     * if (knot.hasAttribute('data-loaded')) { ... }
     */
    hasAttribute(attribute: string): boolean;
    /**
     * Attaches an event listener to the element. The native event is
     * automatically stopped from propagating. If the callback returns a
     * falsy value, the event's default action is also prevented.
     *
     * The listener is stored internally so it can later be removed via
     * {@link Knot.removeEventListeners}.
     *
     * @param eventName DOM event name (e.g. `'click'`, `'input'`).
     * @param opt_callback Handler that receives this Knot and the native
     *     Event. Return a truthy value to allow the default action, or
     *     falsy to call `preventDefault()`.
     * @returns The wrapped listener function that was registered on the
     *     DOM node. Keep this reference if you need to remove the
     *     listener individually with {@link Knot.removeEventListener}.
     * @example
     * knot.addEventListener('click', (knot, event) => {
     *     console.log('Clicked:', knot.getId());
     *     return true; // allow default action
     * });
     */
    addEventListener(eventName: string, opt_callback?: (knot: Knot<T>, event: any) => any): () => void;
    /**
     * Stores a listener reference on the DOM node for later retrieval
     * and cleanup.
     *
     * @param eventName DOM event name the listener is bound to.
     * @param listener The listener function to store.
     */
    private _addListenerToStore;
    /**
     * Retrieves all stored listeners for a given event name.
     *
     * @param eventName DOM event name to look up.
     * @returns Array of listener functions, or an empty array when none
     *     are stored.
     */
    private _getListenersFromStore;
    /**
     * Removes a single, previously registered event listener from the
     * element.
     *
     * @param eventName DOM event name the listener was bound to.
     * @param listener The exact listener function reference returned by
     *     {@link Knot.addEventListener}.
     * @example
     * const listener = knot.addEventListener('click', handler);
     * knot.removeEventListener('click', listener);
     */
    removeEventListener(eventName: keyof GlobalEventHandlersEventMap, listener: Listener): void;
    /**
     * Removes all listeners previously registered for the given event
     * name via {@link Knot.addEventListener}. Uses the internal listener
     * store to find every registered handler.
     *
     * @param eventName DOM event name whose listeners should be removed.
     * @example
     * knot.removeEventListeners('click');
     */
    removeEventListeners(eventName: keyof GlobalEventHandlersEventMap): void;
    /**
     * Dispatches a DOM event on the underlying element.
     *
     * @param event The Event object to dispatch.
     * @example
     * knot.dispatchEvent(new CustomEvent('my-event', { detail: 42 }));
     */
    dispatchEvent(event: Event): void;
    /**
     * Creates and dispatches a synthetic DOM event, triggering any
     * listeners bound to the given event name.
     *
     * @param eventName Name of the event to fire (e.g. `'change'`).
     * @example
     * knot.trigger('change');
     */
    trigger(eventName: string): void;
    /**
     * Creates a new child element and returns it as a Knot whose
     * {@link Knot.parentKnot} points to this instance.
     *
     * @param tagName HTML tag name for the new element (e.g. `'span'`).
     * @returns A new {@link Knot} wrapping the created element.
     * @example
     * const li = ul.createElement<HTMLLIElement>('li');
     * li.setText('Item 1');
     */
    createElement<K extends HTMLElement = HTMLElement>(tagName: string): Knot<K>;
    /**
     * Appends a child Knot's element to this element in the DOM.
     *
     * @param knot The child Knot to append.
     * @example
     * const container = new Knot('div');
     * const paragraph = new Knot('<p>Hello</p>');
     * container.appendChild(paragraph);
     */
    appendChild(knot: Knot): void;
    /**
     * Removes all child nodes from the element, leaving it empty.
     *
     * @example
     * knot.removeChildren(); // clears all inner content
     */
    removeChildren(): void;
    /**
     * Checks whether the element has any child nodes.
     *
     * @returns `true` if the element contains at least one child node.
     * @example
     * if (knot.hasChildren()) { ... }
     */
    hasChildren(): boolean;
    /**
     * Removes a specific child Knot from this element. Logs a warning
     * if the child is not found instead of throwing.
     *
     * @param knot The child Knot to remove.
     * @example
     * parent.removeChild(child);
     */
    removeChild(knot: Knot): void;
    /**
     * Removes this element from its parent in the DOM. Uses the logical
     * {@link Knot.parentKnot} if available, otherwise falls back to the
     * native `parentElement`.
     *
     * @example
     * knot.remove(); // detaches from the DOM tree
     */
    remove(): void;
    /**
     * Replaces all children of this element with a single new child.
     * Equivalent to calling {@link Knot.removeChildren} followed by
     * {@link Knot.appendChild}.
     *
     * @param knot The Knot to insert as the sole child.
     * @example
     * container.insert(newContent);
     */
    insert(knot: Knot): void;
    /**
     * Inserts a Knot before the first child of this element. If there
     * are no existing children, the element is still inserted using
     * `insertBefore` with a `null` reference node.
     *
     * @param knot The Knot to prepend.
     * @returns `true` if a reference child existed, `false` otherwise.
     * @example
     * list.beforeChild(newFirstItem);
     */
    beforeChild(knot: Knot): boolean;
    /**
     * Appends a Knot after the last child by appending it to the parent
     * element.
     *
     * @param knot The Knot to append after existing children.
     * @returns `true` if the parent element was found and the operation
     *     succeeded, `false` otherwise.
     * @example
     * list.afterChild(newLastItem);
     */
    afterChild(knot: Knot): boolean;
    /**
     * Inserts a Knot immediately before this element in the DOM, as a
     * sibling.
     *
     * @param knot The Knot to insert before this element.
     * @returns `true` if the parent element was found and the operation
     *     succeeded, `false` otherwise.
     * @example
     * existingKnot.insertBefore(newSibling);
     */
    insertBefore(knot: Knot): boolean;
    /**
     * Inserts a Knot immediately after this element in the DOM, as a
     * sibling.
     *
     * @param knot The Knot to insert after this element.
     * @returns `true` if the parent element was found and the operation
     *     succeeded, `false` otherwise.
     * @example
     * existingKnot.insertAfter(newSibling);
     */
    insertAfter(knot: Knot): boolean;
    /**
     * Replaces this element in the DOM with the provided Knot's element.
     *
     * @param knot The replacement Knot whose element will take this
     *     element's position.
     * @returns `true` if the parent element was found and the replacement
     *     succeeded, `false` otherwise.
     * @example
     * oldKnot.replaceChild(newKnot);
     */
    replaceChild(knot: Knot): boolean;
    /**
     * Returns the next sibling of this element, wrapped in a new Knot.
     * Falls back to `nextElementSibling` if `nextSibling` is not
     * available.
     *
     * @returns A new {@link Knot} wrapping the next sibling node.
     * @example
     * const next = knot.getNextSibling();
     */
    getNextSibling(): Knot;
    /**
     * Sets the inner HTML content of the element.
     *
     * @param text HTML string to set as `innerHTML`.
     * @example
     * knot.setHtml('<strong>Bold</strong> text');
     */
    setHtml(text: string): void;
    /**
     * Returns the HTML representation of the element. By default returns
     * the outer HTML (including the element's own tag). Pass `true` to
     * get only the inner HTML.
     *
     * @param opt_isInner When `true`, returns `innerHTML`; otherwise
     *     returns `outerHTML`. Defaults to `false`.
     * @returns The HTML string, or an empty string if the node is empty.
     * @example
     * const outer = knot.getHtml();       // '<div>...</div>'
     * const inner = knot.getHtml(true);   // '...'
     */
    getHtml(opt_isInner?: boolean | undefined): string;
    /**
     * Sets the text content of the node via `nodeValue`. Useful for
     * text nodes; for element content prefer {@link Knot.setHtml}.
     *
     * @param text Plain text string to assign.
     * @example
     * textNode.setText('Updated label');
     */
    setText(text: string): void;
    /**
     * Returns the combined text content of the element and all its
     * descendants.
     *
     * @returns The text content string.
     * @example
     * const label = knot.getText();
     */
    getText(): string;
    /**
     * Sets a `data-*` attribute on the element via the `dataset` API.
     * Non-string, non-Infinity values are JSON-serialized before being
     * stored, allowing complex data to be round-tripped through
     * {@link Knot.getData}.
     *
     * @param name Dataset key in camelCase (e.g. `'userId'` maps to
     *     the `data-user-id` attribute).
     * @param value Value to store. Objects and arrays are
     *     JSON-stringified automatically.
     * @example
     * knot.setData('userId', 42);
     * knot.setData('config', { theme: 'dark', lang: 'en' });
     */
    setData(name: string, value: any): void;
    /**
     * Reads a `data-*` attribute from the element. Values that were
     * JSON-serialized by {@link Knot.setData} are automatically parsed
     * back into objects or arrays. Primitive-looking strings are
     * type-cast (e.g. `'42'` becomes the number `42`).
     *
     * @param name Dataset key in camelCase.
     * @returns The deserialized value, or `undefined` if the attribute
     *     does not exist.
     * @example
     * const userId = knot.getData('userId');   // 42
     * const config = knot.getData('config');   // { theme: 'dark' }
     */
    getData(name: string): any;
    /**
     * Removes a `data-*` attribute from the element by deleting both
     * the `dataset` property and the corresponding HTML attribute.
     *
     * @param name Dataset key in camelCase.
     * @example
     * knot.removeData('userId');
     */
    removeData(name: string): void;
    /**
     * Returns the parent element wrapped in a new Knot. Prefers the
     * logical {@link Knot.parentKnot} if set; otherwise uses the
     * native DOM `parentElement`.
     *
     * @returns A new {@link Knot} wrapping the parent element, or
     *     `null` if no parent exists.
     * @example
     * const parent = knot.getParentKnot();
     * if (parent) { parent.addClass('has-child'); }
     */
    getParentKnot(): Knot | null;
    /**
     * Resolves the parent HTMLElement, preferring the logical
     * parentKnot over the native DOM parentElement.
     *
     * @returns The parent HTMLElement, or `null` if none is found.
     */
    private _getParentElement;
    /**
     * Returns the computed style of the element as resolved by the
     * browser's layout engine.
     *
     * @returns A read-only `CSSStyleDeclaration` with all computed
     *     CSS property values, or `null` if unavailable.
     * @example
     * const style = knot.getComputedStyle();
     * const color = style.getPropertyValue('color');
     */
    getComputedStyle(): CSSStyleDeclaration | null;
    /**
     * Returns the element's inline `style` object, allowing direct
     * reads and writes of individual CSS properties.
     *
     * @returns The mutable `CSSStyleDeclaration` for inline styles.
     * @example
     * const display = knot.getStyle().display;
     */
    getStyle(): CSSStyleDeclaration;
    /**
     * Sets one or more inline CSS properties on the element using
     * `style.setProperty`.
     *
     * @param properties Object whose keys are CSS property names
     *     (e.g. `'background-color'`) and values are the corresponding
     *     CSS values.
     * @example
     * knot.setStyle({ 'background-color': '#fff', 'opacity': '0.9' });
     */
    setStyle(properties: object): void;
    /**
     * Removes one or more inline CSS properties from the element.
     *
     * @param properties Array of CSS property names to remove
     *     (e.g. `['background-color', 'opacity']`).
     * @example
     * knot.removeStyle(['background-color', 'opacity']);
     */
    removeStyle(properties: Array<string>): void;
    /**
     * Checks whether the underlying DOM node reference is falsy
     * (e.g. `null` or `undefined`), indicating this Knot does not
     * wrap a valid element.
     *
     * @returns `true` if the node is falsy.
     * @example
     * if (knot.isEmpty()) { return; }
     */
    isEmpty(): boolean;
    /**
     * Checks whether the element is currently attached to the document
     * body. Useful for verifying an element has not been removed from
     * the DOM.
     *
     * @returns `true` if the element is a descendant of `document.body`.
     * @example
     * if (knot.exists()) {
     *     knot.addClass('visible');
     * }
     */
    exists(): boolean;
    /**
     * Returns an HTML string representation of the element.
     *
     * @param opt_isRoot When `true` (default), returns the full
     *     `outerHTML` including the element tag itself. When `false`,
     *     returns only the `innerHTML`.
     * @returns HTML string representation.
     * @example
     * const html = knot.toString();       // '<div class="card">...</div>'
     * const inner = knot.toString(false); // '...'
     */
    toString(opt_isRoot?: boolean | undefined): string;
}
