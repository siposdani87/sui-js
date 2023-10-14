import { eq, inArray, contain, format, isFunction, isArray, eachArray, instanceOf, } from '../utils/operation';
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
import { mdl } from '../utils/render';
export class Table {
    constructor(dom, opt_selector = 'table', opt_options = {}) {
        this.tableKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
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
    _init() {
        this.collection = new Collection();
        this.query = '';
        this.actions = [];
        if (!this.tableKnot.getId()) {
            this.tableKnot.setId(generateId('table'));
            this._initContentHandler();
            this._initHeader();
            this._initSearch();
            this._initStructure();
        }
        else {
            // TODO: reinit other components of table
        }
    }
    _initContentHandler() {
        this.contentHandler = new ContentHandler(this.tableKnot, this.options.no_content);
    }
    _initSearch() {
        if (this.options.columns[this.options.columns.length - 1] === 'search') {
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
            const inputKnot = new Knot('input');
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
    _initHeader() {
        this.headerTexts = [];
        this.headerKnots = new Query('thead th', this.tableKnot);
        this.headerKnots.each((headerKnot, columnIndex) => {
            const text = headerKnot.getHtml();
            this.headerTexts.push(text);
            this._renderHeader(headerKnot, columnIndex);
        });
    }
    _renderHeader(headerKnot, columnIndex) {
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
    _initStructure() {
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
        this.pager = new Pager(this.tfoot, ['.pager', '.pager-statistics'], this.options);
        this.pager.eventAction = (page) => {
            this.refresh(page);
        };
    }
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
    eventAction(params) {
        consoleDebug('Table.eventAction()', params);
    }
    _toggleSorting(columnWithOrder) {
        const [column, direction] = columnWithOrder.split(':', 2);
        let order = direction || 'desc';
        if (eq(this.options.sort.column, column) &&
            eq(this.options.sort.order, order)) {
            order = order === 'asc' ? 'desc' : 'asc';
        }
        this._setSorting(column, order);
    }
    _handleSortingColumn(head, i) {
        const column = this.options.columns[i];
        if ((eq(this.options.sort.column, null) && eq(i, 0)) ||
            eq(column, this.options.sort.column)) {
            const iconKnot = new Query(format('.icons em.{0}', [this.options.sort.order]), head).getKnot();
            if (!iconKnot.isEmpty()) {
                iconKnot.addClass('active');
            }
        }
    }
    _updateSorting() {
        this._resetSorting();
        this.headerKnots.each((head, i) => {
            this._handleSortingColumn(head, i);
        });
        this.refresh();
    }
    _setSorting(column, opt_order = 'asc') {
        this.options.sort.column = column;
        this.options.sort.order = opt_order;
        this._updateSorting();
    }
    _resetSorting() {
        const icons = new Query('thead th .icons em', this.tableKnot);
        icons.each((icon) => {
            icon.removeClass('active');
        });
    }
    _getColumn() {
        return this.options.column || this.options.columns[0];
    }
    _addHeaderRow(item, rowIndex) {
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
        this._renderDataKnotByKnot(item, rowIndex, this._getColumn(), headerNameCell);
        headerNameCell.setAttribute('colspan', this.headerKnots.size() - 2);
        const headerActionCell = new Knot('td');
        headerRow.appendChild(headerActionCell);
        this._renderActions(headerActionCell, item);
    }
    _getRowStyle(item, rowIndex) {
        let results = [];
        if (this.options.rowStyle && isFunction(this.options.rowStyle)) {
            const styleResult = this.options.rowStyle(item, rowIndex);
            if (isArray(styleResult)) {
                results = styleResult;
            }
            else if (styleResult) {
                results.push(styleResult);
            }
        }
        return results;
    }
    _addRow(item, rowIndex) {
        const tableRow = new Knot('tr');
        const cssClasses = this._getRowStyle(item, rowIndex);
        tableRow.addClass(['data'].concat(cssClasses));
        this.tbody.appendChild(tableRow);
        eachArray(this.options.columns, (column, columnIndex) => {
            const tableDataKnot = new Knot('td');
            tableRow.appendChild(tableDataKnot);
            this._renderDataKnot(tableDataKnot, item, rowIndex, column, columnIndex);
        });
    }
    setActions(actions) {
        this.actions = actions;
    }
    _renderDataKnotByKnot(item, rowIndex, column, parentKnot) {
        let result = '';
        const calculation = this.options.calculations[column];
        if (isFunction(calculation)) {
            result = calculation(item, this.pager.offset + rowIndex, parentKnot);
        }
        else {
            result = item.get(column, '');
        }
        let items = [];
        if (!isArray(result)) {
            items = [result];
        }
        else {
            items = result;
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
    _renderDataKnot(tableDataKnot, item, rowIndex, column, columnIndex) {
        if (inArray(['search', 'actions'], column)) {
            this._renderActions(tableDataKnot, item);
        }
        else {
            const labelKnot = new Knot('span');
            labelKnot.addClass('label');
            labelKnot.setHtml(this.headerTexts[columnIndex]);
            this._renderHeader(labelKnot, columnIndex);
            this._handleSortingColumn(labelKnot, columnIndex);
            tableDataKnot.appendChild(labelKnot);
            this._renderDataKnotByKnot(item, rowIndex, column, tableDataKnot);
        }
    }
    _renderActions(tableDataKnot, item) {
        const containerKnot = new Knot('div');
        tableDataKnot.addClass('actions');
        tableDataKnot.appendChild(containerKnot);
        if (this.actions.length > 3) {
            containerKnot.addClass('dropDown');
            this._renderDropDownKnot(containerKnot, item);
        }
        else {
            this._renderActionKnots(containerKnot, item);
        }
    }
    _renderActionKnots(containerKnot, item) {
        eachArray(this.actions, (action) => {
            this._createActionButton(containerKnot, action, item);
        });
    }
    _renderDropDownKnot(dropDownKnot, item) {
        const dropDown = new Dropdown(dropDownKnot);
        dropDown.setActions(this.actions, item);
    }
    _createActionButton(containerKnot, action, item) {
        const [icon, title, disabled, removed] = action.style(item);
        if (!removed) {
            const buttonKnot = new Knot('button');
            containerKnot.appendChild(buttonKnot);
            buttonKnot.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
                'mdl-button--primary',
            ]);
            if (disabled) {
                buttonKnot.setAttribute('disabled');
            }
            else {
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
    setCount(count) {
        this.pager.setCount(count);
        this.pager.draw();
    }
    _getItems() {
        let items = this.collection.getItems();
        if (this.collection.size() > this.options.row_count) {
            items = this.collection.limit(this.pager.offset, this.options.row_count);
        }
        return items;
    }
    _draw() {
        this.tbody.removeChildren();
        eachArray(this._getItems(), (item, rowIndex) => {
            this._addHeaderRow(item, rowIndex);
            this._addRow(item, rowIndex);
        });
        mdl(this.tbody);
    }
    render() {
        if (!this.tableKnot.isEmpty()) {
            this._updateSorting();
        }
    }
}
