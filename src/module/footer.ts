import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

export class Footer {
    options: Objekt;
    footerKnot: Knot;
    templateViewKnot: Knot;
    contentKnot: Knot;
    localesKnot: Knot;

    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.footerKnot = new Query('#footer').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
        this.contentKnot = new Query('.content', this.footerKnot).getKnot();
        this.localesKnot = new Query('.locales', this.footerKnot).getKnot();
    }

    show(): void {
        this.footerKnot.removeClass(['static', 'hidden', 'has-footer']);
        const contentKnot = new Query(
            '.page-content.fullscreen',
            this.templateViewKnot,
        ).getKnot();
        if (contentKnot && !contentKnot.isEmpty()) {
            const isLightContent = contentKnot.hasClass('light');
            if (isLightContent) {
                this.footerKnot.addClass('dark');
            } else {
                this.footerKnot.removeClass('dark');
            }
            this.footerKnot.addClass('static');
            this.templateViewKnot.addClass('has-footer');
        }
    }

    hide(): void {
        this.footerKnot.addClass('hidden');
        this.footerKnot.removeClass('static');
        this.templateViewKnot.removeClass('has-footer');
    }

    setContent(contentKnot: Knot): void {
        this.contentKnot.appendChild(contentKnot);
    }

    getLocalesContainer(): Knot {
        return this.localesKnot;
    }

    open(): void {
        this.footerKnot.addClass('open');
    }

    close(): void {
        this.footerKnot.removeClass('open');
    }

    isOpened(): boolean {
        return this.footerKnot.hasClass('open');
    }

    toogle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
}
