# Class: Knot\<T\>

Defined in: [core/knot.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L46)

DOM element wrapper that provides a convenient, chainable API for
manipulating HTML elements.  Every element managed by the SUI framework
is wrapped in a `Knot` instance, which offers attribute, class, event,
style, data, and DOM-tree operations while tracking a logical parent
that may differ from the native DOM parentNode.

The generic parameter `T` constrains the underlying element type, giving
callers type-safe access to element-specific properties via
[Knot.getNode](#getnode).

## Example

```ts
// Create a new <div> element
const div = new Knot<HTMLDivElement>('div');
div.setId('container');
div.addClass('card');

// Wrap an existing DOM element
const body = new Knot(document.body);
body.appendChild(div);

// Parse an HTML string into a Knot
const link = new Knot<HTMLAnchorElement>('<a href="/home">Home</a>');
```

## See

 - [Query](Query.md) for selecting multiple Knot elements from the DOM
 - [Objekt](Objekt.md) for the framework's plain-object wrapper

## Type Parameters

### T

`T` *extends* `HTMLElement` = `HTMLElement`

## Constructors

### Constructor

> **new Knot**\<`T`\>(`node`, `opt_parentKnot?`): `Knot`\<`T`\>

Defined in: [core/knot.ts:72](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L72)

Creates a new Knot by wrapping an existing element, creating one from
a tag name, or parsing an HTML string.

#### Parameters

##### node

Tag name (e.g. `'div'`), HTML string
    (e.g. `'<span>text</span>'`), an existing HTMLElement, or `null`.

`string` | `HTMLElement` | `T` | `null`

##### opt\_parentKnot?

`Knot`\<`HTMLElement`\>

Optional logical parent Knot to track in
    the framework's element tree.

#### Returns

`Knot`\<`T`\>

#### Example

```ts
// From a tag name
const span = new Knot('span');

// From an HTML fragment
const fragment = new Knot('<p class="intro">Hello</p>');

// From an existing element, with a parent
const child = new Knot(document.getElementById('child'), parentKnot);
```

## Properties

### listenerStoreKey

> **listenerStoreKey**: `string`

Defined in: [core/knot.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L52)

Property name used to store event listeners on the DOM node.

***

### node

> **node**: `T`

Defined in: [core/knot.ts:48](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L48)

The underlying DOM element managed by this wrapper.

***

### parentKnot

> **parentKnot**: `Knot`\<`HTMLElement`\> \| `undefined`

Defined in: [core/knot.ts:50](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L50)

Logical parent in the framework's element tree.

## Methods

### addClass()

> **addClass**(`cssClasses`): `void`

Defined in: [core/knot.ts:271](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L271)

Adds one or more CSS classes to the element. Classes that are
already present are not duplicated.

#### Parameters

##### cssClasses

A single class name or an array of class names
    to add.

`string` | `string`[]

#### Returns

`void`

#### Example

```ts
knot.addClass('visible');
knot.addClass(['card', 'elevation-2']);
```

***

### addEventListener()

> **addEventListener**(`eventName`, `opt_callback?`): `Function`

Defined in: [core/knot.ts:444](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L444)

Attaches an event listener to the element. The native event is
automatically stopped from propagating. If the callback returns a
falsy value, the event's default action is also prevented.

The listener is stored internally so it can later be removed via
[Knot.removeEventListeners](#removeeventlisteners).

#### Parameters

##### eventName

`string`

DOM event name (e.g. `'click'`, `'input'`).

##### opt\_callback?

(`knot`, `event`) => `any`

Handler that receives this Knot and the native
    Event. Return a truthy value to allow the default action, or
    falsy to call `preventDefault()`.

#### Returns

`Function`

The wrapped listener function that was registered on the
    DOM node. Keep this reference if you need to remove the
    listener individually with [Knot.removeEventListener](#removeeventlistener).

#### Example

```ts
knot.addEventListener('click', (knot, event) => {
    console.log('Clicked:', knot.getId());
    return true; // allow default action
});
```

***

### afterChild()

> **afterChild**(`knot`): `boolean`

Defined in: [core/knot.ts:689](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L689)

Appends a Knot after the last child by appending it to the parent
element.

#### Parameters

##### knot

`Knot`

The Knot to append after existing children.

#### Returns

`boolean`

`true` if the parent element was found and the operation
    succeeded, `false` otherwise.

#### Example

```ts
list.afterChild(newLastItem);
```

***

### appendChild()

> **appendChild**(`knot`): `void`

Defined in: [core/knot.ts:583](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L583)

Appends a child Knot's element to this element in the DOM.

#### Parameters

##### knot

`Knot`

The child Knot to append.

#### Returns

`void`

#### Example

```ts
const container = new Knot('div');
const paragraph = new Knot('<p>Hello</p>');
container.appendChild(paragraph);
```

***

### beforeChild()

> **beforeChild**(`knot`): `boolean`

Defined in: [core/knot.ts:667](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L667)

Inserts a Knot before the first child of this element. If there
are no existing children, the element is still inserted using
`insertBefore` with a `null` reference node.

#### Parameters

##### knot

`Knot`

The Knot to prepend.

#### Returns

`boolean`

`true` if a reference child existed, `false` otherwise.

#### Example

```ts
list.beforeChild(newFirstItem);
```

***

### createElement()

> **createElement**\<`K`\>(`tagName`): `Knot`\<`K`\>

Defined in: [core/knot.ts:567](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L567)

Creates a new child element and returns it as a Knot whose
[Knot.parentKnot](#parentknot) points to this instance.

#### Type Parameters

##### K

`K` *extends* `HTMLElement` = `HTMLElement`

#### Parameters

##### tagName

`string`

HTML tag name for the new element (e.g. `'span'`).

#### Returns

`Knot`\<`K`\>

A new Knot wrapping the created element.

#### Example

```ts
const li = ul.createElement<HTMLLIElement>('li');
li.setText('Item 1');
```

***

### dispatchEvent()

> **dispatchEvent**(`event`): `void`

Defined in: [core/knot.ts:539](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L539)

Dispatches a DOM event on the underlying element.

#### Parameters

##### event

`Event`

The Event object to dispatch.

#### Returns

`void`

#### Example

```ts
knot.dispatchEvent(new CustomEvent('my-event', { detail: 42 }));
```

***

### exists()

> **exists**(): `boolean`

Defined in: [core/knot.ts:1005](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L1005)

Checks whether the element is currently attached to the document
body. Useful for verifying an element has not been removed from
the DOM.

#### Returns

`boolean`

`true` if the element is a descendant of `document.body`.

#### Example

```ts
if (knot.exists()) {
    knot.addClass('visible');
}
```

***

### get()

> **get**(`attribute`): `any`

Defined in: [core/knot.ts:145](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L145)

Retrieves the value of an attribute. Delegates to [Knot.getId](#getid)
when the attribute is `'id'`, otherwise calls
[Knot.getAttribute](#getattribute).

#### Parameters

##### attribute

`string`

Attribute name to read.

#### Returns

`any`

The attribute value, type-cast from its string
    representation, or `null` if the attribute does not exist.

#### Example

```ts
const href = knot.get('href');
```

***

### getAttribute()

> **getAttribute**(`attribute`): `any`

Defined in: [core/knot.ts:388](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L388)

Reads an attribute from the element. For `data-*` attributes whose
stored value begins with `"`, `[`, or `{`, the value is
JSON-parsed before being returned. All other values are run through
`typeCast` to convert numeric strings to numbers, etc.

#### Parameters

##### attribute

`string`

Attribute name to read.

#### Returns

`any`

The parsed or type-cast attribute value, or `null` when
    the attribute is not present.

#### Example

```ts
knot.setAttribute('data-count', 42);
const count = knot.getAttribute('data-count'); // 42 (number)
```

***

### getClasses()

> **getClasses**(): `string`[]

Defined in: [core/knot.ts:316](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L316)

Returns all CSS classes currently applied to the element.

#### Returns

`string`[]

Array of class name strings.

#### Example

```ts
const classes = knot.getClasses(); // ['card', 'elevation-2']
```

***

### getComputedStyle()

> **getComputedStyle**(): `CSSStyleDeclaration` \| `null`

Defined in: [core/knot.ts:935](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L935)

Returns the computed style of the element as resolved by the
browser's layout engine.

#### Returns

`CSSStyleDeclaration` \| `null`

A read-only `CSSStyleDeclaration` with all computed
    CSS property values, or `null` if unavailable.

#### Example

```ts
const style = knot.getComputedStyle();
const color = style.getPropertyValue('color');
```

***

### getData()

> **getData**(`name`): `any`

Defined in: [core/knot.ts:865](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L865)

Reads a `data-*` attribute from the element. Values that were
JSON-serialized by [Knot.setData](#setdata) are automatically parsed
back into objects or arrays. Primitive-looking strings are
type-cast (e.g. `'42'` becomes the number `42`).

#### Parameters

##### name

`string`

Dataset key in camelCase.

#### Returns

`any`

The deserialized value, or `undefined` if the attribute
    does not exist.

#### Example

```ts
const userId = knot.getData('userId');   // 42
const config = knot.getData('config');   // { theme: 'dark' }
```

***

### getFor()

> **getFor**(): `string` \| `null`

Defined in: [core/knot.ts:222](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L222)

Returns the `for` attribute value from a `<label>` element.
Reads the DOM property first, falling back to the HTML attribute.

#### Returns

`string` \| `null`

The associated form control id, or `null`.

#### Example

```ts
const targetId = label.getFor(); // 'email-input'
```

***

### getHtml()

> **getHtml**(`opt_isInner?`): `string`

Defined in: [core/knot.ts:797](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L797)

Returns the HTML representation of the element. By default returns
the outer HTML (including the element's own tag). Pass `true` to
get only the inner HTML.

#### Parameters

##### opt\_isInner?

When `true`, returns `innerHTML`; otherwise
    returns `outerHTML`. Defaults to `false`.

`boolean` | `undefined`

#### Returns

`string`

The HTML string, or an empty string if the node is empty.

#### Example

```ts
const outer = knot.getHtml();       // '<div>...</div>'
const inner = knot.getHtml(true);   // '...'
```

***

### getId()

> **getId**(): `string` \| `null`

Defined in: [core/knot.ts:184](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L184)

Returns the element's `id`, or `null` if no id is set.

#### Returns

`string` \| `null`

The element id string, or `null`.

#### Example

```ts
const id = knot.getId(); // 'main-nav' or null
```

***

### getNextSibling()

> **getNextSibling**(): `Knot`

Defined in: [core/knot.ts:768](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L768)

Returns the next sibling of this element, wrapped in a new Knot.
Falls back to `nextElementSibling` if `nextSibling` is not
available.

#### Returns

`Knot`

A new Knot wrapping the next sibling node.

#### Example

```ts
const next = knot.getNextSibling();
```

***

### getNode()

> **getNode**(): `T`

Defined in: [core/knot.ts:161](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L161)

Returns the raw DOM element wrapped by this Knot, allowing direct
access to native DOM APIs when needed.

#### Returns

`T`

The underlying DOM element of type `T`.

#### Example

```ts
const input = knot.getNode() as HTMLInputElement;
input.focus();
```

***

### getParentKnot()

> **getParentKnot**(): `Knot`\<`HTMLElement`\> \| `null`

Defined in: [core/knot.ts:902](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L902)

Returns the parent element wrapped in a new Knot. Prefers the
logical [Knot.parentKnot](#parentknot) if set; otherwise uses the
native DOM `parentElement`.

#### Returns

`Knot`\<`HTMLElement`\> \| `null`

A new Knot wrapping the parent element, or
    `null` if no parent exists.

#### Example

```ts
const parent = knot.getParentKnot();
if (parent) { parent.addClass('has-child'); }
```

***

### getStyle()

> **getStyle**(): `CSSStyleDeclaration`

Defined in: [core/knot.ts:947](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L947)

Returns the element's inline `style` object, allowing direct
reads and writes of individual CSS properties.

#### Returns

`CSSStyleDeclaration`

The mutable `CSSStyleDeclaration` for inline styles.

#### Example

```ts
const display = knot.getStyle().display;
```

***

### getTagName()

> **getTagName**(): `string`

Defined in: [core/knot.ts:173](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L173)

Returns the lower-cased tag name of the underlying element
(e.g. `'div'`, `'input'`).

#### Returns

`string`

Lower-cased HTML tag name.

#### Example

```ts
const tag = knot.getTagName(); // 'div'
```

***

### getText()

> **getText**(): `string`

Defined in: [core/knot.ts:824](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L824)

Returns the combined text content of the element and all its
descendants.

#### Returns

`string`

The text content string.

#### Example

```ts
const label = knot.getText();
```

***

### hasAttribute()

> **hasAttribute**(`attribute`): `boolean`

Defined in: [core/knot.ts:419](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L419)

Checks whether the element has the specified attribute.

#### Parameters

##### attribute

`string`

Attribute name to test.

#### Returns

`boolean`

`true` if the attribute exists on the element.

#### Example

```ts
if (knot.hasAttribute('data-loaded')) { ... }
```

***

### hasChildren()

> **hasChildren**(): `boolean`

Defined in: [core/knot.ts:606](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L606)

Checks whether the element has any child nodes.

#### Returns

`boolean`

`true` if the element contains at least one child node.

#### Example

```ts
if (knot.hasChildren()) { ... }
```

***

### hasClass()

> **hasClass**(`cssClass`): `boolean`

Defined in: [core/knot.ts:237](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L237)

Checks whether the element has the given CSS class.

#### Parameters

##### cssClass

`string`

Class name to test.

#### Returns

`boolean`

`true` if the class is present on the element.

#### Example

```ts
if (knot.hasClass('active')) { ... }
```

***

### insert()

> **insert**(`knot`): `void`

Defined in: [core/knot.ts:652](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L652)

Replaces all children of this element with a single new child.
Equivalent to calling [Knot.removeChildren](#removechildren) followed by
[Knot.appendChild](#appendchild).

#### Parameters

##### knot

`Knot`

The Knot to insert as the sole child.

#### Returns

`void`

#### Example

```ts
container.insert(newContent);
```

***

### insertAfter()

> **insertAfter**(`knot`): `boolean`

Defined in: [core/knot.ts:727](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L727)

Inserts a Knot immediately after this element in the DOM, as a
sibling.

#### Parameters

##### knot

`Knot`

The Knot to insert after this element.

#### Returns

`boolean`

`true` if the parent element was found and the operation
    succeeded, `false` otherwise.

#### Example

```ts
existingKnot.insertAfter(newSibling);
```

***

### insertBefore()

> **insertBefore**(`knot`): `boolean`

Defined in: [core/knot.ts:708](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L708)

Inserts a Knot immediately before this element in the DOM, as a
sibling.

#### Parameters

##### knot

`Knot`

The Knot to insert before this element.

#### Returns

`boolean`

`true` if the parent element was found and the operation
    succeeded, `false` otherwise.

#### Example

```ts
existingKnot.insertBefore(newSibling);
```

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [core/knot.ts:990](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L990)

Checks whether the underlying DOM node reference is falsy
(e.g. `null` or `undefined`), indicating this Knot does not
wrap a valid element.

#### Returns

`boolean`

`true` if the node is falsy.

#### Example

```ts
if (knot.isEmpty()) { return; }
```

***

### merge()

> **merge**(`properties`): `void`

Defined in: [core/knot.ts:128](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L128)

Sets multiple attributes at once by iterating over the supplied
key-value pairs and delegating each to [Knot.set](#set).

#### Parameters

##### properties

`object`

Object whose keys are attribute names and values
    are the corresponding attribute values.

#### Returns

`void`

#### Example

```ts
knot.merge({ id: 'logo', class: 'brand', title: 'Home' });
```

***

### remove()

> **remove**(): `void`

Defined in: [core/knot.ts:636](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L636)

Removes this element from its parent in the DOM. Uses the logical
[Knot.parentKnot](#parentknot) if available, otherwise falls back to the
native `parentElement`.

#### Returns

`void`

#### Example

```ts
knot.remove(); // detaches from the DOM tree
```

***

### removeAttribute()

> **removeAttribute**(`attribute`): `void`

Defined in: [core/knot.ts:407](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L407)

Removes an attribute from the element.

#### Parameters

##### attribute

`string`

Attribute name to remove.

#### Returns

`void`

#### Example

```ts
knot.removeAttribute('disabled');
```

***

### removeChild()

> **removeChild**(`knot`): `void`

Defined in: [core/knot.ts:618](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L618)

Removes a specific child Knot from this element. Logs a warning
if the child is not found instead of throwing.

#### Parameters

##### knot

`Knot`

The child Knot to remove.

#### Returns

`void`

#### Example

```ts
parent.removeChild(child);
```

***

### removeChildren()

> **removeChildren**(): `void`

Defined in: [core/knot.ts:593](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L593)

Removes all child nodes from the element, leaving it empty.

#### Returns

`void`

#### Example

```ts
knot.removeChildren(); // clears all inner content
```

***

### removeClass()

> **removeClass**(`cssClasses`): `void`

Defined in: [core/knot.ts:288](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L288)

Removes one or more CSS classes from the element.

#### Parameters

##### cssClasses

A single class name or an array of class names
    to remove.

`string` | `string`[]

#### Returns

`void`

#### Example

```ts
knot.removeClass('hidden');
knot.removeClass(['fade-in', 'animate']);
```

***

### removeData()

> **removeData**(`name`): `void`

Defined in: [core/knot.ts:884](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L884)

Removes a `data-*` attribute from the element by deleting both
the `dataset` property and the corresponding HTML attribute.

#### Parameters

##### name

`string`

Dataset key in camelCase.

#### Returns

`void`

#### Example

```ts
knot.removeData('userId');
```

***

### removeEventListener()

> **removeEventListener**(`eventName`, `listener`): `void`

Defined in: [core/knot.ts:509](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L509)

Removes a single, previously registered event listener from the
element.

#### Parameters

##### eventName

keyof `GlobalEventHandlersEventMap`

DOM event name the listener was bound to.

##### listener

[`Listener`](../type-aliases/Listener.md)

The exact listener function reference returned by
    [Knot.addEventListener](#addeventlistener).

#### Returns

`void`

#### Example

```ts
const listener = knot.addEventListener('click', handler);
knot.removeEventListener('click', listener);
```

***

### removeEventListeners()

> **removeEventListeners**(`eventName`): `void`

Defined in: [core/knot.ts:525](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L525)

Removes all listeners previously registered for the given event
name via [Knot.addEventListener](#addeventlistener). Uses the internal listener
store to find every registered handler.

#### Parameters

##### eventName

keyof `GlobalEventHandlersEventMap`

DOM event name whose listeners should be removed.

#### Returns

`void`

#### Example

```ts
knot.removeEventListeners('click');
```

***

### removeStyle()

> **removeStyle**(`properties`): `void`

Defined in: [core/knot.ts:975](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L975)

Removes one or more inline CSS properties from the element.

#### Parameters

##### properties

`any`[]

Array of CSS property names to remove
    (e.g. `['background-color', 'opacity']`).

#### Returns

`void`

#### Example

```ts
knot.removeStyle(['background-color', 'opacity']);
```

***

### replaceChild()

> **replaceChild**(`knot`): `boolean`

Defined in: [core/knot.ts:750](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L750)

Replaces this element in the DOM with the provided Knot's element.

#### Parameters

##### knot

`Knot`

The replacement Knot whose element will take this
    element's position.

#### Returns

`boolean`

`true` if the parent element was found and the replacement
    succeeded, `false` otherwise.

#### Example

```ts
oldKnot.replaceChild(newKnot);
```

***

### set()

> **set**(`attribute`, `value`): `void`

Defined in: [core/knot.ts:111](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L111)

Sets an attribute on the underlying element. If the attribute is
`'id'`, delegates to [Knot.setId](#setid) for consistent handling.

#### Parameters

##### attribute

`string`

Attribute name to set (e.g. `'href'`, `'id'`).

##### value

Attribute value; will be converted to a string
    by the underlying DOM API.

`string` | `number` | `boolean`

#### Returns

`void`

#### Example

```ts
knot.set('title', 'Click me');
knot.set('id', 'main-nav');
```

***

### setAttribute()

> **setAttribute**(`attribute`, `opt_value?`): `void`

Defined in: [core/knot.ts:343](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L343)

Sets a single attribute on the underlying element. Handles three
special cases:

1. **Function values** are assigned as DOM properties (e.g. event
   handlers).
2. **`data-*` attributes** with non-string, non-Infinity values
   are JSON-serialized before being stored.
3. All other values are set via the standard `setAttribute` API.

When called without a value and the attribute name does not start
with `data-`, the attribute name is used as both name and value
(boolean-attribute shorthand).

#### Parameters

##### attribute

`string`

Attribute name (e.g. `'href'`, `'data-config'`).

##### opt\_value?

Value to assign. Accepts primitives, objects
    (JSON-serialized for data attributes), functions, arrays, or
    `null`/`undefined`.

`string` | `number` | `boolean` | `object` | `Function` | `any`[] | `null`

#### Returns

`void`

#### Example

```ts
knot.setAttribute('href', '/about');
knot.setAttribute('data-options', { page: 1, limit: 20 });
knot.setAttribute('disabled');
```

***

### setData()

> **setData**(`name`, `value`): `void`

Defined in: [core/knot.ts:842](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L842)

Sets a `data-*` attribute on the element via the `dataset` API.
Non-string, non-Infinity values are JSON-serialized before being
stored, allowing complex data to be round-tripped through
[Knot.getData](#getdata).

#### Parameters

##### name

`string`

Dataset key in camelCase (e.g. `'userId'` maps to
    the `data-user-id` attribute).

##### value

`any`

Value to store. Objects and arrays are
    JSON-stringified automatically.

#### Returns

`void`

#### Example

```ts
knot.setData('userId', 42);
knot.setData('config', { theme: 'dark', lang: 'en' });
```

***

### setFor()

> **setFor**(`htmlFor`): `void`

Defined in: [core/knot.ts:209](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L209)

Sets the `for` attribute on a `<label>` element, linking it to a
form control by id. Updates both the DOM property and the HTML
attribute for maximum compatibility.

#### Parameters

##### htmlFor

The id of the form control this label refers to.

`string` | `number` | `boolean`

#### Returns

`void`

#### Example

```ts
const label = new Knot<HTMLLabelElement>('label');
label.setFor('email-input');
```

***

### setHtml()

> **setHtml**(`text`): `void`

Defined in: [core/knot.ts:781](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L781)

Sets the inner HTML content of the element.

#### Parameters

##### text

`string`

HTML string to set as `innerHTML`.

#### Returns

`void`

#### Example

```ts
knot.setHtml('<strong>Bold</strong> text');
```

***

### setId()

> **setId**(`id`): `void`

Defined in: [core/knot.ts:195](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L195)

Sets the element's `id` attribute.

#### Parameters

##### id

Value to assign as the element id; converted to a string.

`string` | `number` | `boolean`

#### Returns

`void`

#### Example

```ts
knot.setId('sidebar');
```

***

### setParentKnot()

> **setParentKnot**(`parentKnot`): `void`

Defined in: [core/knot.ts:96](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L96)

Replaces the logical parent tracked by this Knot.

#### Parameters

##### parentKnot

The new parent Knot, or `undefined` to clear
    the parent reference.

`Knot`\<`HTMLElement`\> | `undefined`

#### Returns

`void`

***

### setStyle()

> **setStyle**(`properties`): `void`

Defined in: [core/knot.ts:961](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L961)

Sets one or more inline CSS properties on the element using
`style.setProperty`.

#### Parameters

##### properties

`object`

Object whose keys are CSS property names
    (e.g. `'background-color'`) and values are the corresponding
    CSS values.

#### Returns

`void`

#### Example

```ts
knot.setStyle({ 'background-color': '#fff', 'opacity': '0.9' });
```

***

### setText()

> **setText**(`text`): `void`

Defined in: [core/knot.ts:812](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L812)

Sets the text content of the node via `nodeValue`. Useful for
text nodes; for element content prefer [Knot.setHtml](#sethtml).

#### Parameters

##### text

`string`

Plain text string to assign.

#### Returns

`void`

#### Example

```ts
textNode.setText('Updated label');
```

***

### toggleClass()

> **toggleClass**(`cssClasses`): `void`

Defined in: [core/knot.ts:303](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L303)

Toggles one or more CSS classes on the element. Each class is
added if absent, or removed if present.

#### Parameters

##### cssClasses

A single class name or an array of class names
    to toggle.

`string` | `string`[]

#### Returns

`void`

#### Example

```ts
knot.toggleClass('expanded');
```

***

### toString()

> **toString**(`opt_isRoot?`): `string`

Defined in: [core/knot.ts:1020](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L1020)

Returns an HTML string representation of the element.

#### Parameters

##### opt\_isRoot?

When `true` (default), returns the full
    `outerHTML` including the element tag itself. When `false`,
    returns only the `innerHTML`.

`boolean` | `undefined`

#### Returns

`string`

HTML string representation.

#### Example

```ts
const html = knot.toString();       // '<div class="card">...</div>'
const inner = knot.toString(false); // '...'
```

***

### trigger()

> **trigger**(`eventName`): `void`

Defined in: [core/knot.ts:551](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/knot.ts#L551)

Creates and dispatches a synthetic DOM event, triggering any
listeners bound to the given event name.

#### Parameters

##### eventName

`string`

Name of the event to fire (e.g. `'change'`).

#### Returns

`void`

#### Example

```ts
knot.trigger('change');
```
