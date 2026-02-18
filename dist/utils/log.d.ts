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
export declare const consoleLog: (...message: unknown[]) => void;
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
export declare const consoleInfo: (...message: unknown[]) => void;
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
export declare const consoleWarn: (...message: unknown[]) => void;
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
export declare const consoleError: (...message: unknown[]) => void;
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
export declare const consoleDebug: (...message: unknown[]) => void;
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
export declare const consoleAssert: (condition: boolean, ...data: unknown[]) => void;
