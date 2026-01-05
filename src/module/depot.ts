import { eachArray, typeCast } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { encrypt, decrypt } from '../utils/coder';

export class Depot {
    type: 'LOCAL' | 'SESSION';
    options: Objekt;
    storage: Storage;

    constructor(
        type: 'LOCAL' | 'SESSION',
        opt_options: object | undefined = {},
    ) {
        this.type = type;

        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            prefix: 'app',
            secret: 'secret',
            hours: 24 * 7,
            interval: 60 * 1000,
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.storage =
            this.type === 'LOCAL' ? window.localStorage : window.sessionStorage;

        setInterval(() => {
            this._checkExpires();
        }, this.options.interval);
    }

    private _getPropertyName(name: string): string {
        return [this.options.prefix, name].join('.');
    }

    private _getName(propertyName: string): string {
        const parts = propertyName.split('.');
        parts.shift();
        return parts.join('.');
    }

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

    remove(name: string): void {
        const propertyName = this._getPropertyName(name);
        this.storage.removeItem(propertyName);
    }

    clear(): void {
        this.storage.clear();
    }

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

    private _isExpired(name: string): boolean {
        const date = new Date();
        const expireDate = this._getExpiresDate(name);
        return !!expireDate && date.getTime() >= expireDate.getTime();
    }

    private _getExpiresDate(name: string): Date | null {
        const propertyName = this._getPropertyName(name);
        const item = this.storage.getItem(propertyName);
        if (item) {
            const utcString = item.split(';', 2)[0];
            return new Date(utcString);
        }
        return null;
    }

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
