import { contain } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleError } from '../utils/log';
export class Template {
    constructor(http, opt_options = {}) {
        this.http = http;
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            selector: '.template-view',
            locale: navigator.language,
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.viewKnot = new Query(this.options.selector).getKnot();
    }
    getViewKnot() {
        return this.viewKnot;
    }
    load(url, opt_force = false) {
        const deferred = new Deferred();
        const templateUrl = this.viewKnot.getAttribute('data-template-url');
        const locale = this.viewKnot.getAttribute('data-locale');
        if (!opt_force &&
            contain(this.options.locale, locale) &&
            contain(url, templateUrl)) {
            this.viewKnot.removeAttribute('data-locale');
            const knot = new Query('.page-content', this.viewKnot).getKnot();
            deferred.resolve(knot);
        }
        else {
            this.viewKnot.setAttribute('data-template-url', url);
            this.http.get(url).then((data) => {
                deferred.resolve(this._spaNavigate(data.get('raw'), false));
            }, (data) => {
                deferred.reject(this._spaNavigate(data.get('raw'), true));
            });
        }
        return deferred.promise();
    }
    _spaNavigate(data, isError) {
        const knot = new Query('.page-content', data).getKnot();
        this._updateDOM(knot, isError);
        return knot;
        // FIXME: ViewTransition not working properly
        /*
        knot.setParentKnot(this.viewKnot);
        if (!document.startViewTransition) {
            this._updateDOM(knot, isError);

            return knot;
        }

        document.startViewTransition(() => this._updateDOM(knot, isError));

        return knot;
        */
    }
    _updateDOM(knot, isError) {
        if (isError) {
            const messageKnot = new Query('.message', knot).getKnot();
            const message = {
                content: messageKnot.getText(),
                type: messageKnot.getAttribute('class').split(' ')[1],
            };
            this.eventError(message);
        }
        else {
            this.viewKnot.insert(knot);
        }
    }
    eventError(message) {
        consoleError('Template.eventError()', message);
    }
}
