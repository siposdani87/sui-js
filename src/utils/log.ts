import { releaseMode } from '../common/config';

/**
 * @param {...*} message
 */
export const consoleLog = (...message: any[]) => {
    if (!releaseMode) {
        console.log(...message);
    }
};

/**
 * @param {...*} message
 */
export const consoleInfo = (...message: any[]) => {
    if (!releaseMode) {
        console.info(...message);
    }
};

/**
 * @param {...*} message
 */
export const consoleWarn = (...message: any[]) => {
    if (!releaseMode) {
        console.warn(...message);
    }
};

/**
 * @param {...*} message
 */
export const consoleError = (...message: any[]) => {
    console.error(...message);
};

/**
 * @param {...*} message
 */
export const consoleDebug = (...message: any[]) => {
    console.debug(...message);
};

/**
 * @param {boolean} condition
 * @param {...*} data
 */
export const consoleAssert = (condition: boolean, ...data: any[]) => {
    console.assert(condition, ...data);
};
