import { Objekt } from '../core';

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

export const merge = (objA: Record<string, any>, objB: Record<string, any>): object | undefined => {
    const obj = copyObject(objA) as Record<string, any>;
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

export const format = <T>(
    str: string,
    opt_params: object | Array<T> | null | undefined = null,
    opt_prefix: string | undefined = '\\{',
    opt_postfix: string | undefined = '\\}',
): string => {
    each(opt_params as object | Array<T>, (value, key) => {
        const regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
        str = str.replace(regex, value as string);
    });
    return str;
};

export const noop =
    <T>(opt_result?: T): (() => T | undefined) =>
    () => {
        return opt_result;
    };

export const eq = (a: unknown, b: unknown): boolean => a === b;

export const neq = (a: unknown, b: unknown): boolean => a !== b;

export const gt = (a: unknown, b: unknown): boolean =>
    (a as number) > (b as number);

export const gte = (a: unknown, b: unknown): boolean =>
    (a as number) >= (b as number);

export const lt = (a: unknown, b: unknown): boolean =>
    (a as number) < (b as number);

export const lte = (a: unknown, b: unknown): boolean =>
    (a as number) <= (b as number);

export const isArray = <T>(value: any): value is Array<T> =>
    Array.isArray(value);

export const isFunction = (value: any): value is Function =>
    is(value, 'function');

export const isString = (value: any): value is string => is(value, 'string');

export const isNumber = (value: any): value is number =>
    value !== null &&
    value !== '' &&
    !isNaN(value) &&
    (!inArray(['0', '+'], value?.[0]) || value === '0') &&
    Number(value).toString() !== 'NaN' &&
    Number(value).toString() !== 'Infinity';

export const isFloat = (value: any): value is number =>
    parseFloat(value) === value;

export const isInteger = (value: any): value is number =>
    parseInt(value, 10) === value;

export const isObject = (value: any): value is object => is(value, 'object');

export const isPureObject = (value: any): value is object =>
    !isNull(value) && !isDate(value) && !isArray(value) && isObject(value);

export const isDate = (value: any): value is Date => instanceOf(value, Date);

export const isNull = (value: any): value is null => value === null;

export const isInfinity = (value: any): value is typeof Infinity =>
    value === Infinity;

export const isUndefined = (value: any): value is undefined =>
    is(value, 'undefined');

export const is = (value: any, type: string): value is typeof type =>
    typeof value === type;

export const instanceOf = <T>(value: any, obj: T): boolean =>
    value instanceof (obj as any);

export const each = <T>(
    items: Array<T> | object,
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

export const eachObject = (
    object: Record<string, any>,
    next: (value: any, key: string) => void,
): void => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            next(object[key], key);
        }
    }
};

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

export const clear = <T>(items: Array<T> | object): void => {
    if (isArray(items)) {
        clearArray(items);
    } else if (isPureObject(items)) {
        clearObject(items);
    }
};

export const clearArray = <T>(items: Array<T>): void => {
    items.splice(0, items.length);
};

export const clearObject = (items: Record<string, any>): void => {
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            delete items[key];
        }
    }
};

export const inArray = <T>(items: Array<T>, item: T): boolean =>
    items.indexOf(item) !== -1;

export const contain = (str: string, subStr: string): boolean =>
    str.indexOf(subStr) !== -1;

export const inContainArray = (items: Array<string>, item: string): boolean => {
    let i = 0;
    while (i < items.length && !contain(items[i], item)) {
        i++;
    }
    return i < items.length;
};

export const isSame = (a: any, b: any): boolean => {
    const strA = JSON.stringify(a);
    const strB = JSON.stringify(b);
    if (isPureObject(a) && isPureObject(b) && eq(strA.length, strB.length)) {
        let result = true;
        each(a, (value: any, key: string | number) => {
            if (!isSame((b as Record<string, any>)[key], value)) {
                result = false;
            }
        });
        return result;
    }
    return eq(strA, strB);
};

export const remove = <T>(items: Array<T>, item: T): void => {
    const position = items.indexOf(item);
    if (neq(position, -1)) {
        items.splice(position, 1);
    }
};

export const copy = <T>(
    items: Array<T> | object,
): Array<T> | object | undefined => {
    let results;
    if (isArray(items)) {
        results = copyArray(items);
    } else if (isPureObject(items)) {
        results = copyObject(items);
    }
    return results;
};

export const copyArray = <T>(items: Array<T>): Array<T> => {
    const results: any[] = [];
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

export const copyObject = (item: object): object => {
    const results: Record<string, any> = {};
    eachObject(item as Record<string, any>, (value, key) => {
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

export const isEmpty = <T>(items: Array<T> | object): boolean => {
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

export const list = <T>(
    args: Array<T>,
    callback: (...rest: T[]) => void,
): void => {
    callback(...args);
};

export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const pluck = <T, K extends Objekt = Objekt>(
    items: Array<K>,
    attribute: string,
): Array<T> => {
    const results: T[] = [];
    eachArray(items, (item) => {
        const result = item.get<T>(attribute);
        results.push(result);
    });

    return results;
};

export const pluckKeys = (
    obj: object,
    condition: (value: any, key: string) => boolean,
): Array<string> => {
    const results: string[] = [];
    eachObject(obj as Record<string, any>, (value, key) => {
        if (condition(value, key)) {
            results.push(key);
        }
    });
    return results;
};

let _scrollInterval: number | null = null;

export const scrollTo = (
    x: number,
    y: number,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    clearInterval(_scrollInterval!);
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
            clearInterval(_scrollInterval!);
        }
    }, opt_step);
};

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

export const scrollIntoView = (
    selector: string,
    opt_behavior: ScrollBehavior | undefined = 'smooth',
): void => {
    document.querySelector(selector)!.scrollIntoView({
        behavior: opt_behavior,
    });
};

export const debounce = (
    func: (ev: Event) => void,
    opt_wait: number | undefined = 250,
    opt_immediate: boolean | undefined = false,
): ((this: Window, ev: Event) => void) => {
    let timeout: number;
    return (...args) => {
        const later = () => {
            timeout = null as unknown as number;
            if (!opt_immediate) func(...args);
        };
        const callNow = opt_immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, opt_wait);
        if (callNow) func(...args);
    };
};

export const urlWithQueryString = (
    url: string,
    opt_params?: object | undefined,
): string => {
    const queryString = getQueryString(opt_params);
    const separator = contain(url, '?') ? '&' : '?';
    return url + (queryString ? separator + queryString : '');
};

export const getQueryString = (opt_params?: object): string => {
    const queries: string[] = [];
    eachObject(opt_params as Record<string, any>, (param, key) => {
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

export const getExtensionName = (url: string): string => {
    const realUrl = url.split('?', 2)[0];
    return realUrl.slice(
        (Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1,
    );
};

export const normalize = (str: string): string =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

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
