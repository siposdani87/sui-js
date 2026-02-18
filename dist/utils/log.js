/**
 * @module log
 *
 * Conditional console logging utilities.
 *
 * Provides thin wrappers around native `console.*` methods that respect
 * the application's release mode setting. When `releaseMode` is `true`
 * (imported from `../common/config`), informational logging
 * ({@link consoleLog}, {@link consoleInfo}, {@link consoleWarn}) is
 * suppressed to keep production output clean. Error, debug, and assert
 * output is always emitted regardless of the mode.
 *
 * @category Utility
 */
import { releaseMode } from '../common/config';
/**
 * Logs messages to `console.log`.
 *
 * Output is suppressed when `releaseMode` is `true`.
 *
 * @param message - One or more values to log.
 * @category Utility
 *
 * @example
 * consoleLog('User loaded', userId);
 */
export const consoleLog = (...message) => {
    if (!releaseMode) {
        console.log(...message);
    }
};
/**
 * Logs informational messages to `console.info`.
 *
 * Output is suppressed when `releaseMode` is `true`.
 *
 * @param message - One or more values to log.
 * @category Utility
 *
 * @example
 * consoleInfo('Cache refreshed');
 */
export const consoleInfo = (...message) => {
    if (!releaseMode) {
        console.info(...message);
    }
};
/**
 * Logs warning messages to `console.warn`.
 *
 * Output is suppressed when `releaseMode` is `true`.
 *
 * @param message - One or more values to log.
 * @category Utility
 *
 * @example
 * consoleWarn('Deprecated method called');
 */
export const consoleWarn = (...message) => {
    if (!releaseMode) {
        console.warn(...message);
    }
};
/**
 * Logs error messages to `console.error`.
 *
 * Always outputs regardless of `releaseMode`, ensuring that errors
 * are never silently swallowed in production.
 *
 * @param message - One or more values to log.
 * @category Utility
 *
 * @example
 * consoleError('Failed to load config', error);
 */
export const consoleError = (...message) => {
    console.error(...message);
};
/**
 * Logs debug messages to `console.debug`.
 *
 * Always outputs regardless of `releaseMode`, allowing fine-grained
 * debugging that can be filtered in browser developer tools.
 *
 * @param message - One or more values to log.
 * @category Utility
 *
 * @example
 * consoleDebug('State transition', prevState, nextState);
 */
export const consoleDebug = (...message) => {
    console.debug(...message);
};
/**
 * Asserts a condition using `console.assert`.
 *
 * Always outputs regardless of `releaseMode`. If `condition` is falsy,
 * the assertion message and optional data are written to the console.
 *
 * @param condition - The boolean condition to assert.
 * @param data - Additional values to include in the assertion output.
 * @category Utility
 *
 * @example
 * consoleAssert(items.length > 0, 'Items array must not be empty');
 */
export const consoleAssert = (condition, ...data) => {
    console.assert(condition, ...data);
};
