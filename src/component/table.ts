import {
    eq,
    inArray,
    contain,
    format,
    isFunction,
    isArray,
    eachArray,
    instanceOf,
} from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Dropdown } from './dropdown';
import { Pager } from './pager';
import { Tooltip } from './tooltip';
import { consoleDebug } from '../utils/log';
import { generateId } from '../utils/coder';
import { Action } from '../utils';
import { mdl } from '../utils/render';

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
    [key in string]: (
        item: T,
        index: number,
        parentKnot: Knot,
    ) => Knot[] | Knot | string;
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
export class Table<T extends Objekt = Objekt> {
    tableKnot: Knot;
    options!: Objekt;
    collection!: Collection<T>;
    query!: string;
    actions!: Action[];
    contentHandler!: ContentHandler;
    headerKnots!: Query<HTMLElement>;
    headerTexts!: string[];
    tbody!: Knot;
    tfoot!: Knot;
    pager!: Pager;

    /**
     * @description Creates a new Table instance bound to the table element found within the given DOM node.
     *
     * @param {Knot} dom - The parent DOM node containing the table element.
     * @param {string} [opt_selector='table'] - CSS selector to locate the table element.
     * @param {object} [opt_options={}] - Configuration options (row_count, pager_num, sort, columns, calculations, sorted, rowStyle).
     */
    constructor(
        dom: Knot,
        opt_selector: string | undefined = 'table',
        opt_options: object | undefined = {},
    ) {
        this.tableKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * @description Merges user-provided options with table defaults.
     * @param {object} [opt_options={}] - User configuration options.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            no_content: {
                image_url: null,
                text: '',
            },
            row_count: 10,
            pager_num: 4,
            sort: {
                column: null,
                order: 'desc',
            },
            columns: [],
            calculations: {},
            sorted: [],
            column: null,
            rowStyle: null,
        });
        this.options.merge(opt_options);
    }

    /**
     * @description Initializes the table collection, content handler, header, search, and structure.
     */
    private _init(): void {
        this.collection = new Collection();
        this.query = '';
        this.actions = [];
        if (!this.tableKnot.getId()) {
            this.tableKnot.setId(generateId('table'));
            this._initContentHandler();
            this._initHeader();
            this._initSearch();
            this._initStructure();
        } else {
            // TODO: reinit other components of table
        }
    }

    /**
     * @description Initializes the {@link ContentHandler} for displaying empty-state content.
     */
    private _initContentHandler(): void {
        this.contentHandler = new ContentHandler(
            this.tableKnot,
            this.options.no_content,
        );
    }

    /**
     * @description Creates the search input in the last header column if the column is "search".
     */
    private _initSearch(): void {
        if (
            this.options.columns[this.options.columns.length - 1] === 'search'
        ) {
            const searchKnot = new Knot('div');
            searchKnot.addClass([
                'mdl-textfield',
                'mdl-js-textfield',
                'mdl-textfield--expandable',
            ]);
            this.headerKnots
                .get(this.headerKnots.size() - 1)!
                .insert(searchKnot);

            const labelKnot = new Knot('label');
            labelKnot.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            labelKnot.setFor('table-search');
            searchKnot.appendChild(labelKnot);

            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('search');
            labelKnot.appendChild(iconKnot);

            const inputBlock = new Knot('div');
            inputBlock.addClass('mdl-textfield__expandable-holder');
            searchKnot.appendChild(inputBlock);

            const inputKnot = new Knot<HTMLInputElement>('input');
            inputKnot.setAttribute('type', 'text');
            inputKnot.setId('table-search');
            inputKnot.addClass('mdl-textfield__input');
            inputKnot.addEventListener('keypress', (inputKnot, event) => {
                if (eq(event.keyCode, 13)) {
                    this.query = inputKnot.getNode().value;
                    this.refresh(1);
                }
                return true;
            });
            inputBlock.appendChild(inputKnot);

            const subLabelKnot = new Knot('label');
            subLabelKnot.addClass('mdl-textfield__label');
            inputBlock.appendChild(subLabelKnot);

            mdl(searchKnot);
        }
    }

    /**
     * @description Reads header text and renders sorting controls for each table column.
     */
    private _initHeader(): void {
        this.headerTexts = [];
        this.headerKnots = new Query('thead th', this.tableKnot);
        this.headerKnots.each((headerKnot, columnIndex) => {
            const text = headerKnot.getHtml();
            this.headerTexts.push(text);
            this._renderHeader(headerKnot, columnIndex);
        });
    }

    /**
     * @description Renders sorting icons and tooltip for a single header cell.
     * @param {Knot} headerKnot - The header cell element.
     * @param {number} columnIndex - The zero-based column index.
     */
    private _renderHeader(headerKnot: Knot, columnIndex: number): void {
        const column = this.options.columns[columnIndex];
        if (inArray(['search', 'actions'], column)) {
            headerKnot.addClass('actions');
        }
        const columnsWithOrder = this.options.sorted.filter((sort: any) => {
            return contain(sort, column);
        });
        if (columnsWithOrder.length === 1) {
            headerKnot.setData('column', columnsWithOrder[0]);
            headerKnot.addEventListener('click', (headerKnot) => {
                const column = headerKnot.getData('column');
                this._toggleSorting(column);
            });

            const iconsContainerKnot = new Knot('span');
            iconsContainerKnot.addClass('icons');
            headerKnot.appendChild(iconsContainerKnot);

            const iconUp = new Knot('em');
            iconUp.addClass(['material-icons', 'asc']);
            iconUp.setHtml('arrow_drop_up');
            iconsContainerKnot.appendChild(iconUp);

            const iconDown = new Knot('em');
            iconDown.addClass(['material-icons', 'desc']);
            iconDown.setHtml('arrow_drop_down');
            iconsContainerKnot.appendChild(iconDown);
        }

        const headerTitle = headerKnot.getAttribute('title');
        const headerDesc = headerKnot.getAttribute('desc');
        if (headerTitle || headerDesc) {
            const iconInfo = new Knot('em');
            if (headerTitle) {
                iconInfo.setAttribute('desc', headerTitle);
            }
            if (headerDesc) {
                iconInfo.setAttribute('desc', headerDesc);
            }
            iconInfo.addClass(['material-icons', 'info']);
            iconInfo.setHtml('info');
            headerKnot.appendChild(iconInfo);
            const tooltip = new Tooltip(iconInfo, 'BOTTOM');
            tooltip.render();
        }
    }

    /**
     * @description Creates the table body, footer, pager statistics, and {@link Pager} component.
     */
    private _initStructure(): void {
        this.tbody = new Knot('tbody');
        this.tableKnot.appendChild(this.tbody);

        this.tfoot = new Knot('tfoot');
        this.tableKnot.appendChild(this.tfoot);

        const footerRow = new Knot('tr');

        const statisticsKnot = new Knot('td');
        statisticsKnot.addClass('pager-statistics');
        footerRow.appendChild(statisticsKnot);

        const pagerKnot = new Knot('td');
        pagerKnot.addClass('pager');
        pagerKnot.setAttribute('colspan', this.headerKnots.size() - 1);
        footerRow.appendChild(pagerKnot);

        this.tfoot.appendChild(footerRow);

        this.pager = new Pager(
            this.tfoot,
            ['.pager', '.pager-statistics'],
            this.options,
        );
        this.pager.eventAction = (page) => {
            this.refresh(page);
        };
    }

    /**
     * @description Refreshes the table data by triggering {@link eventAction} with the current
     * query, sorting, and paging parameters.
     *
     * @param {number} [opt_page=-1] - The page number to navigate to. Pass -1 to keep the current page.
     *
     * @example
     * table.refresh(1); // reload from page 1
     */
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

    /**
     * @description Called when the table needs data (on refresh, sort, page, or search). Override to fetch data.
     * @param {Objekt} params - Contains query, column, order, offset, and limit.
     */
    eventAction(params: Objekt): void {
        consoleDebug('Table.eventAction()', params);
    }

    /**
     * @description Toggles the sort direction for a column or switches to a new sort column.
     * @param {string} columnWithOrder - Column name with optional direction (e.g., "name:asc").
     */
    private _toggleSorting(columnWithOrder: string): void {
        const [column, direction] = columnWithOrder.split(':', 2);
        let order = direction || 'desc';
        if (
            eq(this.options.sort.column, column) &&
            eq(this.options.sort.order, order)
        ) {
            order = order === 'asc' ? 'desc' : 'asc';
        }
        this._setSorting(column, order);
    }

    /**
     * @description Activates the sorting icon for the currently sorted column header.
     * @param {Knot} head - The header cell element.
     * @param {number} i - The zero-based column index.
     */
    private _handleSortingColumn(head: Knot, i: number): void {
        const column = this.options.columns[i];
        if (
            (eq(this.options.sort.column, null) && eq(i, 0)) ||
            eq(column, this.options.sort.column)
        ) {
            const iconKnot = new Query(
                format('.icons em.{0}', [this.options.sort.order]),
                head,
            ).getKnot();
            if (!iconKnot.isEmpty()) {
                iconKnot.addClass('active');
            }
        }
    }

    /**
     * @description Resets all sorting indicators and re-applies the active sort state.
     */
    private _updateSorting(): void {
        this._resetSorting();
        this.headerKnots.each((head, i) => {
            this._handleSortingColumn(head, i);
        });
        this.refresh();
    }

    /**
     * @description Sets the sort column and order, then updates the UI and refreshes data.
     * @param {string} column - The column name to sort by.
     * @param {string} [opt_order='asc'] - The sort direction ("asc" or "desc").
     */
    private _setSorting(
        column: string,
        opt_order: string | undefined = 'asc',
    ): void {
        this.options.sort.column = column;
        this.options.sort.order = opt_order;
        this._updateSorting();
    }

    /**
     * @description Removes the "active" class from all sorting icons.
     */
    private _resetSorting(): void {
        const icons = new Query('thead th .icons em', this.tableKnot);
        icons.each((icon) => {
            icon.removeClass('active');
        });
    }

    /**
     * @description Returns the primary display column name, falling back to the first column.
     * @returns {string} The column name.
     */
    private _getColumn(): string {
        return this.options.column || this.options.columns[0];
    }

    /**
     * @description Adds a collapsible header row for an item with the primary column and actions.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index within the current page.
     */
    private _addHeaderRow(item: T, rowIndex: number): void {
        const headerRow = new Knot('tr');
        headerRow.addEventListener('click', (knot) => {
            knot.toggleClass('opened');
            const dataRow = headerRow.getNextSibling();
            dataRow.toggleClass('open');
        });
        const cssClasses = this._getRowStyle(item, rowIndex);
        headerRow.addClass(['header'].concat(cssClasses));
        this.tbody.appendChild(headerRow);

        const headerNameCell = new Knot('td');
        headerRow.appendChild(headerNameCell);
        this._renderDataKnotByKnot(
            item,
            rowIndex,
            this._getColumn(),
            headerNameCell,
        );
        headerNameCell.setAttribute('colspan', this.headerKnots.size() - 2);

        const headerActionCell = new Knot('td');
        headerRow.appendChild(headerActionCell);
        this._renderActions(headerActionCell, item);
    }

    /**
     * @description Computes CSS class names for a row using the configured rowStyle callback.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index.
     * @returns {Array<string>} Array of CSS class names.
     */
    private _getRowStyle(item: T, rowIndex: number): Array<string> {
        let results = [];
        if (this.options.rowStyle && isFunction(this.options.rowStyle)) {
            const styleResult = this.options.rowStyle(item, rowIndex);
            if (isArray(styleResult)) {
                results = styleResult;
            } else if (styleResult) {
                results.push(styleResult);
            }
        }
        return results;
    }

    /**
     * @description Adds a data row with cells for each configured column.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index within the current page.
     */
    private _addRow(item: T, rowIndex: number): void {
        const tableRow = new Knot('tr');
        const cssClasses = this._getRowStyle(item, rowIndex);
        tableRow.addClass(['data'].concat(cssClasses));
        this.tbody.appendChild(tableRow);
        eachArray<string>(this.options.columns, (column, columnIndex) => {
            const tableDataKnot = new Knot('td');
            tableRow.appendChild(tableDataKnot);
            this._renderDataKnot(
                tableDataKnot,
                item,
                rowIndex,
                column,
                columnIndex,
            );
        });
    }

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
    setActions(actions: Array<Action>): void {
        this.actions = actions;
    }

    /**
     * @description Renders cell content using a calculation function or the raw item value.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index.
     * @param {string} column - The column name.
     * @param {Knot} parentKnot - The parent cell element to append content to.
     */
    private _renderDataKnotByKnot(
        item: T,
        rowIndex: number,
        column: string,
        parentKnot: Knot,
    ): void {
        let result = '';
        const calculation = this.options.calculations[column];
        if (isFunction(calculation)) {
            result = calculation(
                item,
                this.pager.offset + rowIndex,
                parentKnot,
            );
        } else {
            result = item.get(column, '');
        }
        let items: any[] = [];
        if (!isArray(result)) {
            items = [result];
        } else {
            items = result as any;
        }
        eachArray(items, (item: any) => {
            if (!instanceOf(item, Knot)) {
                const dataKnot = new Knot('span');
                dataKnot.setHtml(item as string);
                item = dataKnot;
            }
            parentKnot.appendChild(item as Knot);
            if (
                (item as Knot).getAttribute('title') ||
                (item as Knot).getAttribute('desc')
            ) {
                const tooltip = new Tooltip(item as Knot);
                tooltip.render();
            }
        });
    }

    /**
     * @description Renders a table cell, dispatching to actions or data content as appropriate.
     * @param {Knot} tableDataKnot - The table cell element.
     * @param {T} item - The row data object.
     * @param {number} rowIndex - The zero-based row index.
     * @param {string} column - The column name.
     * @param {number} columnIndex - The zero-based column index.
     */
    private _renderDataKnot(
        tableDataKnot: Knot,
        item: T,
        rowIndex: number,
        column: string,
        columnIndex: number,
    ): void {
        if (inArray(['search', 'actions'], column)) {
            this._renderActions(tableDataKnot, item);
        } else {
            const labelKnot = new Knot('span');
            labelKnot.addClass('label');
            labelKnot.setHtml(this.headerTexts[columnIndex]);
            this._renderHeader(labelKnot, columnIndex);
            this._handleSortingColumn(labelKnot, columnIndex);
            tableDataKnot.appendChild(labelKnot);
            this._renderDataKnotByKnot(item, rowIndex, column, tableDataKnot);
        }
    }

    /**
     * @description Renders action buttons or a dropdown menu in the actions cell.
     * @param {Knot} tableDataKnot - The table cell element for actions.
     * @param {T} item - The row data object.
     */
    private _renderActions(tableDataKnot: Knot, item: T): void {
        const containerKnot = new Knot('div');
        tableDataKnot.addClass('actions');
        tableDataKnot.appendChild(containerKnot);
        if (this.actions.length > 3) {
            containerKnot.addClass('dropDown');
            this._renderDropDownKnot(containerKnot, item);
        } else {
            this._renderActionKnots(containerKnot, item);
        }
    }

    /**
     * @description Renders individual action buttons inline.
     * @param {Knot} containerKnot - The container element for action buttons.
     * @param {T} item - The row data object.
     */
    private _renderActionKnots(containerKnot: Knot, item: T): void {
        eachArray(this.actions, (action) => {
            this._createActionButton(containerKnot, action, item);
        });
    }

    /**
     * @description Renders actions inside a {@link Dropdown} menu when there are more than 3 actions.
     * @param {Knot} dropDownKnot - The dropdown container element.
     * @param {T} item - The row data object.
     */
    private _renderDropDownKnot(dropDownKnot: Knot, item: T): void {
        const dropDown = new Dropdown(dropDownKnot);
        dropDown.setActions(this.actions, item);
    }

    /**
     * @description Creates a single action button with icon, tooltip, and click handler.
     * @param {Knot} containerKnot - The container element for the button.
     * @param {{ style: Function; click: Function }} action - The action descriptor.
     * @param {T} item - The row data object.
     */
    private _createActionButton(
        containerKnot: Knot,
        action: { style: Function; click: Function },
        item: T,
    ): void {
        const [icon, title, disabled, removed] = action.style(item);
        if (!removed) {
            const buttonKnot = new Knot<HTMLButtonElement>('button');
            containerKnot.appendChild(buttonKnot);
            buttonKnot.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
                'mdl-button--primary',
            ]);
            if (disabled) {
                buttonKnot.setAttribute('disabled');
            } else {
                buttonKnot.addEventListener('click', () => {
                    action.click(item);
                });
            }
            if (title) {
                const tooltip = new Tooltip(buttonKnot);
                tooltip.render(title);
            }
            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml(icon);
            buttonKnot.appendChild(iconKnot);
        }
    }

    /**
     * @description Loads data items into the table and redraws the body. Shows the empty-state
     * content handler if the collection is empty.
     *
     * @param {Array<any>} items - Array of row data objects to display.
     *
     * @example
     * table.setData([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
     */
    setData(items: Array<any>): void {
        this.collection.reload(items);
        if (this.collection.size() === 0) {
            this.contentHandler.show();
        } else {
            this.contentHandler.hide();
            this._draw();
        }
    }

    /**
     * @description Sets the total item count and redraws the pager controls.
     *
     * @param {number} count - The total number of items across all pages.
     *
     * @example
     * table.setCount(150);
     */
    setCount(count: number): void {
        this.pager.setCount(count);
        this.pager.draw();
    }

    /**
     * @description Returns the items for the current page, slicing the collection if needed.
     * @returns {Array<T>} The visible row items.
     */
    private _getItems(): Array<T> {
        let items = this.collection.getItems();
        if (this.collection.size() > this.options.row_count) {
            items = this.collection.limit(
                this.pager.offset,
                this.options.row_count,
            );
        }
        return items;
    }

    /**
     * @description Clears the table body and redraws all visible rows with header and data rows.
     */
    private _draw(): void {
        this.tbody.removeChildren();
        eachArray(this._getItems(), (item, rowIndex) => {
            this._addHeaderRow(item, rowIndex);
            this._addRow(item, rowIndex);
        });
        mdl(this.tbody);
    }

    /**
     * @description Renders the table by updating the sorting state and triggering a data refresh.
     *
     * @example
     * table.render();
     */
    render(): void {
        if (!this.tableKnot.isEmpty()) {
            this._updateSorting();
        }
    }
}
