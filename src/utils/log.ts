import { releaseMode } from '../core/sui';

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
    if (!releaseMode) {
        console.error(...message);
    }
};
