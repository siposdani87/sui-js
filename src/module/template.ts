import { contain } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Http } from './http';
import { consoleError } from '../utils/log';
import { Knot } from '../core';

export class Template {
    http: Http;
    options: Objekt<{ selector: string; locale: string }>;
    viewKnot: Knot;

    constructor(http: Http, opt_options: Object | undefined = {}) {
        this.http = http;

        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({
            selector: '.template-view',
            locale: navigator.language,
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.viewKnot = new Query(this.options.selector).getKnot();
    }

    getViewKnot(): Knot {
        return this.viewKnot;
    }

    load(url: string, opt_force: boolean | undefined = false) {
        const deferred = new Deferred<Knot, Knot>();
        const templateUrl = this.viewKnot.getAttribute('data-template-url');
        const locale = this.viewKnot.getAttribute('data-locale');
        if (
            !opt_force &&
            contain(this.options.locale, locale) &&
            contain(url, templateUrl)
        ) {
            this.viewKnot.removeAttribute('data-locale');
            const knot = new Query('.page-content', this.viewKnot).getKnot();
            deferred.resolve(knot);
        } else {
            this.viewKnot.setAttribute('data-template-url', url);
            this.http.get(url).then(
                (data) => {
                    deferred.resolve(this._spaNavigate(data.get('raw'), false));
                },
                (data) => {
                    deferred.reject(this._spaNavigate(data.get('raw'), true));
                },
            );
        }
        return deferred.promise();
    }

    _spaNavigate(data: Knot, isError: boolean) {
        // Fallback for browsers that don't support this API:
        /* if (!document.startViewTransition) {
            this._updateDOM(data, isError);
          return;
        } */

        // With a transition:
        // document.startViewTransition(() => this._updateDOM(data, isError));

        return this._updateDOM(data, isError);
    }

    private _updateDOM(data: Knot, isError: boolean): Knot {
        const knot = new Query('.page-content', data).getKnot();
        if (isError) {
            const messageKnot = new Query('.message', knot).getKnot();
            const message = {
                content: messageKnot.getText(),
                type: messageKnot.getAttribute('class').split(' ')[1],
            };
            this.eventError(message);
        } else {
            this.viewKnot.insert(knot);
        }
        return knot;
    }

    eventError(message: { type: string; content: string }): void {
        consoleError('Template.eventError()', message);
    }
}
