---
id: dom-manipulation
title: DOM Manipulation
sidebar_label: DOM Manipulation
sidebar_position: 8
description: Manipulate the DOM with SUI-JS Knot and Query classes, a lightweight alternative to jQuery.
keywords: [sui-js, dom, knot, query, selector, elements]
---

# DOM Manipulation

SUI-JS wraps DOM elements with the `Knot` class and provides `Query` for CSS selector lookups.

## Knot — Element Wrapper

```typescript
import { Knot } from '@siposdani87/sui-js';

// Create from selector
const div = new Knot('.my-div');

// Create a new element
const button = new Knot('button');
button.setHtml('Click me');
button.addClass('btn');

// Append to parent
div.appendChild(button);
```

## Query — Selector Lookups

```typescript
import { Query } from '@siposdani87/sui-js';

// Select a single element
const header = new Query('.header').getKnot();

// Select multiple elements
const items = new Query('.item', parentKnot).getKnots();
```

## Common Knot Methods

| Method | Description |
|--------|-------------|
| `knot.getId()` | Get the element ID |
| `knot.addClass(name)` | Add a CSS class |
| `knot.removeClass(name)` | Remove a CSS class |
| `knot.hasClass(name)` | Check for a CSS class |
| `knot.setStyle(styles)` | Set inline styles |
| `knot.setAttribute(name, value)` | Set an attribute |
| `knot.addEventListener(event, handler)` | Bind an event |
| `knot.appendChild(childKnot)` | Append a child |
| `knot.removeChild(childKnot)` | Remove a child |
| `knot.setHtml(html)` | Set innerHTML |
| `knot.getHtml()` | Get innerHTML |

## Next Steps

- [Architecture](./architecture) — How Knot fits in the framework
- [Forms & Fields](./forms-fields) — Form elements use Knot internally
