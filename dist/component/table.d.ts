import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
import { Action } from '../utils';
/**
 * @description Maps column names to calculation functions that produce cell content.
 * Each function receives the row item, its index, and the parent DOM node,
 * and returns one or more {@link Knot} elements or a plain string.
 *
 * @typeParam T - The row data type, defaults to {@link Objekt}.
 *
 * @category Component
 */
export type TableCalculation<T = Objekt> = {
    [key in string]: (item: T, index: number, parentKnot: Knot) => Knot[] | Knot | string;
};
/**
 * @description Data table component with sorting, paging, search, row actions, and custom
 * column calculations. Renders tabular data from a {@link Collection} with automatic
 * header/footer management.
 *
 * @typeParam T - The row data type, must extend {@link Objekt}.
 *
 * @example
 * const table = new Table(dom, 'table', {
 *     row_count: 20,
 *     columns: ['name', 'email', 'actions'],
 *     sorted: ['name', 'email'],
 * });
 * table.setActions([
 *     { style: (item) => ['edit', 'Edit'], click: (item) => editUser(item) },
 * ]);
 * table.eventAction = (params) => {
 *     http.get('/api/users', params).then((response) => {
 *         table.setData(response.get('items'));
 *         table.setCount(response.get('count'));
 *     });
 * };
 * table.render();
 *
 * @see {@link Pager} for pagination controls
 * @see {@link ContentHandler} for empty-state display
 * @see {@link Collection} for the underlying data collection
 * @see {@link TableCalculation} for custom column renderers
 *
 * @category Component
 */
