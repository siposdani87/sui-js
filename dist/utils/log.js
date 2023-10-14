import { releaseMode } from '../common/config';
export const consoleLog = (...message) => {
    if (!releaseMode) {
        console.log(...message);
    }
};
export const consoleInfo = (...message) => {
    if (!releaseMode) {
        console.info(...message);
    }
};
export const consoleWarn = (...message) => {
    if (!releaseMode) {
        console.warn(...message);
    }
};
export const consoleError = (...message) => {
    console.error(...message);
};
export const consoleDebug = (...message) => {
    console.debug(...message);
};
export const consoleAssert = (condition, ...data) => {
    console.assert(condition, ...data);
};
