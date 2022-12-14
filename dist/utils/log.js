import { releaseMode } from '../common/config';
/**
 * @param {...*} message
 */
export const consoleLog = (...message) => {
    if (!releaseMode) {
        console.log(...message);
    }
};
/**
 * @param {...*} message
 */
export const consoleInfo = (...message) => {
    if (!releaseMode) {
        console.info(...message);
    }
};
/**
 * @param {...*} message
 */
export const consoleWarn = (...message) => {
    if (!releaseMode) {
        console.warn(...message);
    }
};
/**
 * @param {...*} message
 */
export const consoleError = (...message) => {
    console.error(...message);
};
/**
 * @param {...*} message
 */
export const consoleDebug = (...message) => {
    console.debug(...message);
};
/**
 * @param {boolean} condition
 * @param {...*} data
 */
export const consoleAssert = (condition, ...data) => {
    console.assert(condition, ...data);
};
