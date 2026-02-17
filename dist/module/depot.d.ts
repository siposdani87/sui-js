import { Objekt } from '../core/objekt';
/**
 * Encrypted browser storage wrapper for localStorage and sessionStorage.
 * Depot stores values with AES encryption using a configurable secret,
 * and automatically manages entry expiration via periodic checks.
 *
 * Each stored entry is serialized as `"<expires_utc>;<encrypted_value>"`,
 * where the expiration timestamp is stored in UTC string format and the
 * value is encrypted using the configured secret. On retrieval, entries
 * are decrypted and type-cast via `typeCast`.
 *
 * A periodic interval (configurable via `interval` option) runs
 * {@link _checkExpires} to automatically remove entries that have passed
 * their expiration time.
 *
 * @example
 * const localDepot = new Depot('LOCAL', {
 *     prefix: 'myApp',
 *     secret: 'my-secret-key',
 *     hours: 48,
 * });
 *
 * localDepot.set('user', 'john');
 * localDepot.get('user'); // 'john'
 *
 * localDepot.set('session', 'xyz', 2); // expires in 2 hours
 * localDepot.remove('session');
 *
 * const sessionDepot = new Depot('SESSION', { prefix: 'myApp' });
 * sessionDepot.set('temp', 'data');
 *
 * @see {@link Cookie}
 * @see {@link Objekt}
 * @category Module
 */
export declare class Depot {
    type: 'LOCAL' | 'SESSION';
    options: Objekt;
    storage: Storage;
    /**
     * Creates a new Depot instance backed by either localStorage or
     * sessionStorage. Initializes the storage backend and starts the
     * periodic expiration checker.
     *
     * @param type The storage backend to use: `'LOCAL'` for
     *     `window.localStorage` or `'SESSION'` for `window.sessionStorage`.
     * @param opt_options Configuration options. Supports `prefix` (string)
     *     for key namespace, `secret` (string) for AES encryption key,
     *     `hours` (number) for default expiration in hours, and
     *     `interval` (number) for expiration check frequency in
     *     milliseconds.
     */
    constructor(type: 'LOCAL' | 'SESSION', opt_options?: object | undefined);
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    private _setOptions;
    /**
     * Selects the appropriate Storage backend based on the type and
     * starts the periodic expiration checker interval.
     */
    private _init;
    /**
     * Converts a logical name to a prefixed property name for storage.
     *
     * @param name The logical storage key name.
     * @returns The dot-prefixed property name.
     */
    private _getPropertyName;
    /**
     * Extracts the logical name from a prefixed property name by
     * removing the prefix segment.
     *
     * @param propertyName The prefixed property name from storage.
     * @returns The logical storage key name.
     */
    private _getName;
    /**
     * Stores a value in the selected storage backend. The value is
     * AES-encrypted with the configured secret and stored alongside
     * an expiration timestamp.
     *
     * @param name The logical key name to store under.
     * @param value The value to encrypt and store. Any type is accepted.
     * @param opt_expires Expiration as hours (number), a `Date` object,
     *     or `Infinity` for permanent storage. When omitted, defaults
     *     to the configured `hours` option.
     *
     * @example
     * const depot = new Depot('LOCAL', { secret: 'key123' });
     *
     * depot.set('token', 'abc');
     * depot.set('session', 'xyz', 2); // expires in 2 hours
     * depot.set('permanent', 'data', Infinity);
     */
    set(name: string, value: any, opt_expires?: string | number | boolean | Date): void;
    /**
     * Retrieves and decrypts a value from storage by its logical name.
     * The decrypted value is automatically type-cast, so stored numeric
     * or boolean strings are returned as their native types.
     *
     * @param name The logical key name to retrieve.
     * @returns The decrypted and type-cast value, or `null` if the
     *     key does not exist or the stored format is invalid.
     *
     * @example
     * depot.set('count', '42');
     * depot.get('count'); // 42 (number)
     *
     * depot.get('nonexistent'); // null
     */
    get(name: string): any;
    /**
     * Removes a single entry from storage by its logical name.
     *
     * @param name The logical key name to remove.
     *
     * @example
     * depot.set('token', 'abc');
     * depot.remove('token');
     * depot.get('token'); // null
     */
    remove(name: string): void;
    /**
     * Clears all entries from the underlying storage backend. This
     * removes all keys, not just those managed by this Depot instance.
     *
     * @example
     * depot.set('a', '1');
     * depot.set('b', '2');
     * depot.clear();
     */
    clear(): void;
    /**
     * Iterates over all storage keys and removes entries that have
     * passed their expiration time. Called periodically by the
     * internal interval timer.
     */
    private _checkExpires;
    /**
     * Checks whether a stored entry has expired by comparing the
     * current time against the entry's expiration date.
     *
     * @param name The logical key name to check.
     * @returns `true` if the entry exists and has expired, `false` otherwise.
     */
    private _isExpired;
    /**
     * Extracts the expiration date from a stored entry by parsing the
     * UTC string stored before the semicolon delimiter.
     *
     * @param name The logical key name to read.
     * @returns The expiration `Date`, or `null` if the entry does not exist.
     */
    private _getExpiresDate;
    /**
     * Computes an expiration UTC string from the given parameter. Supports
     * hours as a number, a `Date` object, or `Infinity` for no expiration.
     * When omitted, uses the configured `hours` default.
     *
     * @param opt_expires The expiration specification.
     * @returns A UTC date string representing the expiration time.
     */
    private _getExpires;
}
