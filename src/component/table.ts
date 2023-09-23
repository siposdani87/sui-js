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
 * @class
 */
export class Table<T extends Objekt = Objekt> {
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
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(
        dom: Knot,
        opt_selector: string | undefined = 'table',
        opt_options: Object | undefined = {},
    ) {
        this.tableKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _initContentHandler(): void {
        this.contentHandler = new ContentHandler(
            this.tableKnot,
            this.options.no_content,
        );
    }
    /**
     * @private
     * @return {undefined}
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
                .get(this.headerKnots.size() - 1)
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
     * @private
     * @return {undefined}
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
     * @private
     * @param {!Knot} headerKnot
     * @param {number} columnIndex
     * @return {undefined}
     */
    private _renderHeader(headerKnot: Knot, columnIndex: number): void {
        const column = this.options.columns[columnIndex];
        if (inArray(['search', 'actions'], column)) {
            headerKnot.addClass('actions');
        }
        const columnsWithOrder = this.options.sorted.filter((sort) => {
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
     * @private
     * @return {undefined}
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
     * @param {number=} opt_page
     * @return {undefined}
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
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params: Objekt): void {
        consoleDebug('Table.eventAction()', params);
    }
    /**
     * @private
     * @param {string} columnWithOrder
     * @return {undefined}
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
     * @private
     * @param {!Knot} head
     * @param {number} i
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _updateSorting(): void {
        this._resetSorting();
        this.headerKnots.each((head, i) => {
            this._handleSortingColumn(head, i);
        });
        this.refresh();
    }
    /**
     * @private
     * @param {string} column
     * @param {string=} opt_order
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _resetSorting(): void {
        const icons = new Query('thead th .icons em', this.tableKnot);
        icons.each((icon) => {
            icon.removeClass('active');
        });
    }
    /**
     * @private
     * @return {string}
     */
    private _getColumn(): string {
        return this.options.column || this.options.columns[0];
    }
    /**
     * @private
     * @param {!T} item
     * @param {number} rowIndex
     * @return {undefined}
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
     * @private
     * @param {!T} item
     * @param {number} rowIndex
     * @return {!Array<string>}
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
     * @private
     * @param {!T} item
     * @param {number} rowIndex
     * @return {undefined}
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
     * @param {!Array<Action>} actions
     * @return {undefined}
     */
    setActions(actions: Array<Action>): void {
        this.actions = actions;
    }
    /**
     * @private
     * @param {!T} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {!Knot} parentKnot
     * @return {undefined}
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
        let items = [];
        if (!isArray(result)) {
            items = [result];
        } else {
            items = result as any;
        }
        eachArray(items, (item) => {
            if (!instanceOf(item, Knot)) {
                const dataKnot = new Knot('span');
                dataKnot.setHtml(item);
                item = dataKnot;
            }
            parentKnot.appendChild(item);
            if (item.getAttribute('title') || item.getAttribute('desc')) {
                const tooltip = new Tooltip(item);
                tooltip.render();
            }
        });
    }
    /**
     * @private
     * @param {!Knot} tableDataKnot
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {number} columnIndex
     * @return {undefined}
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
     * @private
     * @param {!Knot} tableDataKnot
     * @param {!T} item
     * @return {undefined}
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
     * @private
     * @param {!Knot} containerKnot
     * @param {!T} item
     * @return {undefined}
     */
    private _renderActionKnots(containerKnot: Knot, item: T): void {
        eachArray(this.actions, (action) => {
            this._createActionButton(containerKnot, action, item);
        });
    }
    /**
     * @private
     * @param {!Knot} dropDownKnot
     * @param {!T} item
     * @return {undefined}
     */
    private _renderDropDownKnot(dropDownKnot: Knot, item: T): void {
        const dropDown = new Dropdown(dropDownKnot);
        dropDown.setActions(this.actions, item);
    }
    /**
     * @private
     * @param {!Knot} containerKnot
     * @param {{style: !Function, click: !Function}} action
     * @param {!T} item
     * @return {undefined}
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
     * @param {!Array} items
     * @return {undefined}
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
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: number): void {
        this.pager.setCount(count);
        this.pager.draw();
    }
    /**
     * @private
     * @return {!Array<T>}
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
     * @private
     * @return {undefined}
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
     * @return {undefined}
     */
    render(): void {
        if (!this.tableKnot.isEmpty()) {
            this._updateSorting();
        }
    }
}
