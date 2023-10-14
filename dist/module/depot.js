import { eachArray, typeCast } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { encrypt, decrypt } from '../utils/coder';
export class Depot {
    constructor(type, opt_options = {}) {
        this.type = type;
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            prefix: 'app',
            secret: 'secret',
            hours: 24 * 7,
            interval: 60 * 1000,
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.storage =
            this.type === 'LOCAL' ? window.localStorage : window.sessionStorage;
        setInterval(() => {
            this._checkExpires();
        }, this.options.interval);
    }
    _getPropertyName(name) {
        return [this.options.prefix, name].join('.');
    }
    _getName(propertyName) {
        const parts = propertyName.split('.');
        parts.shift();
        return parts.join('.');
    }
    set(name, value, opt_expires) {
        const expires = this._getExpires(opt_expires);
        const encrypted = expires + ';' + encrypt(value, this.options.secret);
        const propertyName = this._getPropertyName(name);
        this.storage.setItem(propertyName, encrypted);
    }
    get(name) {
        const propertyName = this._getPropertyName(name);
        const item = this.storage.getItem(propertyName);
        let result = null;
        if (item && item.indexOf(';') !== -1) {
            const encrypted = item.split(';', 2)[1] || encrypt(null, this.options.secret);
            const decrypted = decrypt(encrypted, this.options.secret);
            result = typeCast(decrypted);
        }
        return result;
    }
    remove(name) {
        const propertyName = this._getPropertyName(name);
        this.storage.removeItem(propertyName);
    }
    clear() {
        this.storage.clear();
    }
    _checkExpires() {
        const properyNames = Object.keys(this.storage);
        eachArray(properyNames, (properyName) => {
            const name = this._getName(properyName);
            const isExpired = this._isExpired(name);
            if (isExpired) {
                this.remove(name);
            }
        });
    }
    _isExpired(name) {
        const date = new Date();
        const expireDate = this._getExpiresDate(name);
        return !!expireDate && date.getTime() >= expireDate.getTime();
    }
    _getExpiresDate(name) {
        const propertyName = this._getPropertyName(name);
        const item = this.storage.getItem(propertyName);
        if (item) {
            const utcString = item.split(';', 2)[0];
            return new Date(utcString);
        }
        return null;
    }
    _getExpires(opt_expires) {
        const date = new Date();
        if (opt_expires) {
            switch (opt_expires.constructor) {
                case Number:
                    date.setTime(date.getTime() +
                        opt_expires * 60 * 60 * 1000);
                    opt_expires =
                        opt_expires === Infinity
                            ? 'Fri, 31 Dec 9999 23:59:59 GMT'
                            : date.toUTCString();
                    break;
                case Date:
                    opt_expires = opt_expires.toUTCString();
                    break;
                default:
                    break;
            }
        }
        else {
            date.setTime(date.getTime() + this.options.hours * 60 * 60 * 1000);
            opt_expires = date.toUTCString();
        }
        return opt_expires;
    }
}
