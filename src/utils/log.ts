import { releaseMode } from '../common/config';

export const consoleLog = (...message: any[]) => {
    if (!releaseMode) {
        console.log(...message);
    }
};

export const consoleInfo = (...message: any[]) => {
    if (!releaseMode) {
        console.info(...message);
    }
};

export const consoleWarn = (...message: any[]) => {
    if (!releaseMode) {
        console.warn(...message);
    }
};

export const consoleError = (...message: any[]) => {
    console.error(...message);
};

export const consoleDebug = (...message: any[]) => {
    console.debug(...message);
};

export const consoleAssert = (condition: boolean, ...data: any[]) => {
    console.assert(condition, ...data);
};
