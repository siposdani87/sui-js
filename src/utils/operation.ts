import { Objekt } from '../core';

/**
 * @param {*} value
 * @return {*}
 */
export const typeCast = (value: any): any => {
    let result = value;
    if (isString(value) && !contain(value, ' ')) {
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
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
export const merge = (objA: Object, objB: Object): Object | undefined => {
    const obj = copyObject(objA);
    for (const key in objB) {
        if (objB.hasOwnProperty(key)) {
            if (isPureObject(objB[key].constructor)) {
                obj[key] = merge(obj[key], objB[key]);
            } else {
                obj[key] = objB[key];
            }
        }
    }
    return obj;
};

/**
 * @template T
 * @param {string} str
 * @param {!Object|!Array|null=} opt_params
 * @param {string=} opt_prefix
 * @param {string=} opt_postfix
 * @return {string}
 */
export const format = <T>(
    str: string,
    opt_params: Object | Array<T> | null | undefined = null,
    opt_prefix: string | undefined = '\\{',
    opt_postfix: string | undefined = '\\}',
): string => {
    each(opt_params, (value, key) => {
        const regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
        str = str.replace(regex, value as string);
    });
    return str;
};

/**
 * @template T
 * @param {T=} opt_result
 * @return {function():T}
 */
export const noop =
    <T>(opt_result?: T): (() => T) =>
    () => {
        return opt_result;
    };

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const eq = (a: unknown, b: unknown): boolean => a === b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const neq = (a: unknown, b: unknown): boolean => a !== b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gt = (a: unknown, b: unknown): boolean => a > b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gte = (a: unknown, b: unknown): boolean => a >= b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lt = (a: unknown, b: unknown): boolean => a < b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lte = (a: unknown, b: unknown): boolean => a <= b;

/**
 * @template T
 * @param {*} value
 * @return {boolean}
 */
export const isArray = <T>(value: any): value is Array<T> =>
    Array.isArray(value);

/**
 * @param {*} value
 * @return {boolean}
 */
export const isFunction = (value: any): value is Function =>
    is(value, 'function');

/**
 * @param {*} value
 * @return {boolean}
 */
export const isString = (value: any): value is string => is(value, 'string');

/**
 * @param {*} value
 * @return {boolean}
 */
export const isNumber = (value: any): value is number =>
    value !== null &&
    value !== '' &&
    !isNaN(value) &&
    (!inArray(['0', '+'], value?.[0]) || value === '0') &&
    Number(value).toString() !== 'NaN' &&
    Number(value).toString() !== 'Infinity';

/**
 * @param {*} value
 * @return {boolean}
 */
export const isFloat = (value: any): value is number =>
    parseFloat(value) === value;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isInteger = (value: any): value is number =>
    parseInt(value, 10) === value;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isObject = (value: any): value is Object => is(value, 'object');

/**
 * @param {*} value
 * @return {boolean}
 */
export const isPureObject = (value: any): value is Object =>
    !isNull(value) && !isDate(value) && !isArray(value) && isObject(value);

/**
 * @param {*} value
 * @return {boolean}
 */
export const isDate = (value: any): value is Date => instanceOf(value, Date);

/**
 * @param {*} value
 * @return {boolean}
 */
export const isNull = (value: any): value is null => value === null;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isInfinity = (value: any): value is typeof Infinity =>
    value === Infinity;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isUndefined = (value: any): value is undefined =>
    is(value, 'undefined');

/**
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export const is = (value: any, type: string): value is typeof type =>
    typeof value === type;

/**
 * @template T
 * @param {*} value
 * @param {T} obj
 * @return {boolean}
 */
export const instanceOf = <T>(value: any, obj: T): boolean =>
    value instanceof (obj as any);

/**
 * @template T
 * @param {!Array<T>|!Object} items
 * @param {function(*, string|number):undefined} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export const each = <T>(
    items: Array<T> | Object,
    next: (item: any, key: string | number) => void,
    opt_start?: number,
    opt_end?: number,
): void => {
    if (isArray(items)) {
        eachArray(items, next, opt_start, opt_end);
    } else if (isPureObject(items)) {
        eachObject(items, next);
    }
};

/**
 * @template T
 * @param {!Array} items
 * @param {function(T, number):undefined} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export const eachArray = <T>(
    items: Array<T>,
    next: (item: T, index: number) => void,
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
 * @param {!Object} object
 * @param {function(*, string):undefined} next
 * @return {undefined}
 */
export const eachObject = (
    object: Object,
    next: (value: any, key: string) => void,
): void => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            next(object[key], key);
        }
    }
};

/**
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
 * @template T
 * @param {!Array|!Object} items
 * @return {undefined}
 */
export const clear = <T>(items: Array<T> | Object): void => {
    if (isArray(items)) {
        clearArray(items);
    } else if (isPureObject(items)) {
        clearObject(items);
    }
};

/**
 * @template T
 * @param {!Array<T>} items
 * @return {undefined}
 */
export const clearArray = <T>(items: Array<T>): void => {
    items.splice(0, items.length);
};

/**
 * @param {!Object} items
 * @return {undefined}
 */
export const clearObject = (items: Object): void => {
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            delete items[key];
        }
    }
};

