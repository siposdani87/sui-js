import { Item } from '../core/item';
/**
 * @export
 * @param {*} value
 * @return {*}
 */
export const typeCast = (value) => {
    let result = value;
    if (isString(value) && !contain(/** @type {string} */ value, ' ')) {
        const lowerCaseValue = value.toLowerCase();
        if (eq(lowerCaseValue, '')) {
            result = '';
        }
        else if (eq(lowerCaseValue, 'undefined')) {
            result = undefined;
        }
        else if (eq(lowerCaseValue, 'null')) {
            result = null;
        }
        else if (eq(lowerCaseValue, 'true')) {
            result = true;
        }
        else if (eq(lowerCaseValue, 'false')) {
            result = false;
        }
        else if (eq(lowerCaseValue, 'infinity')) {
            result = Infinity;
        }
        else if (isNumber(lowerCaseValue)) {
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
export const merge = (objA, objB) => {
    const obj = copyObject(objA);
    for (const key in objB) {
        if (objB.hasOwnProperty(key)) {
            if (isObject(objB[key].constructor)) {
                obj[key] = merge(obj[key], objB[key]);
            }
            else {
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
export const format = (str, opt_params = null, opt_prefix = '\\{', opt_postfix = '\\}') => {
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
export const convert = (value, type) => {
    let result = value;
    if (isNumber(value)) {
        result = convertNumber(/** @type {number} */ value, type);
    }
    else if (isString(value)) {
        result = convertString(/** @type {string} */ value, type);
    }
    return result;
};
/**
 * @export
 * @param {number} value
 * @param {string} type
 * @return {number|string}
 */
export const convertNumber = (value, type) => {
    let result = value;
    switch (type) {
        case 'string':
            return value.toString();
        default:
            return result;
    }
};
/**
 * @export
 * @param {string} value
 * @param {string} type
 * @return {string|number}
 */
export const convertString = (value, type) => {
    let result = value;
    switch (type) {
        case 'integer':
            return parseInt(value, 10);
        case 'float':
            return parseFloat(value);
        default:
            return result;
    }
};
/**
 * @export
 * @param {*} value
 * @param {*} defaultValue
 * @return {*}
 */
export const defaultValue = (value, defaultValue) => !isUndefined(value) ? value : defaultValue;
/**
 * @export
 * @param {*=} opt_result
 * @return {!Function}
 */
export const noop = (opt_result) => () => {
    return opt_result;
};
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const eq = (a, b) => a === b;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const neq = (a, b) => a !== b;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gt = (a, b) => a > b;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gte = (a, b) => a >= b;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lt = (a, b) => a < b;
/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lte = (a, b) => a <= b;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isArray = (value) => instanceOf(value, Array);
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFunction = (value) => is(value, 'function');
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isString = (value) => is(value, 'string');
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isNumber = (value) => value !== null &&
    value !== '' &&
    !isNaN(value) &&
    (!inArray(['0', '+'], value === null || value === void 0 ? void 0 : value[0]) || value === '0') &&
    Number(value).toString() !== 'NaN' &&
    Number(value).toString() !== 'Infinity';
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFloat = (value) => parseFloat(value) === value;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isInteger = (value) => parseInt(value, 10) === value;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isObject = (value) => is(value, 'object');
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isNull = (value) => value === null;
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isUndefined = (value) => is(value, 'undefined');
/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFinite = (value) => isFinite(value);
/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export const is = (value, type) => typeof value === type;
/**
 * @export
 * @param {*} value
 * @param {!Object} obj
 * @return {boolean}
 */
export const instanceOf = (value, obj) => value instanceof obj;
/**
 * @export
 * @param {*} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
export const each = (items, next, opt_start, opt_end) => {
    if (isArray(items)) {
        eachArray(/** @type {!Array} */ items, next, opt_start, opt_end);
    }
    else if (isObject(items)) {
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
export const eachArray = (items, next, opt_start, opt_end) => {
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
export const eachObject = (object, next) => {
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
export const sleepEach = (next, i, length, duration) => {
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
export const clear = (items) => {
    if (isArray(items)) {
        clearArray(/** @type {!Array} */ items);
    }
    else if (isObject(items)) {
        clearObject(/** @type {!Object} */ items);
    }
};
/**
 * @export
 * @param {!Array} items
 * @return {undefined}
 */
export const clearArray = (items) => {
    items.splice(0, items.length);
};
/**
 * @export
 * @param {!Object} items
 * @return {undefined}
 */
export const clearObject = (items) => {
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
export const inArray = (items, item) => items.indexOf(item) !== -1;
/**
 * @export
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export const contain = (str, subStr) => str.indexOf(subStr) !== -1;
/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export const inContainArray = (items, item) => {
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
export const isSame = (a, b) => {
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
export const remove = (items, item) => {
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
export const copy = (items) => {
    let results;
    if (isArray(items)) {
        results = copyArray(/** @type {!Array} */ items);
    }
    else if (isObject(items)) {
        results = copyObject(/** @type {!Object} */ items);
    }
    return results;
};
/**
 * @export
 * @param {!Array} items
 * @return {!Array}
 */
export const copyArray = (items) => 
// TODO object, array copy
// return JSON.parse(JSON.stringify(items));
[].concat(items);
/**
 * @export
 * @param {!Object} items
 * @return {!Object}
 */
export const copyObject = (items) => {
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
export const isEmpty = (items) => {
    let result = false;
    if (isArray(items)) {
        result = items.length === 0;
    }
    else if (isObject(items)) {
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
export const list = (args, callback) => {
    callback(...args);
};
/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
/**
 * @export
 * @param {!Array} items
 * @param {string} attribute
 * @return {!Array}
 */
export const pluck = (items, attribute) => {
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
export const pluckKeys = (obj, condition) => {
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
export const mdl = (opt_node = null, opt_forceDowngrade = true) => {
    let element = opt_node || document;
    if (element instanceof Item) {
        element = element.getNode();
    }
    if (opt_node) {
        if (opt_forceDowngrade) {
            window['componentHandler']['downgradeElements'](element);
        }
        window['componentHandler']['upgradeElement'](element);
    }
    else {
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
export const renderReact = (type, props, mountNode) => window['ReactDOM']['render'](window['React']['createElement'](window[type], props), mountNode.getNode());
/**
 * @export
 * @param {!Item} mountNode
 * @return {undefined}
 */
export const unmountReact = (mountNode) => {
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
export const scrollTo = (x, y, opt_duration = 500, opt_step = 20) => {
    clearInterval(_scrollInterval);
    let scrollStepX = -(window.scrollX - x) / (opt_duration / opt_step);
    let scrollStepY = -(window.scrollY - y) / (opt_duration / opt_step);
    _scrollInterval = setInterval(() => {
        if ((scrollStepX > 0 && window.scrollX + scrollStepX > x) ||
            (scrollStepX < 0 && window.scrollX + scrollStepX < x)) {
            scrollStepX = x - window.scrollX;
        }
        if ((scrollStepY > 0 && window.scrollY + scrollStepY > y) ||
            (scrollStepY < 0 && window.scrollY + scrollStepY < y)) {
            scrollStepY = y - window.scrollY;
        }
        if (window.scrollX !== x || window.scrollY !== y) {
            window.scrollBy(scrollStepX, scrollStepY);
        }
        else {
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
export const scrollToElement = (selector, opt_duration = 500, opt_step = 20) => {
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
export const scrollIntoView = (selector, opt_behavior = 'smooth') => {
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
export const debounce = (func, opt_wait = 250, opt_immediate = false) => {
    let timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            if (!opt_immediate)
                func(...args);
        };
        const callNow = opt_immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, opt_wait);
        if (callNow)
            func(...args);
    };
};
/**
 * @export
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
export const urlWithQueryString = (url, opt_params) => {
    const queryString = getQueryString(opt_params);
    const separator = contain(url, '?') ? '&' : '?';
    return url + (queryString ? separator + queryString : '');
};
/**
 * @export
 * @param {!Object=} opt_params
 * @return {string}
 */
export const getQueryString = (opt_params) => {
    const queries = [];
    each(opt_params, (param, key) => {
        if (isArray(param)) {
            eachArray(param, (value) => {
                queries.push(format('{0}[]={1}', [key, value]));
            });
        }
        else if (!isUndefined(param) && !isNull(param)) {
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
export const getExtensionName = (url) => {
    const realUrl = url.split('?', 2)[0];
    return realUrl.slice((Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1);
};
/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
/**
 * @export
 * @param {string} str
 * @return {undefined}
 */
export const copyToClipboard = (str) => {
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