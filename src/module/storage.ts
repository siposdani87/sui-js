import { eachArray, typeCast } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { encrypt, decrypt } from '../utils/coder';

/**
 * @class
 */
export class Storage {
    type: 'LOCAL' | 'SESSION';
    options: Objekt;
    storage: globalThis.Storage;
    /**
     * @param {string} type
     * @param {!Object} opt_options
     */
    constructor(
        type: 'LOCAL' | 'SESSION',
        opt_options: Object | undefined = {},
    ) {
        this.type = type;

        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            prefix: 'app',
            secret: 'secret',
            hours: 24 * 7,
            interval: 60 * 1000,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.storage =
            this.type === 'LOCAL' ? window.localStorage : window.sessionStorage;

        setInterval(() => {
            this._checkExpires();
        }, this.options.interval);
    }
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getPropertyName(name: string): string {
        return [this.options.prefix, name].join('.');
    }
    /**
     * @private
     * @param {string} propertyName
     * @return {string}
     */
    private _getName(propertyName: string): string {
        const parts = propertyName.split('.');
        parts.shift();
        return parts.join('.');
    }
    /**
     * @param {string} name
     * @param {*} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {undefined}
     */
    set(
        name: string,
        value: any,
        opt_expires?: string | number | boolean | Date,
    ): void {
        const expires = this._getExpires(opt_expires);
        const encrypted = expires + ';' + encrypt(value, this.options.secret);
        const propertyName = this._getPropertyName(name);
        this.storage.setItem(propertyName, encrypted);
    }
    /**
     * @param {string} name
     * @return {*}
     */
    get(name: string): any {
        const propertyName = this._getPropertyName(name);
        const item = this.storage.getItem(propertyName);
        let result = null;
        if (item && item.indexOf(';') !== -1) {
            const encrypted =
                item.split(';', 2)[1] || encrypt(null, this.options.secret);
            const decrypted = decrypt(encrypted, this.options.secret);
            result = typeCast(decrypted);
        }
        return result;
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    remove(name: string): void {
        const propertyName = this._getPropertyName(name);
        this.storage.removeItem(propertyName);
    }
    /**
     * @return {undefined}
     */
    clear(): void {
        this.storage.clear();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _checkExpires(): void {
        const properyNames = Object.keys(this.storage);
        eachArray(properyNames, (properyName) => {
            const name = this._getName(properyName);
            const isExpired = this._isExpired(name);
            if (isExpired) {
                this.remove(name);
            }
        });
    }
    /**
     * @private
     * @param {string} name
     * @return {boolean}
     */
    private _isExpired(name: string): boolean {
        const date = new Date();
        const expireDate = this._getExpiresDate(name);
        return !!expireDate && date.getTime() >= expireDate.getTime();
    }
    /**
     * @private
     * @param {string} name
     * @return {?Date}
     */
    private _getExpiresDate(name: string): Date | null {
        const propertyName = this._getPropertyName(name);
        const item = this.storage.getItem(propertyName);
        if (item) {
            const utcString = item.split(';', 2)[0];
            return new Date(utcString);
        }
        return null;
    }
    /**
     * @private
     * @param {string|number|boolean|!Date=} opt_expires
     * @return {string}
     */
    private _getExpires(
        opt_expires?: string | number | boolean | Date,
    ): string {
        const date = new Date();
        if (opt_expires) {
            switch (opt_expires.constructor) {
                case Number:
                    date.setTime(
                        date.getTime() +
                            (opt_expires as number) * 60 * 60 * 1000,
                    );
                    opt_expires =
                        opt_expires === Infinity
                            ? 'Fri, 31 Dec 9999 23:59:59 GMT'
                            : date.toUTCString();
                    break;
                case Date:
                    opt_expires = (opt_expires as Date).toUTCString();
                    break;
                default:
                    break;
            }
        } else {
            date.setTime(date.getTime() + this.options.hours * 60 * 60 * 1000);
            opt_expires = date.toUTCString();
        }
        return opt_expires as string;
    }
}
