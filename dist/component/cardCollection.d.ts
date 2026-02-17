import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
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
export declare class CardCollection {
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
    /**
     * @description Creates a new CardCollection bound to a DOM container with optional controller and options.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the card collection container.
     * @param {object | null} [opt_ctrl] - Controller object for template expression evaluation.
     * @param {object} [opt_options] - Configuration options (row_count, pager_num, sort, no_content).
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_ctrl?: (object | null) | undefined, opt_options?: object | undefined);
    /**
     * @description Merges user options with defaults (no_content, row_count, pager_num, sort).
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions;
    /**
     * @description Initializes the collection, content handler, DOM structure, template, and pager.
     */
    private _init;
    /**
     * @description Creates the content handler for empty-state display.
     */
    private _initContentHandler;
    /**
     * @description Builds the card body, footer, and pager DOM structure.
     */
    private _initStructure;
    /**
     * @description Extracts and removes the HTML template element for card rendering.
     */
    private _initTemplate;
    /**
     * @description Renders a single card by replacing template expressions with item data and controller methods.
     * @param {Objekt} item - The data item to render.
     * @returns {Knot} The rendered card DOM element.
     */
    private _getCardKnot;
    /**
     * @description Refreshes the card collection by triggering eventAction with current query, sort, and paging params.
     * @param {number} [opt_page] - Page number to navigate to before refreshing (-1 keeps current page).
     *
     * @example
     * cards.refresh(1); // Refresh from page 1
     */
    refresh(opt_page?: number | undefined): void;
    /**
     * @description Called when data needs to be fetched. Override to load data from a backend.
     * @param {Objekt} params - Query parameters including query, column, order, offset, and limit.
     *
     * @example
     * cards.eventAction = (params) => {
     *     http.get('/api/items', params).then((response) => cards.setData(response.items));
     * };
     */
    eventAction(params: Objekt): void;
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
    eventCardKnot(cardKnot: Knot, item: Objekt): void;
    /**
     * @description Renders a card for the given item and appends it to the body.
     * @param {Objekt} item - The data item to render as a card.
     */
    private _addCard;
    /**
     * @description Loads data items into the collection and renders cards, or shows the empty-content placeholder.
     * @param {Array<any>} items - Array of data items to display.
     *
     * @example
     * cards.setData([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
     */
    setData(items: Array<any>): void;
    /**
     * @description Sets the total item count and redraws the pager.
     * @param {number} count - Total number of items across all pages.
     *
     * @example
     * cards.setCount(response.total);
     */
    setCount(count: number): void;
    /**
     * @description Returns items for the current page, applying limit when collection exceeds row_count.
     * @returns {Array<any>} The items to display on the current page.
     */
    private _getItems;
    /**
     * @description Clears the card body and renders cards for the current page items.
     */
    private _draw;
    /**
     * @description Initiates the initial data fetch and render cycle.
     *
     * @example
     * cards.render();
     */
    render(): void;
}
