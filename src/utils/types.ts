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
 * @typedef {function(Element, Event)} Listener
 */
export type Listener = (this: Element, ev: Event) => any;

/**
 * @typedef {!Object} Params
 */
export type Params = {
    [key: string]: string;
};

/**
 * @typedef {(string|number)} Id
 */
export type Id = string | number;

/**
 * @typedef {{style: !Function, click: !Function}} Action
 */
export type Action = {
    style: (item: Objekt) => [string, string?, boolean?, boolean?];
    click: (item: Objekt) => void;
};

/**
 * @typedef {{url: string, size: [number, number], origin: [number, number], anchor: [number, number], coords: Array<number>}} IconOptions
 */
export type IconOptions = {
    url: string;
    size: [number, number];
    origin: [number, number];
    anchor: [number, number];
    coords: number[];
};

export type Injection = {
    [key: string]: string;
};

export type InstanceKey = keyof Instance;

export type Instance = {
    app: Application;
    config: Objekt;
    eventBus: EventBus;
    scheduler: Scheduler;
    http: Http;
    flash: Flash;
    template: Template;
    dialog: Dialog;
    confirm: Confirm;
    viewer: Viewer;
    header: Header;
    topMenu: TopMenu;
    leftMenu: LeftMenu;
    footer: Footer;
    bottomMenu: BottomMenu;
    navBar: NavBar;
    script: Script;
    style: Style;
    state: State;
    dom: Knot;
    page: Page;
    screen: Screen;
    helper: Helper;
    cookie: Cookie;
    localDepot: Depot;
    sessionDepot: Depot;
    browser: Browser;
    loader: Loader;
    progressBar: ProgressBar;
    geoLocation: GeoLocation;
    instances: Instance;
    console: Console;
};

export type ClassRef = { new (...args: any[]) };

/**
 * @typedef {{moduleInjections: Array<string>, moduleCallback: ClassRef}} Dependency
 */
export type Dependency = {
    moduleInjections: string[];
    moduleCallback: ClassRef;
};
