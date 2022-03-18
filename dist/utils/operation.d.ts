/**
 * @export
 * @param {*} value
 * @return {*}
 */
export declare const typeCast: (value: any) => any;
/**
 * @export
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
export declare const merge: (objA: Object, objB: Object) => Object | undefined;
/**
 * @export
 * @param {string} str
 * @param {!Object|!Array|null=} opt_params
 * @param {string=} opt_prefix
 * @param {string=} opt_postfix
 * @return {string}
 */
export declare const format: (str: string, opt_params?: (object | Array<any> | null) | undefined, opt_prefix?: string | undefined, opt_postfix?: string | undefined) => string;
/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {*}
 */
export declare const convert: (value: any, type: string) => any;
/**
 * @export
 * @param {number} value
 * @param {string} type
 * @return {number|string}
 */
export declare const convertToNumber: (value: number, type: string) => number | string;
/**
 * @export
 * @param {string} value
 * @param {string} type
 * @return {string|number}
 */
export declare const convertToString: (value: string, type: string) => string | number;
/**
 * @export
 * @param {*} value
 * @param {*} defaultValue
 * @return {*}
 */
export declare const defaultValue: (value: any, defaultValue: any) => any;
/**
 * @export
 * @param {*=} opt_result
 * @return {!Function}
 */
export declare const noop: (opt_result?: any) => (() => any);
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const eq: (a: any, b: any) => boolean;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const neq: (a: any, b: any) => boolean;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const gt: (a: any, b: any) => boolean;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const gte: (a: any, b: any) => boolean;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const lt: (a: any, b: any) => boolean;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const lte: (a: any, b: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isArray: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isFunction: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isString: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isNumber: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isFloat: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isInteger: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isObject: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isNull: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isUndefined: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export declare const isFinite: (value: any) => boolean;
/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export declare const is: (value: any, type: string) => boolean;
/**
 * @export
 * @param {*} value
 * @param {!Object} obj
 * @return {boolean}
 */
export declare const instanceOf: (value: any, obj: Object) => boolean;
/**
 * @export
 * @param {*} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export declare const each: (items: any, next: Function, opt_start?: number, opt_end?: number) => void;
/**
 * @export
 * @param {!Array} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export declare const eachArray: (items: Array<any>, next: Function, opt_start?: number | undefined, opt_end?: number | undefined) => void;
/**
 * @export
 * @param {!Object} object
 * @param {!Function} next
 * @return {undefined}
 */
export declare const eachObject: (object: Object, next: Function) => void;
/**
 * @export
 * @param {function(number):undefined} next
 * @param {number} i
 * @param {number} length
 * @param {number} duration
 * @return {undefined}
 */
export declare const sleepEach: (next: (_index: number) => void, i: number, length: number, duration: number) => void;
/**
 * @export
 * @param {!Array|!Object} items
 * @return {undefined}
 */
export declare const clear: (items: Array<any> | object) => void;
/**
 * @export
 * @param {!Array} items
 * @return {undefined}
 */
export declare const clearArray: (items: Array<any>) => void;
/**
 * @export
 * @param {!Object} items
 * @return {undefined}
 */
export declare const clearObject: (items: Object) => void;
/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export declare const inArray: (items: Array<any>, item: any) => boolean;
/**
 * @export
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export declare const contain: (str: string, subStr: string) => boolean;
/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export declare const inContainArray: (items: Array<any>, item: any) => boolean;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export declare const isSame: (a: any, b: any) => boolean;
/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {undefined}
 */
export declare const remove: (items: Array<any>, item: any) => void;
/**
 * @export
 * @param {!Array|!Object} items
 * @return {!Array|!Object|undefined}
 */
export declare const copy: (items: Array<any> | Object) => Array<any> | Object | undefined;
/**
 * @export
 * @param {!Array} items
 * @return {!Array}
 */
export declare const copyArray: (items: Array<any>) => Array<any>;
/**
 * @export
 * @param {!Object} items
 * @return {!Object}
 */
export declare const copyObject: (items: Object) => Object;
/**
 * @export
 * @param {!Array|!Object} items
 * @return {boolean}
 */
export declare const isEmpty: (items: Array<any> | object) => boolean;
/**
 * @export
 * @deprecated
 * @param {!Array} args
 * @param {!Function} callback
 * @return {undefined}
 */
export declare const list: (args: Array<any>, callback: Function) => void;
/**
 * @export
 * @param {string} str
 * @return {string}
 */
export declare const capitalize: (str: string) => string;
/**
 * @export
 * @param {!Array} items
 * @param {string} attribute
 * @return {!Array}
 */
export declare const pluck: (items: Array<any>, attribute: string) => Array<any>;
/**
 * @export
 * @param {!Object} obj
 * @param {function(*, string)} condition
 * @return {!Array}
 */
export declare const pluckKeys: (obj: Object, condition: (_value: any, _key: string) => any) => Array<any>;
/**
 * @export
 * @param {number} x
 * @param {number} y
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
export declare const scrollTo: (x: number, y: number, opt_duration?: number | undefined, opt_step?: number | undefined) => void;
/**
 * @export
 * @deprecated
 * @param {string} selector
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
export declare const scrollToElement: (selector: string, opt_duration?: number | undefined, opt_step?: number | undefined) => void;
/**
 * @export
 * @param {string} selector
 * @param {string=} opt_behavior
 * @return {undefined}
 */
export declare const scrollIntoView: (selector: string, opt_behavior?: ScrollBehavior | undefined) => void;
/**
 * @export
 * @param {!Function} func
 * @param {number=} opt_wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
export declare const debounce: (func: Function, opt_wait?: number | undefined, opt_immediate?: boolean | undefined) => (this: Window, ev: Event) => any;
/**
 * @export
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
export declare const urlWithQueryString: (url: string, opt_params?: Object | undefined) => string;
/**
 * @export
 * @param {!Object=} opt_params
 * @return {string}
 */
export declare const getQueryString: (opt_params?: Object) => string;
/**
 * @export
 * @param {string} url
 * @return {string}
 */
export declare const getExtensionName: (url: string) => string;
/**
 * @export
 * @param {string} str
 * @return {string}
 */
export declare const normalize: (str: string) => string;
/**
 * @export
 * @param {string} str
 * @return {undefined}
 */
export declare const copyToClipboard: (str: string) => void;
