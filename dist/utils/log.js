/**
 * @export
 * @define {boolean}
 */
export const releaseMode = false;
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
    if (!releaseMode) {
        console.error(...message);
    }
};
