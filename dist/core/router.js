import { isArray, eachArray, format, isUndefined, typeCast, contain, } from '../utils/operation';
/**
 * @class
 */
export class Router {
    /**
     * @param {string=} opt_route
     */
    constructor(opt_route = '') {
        this.route = opt_route;
        this.param = new RegExp('([:*])(\\w+)', 'g');
        this.escape = new RegExp('[-[]{}()+?.,]', 'g');
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.paramNames = [];
        let route = this.route;
        route = route.replace(this.escape, '\\$&');
        route = route.replace(this.param, (param, mode, paramName) => {
            this.paramNames.push(paramName);
            return mode === ':' ? '([^/]*)' : '(.*)';
        });
        this.regex = new RegExp('^' + route + '$');
    }
    /**
     * @param {!Object=} opt_params
     * @return {string}
     */
    stringify(opt_params = {}) {
        let route = this.route;
        for (const key in opt_params) {
            if (opt_params.hasOwnProperty(key)) {
                const param = opt_params[key];
                const regex = new RegExp('[:*]' + key + '\\b');
                if (regex.test(route)) {
                    route = route.replace(regex, param);
                }
                else {
                    const char = route.charAt(route.length - 1) === '&' ? '' : '&';
                    route += route.indexOf('?') === -1 ? '?' : char;
                    if (isArray(param)) {
                        eachArray(param, (value, index) => {
                            if (index > 0) {
                                route += '&';
                            }
                            route += format('{0}[]={1}', [key, value]);
                        });
                    }
                    else if (!isUndefined(param)) {
                        route += format('{0}={1}', [key, param]);
                    }
                }
            }
        }
        route = route.replace(this.param, '');
        return route[route.length - 1] === '?'
            ? route.substring(0, route.length - 1)
            : route;
    }
    /**
     * @param {string} url
     * @return {?RegExpMatchArray}
     */
    getMatches(url) {
        const questionMark = url.indexOf('?');
        if (questionMark !== -1) {
            url = url.substring(0, questionMark);
        }
        return url.match(this.regex);
    }
    /**
     * @param {string} url
     * @return {!Object}
     */
    parse(url) {
        const matches = this.getMatches(url);
        if (!matches) {
            return {};
        }
        const params = this._parseParams(url);
        for (let i = 0; i < this.paramNames.length; i++) {
            const key = this.paramNames[i];
            params[key] = typeCast(matches[i + 1]);
        }
        return params;
    }
    /**
     * @private
     * @param {string} url
     * @return {!Params}
     */
    _parseParams(url) {
        const params = {};
        const question = url.indexOf('?');
        if (question !== -1) {
            const pieces = url.substring(question + 1).split('&');
            for (let i = 0; i < pieces.length; i++) {
                const parts = pieces[i].replace('==', '&&').split('=');
                if (parts.length < 2) {
                    parts.push('');
                }
                const key = window.decodeURIComponent(parts[0]);
                const value = typeCast(window.decodeURIComponent(parts[1].replace('&&', '==')));
                if (contain(key, '[]')) {
                    const realKey = key.replace('[]', '');
                    if (!isArray(params[realKey])) {
                        params[realKey] = [value];
                    }
                    else {
                        params[realKey].push(value);
                    }
                }
                else {
                    params[key] = value;
                }
            }
        }
        return params;
    }
}
