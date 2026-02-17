import { Objekt } from '../core/objekt';
/**
 * Browser cookie management with automatic key prefixing. Cookie provides
 * a structured API for reading, writing, and deleting browser cookies,
 * with all keys scoped under a configurable prefix to avoid collisions
 * with other applications on the same domain.
 *
 * Cookie values are automatically URI-encoded when stored and decoded
 * when retrieved. The {@link get} method applies type-casting via
 * `typeCast`, so stored numeric or boolean strings are returned as
 * their native types.
 *
 * @example
 * const cookie = new Cookie({ prefix: 'myApp', hours: 48 });
 *
 * cookie.set('token', 'abc123');
 * cookie.get('token'); // 'abc123'
 *
 * cookie.set('count', '5');
 * cookie.get('count'); // 5 (type-cast to number)
 *
 * cookie.hasKey('token'); // true
 * cookie.remove('token');
 * cookie.hasKey('token'); // false
 *
 * @see {@link Objekt}
 * @see {@link Depot}
 * @category Module
 */
export declare class Cookie {
    options: Objekt;
    /**
     * Creates a new Cookie instance with the given options. The default
     * prefix is `'app'` and the default expiration is 24 hours.
     *
     * @param opt_options Configuration options. Supports `prefix` (string)
     *     for cookie key namespace and `hours` (number) for default
     *     expiration time in hours.
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    private _setOptions;
    /**
     * Converts a logical cookie name to a prefixed property name
     * suitable for storage. Dots in the joined name are replaced
     * with underscores.
     *
     * @param name The logical cookie name.
     * @returns The prefixed and sanitized property name.
     */
    private _getPropertyName;
    /**
     * Extracts the logical cookie name from a prefixed property name
     * by removing the prefix segment and rejoining with dots.
     *
     * @param propertyName The prefixed property name from the cookie store.
     * @returns The logical cookie name.
     */
    private _getName;
    /**
     * Stores a cookie with the given name and value. The name is
     * automatically prefixed. Expiration can be specified as a number
     * of hours, a `Date` object, or omitted to use the default
     * expiration from the constructor options.
     *
     * Reserved cookie attribute names (`expires`, `max-age`, `path`,
     * `domain`, `secure`) are silently rejected as cookie names.
     *
     * @param name The logical cookie name to store.
     * @param value The string value to store.
     * @param opt_expires Expiration as hours (number), a `Date` object,
     *     or `Infinity` for a permanent cookie. When omitted, defaults
     *     to the configured `hours` option.
     * @param opt_path The cookie path. Defaults to `'/'`.
     * @param opt_domain The cookie domain. Defaults to empty (current domain).
     * @param opt_secure Whether to set the `Secure` flag. Defaults to `false`.
     *
     * @example
     * const cookie = new Cookie({ prefix: 'app' });
     *
     * // Default expiration from options
     * cookie.set('user', 'john');
     *
     * // Expire in 2 hours
     * cookie.set('session', 'xyz', 2);
     *
     * // Expire at a specific date
     * cookie.set('promo', 'sale', new Date('2025-12-31'));
     */
    set(name: string, value: string, opt_expires?: any, opt_path?: string | undefined, opt_domain?: string | undefined, opt_secure?: boolean | undefined): void;
    /**
     * Reads a cookie value by its logical name and returns it with
     * automatic type-casting. Numeric strings are returned as numbers,
     * `'true'`/`'false'` as booleans, and so on.
     *
     * @param name The logical cookie name to read.
     * @returns The type-cast cookie value, or `null` if the cookie
     *     does not exist.
     *
     * @example
     * cookie.set('count', '42');
     * cookie.get('count'); // 42 (number)
     *
     * cookie.set('active', 'true');
     * cookie.get('active'); // true (boolean)
     */
    get(name: string): any;
    /**
     * Deletes a cookie by setting its expiration to the Unix epoch.
     * The cookie is only removed if it currently exists.
     *
     * @param name The logical cookie name to remove.
     * @param opt_path The cookie path used when the cookie was set.
     * @param opt_domain The cookie domain used when the cookie was set.
     * @param opt_secure The secure flag used when the cookie was set.
     *
     * @example
     * cookie.set('token', 'abc');
     * cookie.remove('token');
     * cookie.get('token'); // null
     */
    remove(name: string, opt_path?: string | undefined, opt_domain?: string | undefined, opt_secure?: boolean | undefined): void;
    /**
     * Checks whether a cookie with the given logical name exists in
     * the browser's cookie store.
     *
     * @param name The logical cookie name to check.
     * @returns `true` if the cookie exists, `false` otherwise.
     *
     * @example
     * cookie.set('lang', 'en');
     * cookie.hasKey('lang'); // true
     * cookie.hasKey('missing'); // false
     */
    hasKey(name: string): boolean;
    /**
     * Returns an array of all logical cookie names currently stored
     * under this instance's prefix. The prefix is stripped from each
     * returned name.
     *
     * @returns An array of logical cookie names.
     *
     * @example
     * cookie.set('a', '1');
     * cookie.set('b', '2');
     * cookie.getKeys(); // ['a', 'b']
     */
    getKeys(): Array<string>;
    /**
     * Removes all cookies managed by this instance by iterating over
     * all known keys and calling {@link remove} for each.
     *
     * @example
     * cookie.set('a', '1');
     * cookie.set('b', '2');
     * cookie.clear();
     * cookie.getKeys(); // []
     */
    clear(): void;
}
