import { contain } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Http } from './http';
import { consoleWarn } from '../utils/log';
import { Knot, Promize } from '../core';

/**
 * @class
 */
export class Template {
    http: Http;
    options: Objekt;
    viewNode: Knot;
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http: Http, opt_options: Object | undefined = {}) {
        this.http = http;

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
            selector: '.template-view',
            locale: navigator.language,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.viewNode = new Query(this.options.selector).getKnot();
    }
    /**
     * @return {!Knot}
     */
    getViewNode(): Knot {
        return this.viewNode;
    }
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url: string, opt_force: boolean | undefined = false): Promize {
        const deferred = new Deferred();
        const templateUrl = this.viewNode.getAttribute('data-template-url');
        const locale = this.viewNode.getAttribute('data-locale');
        if (
            !opt_force &&
            contain(this.options.locale, locale) &&
            contain(url, templateUrl)
        ) {
            this.viewNode.removeAttribute('data-locale');
            const node = new Query('.page-content', this.viewNode).getKnot();
            deferred.resolve(node);
        } else {
            this.viewNode.setAttribute('data-template-url', url);
            this.http.get(url).then(
                (data) => {
                    deferred.resolve(this._handleData(data, false));
                },
                (data) => {
                    deferred.reject(this._handleData(data, true));
                },
            );
        }
        return deferred.promise();
    }
    /**
     * @private
     * @param {!Knot} data
     * @param {boolean} error
     * @return {!Knot}
     */
    private _handleData(data: Knot, error: boolean): Knot {
        const node = new Query('.page-content', data).getKnot();
        if (error) {
            const messageKnot = new Query('.message', node).getKnot();
            const message = {
                content: messageKnot.getText(),
                type: messageKnot.getAttribute('class').split(' ')[1],
            };
            this.eventError(message);
        } else {
            this.viewNode.insert(node);
        }
        return node;
    }
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message: Object): void {
        consoleWarn('Template.eventError()', message);
    }
}
