import { contain, eachArray, format } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
import { consoleDebug, consoleWarn } from '../utils/log';
import { mdl } from '../utils/render';
/**
 * @description Card-based data display component with template rendering and pagination.
 * Renders data items as cards using an HTML template element, with built-in
 * paging and empty-content handling.
 *
 * @example
 * const cards = new CardCollection(containerKnot, '.card-collection', ctrl, { row_count: 12 });
 * cards.eventAction = (params) => http.get('/api/items', params);
 * cards.render();
 *
 * @see {@link Pager} for the pagination control
 * @see {@link ContentHandler} for the empty-content placeholder
 * @see {@link Collection} for the underlying data collection
 *
 * @category Component
 */
export class CardCollection {
    /**
     * @description Creates a new CardCollection bound to a DOM container with optional controller and options.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the card collection container.
     * @param {object | null} [opt_ctrl] - Controller object for template expression evaluation.
     * @param {object} [opt_options] - Configuration options (row_count, pager_num, sort, no_content).
     */
    constructor(dom, opt_selector = '.card-collection', opt_ctrl = null, opt_options = {}) {
        this.cardCollectionKnot = new Query(opt_selector, dom).getKnot();
        this.ctrl = opt_ctrl;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @description Merges user options with defaults (no_content, row_count, pager_num, sort).
     * @param {object} [opt_options] - Configuration overrides.
     */
    _setOptions(opt_options = {}) {
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
    /**
     * @description Initializes the collection, content handler, DOM structure, template, and pager.
     */
    _init() {
        this.collection = new Collection();
        this.query = '';
        this._initContentHandler();
        this._initStructure();
        this._initTemplate();
        this.pager = new Pager(this.cardCollectionKnot, ['.pager', '.pager-statistics'], this.options);
        this.pager.eventAction = (page) => {
            this.refresh(page);
        };
    }
    /**
     * @description Creates the content handler for empty-state display.
     */
    _initContentHandler() {
        this.contentHandler = new ContentHandler(this.cardCollectionKnot, this.options.no_content);
    }
    /**
     * @description Builds the card body, footer, and pager DOM structure.
     */
    _initStructure() {
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
    /**
     * @description Extracts and removes the HTML template element for card rendering.
     */
    _initTemplate() {
        this.cardTemplate = new Query('template', this.cardCollectionKnot).getKnot();
        this.cardTemplate.remove();
        this.template = this.cardTemplate.toString(false);
    }
    /**
     * @description Renders a single card by replacing template expressions with item data and controller methods.
     * @param {Objekt} item - The data item to render.
     * @returns {Knot} The rendered card DOM element.
     */
    _getCardKnot(item) {
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fnParams = [];
                eachArray(fnKeys, (key) => {
                    if (key === 'item') {
                        fnParams.push(item);
                    }
                    else {
                        fnParams.push(item.get(key));
                    }
                });
                if (this.ctrl) {
                    const method = this.ctrl[fnName];
                    if (method) {
                        const result = method.apply(this.ctrl, fnParams);
                        cloneTemplate = cloneTemplate.replace(match, result);
                    }
                    else {
                        consoleWarn(format('ctrl.{0}() missing', [fnName]));
                    }
                }
            }
            else {
                cloneTemplate = cloneTemplate.replace(match, item.get(expression));
            }
        });
        return new Knot(cloneTemplate);
    }
    /**
     * @description Refreshes the card collection by triggering eventAction with current query, sort, and paging params.
     * @param {number} [opt_page] - Page number to navigate to before refreshing (-1 keeps current page).
     *
     * @example
     * cards.refresh(1); // Refresh from page 1
     */
    refresh(opt_page = -1) {
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
    /**
     * @description Called when data needs to be fetched. Override to load data from a backend.
     * @param {Objekt} params - Query parameters including query, column, order, offset, and limit.
     *
     * @example
     * cards.eventAction = (params) => {
     *     http.get('/api/items', params).then((response) => cards.setData(response.items));
     * };
     */
    eventAction(params) {
        consoleDebug('CardCollection.eventAction()', params);
    }
    /**
     * @description Called after each card is rendered. Override to attach event listeners or modify card DOM.
     * @param {Knot} cardKnot - The rendered card DOM element.
     * @param {Objekt} item - The data item associated with the card.
     *
     * @example
     * cards.eventCardKnot = (cardKnot, item) => {
     *     cardKnot.addEventListener('click', () => navigate(item.get('id')));
     * };
     */
    eventCardKnot(cardKnot, item) {
        consoleDebug('CardCollection.eventCardKnot()', cardKnot, item);
    }
    /**
     * @description Renders a card for the given item and appends it to the body.
     * @param {Objekt} item - The data item to render as a card.
     */
    _addCard(item) {
        const cardKnot = this._getCardKnot(item);
        this.body.appendChild(cardKnot);
        this.eventCardKnot(cardKnot, item);
        mdl(cardKnot);
    }
    /**
     * @description Loads data items into the collection and renders cards, or shows the empty-content placeholder.
     * @param {Array<any>} items - Array of data items to display.
     *
     * @example
     * cards.setData([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData(items) {
        this.collection.reload(items);
        if (this.collection.size() === 0) {
            this.contentHandler.show();
        }
        else {
            this.contentHandler.hide();
            this._draw();
        }
    }
    /**
     * @description Sets the total item count and redraws the pager.
     * @param {number} count - Total number of items across all pages.
     *
     * @example
     * cards.setCount(response.total);
     */
    setCount(count) {
        this.pager.setCount(count);
        this.pager.draw();
    }
    /**
     * @description Returns items for the current page, applying limit when collection exceeds row_count.
     * @returns {Array<any>} The items to display on the current page.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _getItems() {
        let items = this.collection.getItems();
        if (this.collection.size() > this.options.row_count) {
            items = this.collection.limit(this.pager.offset, this.options.row_count);
        }
        return items;
    }
    /**
     * @description Clears the card body and renders cards for the current page items.
     */
    _draw() {
        this.body.removeChildren();
        eachArray(this._getItems(), (item) => {
            this._addCard(item);
        });
        mdl(this.body);
    }
    /**
     * @description Initiates the initial data fetch and render cycle.
     *
     * @example
     * cards.render();
     */
    render() {
        this.refresh();
    }
}
