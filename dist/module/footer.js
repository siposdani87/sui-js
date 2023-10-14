import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
export class Footer {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    _init() {
        this.footerKnot = new Query('#footer').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
        this.contentKnot = new Query('.content', this.footerKnot).getKnot();
        this.localesKnot = new Query('.locales', this.footerKnot).getKnot();
    }
    show() {
        this.footerKnot.removeClass(['static', 'hidden', 'has-footer']);
        const contentKnot = new Query('.page-content.fullscreen', this.templateViewKnot).getKnot();
        if (contentKnot && !contentKnot.isEmpty()) {
            const isLightContent = contentKnot.hasClass('light');
            if (isLightContent) {
                this.footerKnot.addClass('dark');
            }
            else {
                this.footerKnot.removeClass('dark');
            }
            this.footerKnot.addClass('static');
            this.templateViewKnot.addClass('has-footer');
        }
    }
    hide() {
        this.footerKnot.addClass('hidden');
        this.footerKnot.removeClass('static');
        this.templateViewKnot.removeClass('has-footer');
    }
    setContent(contentKnot) {
        this.contentKnot.appendChild(contentKnot);
    }
    getLocalesContainer() {
        return this.localesKnot;
    }
    open() {
        this.footerKnot.addClass('open');
    }
    close() {
        this.footerKnot.removeClass('open');
    }
    isOpened() {
        return this.footerKnot.hasClass('open');
    }
    toogle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
}