export declare class Table<T extends Objekt = Objekt> {
    tableKnot: Knot;
    options: Objekt;
    collection: Collection<T>;
    query: string;
    actions: Action[];
    contentHandler: ContentHandler;
    headerKnots: Query<HTMLElement>;
    headerTexts: string[];
    tbody: Knot;
    tfoot: Knot;
    pager: Pager;
    /**
     * @description Creates a new Table instance bound to the table element found within the given DOM node.
     *
     * @param {Knot} dom - The parent DOM node containing the table element.
     * @param {string} [opt_selector='table'] - CSS selector to locate the table element.
     * @param {object} [opt_options={}] - Configuration options (row_count, pager_num, sort, columns, calculations, sorted, rowStyle).
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: object | undefined);
    /**
     * @description Merges user-provided options with table defaults.
     * @param {object} [opt_options={}] - User configuration options.
     */
    private _setOptions;
    /**
     * @description Initializes the table collection, content handler, header, search, and structure.
     */
    private _init;
    /**
     * @description Initializes the {@link ContentHandler} for displaying empty-state content.
     */
    private _initContentHandler;
    /**
     * @description Creates the search input in the last header column if the column is "search".
     */
    private _initSearch;
    /**
     * @description Reads header text and renders sorting controls for each table column.
     */
    private _initHeader;
    /**
     * @description Renders sorting icons and tooltip for a single header cell.
     * @param {Knot} headerKnot - The header cell element.
     * @param {number} columnIndex - The zero-based column index.
     */
    private _renderHeader;
    /**
     * @description Creates the table body, footer, pager statistics, and {@link Pager} component.
     */
    private _initStructure;
    /**
     * @description Refreshes the table data by triggering {@link eventAction} with the current
     * query, sorting, and paging parameters.
     *
     * @param {number} [opt_page=-1] - The page number to navigate to. Pass -1 to keep the current page.
     *
     * @example
     * table.refresh(1); // reload from page 1
     */
    refresh(opt_page?: number | undefined): void;
    /**
     * @description Called when the table needs data (on refresh, sort, page, or search). Override to fetch data.
     * @param {Objekt} params - Contains query, column, order, offset, and limit.
     */
    eventAction(params: Objekt): void;
    /**
     * @description Toggles the sort direction for a column or switches to a new sort column.
     * @param {string} columnWithOrder - Column name with optional direction (e.g., "name:asc").
     */
    private _toggleSorting;
    /**
     * @description Activates the sorting icon for the currently sorted column header.
     * @param {Knot} head - The header cell element.
     * @param {number} i - The zero-based column index.
     */
    private _handleSortingColumn;
    /**
     * @description Resets all sorting indicators and re-applies the active sort state.
     */
    private _updateSorting;
    /**
     * @description Sets the sort column and order, then updates the UI and refreshes data.
     * @param {string} column - The column name to sort by.
     * @param {string} [opt_order='asc'] - The sort direction ("asc" or "desc").
     */
    private _setSorting;
    /**
     * @description Removes the "active" class from all sorting icons.
     */
    private _resetSorting;
    /**
     * @description Returns the primary display column name, falling back to the first column.
     * @returns {string} The column name.
     */
    private _getColumn;
    /**
     * @description Adds a collapsible header row for an item with the primary column and actions.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index within the current page.
     */
    private _addHeaderRow;
    /**
     * @description Computes CSS class names for a row using the configured rowStyle callback.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index.
     * @returns {Array<string>} Array of CSS class names.
     */
    private _getRowStyle;
    /**
     * @description Adds a data row with cells for each configured column.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index within the current page.
     */
    private _addRow;
    /**
     * @description Sets the row action definitions displayed in each row's actions column.
     *
     * @param {Array<Action>} actions - Array of action descriptors with style and click callbacks.
     *
     * @example
     * table.setActions([
     *     { style: (item) => ['edit', 'Edit'], click: (item) => editItem(item) },
     *     { style: (item) => ['delete', 'Delete'], click: (item) => deleteItem(item) },
     * ]);
     */
    setActions(actions: Array<Action>): void;
    /**
     * @description Renders cell content using a calculation function or the raw item value.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index.
     * @param {string} column - The column name.
     * @param {Knot} parentKnot - The parent cell element to append content to.
     */
    private _renderDataKnotByKnot;
    /**
     * @description Renders a table cell, dispatching to actions or data content as appropriate.
     * @param {Knot} tableDataKnot - The table cell element.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index.
     * @param {string} column - The column name.
     * @param {number} columnIndex - The zero-based column index.
     */
    private _renderDataKnot;
    /**
     * @description Renders action buttons or a dropdown menu in the actions cell.
     * @param {Knot} tableDataKnot - The table cell element for actions.
     * @param {T} item - The row data object.
     */
    private _renderActions;
    /**
     * @description Renders individual action buttons inline.
     * @param {Knot} containerKnot - The container element for action buttons.
     * @param {T} item - The row data object.
     */
    private _renderActionKnots;
    /**
     * @description Renders actions inside a {@link Dropdown} menu when there are more than 3 actions.
     * @param {Knot} dropDownKnot - The dropdown container element.
     * @param {T} item - The row data object.
     */
    private _renderDropDownKnot;
    /**
     * @description Creates a single action button with icon, tooltip, and click handler.
     * @param {Knot} containerKnot - The container element for the button.
     * @param {{ style: Function; click: Function }} action - The action descriptor.
     * @param {T} item - The row data object.
     */
    private _createActionButton;
    /**
     * @description Loads data items into the table and redraws the body. Shows the empty-state
     * content handler if the collection is empty.
     *
     * @param {Array<any>} items - Array of row data objects to display.
     *
     * @example
     * table.setData([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
     */
    setData(items: Array<any>): void;
    /**
     * @description Sets the total item count and redraws the pager controls.
     *
     * @param {number} count - The total number of items across all pages.
     *
     * @example
     * table.setCount(150);
     */
    setCount(count: number): void;
    /**
     * @description Returns the items for the current page, slicing the collection if needed.
     * @returns {Array<T>} The visible row items.
     */
    private _getItems;
    /**
     * @description Clears the table body and redraws all visible rows with header and data rows.
     */
    private _draw;
    /**
     * @description Renders the table by updating the sorting state and triggering a data refresh.
     *
     * @example
     * table.render();
     */
    render(): void;
}
