import { Item } from '../core/item';

/**
 * @export
 * @param {*} value
 * @return {*}
 */
export const typeCast = (value: any): any => {
    let result = value;
    if (isString(value) && !contain(/** @type {string} */ value, ' ')) {
        const lowerCaseValue = value.toLowerCase();
        if (eq(lowerCaseValue, '')) {
            result = '';
        } else if (eq(lowerCaseValue, 'undefined')) {
            result = undefined;
        } else if (eq(lowerCaseValue, 'null')) {
            result = null;
        } else if (eq(lowerCaseValue, 'true')) {
            result = true;
        } else if (eq(lowerCaseValue, 'false')) {
            result = false;
        } else if (eq(lowerCaseValue, 'infinity')) {
            result = Infinity;
        } else if (isNumber(lowerCaseValue)) {
            result = Number(lowerCaseValue);
        }
    }
    return result;
};

/**
 * @export
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
export const merge = (objA: object, objB: object): object | undefined => {
    const obj = copyObject(objA);
    for (const key in objB) {
        if (objB.hasOwnProperty(key)) {
            if (isObject(objB[key].constructor)) {
                obj[key] = merge(obj[key], objB[key]);
            } else {
                obj[key] = objB[key];
            }
        }
    }
    return obj;
};

/**
 * @export
 * @param {string} str
 * @param {!Object|!Array|null=} opt_params
 * @param {string=} opt_prefix
 * @param {string=} opt_postfix
 * @return {string}
 */
export const format = (
    str: string,
    opt_params: (object | Array<any> | null) | undefined = null,
    opt_prefix: string | undefined = '\\{',
    opt_postfix: string | undefined = '\\}',
): string => {
    each(opt_params, (value, key) => {
        const regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
        str = str.replace(regex, value);
    });
    return str;
};

/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {*}
 */
export const convert = (value: any, type: string): any => {
    let result = value;
    if (isNumber(value)) {
        result = convertToNumber(/** @type {number} */ value, type);
    } else if (isString(value)) {
        result = convertToString(/** @type {string} */ value, type);
    }
    return result;
};

/**
 * @export
 * @param {number} value
 * @param {string} type
 * @return {number|string}
 */
export const convertToNumber = (value: number, type: string): number | string => {
    switch (type) {
        case 'string':
            return value.toString();
        default:
            return value;
    }
};

/**
 * @export
 * @param {string} value
 * @param {string} type
 * @return {string|number}
 */
export const convertToString = (value: string, type: string): string | number => {
    switch (type) {
        case 'integer':
            return parseInt(value, 10);
        case 'float':
            return parseFloat(value);
        default:
            return value;
    }
};

/**
 * @export
 * @param {*} value
 * @param {*} defaultValue
 * @return {*}
 */
export const defaultValue = (value: any, defaultValue: any): any =>
    !isUndefined(value) ? value : defaultValue;

/**
 * @export
 * @param {*=} opt_result
 * @return {!Function}
 */
export const noop =
    (opt_result?: any): (() => any) =>
    () => {
        return opt_result;
    };

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const eq = (a: any, b: any): boolean => a === b;

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const neq = (a: any, b: any): boolean => a !== b;

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gt = (a: any, b: any): boolean => a > b;

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gte = (a: any, b: any): boolean => a >= b;

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lt = (a: any, b: any): boolean => a < b;

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lte = (a: any, b: any): boolean => a <= b;

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isArray = (value: any): boolean => instanceOf(value, Array);

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFunction = (value: any): boolean => is(value, 'function');

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isString = (value: any): boolean => is(value, 'string');

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isNumber = (value: any): boolean =>
    value !== null &&
    value !== '' &&
    !isNaN(value) &&
    (!inArray(['0', '+'], value?.[0]) || value === '0') &&
    Number(value).toString() !== 'NaN' &&
    Number(value).toString() !== 'Infinity';

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFloat = (value: any): boolean => parseFloat(value) === value;

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isInteger = (value: any): boolean => parseInt(value, 10) === value;

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isObject = (value: any): boolean => is(value, 'object');

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isNull = (value: any): boolean => value === null;

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isUndefined = (value: any): boolean => is(value, 'undefined');

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFinite = (value: any): boolean => isFinite(value);

/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export const is = (value: any, type: string): boolean => typeof value === type;

/**
 * @export
 * @param {*} value
 * @param {!Object} obj
 * @return {boolean}
 */
export const instanceOf = (value: any, obj: object): boolean =>
    value instanceof (obj as any);

/**
 * @export
 * @param {*} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export const each = (
    items: any,
    next: Function,
    opt_start?: number | undefined,
    opt_end?: number | undefined,
): void => {
    if (isArray(items)) {
        eachArray(/** @type {!Array} */ items, next, opt_start, opt_end);
    } else if (isObject(items)) {
        eachObject(/** @type {!Object} */ items, next);
    }
};

