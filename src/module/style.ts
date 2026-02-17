import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ProgressBar } from './progressBar';

export class Style {
    progressBar: ProgressBar;
    options!: Objekt;
    head!: Knot;

    constructor(
        progressBar: ProgressBar,
        opt_options: object | undefined = {},
    ) {
        this.progressBar = progressBar;
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.head = new Query('head').getKnot();
    }

    load(
        id: string,
        url: string,
        opt_params?: object,
        opt_rel: string | undefined = 'stylesheet',
        opt_media: string | undefined = 'all',
    ) {
        this.progressBar.show();
        const deferred = new Deferred<boolean, boolean>();
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

    remove(id: string): void {
        const style = new Query('#' + id).getKnot();
        if (!style.isEmpty()) {
            style.remove();
        }
    }
}
