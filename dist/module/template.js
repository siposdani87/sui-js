import { contain } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Template {
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http, opt_options = {}) {
        this.http = http;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            selector: '.template-view',
            locale: navigator.language,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.viewNode = new Query(this.options.selector).getKnot();
    }
    /**
     * @return {!Knot}
     */
    getViewNode() {
        return this.viewNode;
    }
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url, opt_force = false) {
        const deferred = new Deferred();
        const templateUrl = this.viewNode.getAttribute('data-template-url');
        const locale = this.viewNode.getAttribute('data-locale');
        if (!opt_force &&
            contain(this.options.locale, locale) &&
            contain(url, templateUrl)) {
            this.viewNode.removeAttribute('data-locale');
            const node = new Query('.page-content', this.viewNode).getKnot();
            deferred.resolve(node);
        }
        else {
            this.viewNode.setAttribute('data-template-url', url);
            this.http.get(url).then((data) => {
                deferred.resolve(this._handleData(data, false));
            }, (data) => {
                deferred.reject(this._handleData(data, true));
            });
        }
        return deferred.promise();
    }
    /**
     * @private
     * @param {!Knot} data
     * @param {boolean} error
     * @return {!Knot}
     */
    _handleData(data, error) {
        const node = new Query('.page-content', data).getKnot();
        if (error) {
            const messageKnot = new Query('.message', node).getKnot();
            const message = {
                content: messageKnot.getText(),
                type: messageKnot.getAttribute('class').split(' ')[1],
            };
            this.eventError(message);
        }
        else {
            this.viewNode.insert(node);
        }
        return node;
    }
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message) {
        consoleWarn('Template.eventError()', message);
    }
}
