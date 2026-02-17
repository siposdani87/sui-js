/**
 * @module types
 *
 * Shared type definitions used across the SUI-JS framework.
 *
 * Contains type aliases, interfaces, and utility types for event listeners,
 * URL parameters, entity identifiers, dependency injection, and more.
 *
 * @category Utility
 */

import { Application } from '../component';
import { Knot, State } from '../core';
import { Objekt } from '../core/objekt';
import {
    BottomMenu,
    Browser,
    Confirm,
    Cookie,
    Dialog,
    EventBus,
    Flash,
    Footer,
    GeoLocation,
    Header,
    Helper,
    Http,
    LeftMenu,
    Loader,
    NavBar,
    ProgressBar,
    Scheduler,
    Script,
    Style,
    Template,
    TopMenu,
    Viewer,
    Screen,
    Page,
    Depot,
} from '../module';

/**
 * Event listener function type.
 *
 * Represents a callback attached to a DOM element via `addEventListener`.
 * The `this` context is bound to the target {@link Element}.
 *
 * @category Utility
 */
export type Listener = (this: Element, ev: Event) => any;

/**
 * Key-value string map for URL query parameters and route params.
 *
 * @category Utility
 */
export type Params = {
    [key: string]: string;
};

/**
 * Union type for entity identifiers.
 *
 * Accepts both string and numeric identifiers, enabling flexible ID
 * handling throughout the framework.
 *
 * @category Utility
 */
export type Id = string | number;

/**
 * Action descriptor for table rows and card collection items.
 *
 * Defines the visual appearance and click behavior of an action button.
 * The `style` callback returns a tuple of CSS class, optional icon name,
 * and optional visibility/disabled flags. The `click` callback is invoked
 * when the action is triggered.
 *
 * @category Utility
 */
export type Action = {
    /** Returns `[cssClass, iconName?, isVisible?, isDisabled?]` for the given item. */
    style: (item: Objekt) => [string, string?, boolean?, boolean?];
    /** Handler invoked when the action is clicked for the given item. */
    click: (item: Objekt) => void;
};

/**
 * Google Maps marker icon configuration.
 *
 * Specifies the image URL, dimensions, sprite origin, anchor point,
 * and clickable region coordinates for a custom map marker icon.
 *
 * @category Utility
 */
export type IconOptions = {
    /** URL of the icon image. */
    url: string;
    /** Width and height of the icon in pixels as `[width, height]`. */
    size: [number, number];
    /** Sprite sheet origin as `[x, y]` in pixels. */
    origin: [number, number];
    /** Anchor point relative to the icon as `[x, y]` in pixels. */
    anchor: [number, number];
    /** Array of pixel coordinates defining the clickable polygon region. */
    coords: number[];
};

/**
 * String-to-string mapping for dependency injection names.
 *
 * Maps injection token keys to their corresponding service identifiers
 * within the framework's DI container.
 *
 * @category Utility
 */
export type Injection = {
    [key: string]: string;
};

/**
 * Typed key of the {@link Instance} interface.
 *
 * Used to safely access services from the DI container by name.
 *
 * @category Utility
 */
export type InstanceKey = keyof Instance;

/**
 * The framework's dependency injection container interface.
 *
 * Lists every injectable service managed by {@link Application}. Modules
 * and components receive resolved instances of these services through
 * constructor injection.
 *
 * @category Utility
 */
export type Instance = {
    /** The main {@link Application} instance. */
    app: Application;
    /** Global configuration {@link Objekt}. */
    config: Objekt;
    /** Publish/subscribe {@link EventBus} for cross-module communication. */
    eventBus: EventBus;
    /** {@link Scheduler} for deferred and periodic tasks. */
    scheduler: Scheduler;
    /** {@link Http} client for XHR requests. */
    http: Http;
    /** {@link Flash} message service for transient notifications. */
    flash: Flash;
    /** {@link Template} rendering engine. */
    template: Template;
    /** {@link Dialog} service for modal windows. */
    dialog: Dialog;
    /** {@link Confirm} service for confirmation dialogs. */
    confirm: Confirm;
    /** {@link Viewer} service for image/content previews. */
    viewer: Viewer;
    /** {@link Header} component managing the page header. */
    header: Header;
    /** {@link TopMenu} navigation component. */
    topMenu: TopMenu;
    /** {@link LeftMenu} drawer navigation component. */
    leftMenu: LeftMenu;
    /** {@link Footer} component managing the page footer. */
    footer: Footer;
    /** {@link BottomMenu} navigation component. */
    bottomMenu: BottomMenu;
    /** {@link NavBar} breadcrumb/tab navigation component. */
    navBar: NavBar;
    /** {@link Script} loader for dynamic script injection. */
    script: Script;
    /** {@link Style} loader for dynamic stylesheet injection. */
    style: Style;
    /** {@link State} manager handling routing and state transitions. */
    state: State;
    /** Root DOM {@link Knot} element. */
    dom: Knot;
    /** {@link Page} module managing page-level DOM containers. */
    page: Page;
    /** {@link Screen} module for viewport and orientation detection. */
    screen: Screen;
    /** {@link Helper} module providing miscellaneous DOM utilities. */
    helper: Helper;
    /** {@link Cookie} module for browser cookie management. */
    cookie: Cookie;
    /** {@link Depot} backed by `localStorage` for persistent storage. */
    localDepot: Depot;
    /** {@link Depot} backed by `sessionStorage` for session-scoped storage. */
    sessionDepot: Depot;
    /** {@link Browser} module for user-agent and capability detection. */
    browser: Browser;
    /** {@link Loader} module for showing/hiding loading indicators. */
    loader: Loader;
    /** {@link ProgressBar} module for linear progress indication. */
    progressBar: ProgressBar;
    /** {@link GeoLocation} module for browser geolocation access. */
    geoLocation: GeoLocation;
    /** Self-reference to the full {@link Instance} container. */
    instances: Instance;
    /** Native browser `Console` object. */
    console: Console;
};

/**
 * Helper type that adds `null` to a type union.
 *
 * Use this to explicitly mark values that may be absent rather than
 * relying on implicit `undefined`.
 *
 * @typeParam T - The base type.
 * @category Utility
 */
export type Nullable<T> = T | null;

/**
 * Constructor reference type for dependency injection.
 *
 * Represents any class constructor that can be instantiated with `new`.
 * Used internally by the DI container to create service instances.
 *
 * @category Utility
 */
export type ClassRef = { new (...args: any[]): any };

/**
 * Module dependency descriptor for the DI system.
 *
 * Pairs a list of injection token names with the constructor that
 * requires them. The DI container resolves each token in
 * `moduleInjections` and passes them as arguments to `moduleCallback`.
 *
 * @category Utility
 */
export type Dependency = {
    /** Ordered list of injection token names to resolve. */
    moduleInjections: string[];
    /** The module constructor to instantiate with the resolved dependencies. */
    moduleCallback: ClassRef;
};
