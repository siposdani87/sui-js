export const typeCast = (value) => {
    let result = value;
    if (isString(value) && !contain(value, ' ')) {
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
export const merge = (objA, objB) => {
    const obj = copyObject(objA);
    for (const key in objB) {
        if (objB.hasOwnProperty(key)) {
            if (isPureObject(objB[key].constructor)) {
                obj[key] = merge(obj[key], objB[key]);
            }
            else {
                obj[key] = objB[key];
            }
        }
    }
    return obj;
};
export const format = (str, opt_params = null, opt_prefix = '\\{', opt_postfix = '\\}') => {
    each(opt_params, (value, key) => {
        const regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
        str = str.replace(regex, value);
    });
    return str;
};
export const noop = (opt_result) => () => {
    return opt_result;
};
export const eq = (a, b) => a === b;
export const neq = (a, b) => a !== b;
export const gt = (a, b) => a > b;
export const gte = (a, b) => a >= b;
export const lt = (a, b) => a < b;
export const lte = (a, b) => a <= b;
export const isArray = (value) => Array.isArray(value);
export const isFunction = (value) => is(value, 'function');
export const isString = (value) => is(value, 'string');
export const isNumber = (value) => value !== null &&
    value !== '' &&
    !isNaN(value) &&
    (!inArray(['0', '+'], value === null || value === void 0 ? void 0 : value[0]) || value === '0') &&
    Number(value).toString() !== 'NaN' &&
    Number(value).toString() !== 'Infinity';
export const isFloat = (value) => parseFloat(value) === value;
export const isInteger = (value) => parseInt(value, 10) === value;
export const isObject = (value) => is(value, 'object');
export const isPureObject = (value) => !isNull(value) && !isDate(value) && !isArray(value) && isObject(value);
export const isDate = (value) => instanceOf(value, Date);
export const isNull = (value) => value === null;
export const isInfinity = (value) => value === Infinity;
export const isUndefined = (value) => is(value, 'undefined');
export const is = (value, type) => typeof value === type;
export const instanceOf = (value, obj) => value instanceof obj;
export const each = (items, next, opt_start, opt_end) => {
    if (isArray(items)) {
        eachArray(items, next, opt_start, opt_end);
    }
    else if (isPureObject(items)) {
        eachObject(items, next);
    }
};
export const eachArray = (items, next, opt_start, opt_end) => {
    opt_start = opt_start || 0;
    opt_end = opt_end || items.length;
    for (let i = opt_start; i < opt_end; i++) {
        next(items[i], i);
    }
};
export const eachObject = (object, next) => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            next(object[key], key);
        }
    }
};
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
export const clear = (items) => {
    if (isArray(items)) {
        clearArray(items);
    }
    else if (isPureObject(items)) {
        clearObject(items);
    }
};
export const clearArray = (items) => {
    items.splice(0, items.length);
};
export const clearObject = (items) => {
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            delete items[key];
        }
    }
};
export const inArray = (items, item) => items.indexOf(item) !== -1;
export const contain = (str, subStr) => str.indexOf(subStr) !== -1;
export const inContainArray = (items, item) => {
    let i = 0;
    while (i < items.length && !contain(items[i], item)) {
        i++;
    }
    return i < items.length;
};
export const isSame = (a, b) => {
    const strA = JSON.stringify(a);
    const strB = JSON.stringify(b);
    if (isPureObject(a) && isPureObject(b) && eq(strA.length, strB.length)) {
        let result = true;
        each(a, (value, key) => {
            if (!isSame(b[key], value)) {
                result = false;
            }
        });
        return result;
    }
    return eq(strA, strB);
};
export const remove = (items, item) => {
    const position = items.indexOf(item);
    if (neq(position, -1)) {
        items.splice(position, 1);
    }
};
export const copy = (items) => {
    let results;
    if (isArray(items)) {
        results = copyArray(items);
    }
    else if (isPureObject(items)) {
        results = copyObject(items);
    }
    return results;
};
export const copyArray = (items) => {
    const results = [];
    eachArray(items, (item, index) => {
        if (isArray(item)) {
            results[index] = copyArray(item);
        }
        else if (isPureObject(item)) {
            results[index] = copyObject(item);
        }
        else {
            results[index] = item;
        }
    });
    return results;
};
export const copyObject = (item) => {
    const results = {};
    eachObject(item, (value, key) => {
        if (isArray(value)) {
            results[key] = copyArray(value);
        }
        else if (isPureObject(value)) {
            results[key] = copyObject(value);
        }
        else {
            results[key] = value;
        }
    });
    return results;
};
export const isEmpty = (items) => {
    let result = false;
    if (isArray(items)) {
        result = items.length === 0;
    }
    else if (isPureObject(items)) {
        let counter = 0;
        each(items, () => {
            counter++;
        });
        result = counter === 0;
    }
    return result;
};
export const list = (args, callback) => {
    callback(...args);
};
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const pluck = (items, attribute) => {
    const results = [];
    eachArray(items, (item) => {
        const result = item.get(attribute);
        results.push(result);
    });
    return results;
};
export const pluckKeys = (obj, condition) => {
    const results = [];
    eachObject(obj, (value, key) => {
        if (condition(value, key)) {
            results.push(key);
        }
    });
    return results;
};
let _scrollInterval = null;
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
export const scrollToElement = (selector, opt_duration = 500, opt_step = 20) => {
    const nodeList = document.querySelectorAll(selector);
    const element = nodeList[0];
    const x = element.offsetLeft;
    const y = element.offsetTop;
    scrollTo(x, y, opt_duration, opt_step);
};
export const scrollIntoView = (selector, opt_behavior = 'smooth') => {
    document.querySelector(selector).scrollIntoView({
        behavior: opt_behavior,
    });
};
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
export const urlWithQueryString = (url, opt_params) => {
    const queryString = getQueryString(opt_params);
    const separator = contain(url, '?') ? '&' : '?';
    return url + (queryString ? separator + queryString : '');
};
export const getQueryString = (opt_params) => {
    const queries = [];
    eachObject(opt_params, (param, key) => {
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
export const getExtensionName = (url) => {
    const realUrl = url.split('?', 2)[0];
    return realUrl.slice((Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1);
};
export const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    // navigator.clipboard.writeText(str);
};
