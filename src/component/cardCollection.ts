import { contain, eachArray, format } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
import { consoleDebug, consoleWarn } from '../utils/log';
import { mdl } from '../utils/render';

export class CardCollection {
    cardCollectionKnot: Knot;
    ctrl: any;
    options: Objekt;
    collection: Collection<Objekt>;
    query: string;
    pager: Pager;
    contentHandler: ContentHandler;
    body: Knot;
    cardFooterKnot: Knot;
    pagerKnot: Knot;
    cardTemplate: Knot<HTMLTemplateElement>;
    template: string;

    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.card-collection',
        opt_ctrl: (object | null) | undefined = null,
        opt_options: object | undefined = {},
    ) {
        this.cardCollectionKnot = new Query(opt_selector, dom).getKnot();
        this.ctrl = opt_ctrl;
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            no_content: {
                image_url: null,
                text: '',
            },
            row_count: 12,
            pager_num: 4,
            sort: {
                column: null,
                order: 'asc',
            },
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.collection = new Collection();
        this.query = '';
        this._initContentHandler();
        this._initStructure();
        this._initTemplate();
        this.pager = new Pager(
            this.cardCollectionKnot,
            ['.pager', '.pager-statistics'],
            this.options,
        );
        this.pager.eventAction = (page) => {
            this.refresh(page);
        };
    }

    private _initContentHandler(): void {
        this.contentHandler = new ContentHandler(
            this.cardCollectionKnot,
            this.options.no_content,
        );
    }

    private _initStructure(): void {
        this.cardCollectionKnot.addClass('card-collection');

        this.body = new Knot('div');
        this.body.addClass('cards');
        this.cardCollectionKnot.appendChild(this.body);

        this.cardFooterKnot = new Knot('div');
        this.cardFooterKnot.addClass('card-footer');
        this.cardCollectionKnot.appendChild(this.cardFooterKnot);

        this.pagerKnot = new Knot('div');
        this.pagerKnot.addClass('pager-statistics');
        this.cardFooterKnot.appendChild(this.pagerKnot);

        this.pagerKnot = new Knot('div');
        this.pagerKnot.addClass('pager');
        this.cardFooterKnot.appendChild(this.pagerKnot);
    }

    private _initTemplate(): void {
        this.cardTemplate = new Query<HTMLTemplateElement>(
            'template',
            this.cardCollectionKnot,
        ).getKnot();
        this.cardTemplate.remove();
        this.template = this.cardTemplate.toString(false);
    }

    private _getCardKnot(item: Objekt): Knot {
        const regex = new RegExp('{{[a-zA-Z._,() ]*}}', 'g');
        const matches = this.template.match(regex);
        let cloneTemplate = this.template;
        eachArray(matches, (match) => {
            const expression = match.replace('{{', '').replace('}}', '');
            if (contain(expression, 'ctrl.')) {
                const paramsRegex = new RegExp('(([a-zA-Z._, ]*))', 'g');
                const expressionMatches = expression.match(paramsRegex);
                const fnName = expressionMatches[0].replace('ctrl.', '');
                const fnKeys = expressionMatches[2].split(', ');
                const fnParams = [];
                eachArray(fnKeys, (key) => {
                    if (key === 'item') {
                        fnParams.push(item);
                    } else {
                        fnParams.push(item.get(key));
                    }
                });
                if (this.ctrl) {
                    const method = this.ctrl[fnName];
                    if (method) {
                        const result = method.apply(this.ctrl, fnParams);
                        cloneTemplate = cloneTemplate.replace(match, result);
                    } else {
                        consoleWarn(format('ctrl.{0}() missing', [fnName]));
                    }
                }
            } else {
                cloneTemplate = cloneTemplate.replace(
                    match,
                    item.get(expression),
                );
            }
        });
        return new Knot(cloneTemplate);
    }

    refresh(opt_page: number | undefined = -1): void {
        if (opt_page > -1) {
            this.pager.setPage(opt_page);
        }
        const params = new Objekt({
            query: this.query,
            column: this.options.sort.column,
            order: this.options.sort.order,
            offset: this.pager.offset,
            limit: this.options.row_count,
        });
        this.eventAction(params);
    }

    eventAction(params: Objekt): void {
        consoleDebug('CardCollection.eventAction()', params);
    }

    eventCardKnot(cardKnot: Knot, item: Objekt): void {
        consoleDebug('CardCollection.eventCardKnot()', cardKnot, item);
    }

    private _addCard(item: Objekt): void {
        const cardKnot = this._getCardKnot(item);
        this.body.appendChild(cardKnot);
        this.eventCardKnot(cardKnot, item);
        mdl(cardKnot);
    }

    setData(items: Array<any>): void {
        this.collection.reload(items);
        if (this.collection.size() === 0) {
            this.contentHandler.show();
        } else {
            this.contentHandler.hide();
            this._draw();
        }
    }

    setCount(count: number): void {
        this.pager.setCount(count);
        this.pager.draw();
    }

    private _getItems(): Array<any> {
        let items = this.collection.getItems();
        if (this.collection.size() > this.options.row_count) {
            items = this.collection.limit(
                this.pager.offset,
                this.options.row_count,
            );
        }
        return items;
    }

    private _draw(): void {
        this.body.removeChildren();
        eachArray(this._getItems(), (item) => {
            this._addCard(item);
        });
        mdl(this.body);
    }

    render(): void {
        this.refresh();
    }
}
