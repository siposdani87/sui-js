---
id: class-hierarchy
title: Class Hierarchy
sidebar_label: Class Hierarchy
sidebar_position: 1
description: Visual inheritance tree of all SUI-JS classes organized by layer.
keywords: [sui-js, class-hierarchy, inheritance, classes]
---

# Class Hierarchy

SUI-JS classes organized by their architectural layer.

## Core

- **Objekt** — Object wrapper with nested get/set and deep merge
- **Knot\<T\>** — DOM element wrapper
- **Query** — CSS selector wrapper returning Knot instances
- **Collection\<T\>** — Typed, observable collection
- **State** — State management with routing integration
- **Module** — Base class for the revealing module pattern
- **Deferred** — Deferred value resolution
- **Promize** — Custom promise implementation
- **Async** — Serial/parallel async execution

## Components

- **Application** — Main entry point, DI container
- **Form** — Form handling with field management
- **Table** — Data table with sorting and paging
- **Calendar** — Date picker calendar
- **Navigation** — Tab/page navigation
- **GoogleMap** — Google Maps integration
- **Canvas** — HTML5 Canvas wrapper
- **CardCollection** — Card-based layout
- **Pager** — Pagination component
- **Popup** / **PopupContainer** — Popup management
- **Dropdown** / **Tooltip** — Overlay components
- **TabPanel** — Tabbed content panels
- **Carousel** — Image/content carousel

## Modules

- **Http** — HTTP client (wraps Xhr)
- **Xhr** — Low-level XMLHttpRequest wrapper
- **Router** — Client-side URL routing
- **EventBus** — Publish/subscribe messaging
- **Dialog** / **Confirm** — Modal dialogs
- **Flash** — Toast/notification messages
- **Depot** — localStorage/sessionStorage wrapper
- **Cookie** — Cookie management
- **Loader** — Loading indicator
- **Template** — HTML template loader
- **Browser** — Browser detection
- **Screen** — Viewport utilities
- **Scheduler** — Timed task scheduling
- **ProgressBar** — Progress indicator

## Fields (extend BaseField)

- **TextField** — Single-line text input
- **TextareaField** — Multi-line text input
- **NumberField** — Numeric input
- **SelectField** — Dropdown select
- **CheckboxField** / **SwitchField** / **IconToggleField** — Toggle inputs
- **RadiobuttonField** — Radio button group
- **DateTimeField** / **DateTimeRangeField** — Date/time pickers
- **ColorField** — Color picker
- **FileField** — File upload
- **LocationField** — Google Maps location picker
- **SearchField** — Search with debounce
- **RangeField** — Slider input
- **UrlField** — URL input
- **HiddenField** — Hidden input
- **Button** / **SubmitButton** / **ResetButton** — Action buttons
- **AutoCompleteField** — Autocomplete input
