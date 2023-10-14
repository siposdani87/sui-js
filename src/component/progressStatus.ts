import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

export class ProgressStatus {
    progressStatusKnot: Knot;
    options: Objekt;
    iconKnot: Knot;
    textKnot: Knot;

    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.progress-status',
        opt_options: Object | undefined = {},
    ) {
        this.progressStatusKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({
            successStyle: 'success',
            infoStyle: 'info',
            warningStyle: 'warning',
            errorStyle: 'error',
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.iconKnot = new Query('.icon', this.progressStatusKnot).getKnot();
        this.textKnot = new Query('.text', this.progressStatusKnot).getKnot();
    }

    private _setStatus(
        cssClass: string,
        text: string,
        opt_icon: string | undefined = '',
    ): void {
        this.progressStatusKnot.removeClass([
            this.options.errorStyle,
            this.options.successStyle,
            this.options.infoStyle,
            this.options.warningStyle,
        ]);
        this.progressStatusKnot.addClass(cssClass);
        this.textKnot.setHtml(text);
        if (opt_icon) {
            this.iconKnot.setHtml(opt_icon);
        }
    }

    setSuccess(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.successStyle, text, opt_icon);
    }

    setInfo(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.infoStyle, text, opt_icon);
    }

    setWarning(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.warningStyle, text, opt_icon);
    }

    setError(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.errorStyle, text, opt_icon);
    }
}