/**
 * @template T
 * @param {!Array<T>} items
 * @param {T} item
 * @return {boolean}
 */
export const inArray = <T>(items: Array<T>, item: T): boolean =>
    items.indexOf(item) !== -1;

/**
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export const contain = (str: string, subStr: string): boolean =>
    str.indexOf(subStr) !== -1;

/**
 * @param {!Array<string>} items
 * @param {*} item
 * @return {boolean}
 */
export const inContainArray = (items: Array<string>, item: string): boolean => {
    let i = 0;
    while (i < items.length && !contain(items[i], item)) {
        i++;
    }
    return i < items.length;
};

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const isSame = (a: any, b: any): boolean => {
    const strA = JSON.stringify(a);
    const strB = JSON.stringify(b);
    if (isPureObject(a) && isPureObject(b) && eq(strA.length, strB.length)) {
        let result = true;
        eachObject(a, (value, key) => {
            if (!isSame(b[key], value)) {
                result = false;
            }
        });
        return result;
    }
    return eq(strA, strB);
};

/**
 * @template T
 * @param {!Array<T>} items
 * @param {T} item
 * @return {undefined}
 */
export const remove = <T>(items: Array<T>, item: T): void => {
    const position = items.indexOf(item);
    if (neq(position, -1)) {
        items.splice(position, 1);
    }
};

/**
 * @template T
 * @param {!Array<T>|!Object} items
 * @return {!Array<T>|!Object|undefined}
 */
export const copy = <T>(
    items: Array<T> | Object,
): Array<T> | Object | undefined => {
    let results;
    if (isArray(items)) {
        results = copyArray(items);
    } else if (isPureObject(items)) {
        results = copyObject(items);
    }
    return results;
};

/**
 * @template T
 * @param {!Array} items
 * @return {!Array}
 */
export const copyArray = <T>(items: Array<T>): Array<T> => {
    const results = [];
    eachArray(items, (item, index) => {
        if (isArray(item)) {
            results[index] = copyArray(item);
        } else if (isPureObject(item)) {
            results[index] = copyObject(item);
        } else {
            results[index] = item;
        }
    });
    return results;
};

/**
 * @param {!Object} item
 * @return {!Object}
 */
export const copyObject = (item: Object): Object => {
    const results = {};
    eachObject(item, (value, key) => {
        if (isArray(value)) {
            results[key] = copyArray(value);
        } else if (isPureObject(value)) {
            results[key] = copyObject(value);
        } else {
            results[key] = value;
        }
    });
    return results;
};

/**
 * @template T
 * @param {!Array<T>|!Object} items
 * @return {boolean}
 */
export const isEmpty = <T>(items: Array<T> | Object): boolean => {
    let result = false;
    if (isArray(items)) {
        result = items.length === 0;
    } else if (isPureObject(items)) {
        let counter = 0;
        each(items, () => {
            counter++;
        });
        result = counter === 0;
    }
    return result;
};

/**
 * @deprecated
 * @template T
 * @param {!Array<T>} args
 * @param {function(*):undefined} callback
 * @return {undefined}
 */
export const list = <T>(
    args: Array<T>,
    callback: (...rest: T[]) => void,
): void => {
    callback(...args);
};

/**
 * @param {string} str
 * @return {string}
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @template T
 * @param {!Array<T>} items
 * @param {string} attribute
 * @return {!Array<T>}
 */
export const pluck = <T extends Objekt>(
    items: Array<T>,
    attribute: string,
): Array<T> => {
    const results = [];
    eachArray(items, (item) => {
        const result = item.get(attribute);
        results.push(result);
    });
    return results;
};

/**
 * @param {!Object} obj
 * @param {function(*, string):boolean} condition
 * @return {!Array<string>}
 */
export const pluckKeys = (
    obj: Object,
    condition: (value: any, key: string) => boolean,
): Array<string> => {
    const results = [];
    eachObject(obj, (value, key) => {
        if (condition(value, key)) {
            results.push(key);
        }
    });
    return results;
};

let _scrollInterval: number = null;
/**
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
 * @deprecated
 * @use scrollIntoView
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
    const nodeList = document.querySelectorAll<HTMLElement>(selector);
    const element = nodeList[0];
    const x = element.offsetLeft;
    const y = element.offsetTop;
    scrollTo(x, y, opt_duration, opt_step);
};

/**
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
 * @param {!Function} func
 * @param {number=} opt_wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
export const debounce = (
    func: Function,
    opt_wait: number | undefined = 250,
    opt_immediate: boolean | undefined = false,
): ((this: Window, ev: Event) => void) => {
    let timeout: number;
    return (...args) => {
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
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
export const urlWithQueryString = (
    url: string,
    opt_params?: Object | undefined,
): string => {
    const queryString = getQueryString(opt_params);
    const separator = contain(url, '?') ? '&' : '?';
    return url + (queryString ? separator + queryString : '');
};

/**
 * @param {!Object=} opt_params
 * @return {string}
 */
export const getQueryString = (opt_params?: Object): string => {
    const queries: string[] = [];
    eachObject(opt_params, (param, key) => {
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
 * @param {string} str
 * @return {string}
 */
export const normalize = (str: string): string =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
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
    // navigator.clipboard.writeText(str);
};
