import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ProgressBar } from './progressBar';
import { Promize } from '../core';

/**
 * @class
 */
export class Style {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    /**
     * @param {!ProgressBar} progressBar
     * @param {!Object=} opt_options
     */
    constructor(
        progressBar: ProgressBar,
        opt_options: Object | undefined = {},
    ) {
        this.progressBar = progressBar;
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
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.head = new Query('head').getKnot();
    }
    /**
     * @param {string} id
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {string=} opt_rel
     * @param {string=} opt_media
     * @return {!Promize}
     */
    load(
        id: string,
        url: string,
        opt_params?: Object,
        opt_rel: string | undefined = 'stylesheet',
        opt_media: string | undefined = 'all',
    ): Promize {
        this.progressBar.show();
        const deferred = new Deferred();
        const style = new Query('#' + id);
        if (style.size() > 0) {
            this.progressBar.hide();
            deferred.resolve(true);
        } else {
            const linkKnot = new Knot<HTMLLinkElement>('link');
            linkKnot.setId(id);
            linkKnot.setAttribute('href', urlWithQueryString(url, opt_params));
            linkKnot.setAttribute('rel', opt_rel);
            linkKnot.setAttribute('media', opt_media);

            linkKnot.setAttribute('onload', () => {
                this.progressBar.hide();
                deferred.resolve(true);
            });

            linkKnot.setAttribute('onerror', () => {
                this.progressBar.hide();
                deferred.reject(false);
            });

            this.head.appendChild(linkKnot);
        }
        return deferred.promise();
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    remove(id: string): void {
        const style = new Query('#' + id).getKnot();
        if (!style.isEmpty()) {
            style.remove();
        }
    }
}
