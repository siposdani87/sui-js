---
id: forms-fields
title: Forms & Fields
sidebar_label: Forms & Fields
sidebar_position: 6
description: Build forms with SUI-JS Form class and field components including text, select, date, file, and more.
keywords: [sui-js, form, fields, validation, input, text-field, select-field]
---

# Forms & Fields

SUI-JS provides a `Form` class and 20+ field components for building rich forms with Material Design styling.

## Basic Form

```typescript
const form = new Form(formKnot);
form.load(modelData);

// Get form data
const model = form.getModel();
```

## Available Fields

| Field | Description |
|-------|-------------|
| `TextField` | Single-line text input |
| `TextareaField` | Multi-line text input |
| `NumberField` | Numeric input with validation |
| `SelectField` | Dropdown select |
| `CheckboxField` | Checkbox toggle |
| `SwitchField` | Material toggle switch |
| `RadiobuttonField` | Radio button group |
| `DateTimeField` | Date and time picker |
| `ColorField` | Color picker |
| `FileField` | File upload |
| `LocationField` | Google Maps location picker |
| `SearchField` | Search input with debounce |
| `RangeField` | Slider input |
| `UrlField` | URL input with validation |

## Next Steps

- [HTTP Requests](./http-requests) — Submit form data to your API
- [DOM Manipulation](./dom-manipulation) — Work with form elements
