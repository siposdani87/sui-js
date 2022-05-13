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
 * @param {*} value
 * @param {string} type
 * @return {*}
 */
export const convert = (value: any, type: string): any => {
    let result = value;
    if (isNumber(value)) {
        result = convertToNumber(value, type);
    } else if (isString(value)) {
        result = convertToString(value, type);
    }
    return result;
};

/**
 * @param {number} value
 * @param {string} type
 * @return {number|string}
 */
export const convertToNumber = (
    value: number,
    type: string,
): number | string => {
    switch (type) {
        case 'string':
            return value.toString();
        default:
            return value;
    }
};

/**
 * @param {string} value
 * @param {string} type
 * @return {string|number}
 */
export const convertToString = (
    value: string,
    type: string,
): string | number => {
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
 * @param {*=} opt_result
 * @return {!Function}
 */
export const noop =
    (opt_result?: any): (() => any) =>
    () => {
        return opt_result;
    };

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const eq = (a: any, b: any): boolean => a === b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const neq = (a: any, b: any): boolean => a !== b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gt = (a: any, b: any): boolean => a > b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gte = (a: any, b: any): boolean => a >= b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lt = (a: any, b: any): boolean => a < b;

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lte = (a: any, b: any): boolean => a <= b;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isArray = (value: any): boolean => instanceOf(value, Array);

/**
 * @param {*} value
 * @return {boolean}
 */
export const isFunction = (value: any): boolean => is(value, 'function');

/**
 * @param {*} value
 * @return {boolean}
 */
export const isString = (value: any): boolean => is(value, 'string');

/**
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
 * @param {*} value
 * @return {boolean}
 */
export const isFloat = (value: any): boolean => parseFloat(value) === value;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isInteger = (value: any): boolean => parseInt(value, 10) === value;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isObject = (value: any): boolean => is(value, 'object');

/**
 * @param {*} value
 * @return {boolean}
 */
export const isDate = (value: any): boolean => instanceOf(value, Date);

/**
 * @param {*} value
 * @return {boolean}
 */
export const isNull = (value: any): boolean => value === null;

/**
 * @param {*} value
 * @return {boolean}
 */
export const isUndefined = (value: any): boolean => is(value, 'undefined');

/**
 * @param {*} value
 * @return {boolean}
 */
export const isFinite = (value: any): boolean => isFinite(value);

/**
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export const is = (value: any, type: string): boolean => typeof value === type;

/**
 * @param {*} value
 * @param {!Object} obj
 * @return {boolean}
 */
export const instanceOf = (value: any, obj: Object): boolean =>
    value instanceof (obj as any);

/**
 * @param {*} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export const each = (
    items: any,
    next: Function,
    opt_start?: number,
    opt_end?: number,
): void => {
    if (isArray(items)) {
        eachArray(items, next, opt_start, opt_end);
    } else if (isObject(items)) {
        eachObject(items, next);
    }
};

/**
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
 * @param {!Object} object
 * @param {!Function} next
 * @return {undefined}
 */
export const eachObject = (object: Object, next: Function): void => {
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
 * @param {!Array|!Object} items
 * @return {undefined}
 */
export const clear = (items: Array<any> | object): void => {
    if (isArray(items)) {
        clearArray(items as Array<any>);
    } else if (isObject(items)) {
        clearObject(items);
    }
};

/**
 * @param {!Array} items
 * @return {undefined}
 */
export const clearArray = (items: Array<any>): void => {
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
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export const inArray = (items: Array<any>, item: any): boolean =>
    items.indexOf(item) !== -1;

/**
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export const contain = (str: string, subStr: string): boolean =>
    str.indexOf(subStr) !== -1;

/**
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export const inContainArray = (items: Array<any>, item: any): boolean => {
    let i = 0;
    while (i < items.length && !contain(item, items[i])) {
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
    if (isObject(a) && isObject(b) && eq(strA.length, strB.length)) {
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
 * @param {!Array|!Object} items
 * @return {!Array|!Object|undefined}
 */
export const copy = (
    items: Array<any> | Object,
): Array<any> | Object | undefined => {
    let results;
    if (isArray(items)) {
        results = copyArray(items as Array<any>);
    } else if (isObject(items)) {
        results = copyObject(items as Object);
    }
    return results;
};

/**
 * @param {!Array} items
 * @return {!Array}
 */
export const copyArray = (items: Array<any>): Array<any> =>
    // TODO object, array copy
    // return JSON.parse(JSON.stringify(items));
    [].concat(items);

/**
 * @param {!Object} items
 * @return {!Object}
 */
export const copyObject = (items: Object): Object => {
    const results = {};
    eachObject(items, (item, key) => {
        results[key] = isObject(item) ? copyObject(item) : item;
    });
    return results;
};

/**
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
 * @deprecated
 * @param {!Array} args
 * @param {!Function} callback
 * @return {undefined}
 */
export const list = (args: Array<any>, callback: Function): void => {
    callback(...args);
};

/**
 * @param {string} str
 * @return {string}
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
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
 * @param {!Object} obj
 * @param {function(*, string)} condition
 * @return {!Array}
 */
export const pluckKeys = (
    obj: Object,
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
 * @use {scrollIntoView}
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
): ((this: Window, ev: Event) => any) => {
    let timeout: number;
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
};
