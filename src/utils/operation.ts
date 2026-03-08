/**
 * Barrel re-export for all operation utilities.
 *
 * This module re-exports functions from the split sub-modules for
 * backward compatibility. All existing imports from `operation.ts`
 * continue to work unchanged.
 *
 * @category Utility
 */

export { eq, neq, gt, gte, lt, lte } from './comparison';

export {
    is,
    instanceOf,
    isArray,
    isFunction,
    isString,
    isNumber,
    isFloat,
    isInteger,
    isObject,
    isPureObject,
    isDate,
    isNull,
    isInfinity,
    isUndefined,
    typeCast,
} from './typeGuards';

export { eachArray, eachObject, each, sleepEach } from './iteration';

export {
    clearArray,
    inArray,
    inContainArray,
    remove,
    isEmpty,
    list,
    pluck,
} from './arrayOps';

export {
    clearObject,
    clear,
    copyArray,
    copyObject,
    copy,
    merge,
    pluckKeys,
    isSame,
    getQueryString,
    urlWithQueryString,
} from './objectOps';

export {
    contain,
    capitalize,
    format,
    getExtensionName,
    normalize,
    noop,
} from './stringOps';

export {
    scrollTo,
    scrollToElement,
    scrollIntoView,
    debounce,
    copyToClipboard,
} from './domOps';
