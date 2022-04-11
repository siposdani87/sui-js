/**
 * @license
 * Copyright 2015 Dániel Sipos (siposdani87@gmail.com),
 * SUI-JS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/**
 * A component handler interface using the revealing module design pattern.
 * More details on this design pattern here
 *
 * @author Dániel Sipos
 */
import * as component from './component';
import * as core from './core';
import * as field from './field';
import * as module from './module';
import * as test from './test';
declare const _default: {
    encodeBase64: (text: string) => string;
    decodeBase64: (encodedText: string) => string;
    encrypt: (value: any, passPhrase: string) => string;
    decrypt: (item: string, passPhrase: string) => any;
    md5: (str: string) => string;
    guid: () => string;
    generateId: (name: string) => string;
    uuid: () => string;
    convertRGBToHSV: (red: number, green: number, blue: number) => [number, number, number];
    convertRGBToHEX: (red: number, green: number, blue: number) => string;
    convertHEXToHSV: (hexColor: string) => [number, number, number];
    convertHEXToRGB: (hexColor: string) => [number, number, number];
    convertHSVToRGB: (h: number, s: number, v: number) => [number, number, number];
    convertHSVToHEX: (h: number, s: number, v: number) => string;
    colorContrastYIQ: (hexColor: string, opt_lightColor?: string, opt_darkColor?: string) => string;
    colorContrast: (hexColor: string, opt_diff?: number) => string;
    setDateIOLocale: (newLocale: string) => void;
    DateIO: {
        parse: (dateString?: string, formatString?: string) => Date;
        format: (date: Date, formatString?: string) => string;
        isBefore: (date: Date, dateToCompare: Date) => boolean;
        isAfter: (date: Date, dateToCompare: Date) => boolean;
        getMinutes: (date: Date) => number;
        setMinutes: (date: Date, minutes: number) => Date;
        addMinutes: (date: Date, amount: number) => Date;
        subMinutes: (date: Date, amount: number) => Date;
        getHours: (date: Date) => number;
        setHours: (date: Date, hours: number) => Date;
        addHours: (date: Date, amount: number) => Date;
        subHours: (date: Date, amount: number) => Date;
        getDate: (date: Date) => number;
        setDate: (date: Date, day: number) => Date;
        getDay: (date: Date) => number;
        addDays: (date: Date, amount: number) => Date;
        subDays: (date: Date, amount: number) => Date;
        getMonth: (date: Date) => number;
        setMonth: (date: Date, month: number) => Date;
        addMonths: (date: Date, amount: number) => Date;
        subMonths: (date: Date, amount: number) => Date;
        getYear: (date: Date) => number;
        setYear: (date: Date, years: number) => Date;
        addYears: (date: Date, amount: number) => Date;
        subYears: (date: Date, amount: number) => Date;
        startOfWeek: (date: Date) => Date;
        endOfMonth: (date: Date) => Date;
        getDaysInMonth: (date: Date) => number;
        getISOWeek: (date: Date) => number;
        getWeek: (date: Date) => number;
    };
    consoleLog: (...message: any[]) => void;
    consoleInfo: (...message: any[]) => void;
    consoleWarn: (...message: any[]) => void;
    consoleError: (...message: any[]) => void;
    readableCurrency: (price: number, opt_delimiter?: string, opt_separator?: string, opt_precision?: number) => string;
    readableNumber: (num: number, exp: number) => string;
    round: (value: number, exp: number) => number;
    floor: (value: number, exp: number) => number;
    ceil: (value: number, exp: number) => number;
    random: (min: number, max: number, opt_onlyFloat?: boolean) => number;
    typeCast: (value: any) => any;
    merge: (objA: Object, objB: Object) => Object;
    format: (str: string, opt_params?: object | any[], opt_prefix?: string, opt_postfix?: string) => string;
    convert: (value: any, type: string) => any;
    convertToNumber: (value: number, type: string) => string | number;
    convertToString: (value: string, type: string) => string | number;
    defaultValue: (value: any, defaultValue: any) => any;
    noop: (opt_result?: any) => () => any;
    eq: (a: any, b: any) => boolean;
    neq: (a: any, b: any) => boolean;
    gt: (a: any, b: any) => boolean;
    gte: (a: any, b: any) => boolean;
    lt: (a: any, b: any) => boolean;
    lte: (a: any, b: any) => boolean;
    isArray: (value: any) => boolean;
    isFunction: (value: any) => boolean;
    isString: (value: any) => boolean;
    isNumber: (value: any) => boolean;
    isFloat: (value: any) => boolean;
    isInteger: (value: any) => boolean;
    isObject: (value: any) => boolean;
    isDate: (value: any) => boolean;
    isNull: (value: any) => boolean;
    isUndefined: (value: any) => boolean;
    isFinite: (value: any) => boolean;
    is: (value: any, type: string) => boolean;
    instanceOf: (value: any, obj: Object) => boolean;
    each: (items: any, next: Function, opt_start?: number, opt_end?: number) => void;
    eachArray: (items: any[], next: Function, opt_start?: number, opt_end?: number) => void;
    eachObject: (object: Object, next: Function) => void;
    sleepEach: (next: (_index: number) => void, i: number, length: number, duration: number) => void;
    clear: (items: object | any[]) => void;
    clearArray: (items: any[]) => void;
    clearObject: (items: Object) => void;
    inArray: (items: any[], item: any) => boolean;
    contain: (str: string, subStr: string) => boolean;
    inContainArray: (items: any[], item: any) => boolean;
    isSame: (a: any, b: any) => boolean;
    remove: (items: any[], item: any) => void;
    copy: (items: Object | any[]) => Object | any[];
    copyArray: (items: any[]) => any[];
    copyObject: (items: Object) => Object;
    isEmpty: (items: object | any[]) => boolean;
    list: (args: any[], callback: Function) => void;
    capitalize: (str: string) => string;
    pluck: (items: any[], attribute: string) => any[];
    pluckKeys: (obj: Object, condition: (_value: any, _key: string) => any) => any[];
    scrollTo: (x: number, y: number, opt_duration?: number, opt_step?: number) => void;
    scrollToElement: (selector: string, opt_duration?: number, opt_step?: number) => void;
    scrollIntoView: (selector: string, opt_behavior?: ScrollBehavior) => void;
    debounce: (func: Function, opt_wait?: number, opt_immediate?: boolean) => (this: Window, ev: Event) => any;
    urlWithQueryString: (url: string, opt_params?: Object) => string;
    getQueryString: (opt_params?: Object) => string;
    getExtensionName: (url: string) => string;
    normalize: (str: string) => string;
    copyToClipboard: (str: string) => void;
    mdl: (opt_node?: Element | core.Item<HTMLElement>, opt_forceDowngrade?: boolean) => void;
    BaseTest: typeof test.BaseTest;
    CollectionTest: typeof test.CollectionTest;
    DeferredTest: typeof test.DeferredTest;
    ItemTest: typeof test.ItemTest;
    ObjektTest: typeof test.ObjektTest;
    ActionCable: typeof module.ActionCable;
    ActionCableClient: typeof module.ActionCableClient;
    BaseModal: typeof module.BaseModal;
    BottomMenu: typeof module.BottomMenu;
    Browser: typeof module.Browser;
    Confirm: typeof module.Confirm;
    Cookie: typeof module.Cookie;
    Dialog: typeof module.Dialog;
    Document: typeof module.Document;
    Event: typeof module.Event;
    Flash: typeof module.Flash;
    Footer: typeof module.Footer;
    GeoLocation: typeof module.GeoLocation;
    Header: typeof module.Header;
    Helper: typeof module.Helper;
    Http: typeof module.Http;
    LeftMenu: typeof module.LeftMenu;
    Loader: typeof module.Loader;
    NavBar: typeof module.NavBar;
    ProgressBar: typeof module.ProgressBar;
    Scheduler: typeof module.Scheduler;
    Script: typeof module.Script;
    ServiceWorker: typeof module.ServiceWorker;
    Sidebar: typeof module.Sidebar;
    Storage: typeof module.Storage;
    Style: typeof module.Style;
    Template: typeof module.Template;
    TopMenu: typeof module.TopMenu;
    Viewer: typeof module.Viewer;
    Window: typeof module.Window;
    Xhr: typeof module.Xhr;
    AutoCompleteField: typeof field.AutoCompleteField;
    BaseCheckboxField: typeof field.BaseCheckboxField;
    BaseField: typeof field.BaseField;
    Button: typeof field.Button;
    CheckboxField: typeof field.CheckboxField;
    ColorField: typeof field.ColorField;
    DateTimeField: typeof field.DateTimeField;
    DateTimeRangeField: typeof field.DateTimeRangeField;
    FileField: typeof field.FileField;
    HiddenField: typeof field.HiddenField;
    IconToggleField: typeof field.IconToggleField;
    LocationField: typeof field.LocationField;
    NumberField: typeof field.NumberField;
    RadiobuttonField: typeof field.RadiobuttonField;
    RangeField: typeof field.RangeField;
    ResetButton: typeof field.ResetButton;
    SearchField: typeof field.SearchField;
    SelectField: typeof field.SelectField;
    SubmitButton: typeof field.SubmitButton;
    SwitchField: typeof field.SwitchField;
    TextareaField: typeof field.TextareaField;
    TextField: typeof field.TextField;
    UrlField: typeof field.UrlField;
    Async: typeof core.Async;
    Collection: typeof core.Collection;
    Deferred: typeof core.Deferred;
    Item: typeof core.Item;
    Module: typeof core.Module;
    Objekt: typeof core.Objekt;
    Promize: typeof core.Promize;
    Query: typeof core.Query;
    Router: typeof core.Router;
    State: typeof core.State;
    releaseMode: boolean;
    coreResources: {
        app: string;
        config: string;
        event: string;
        scheduler: string;
        http: string;
        flash: string;
        template: string;
        dialog: string;
        confirm: string;
        viewer: string;
        header: string;
        topMenu: string;
        leftMenu: string;
        leftSidebar: string;
        rightSidebar: string;
        footer: string;
        bottomMenu: string;
        navBar: string;
        script: string;
        style: string;
        state: string;
        dom: string;
        document: string;
        window: string;
        helper: string;
        cookie: string;
        localStorage: string;
        sessionStorage: string;
        browser: string;
        loader: string;
        progressBar: string;
        geoLocation: string;
        instances: string;
        console: string;
        serviceWorker: string;
        actionCable: string;
    };
    Application: typeof component.Application;
    Calendar: typeof component.Calendar;
    Canvas: typeof component.Canvas;
    CardCollection: typeof component.CardCollection;
    Carousel: typeof component.Carousel;
    Clock: typeof component.Clock;
    ContentHandler: typeof component.ContentHandler;
    DateTime: typeof component.DateTime;
    Day: typeof component.Day;
    Dropdown: typeof component.Dropdown;
    Form: typeof component.Form;
    FormField: (this: any, inputBlock: core.Item<HTMLInputElement>, form: component.Form) => field.BaseField<HTMLInputElement>;
    GoogleMap: typeof component.GoogleMap;
    Month: typeof component.Month;
    Navigation: typeof component.Navigation;
    Pager: typeof component.Pager;
    Popup: typeof component.Popup;
    PopupContainer: typeof component.PopupContainer;
    ProgressStatus: typeof component.ProgressStatus;
    Route: typeof component.Route;
    Table: typeof component.Table;
    TabPanel: typeof component.TabPanel;
    TestRunner: typeof component.TestRunner;
    Time: typeof component.Time;
    Tooltip: typeof component.Tooltip;
    /**
     * @license
     * Copyright 2015 Dániel Sipos (siposdani87@gmail.com),
     * SUI-JS
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *  http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
     * either express or implied. See the License for the specific language
     * governing permissions and limitations under the License.
     */
    /**
     * A component handler interface using the revealing module design pattern.
     * More details on this design pattern here
     *
     * @author Dániel Sipos
     */
    Waiter: typeof component.Waiter;
    Year: typeof component.Year;
};
export default _default;
