import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';

export class Page {
    options: Objekt;
    document: Document;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.document = document;
        this.document.addEventListener('click', (event) => {
            const target = new Knot(event.target as HTMLElement);
            this.eventClick(target, event);
        });
    }

    setTitle(title: string): void {
        this.document.title = title;
    }

    eventClick(target: Knot, event: Event): void {
        consoleDebug('Document.eventClick()', target, event);
    }

    mailTo(email: string, opt_subject: string | undefined = ''): void {
        this.document.location.href =
            'mailto:' + email + '?subject=' + opt_subject;
    }
}
