import { typeCast, each } from '../utils/operation';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class Cookie {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            prefix: 'app',
            hours: 24,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getPropertyName(name) {
        return [this.options.prefix, name].join('.').replace(/\./g, '_');
    }
    /**
     * @private
     * @param {string} propertyName
     * @return {string}
     */
    _getName(propertyName) {
        const parts = propertyName.split('_');
        parts.shift();
        return parts.join('.');
    }
    /**
     * @param {string} name
     * @param {string} value
     * @param {string|number|boolean|!Date=} opt_expires
     * @param {string=} opt_path
     * @param {string=} opt_domain
     * @param {boolean=} opt_secure
     * @return {undefined}
     */
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
                            : '; max-age=' +
                                /** @type {number} */ opt_expires *
                                    60 *
                                    60;
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
    /**
     * @param {string} name
     * @return {*}
     */
    get(name) {
        const propertyName = this._getPropertyName(name);
        const regex = new RegExp('(?:(?:^|.*;)\\s*' +
            encodeURIComponent(propertyName).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return typeCast(decodeURIComponent(document.cookie.replace(regex, '$1')) || null);
    }
    /**
     * @param {string} name
     * @param {string=} opt_path
     * @param {string=} opt_domain
     * @param {boolean=} opt_secure
     * @return {undefined}
     */
    remove(name, opt_path = '', opt_domain = '', opt_secure = false) {
        if (this.hasKey(name)) {
            const expires = new Date(1970, 0, 1);
            this.set(name, '', expires, opt_path, opt_domain, opt_secure);
        }
    }
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasKey(name) {
        const propertyName = this._getPropertyName(name);
        const regex = new RegExp('(?:^|;\\s*)' +
            encodeURIComponent(propertyName).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=');
        return regex.test(document.cookie);
    }
    /**
     * @return {!Array}
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
     * @return {undefined}
     */
    clear() {
        const keys = this.getKeys();
        each(keys, (key) => {
            this.remove(key);
        });
    }
}
