/* eslint-disable no-useless-backreference */
/* eslint-disable no-useless-escape */
import { typeCast, eachArray } from '../utils/operation';
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
export class Cookie {
    /**
     * Creates a new Cookie instance with the given options. The default
     * prefix is `'app'` and the default expiration is 24 hours.
     *
     * @param opt_options Configuration options. Supports `prefix` (string)
     *     for cookie key namespace and `hours` (number) for default
     *     expiration time in hours.
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
    }
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            prefix: 'app',
            hours: 24,
        });
        this.options.merge(opt_options);
    }
    /**
     * Converts a logical cookie name to a prefixed property name
     * suitable for storage. Dots in the joined name are replaced
     * with underscores.
     *
     * @param name The logical cookie name.
     * @returns The prefixed and sanitized property name.
     */
    _getPropertyName(name) {
        return [this.options.prefix, name].join('.').replace(/\./g, '_');
    }
    /**
     * Extracts the logical cookie name from a prefixed property name
     * by removing the prefix segment and rejoining with dots.
     *
     * @param propertyName The prefixed property name from the cookie store.
     * @returns The logical cookie name.
     */
    _getName(propertyName) {
        const parts = propertyName.split('_');
        parts.shift();
        return parts.join('.');
    }
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
    set(name, value, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opt_expires = '', opt_path = '/', opt_domain = '', opt_secure = false) {
        const propertyName = this._getPropertyName(name);
        if (/^(?:expires|max\-age|path|domain|secure)$/i.test(propertyName)) {
            return;
        }
        if (opt_expires) {
            switch (opt_expires.constructor) {
                case Number:
                    opt_expires =
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        opt_expires === Infinity
                            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                '; max-age=' + opt_expires * 60 * 60;
                    break;
                case Date:
                    opt_expires =
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        '; expires=' + opt_expires.toUTCString();
                    break;
                default:
                    break;
            }
        }
        else {
            const date = new Date();
            date.setTime(date.getTime() + this.options.hours * 60 * 60 * 1000);
            opt_expires = '; expires=' + date.toUTCString();
        }
        document.cookie =
            encodeURIComponent(propertyName) +
                '=' +
                encodeURIComponent(value) +
                opt_expires +
                (opt_domain ? '; domain=' + opt_domain : '') +
                (opt_path ? '; path=' + opt_path : '') +
                (opt_secure ? '; secure' : '');
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(name) {
        const propertyName = this._getPropertyName(name);
        const regex = new RegExp('(?:(?:^|.*;)\\s*' +
            encodeURIComponent(propertyName).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return typeCast(decodeURIComponent(document.cookie.replace(regex, '$1')) || null);
    }
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
    remove(name, opt_path = '', opt_domain = '', opt_secure = false) {
        if (this.hasKey(name)) {
            const expires = new Date(1970, 0, 1);
            this.set(name, '', expires, opt_path, opt_domain, opt_secure);
        }
    }
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
    hasKey(name) {
        const propertyName = this._getPropertyName(name);
        const regex = new RegExp('(?:^|;\\s*)' +
            encodeURIComponent(propertyName).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=');
        return regex.test(document.cookie);
    }
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
    getKeys() {
        const keys = document.cookie
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
            .split(/\s*(?:\=[^;]*)?;\s*/);
        for (let i = 0; i < keys.length; i++) {
            keys[i] = this._getName(decodeURIComponent(keys[i]));
        }
        return keys;
    }
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
    clear() {
        const keys = this.getKeys();
        eachArray(keys, (key) => {
            this.remove(key);
        });
    }
}