/**
 * @export
 * @param {!Array} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export const eachArray = (
    items: Array<any>,
    next: Function,
    opt_start?: number | undefined,
    opt_end?: number | undefined,
): void => {
    opt_start = opt_start || 0;
    opt_end = opt_end || items.length;
    for (let i = opt_start; i < opt_end; i++) {
        next(items[i], i);
    }
};

/**
 * @export
 * @param {!Object} object
 * @param {!Function} next
 * @return {undefined}
 */
export const eachObject = (object: object, next: Function): void => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            next(object[key], key);
        }
    }
};

/**
 * @export
 * @param {function(number):undefined} next
 * @param {number} i
 * @param {number} length
 * @param {number} duration
 * @return {undefined}
 */
export const sleepEach = (
    next: (_index: number) => void,
    i: number,
    length: number,
    duration: number,
): void => {
    const loop = () => {
        next(i);
        i++;
        if (i < length) {
            setTimeout(loop, duration);
        }
    };
    loop();
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {undefined}
 */
export const clear = (items: Array<any> | object): void => {
    if (isArray(items)) {
        clearArray(/** @type {!Array} */ items as Array<any>);
    } else if (isObject(items)) {
        clearObject(/** @type {!Object} */ items);
    }
};

/**
 * @export
 * @param {!Array} items
 * @return {undefined}
 */
export const clearArray = (items: Array<any>): void => {
    items.splice(0, items.length);
};

/**
 * @export
 * @param {!Object} items
 * @return {undefined}
 */
export const clearObject = (items: object): void => {
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            delete items[key];
        }
    }
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export const inArray = (items: Array<any>, item: any): boolean =>
    items.indexOf(item) !== -1;

