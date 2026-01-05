import { format, each } from '../utils/operation';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { mdl } from '../utils/render';

type Page = {
    text: string;
    page: number;
};

export class Pager {
    pager: Knot;
    pagerStatistics: Knot;
    options: Objekt;
    count: number;
    pageNum: number;
    page: number;
    offset: number;

    constructor(
        dom: Knot,
        opt_selectors: string[] | undefined = ['.pager', '.pager-statistics'],
        opt_options: object | undefined = {},
    ) {
        this.pager = new Query(opt_selectors[0], dom).getKnot();
        this.pagerStatistics = new Query(opt_selectors[1], dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            row_count: 10,
            pager_num: 4,
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.count = this.options.row_count;
        this.setPage(1);
    }

    private _drawPager(): void {
        this.pager.removeChildren();
        this.pageNum = Math.ceil(this.count / this.options.row_count);
        this._drawPreviousButton();
        this._drawPageNumbers();
        this._drawNextButton();
    }

    private _drawStatistics(): void {
        const page = this.page - 1;
        const from = page * this.options.row_count + 1;
        let to = page * this.options.row_count + this.options.row_count;
        to = to > this.count ? this.count : to;
        if (to > 0) {
            this.pagerStatistics.setHtml(
                format('{0}‒{1} / {2}', [from, to, this.count]),
            );
        } else {
            this.pagerStatistics.setHtml('');
        }
    }

    private _drawPreviousButton(): void {
        if (this.pageNum > 1) {
            const previousButton = new Knot<HTMLButtonElement>('button');
            previousButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            previousButton.addEventListener('click', () => {
                this._previous();
            });
            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('chevron_left');
            previousButton.appendChild(iconKnot);
            mdl(previousButton);
            this.pager.appendChild(previousButton);
        }
    }

    private _drawNextButton(): void {
        if (this.pageNum > 1) {
            const nextButton = new Knot<HTMLButtonElement>('button');
            nextButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            nextButton.addEventListener('click', () => {
                this._next();
            });
            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('chevron_right');
            nextButton.appendChild(iconKnot);
            mdl(nextButton);
            this.pager.appendChild(nextButton);
        }
    }

    private _drawPageNumbers(): void {
        const pagers = this._getPagers();
        if (pagers.length > 1) {
            each(pagers, (pager) => {
                const pageKnot = new Knot<HTMLButtonElement>('button');
                pageKnot.setData('page', pager.page);
                pageKnot.setHtml(pager.text);
                pageKnot.addClass([
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                ]);
                if (this.page === pager.page) {
                    pageKnot.addClass('mdl-button--accent');
                }
                pageKnot.addEventListener('click', (knot) => {
                    const page = knot.getData('page');
                    this._go(page);
                });
                mdl(pageKnot);
                this.pager.appendChild(pageKnot);
            });
        }
    }

    private _getPagers(): Page[] {
        const part = Math.floor((this.page - 1) / this.options.pager_num);
        const pagers = [];
        if (part > 0) {
            pagers.push({
                text: '...',
                page: part * this.options.pager_num,
            });
        }
        for (let i = 1; i <= this.options.pager_num; i++) {
            const page = part * this.options.pager_num + i;
            if (page <= this.pageNum) {
                pagers.push({
                    text: page,
                    page: page,
                });
            }
        }
        if (
            this.pageNum > this.options.pager_num &&
            part !== Math.floor((this.pageNum - 1) / this.options.pager_num)
        ) {
            pagers.push({
                text: '...',
                page:
                    part * this.options.pager_num + this.options.pager_num + 1,
            });
        }
        return pagers;
    }

    private _next(): void {
        let page = this.page + 1;
        if (page > this.pageNum) {
            page = 1;
        }
        this._go(page);
    }

    private _previous(): void {
        let page = this.page - 1;
        if (page < 1) {
            page = this.pageNum;
        }
        this._go(page);
    }

    setCount(count: number): void {
        this.count = count;
    }

    private _go(page: number): void {
        this.setPage(page);
        this.eventAction(this.page);
    }

    setPage(page: number): void {
        this.page = page;
        this.offset = (this.page - 1) * this.options.row_count;
    }

    draw(): void {
        this._drawStatistics();
        this._drawPager();
    }

    eventAction(page: number): void {
        consoleDebug('Pager.eventAction()', page);
    }
}
