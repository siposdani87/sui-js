/* eslint-disable no-useless-backreference */
/* eslint-disable no-useless-escape */
import { typeCast, eachArray } from '../utils/operation';
import { Objekt } from '../core/objekt';
export class Cookie {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            prefix: 'app',
            hours: 24,
        });
        this.options.merge(opt_options);
    }
    _getPropertyName(name) {
        return [this.options.prefix, name].join('.').replace(/\./g, '_');
    }
    _getName(propertyName) {
        const parts = propertyName.split('_');
        parts.shift();
        return parts.join('.');
    }
    set(name, value, opt_expires = '', opt_path = '/', opt_domain = '', opt_secure = false) {
        const propertyName = this._getPropertyName(name);
        if (/^(?:expires|max\-age|path|domain|secure)$/i.test(propertyName)) {
            return;
        }
        if (opt_expires) {
            switch (opt_expires.constructor) {
                case Number:
                    opt_expires =
                        opt_expires === Infinity
                            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                            : '; max-age=' + opt_expires * 60 * 60;
                    break;
                case Date:
                    opt_expires =
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
    get(name) {
        const propertyName = this._getPropertyName(name);
        const regex = new RegExp('(?:(?:^|.*;)\\s*' +
            encodeURIComponent(propertyName).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return typeCast(decodeURIComponent(document.cookie.replace(regex, '$1')) || null);
    }
    remove(name, opt_path = '', opt_domain = '', opt_secure = false) {
        if (this.hasKey(name)) {
            const expires = new Date(1970, 0, 1);
            this.set(name, '', expires, opt_path, opt_domain, opt_secure);
        }
    }
    hasKey(name) {
        const propertyName = this._getPropertyName(name);
        const regex = new RegExp('(?:^|;\\s*)' +
            encodeURIComponent(propertyName).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=');
        return regex.test(document.cookie);
    }
    getKeys() {
        const keys = document.cookie
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
            .split(/\s*(?:\=[^;]*)?;\s*/);
        for (let i = 0; i < keys.length; i++) {
            keys[i] = this._getName(decodeURIComponent(keys[i]));
        }
        return keys;
    }
    clear() {
        const keys = this.getKeys();
        eachArray(keys, (key) => {
            this.remove(key);
        });
    }
}