/**
 * @export
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export const contain = (str: string, subStr: string): boolean =>
    str.indexOf(subStr) !== -1;

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export const inContainArray = (items: Array<any>, item: any): boolean => {
    let i = 0;
    while (i < items.length && !contain(/** @type {string} */ item, items[i])) {
        i++;
    }
    return i < items.length;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const isSame = (a: any, b: any): boolean => {
    const strA = JSON.stringify(a);
    const strB = JSON.stringify(b);
    if (isObject(a) && isObject(b) && eq(strA.length, strB.length)) {
        let result = true;
        eachObject(/** @type {!Object} */ a, (value, key) => {
            if (!isSame(b[key], value)) {
                result = false;
            }
        });
        return result;
    }
    return eq(strA, strB);
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {undefined}
 */
export const remove = (items: Array<any>, item: any): void => {
    const position = items.indexOf(item);
    if (neq(position, -1)) {
        items.splice(position, 1);
    }
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {!Array|!Object|undefined}
 */
export const copy = (
    items: Array<any> | object,
): Array<any> | object | undefined => {
    let results;
    if (isArray(items)) {
        results = copyArray(/** @type {!Array} */ items as Array<any>);
    } else if (isObject(items)) {
        results = copyObject(/** @type {!Object} */ items);
    }
    return results;
};

/**
 * @export
 * @param {!Array} items
 * @return {!Array}
 */
export const copyArray = (items: Array<any>): Array<any> =>
    // TODO object, array copy
    // return JSON.parse(JSON.stringify(items));
    [].concat(items);

/**
 * @export
 * @param {!Object} items
 * @return {!Object}
 */
export const copyObject = (items: object): object => {
    const results = {};
    eachObject(items, (item, key) => {
        results[key] = isObject(item) ? copyObject(item) : item;
    });
    return results;
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {boolean}
 */
export const isEmpty = (items: Array<any> | object): boolean => {
    let result = false;
    if (isArray(items)) {
        result = (items as Array<any>).length === 0;
    } else if (isObject(items)) {
        let counter = 0;
        each(items, () => {
            counter++;
        });
        result = counter === 0;
    }
    return result;
};

/**
 * @export
 * @param {!Array} args
 * @param {!Function} callback
 * @return {undefined}
 */
export const list = (args: Array<any>, callback: Function): void => {
    callback(...args);
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @export
 * @param {!Array} items
 * @param {string} attribute
 * @return {!Array}
 */
export const pluck = (items: Array<any>, attribute: string): Array<any> => {
    const results = [];
    eachArray(items, (item) => {
        const result = item.get(attribute);
        results.push(result);
    });
    return results;
};

/**
 * @export
 * @param {!Object} obj
 * @param {function(*, string)} condition
 * @return {!Array}
 */
export const pluckKeys = (
    obj: object,
    condition: (_value: any, _key: string) => any,
): Array<any> => {
    const results = [];
    eachObject(obj, (value, key) => {
        if (condition(value, key)) {
            results.push(key);
        }
    });
    return results;
};

/**
 * @export
 * @param {!Item|!Element=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
export const mdl = (
    opt_node: (Item | Element) | undefined = null,
    opt_forceDowngrade: boolean | undefined = true,
): void => {
    let element = opt_node || document;
    if (element instanceof Item) {
        element = element.getNode();
    }
    if (opt_node) {
        if (opt_forceDowngrade) {
            window['componentHandler']['downgradeElements'](element);
        }
        window['componentHandler']['upgradeElement'](element);
    } else {
        window['componentHandler']['upgradeDom']();
    }
};

/**
 * @export
 * @param {string} type
 * @param {!Object} props
 * @param {!Item} mountNode
 * @return {!Object}
 */
export const renderReact = (
    type: string,
    props: object,
    mountNode: Item,
): object =>
    window['ReactDOM']['render'](
        window['React']['createElement'](window[type], props),
        mountNode.getNode(),
    );

/**
 * @export
 * @param {!Item} mountNode
 * @return {undefined}
 */
export const unmountReact = (mountNode: Item): void => {
    window['ReactDOM']['unmountComponentAtNode'](mountNode.getNode());
};

let _scrollInterval = null;
/**
 * @export
 * @param {number} x
 * @param {number} y
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
export const scrollTo = (
    x: number,
    y: number,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    clearInterval(_scrollInterval);
    let scrollStepX = -(window.scrollX - x) / (opt_duration / opt_step);
    let scrollStepY = -(window.scrollY - y) / (opt_duration / opt_step);
    _scrollInterval = setInterval(() => {
        if (
            (scrollStepX > 0 && window.scrollX + scrollStepX > x) ||
            (scrollStepX < 0 && window.scrollX + scrollStepX < x)
        ) {
            scrollStepX = x - window.scrollX;
        }
        if (
            (scrollStepY > 0 && window.scrollY + scrollStepY > y) ||
            (scrollStepY < 0 && window.scrollY + scrollStepY < y)
        ) {
            scrollStepY = y - window.scrollY;
        }
        if (window.scrollX !== x || window.scrollY !== y) {
            window.scrollBy(scrollStepX, scrollStepY);
        } else {
            clearInterval(_scrollInterval);
        }
    }, opt_step);
};

/**
 * @export
 * @deprecated
 * @param {string} selector
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
export const scrollToElement = (
    selector: string,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    const nodeList = document.querySelectorAll(selector);
    const element = nodeList[0];
    const x = element.scrollLeft; // TODO: element.offsetLeft
    const y = element.scrollTop; // TODO: element.offsetTop
    scrollTo(x, y, opt_duration, opt_step);
};

/**
 * @export
 * @param {string} selector
 * @param {string=} opt_behavior
 * @return {undefined}
 */
export const scrollIntoView = (
    selector: string,
    opt_behavior: ScrollBehavior | undefined = 'smooth',
): void => {
    document.querySelector(selector).scrollIntoView({
        behavior: opt_behavior,
    });
};

/**
 * @export
 * @param {!Function} func
 * @param {number=} opt_wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
export const debounce = (
    func: Function,
    opt_wait: number | undefined = 250,
    opt_immediate: boolean | undefined = false,
): ((this: Window, ev: Event) => any) => {
    let timeout;
    return (...args): any => {
        const later = () => {
            timeout = null;
            if (!opt_immediate) func(...args);
        };
        const callNow = opt_immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, opt_wait);
        if (callNow) func(...args);
    };
};

/**
 * @export
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
export const urlWithQueryString = (
    url: string,
    opt_params?: object | undefined,
): string => {
    const queryString = getQueryString(opt_params);
    const separator = contain(url, '?') ? '&' : '?';
    return url + (queryString ? separator + queryString : '');
};

/**
 * @export
 * @param {!Object=} opt_params
 * @return {string}
 */
export const getQueryString = (opt_params?: object | undefined): string => {
    const queries = [];
    each(opt_params, (param, key) => {
        if (isArray(param)) {
            eachArray(param, (value) => {
                queries.push(format('{0}[]={1}', [key, value]));
            });
        } else if (!isUndefined(param) && !isNull(param)) {
            queries.push(format('{0}={1}', [key, param]));
        }
    });
    return isEmpty(queries) ? '' : queries.join('&');
};

/**
 * @export
 * @param {string} url
 * @return {string}
 */
export const getExtensionName = (url: string): string => {
    const realUrl = url.split('?', 2)[0];
    return realUrl.slice(
        (Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1,
    );
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const normalize = (str: string): string =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
 * @export
 * @param {string} str
 * @return {undefined}
 */
export const copyToClipboard = (str: string): void => {
    const textareaElement = document.createElement('textarea');
    textareaElement.value = str;
    textareaElement.setAttribute('readonly', '');
    textareaElement.style.position = 'absolute';
    textareaElement.style.left = '-9999px';
    document.body.appendChild(textareaElement);
    textareaElement.select();
    document.execCommand('copy');
    document.body.removeChild(textareaElement);
};
