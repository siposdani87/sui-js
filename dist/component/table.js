import { eq, mdl, inArray, contain, format, isFunction, isArray, each, eachArray, instanceOf, } from '../utils/operation';
import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Dropdown } from './dropdown';
import { Pager } from './pager';
import { Tooltip } from './tooltip';
import { consoleWarn } from '../utils/log';
import { generateId } from '../utils/coder';
/**
 * @class
 */
export class Table {
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = 'table', opt_options = {}) {
        this.tableNode = new Query(opt_selector, dom).getItem();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
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
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.collection = /** @type {!Collection<!Objekt>} */ new Collection();
        this.query = '';
        this.actions = [];
        if (!this.tableNode.getId()) {
            this.tableNode.setId(generateId('table'));
            this._initContentHandler();
            this._initHeader();
            this._initSearch();
            this._initStructure();
        }
        else {
            // TODO: reinit other components of table
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _initContentHandler() {
        this.contentHandler = new ContentHandler(this.tableNode, this.options.no_content);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initSearch() {
        if (this.options.columns[this.options.columns.length - 1] === 'search') {
            const searchNode = new Item('div');
            searchNode.addClass([
                'mdl-textfield',
                'mdl-js-textfield',
                'mdl-textfield--expandable',
            ]);
            this.headerNodes
                .get(this.headerNodes.size() - 1)
                .insert(searchNode);
            const labelNode = new Item('label');
            labelNode.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            labelNode.setFor('table-search');
            searchNode.appendChild(labelNode);
            const iconNode = new Item('em');
            iconNode.addClass('material-icons');
            iconNode.setHtml('search');
            labelNode.appendChild(iconNode);
            const inputBlock = new Item('div');
            inputBlock.addClass('mdl-textfield__expandable-holder');
            searchNode.appendChild(inputBlock);
            const inputNode = new Item('input');
            inputNode.setAttribute('type', 'text');
            inputNode.setId('table-search');
            inputNode.addClass('mdl-textfield__input');
            inputNode.addEventListener('keypress', (inputNode, event) => {
                if (eq(event.keyCode, 13)) {
                    this.query = inputNode.getNode().value;
                    this.refresh(1);
                }
                return true;
            });
            inputBlock.appendChild(inputNode);
            const subLabelNode = new Item('label');
            subLabelNode.addClass('mdl-textfield__label');
            inputBlock.appendChild(subLabelNode);
            mdl(searchNode);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHeader() {
        this.headerTexts = [];
        this.headerNodes = new Query('thead th', this.tableNode);
        this.headerNodes.each((headerNode, columnIndex) => {
            const text = headerNode.getHtml();
            this.headerTexts.push(text);
            this._renderHeader(headerNode, columnIndex);
        });
    }
    /**
     * @private
     * @param {!Item} headerNode
     * @param {number} columnIndex
     * @return {undefined}
     */
    _renderHeader(headerNode, columnIndex) {
        const column = this.options.columns[columnIndex];
        if (inArray(['search', 'actions'], column)) {
            headerNode.addClass('actions');
        }
        const columnsWithOrder = this.options.sorted.filter((sort) => {
            return contain(sort, column);
        });
        if (columnsWithOrder.length === 1) {
            headerNode.setData('column', columnsWithOrder[0]);
            headerNode.addEventListener('click', (headerNode) => {
                const column = headerNode.getData('column');
                this._toggleSorting(column);
            });
            const iconsContainerNode = new Item('span');
            iconsContainerNode.addClass('icons');
            headerNode.appendChild(iconsContainerNode);
            const iconUp = new Item('em');
            iconUp.addClass(['material-icons', 'asc']);
            iconUp.setHtml('arrow_drop_up');
            iconsContainerNode.appendChild(iconUp);
            const iconDown = new Item('em');
            iconDown.addClass(['material-icons', 'desc']);
            iconDown.setHtml('arrow_drop_down');
            iconsContainerNode.appendChild(iconDown);
        }
        const headerTitle = 
        /** @type {string} */ headerNode.getAttribute('title');
        const headerDesc = 
        /** @type {string} */ headerNode.getAttribute('desc');
        if (headerTitle || headerDesc) {
            const iconInfo = new Item('em');
            if (headerTitle) {
                iconInfo.setAttribute('desc', headerTitle);
            }
            if (headerDesc) {
                iconInfo.setAttribute('desc', headerDesc);
            }
            iconInfo.addClass(['material-icons', 'info']);
            iconInfo.setHtml('info_outline');
            headerNode.appendChild(iconInfo);
            const tooltip = new Tooltip(iconInfo, 'BOTTOM');
            tooltip.render();
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _initStructure() {
        this.tbody = new Item('tbody');
        this.tableNode.appendChild(this.tbody);
        this.tfoot = new Item('tfoot');
        this.tableNode.appendChild(this.tfoot);
        const footerRow = new Item('tr');
        const statisticsNode = new Item('td');
        statisticsNode.addClass('pager-statistics');
        footerRow.appendChild(statisticsNode);
        const pagerNode = new Item('td');
        pagerNode.addClass('pager');
        pagerNode.setAttribute('colspan', this.headerNodes.size() - 1);
        footerRow.appendChild(pagerNode);
        this.tfoot.appendChild(footerRow);
        this.pager = new Pager(this.tfoot, ['.pager', '.pager-statistics'], this.options);
        this.pager.eventAction = (page) => {
            this.refresh(page);
        };
    }
    /**
     * @param {number=} opt_page
     * @return {undefined}
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
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params) {
        consoleWarn('Table.eventAction()', params);
    }
    /**
     * @private
     * @param {string} columnWithOrder
     * @return {undefined}
     */
    _toggleSorting(columnWithOrder) {
        let [column, order] = columnWithOrder.split(':', 2);
        order = order || 'desc';
        if (eq(this.options.sort.column, column) &&
            eq(this.options.sort.order, order)) {
            order = order === 'asc' ? 'desc' : 'asc';
        }
        this._setSorting(column, order);
    }
    /**
     * @private
     * @param {!Item} head
     * @param {number} i
     * @return {undefined}
     */
    _handleSortingColumn(head, i) {
        const column = this.options.columns[i];
        if ((eq(this.options.sort.column, null) && eq(i, 0)) ||
            eq(column, this.options.sort.column)) {
            const iconNode = new Query(format('.icons em.{0}', [this.options.sort.order]), head).getItem();
            if (!iconNode.isEmpty()) {
                iconNode.addClass('active');
            }
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _updateSorting() {
        this._resetSorting();
        this.headerNodes.each((head, i) => {
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
    _setSorting(column, opt_order = 'asc') {
        this.options.sort.column = column;
        this.options.sort.order = opt_order;
        this._updateSorting();
    }
    /**
     * @private
     * @return {undefined}
     */
    _resetSorting() {
        const icons = new Query('thead th .icons em', this.tableNode);
        icons.each((icon) => {
            icon.removeClass('active');
        });
    }
    /**
     * @private
     * @return {string}
     */
    _getColumn() {
        return this.options.column || this.options.columns[0];
    }
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    _addHeaderRow(item, rowIndex) {
        const headerRow = new Item('tr');
        headerRow.addEventListener('click', (node) => {
            node.toggleClass('opened');
            const dataRow = headerRow.getNextSibling();
            dataRow.toggleClass('open');
        });
        const cssClasses = this._getRowStyle(item, rowIndex);
        headerRow.addClass(['header'].concat(cssClasses));
        this.tbody.appendChild(headerRow);
        const headerNameCell = new Item('td');
        headerRow.appendChild(headerNameCell);
        this._renderDataNodeByItem(item, rowIndex, this._getColumn(), headerNameCell);
        headerNameCell.setAttribute('colspan', this.headerNodes.size() - 2);
        const headerActionCell = new Item('td');
        headerRow.appendChild(headerActionCell);
        this._renderActions(headerActionCell, item);
    }
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {!Array<string>}
     */
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
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    _addRow(item, rowIndex) {
        const tableRow = new Item('tr');
        const cssClasses = this._getRowStyle(item, rowIndex);
        tableRow.addClass(['data'].concat(cssClasses));
        this.tbody.appendChild(tableRow);
        each(this.options.columns, (column, columnIndex) => {
            const tableDataNode = new Item('td');
            tableRow.appendChild(tableDataNode);
            this._renderDataNode(tableDataNode, item, rowIndex, column, columnIndex);
        });
    }
    /**
     * @param {!Array<{style: !Function, click: !Function}>} actions
     * @return {undefined}
     */
    setActions(actions) {
        this.actions = actions;
    }
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {!Item} parentNode
     * @return {undefined}
     */
    _renderDataNodeByItem(item, rowIndex, column, parentNode) {
        let result = '';
        const calculation = this.options.calculations[column];
        if (isFunction(calculation)) {
            result = calculation(item, this.pager.offset + rowIndex, parentNode);
        }
        else {
            result = item.get(column, '');
        }
        let items = [];
        if (!isArray(result)) {
            items = [result];
        }
        else {
            items = /** @type {!Array} */ result;
        }
        eachArray(items, (item) => {
            if (!instanceOf(item, Item)) {
                const dataNode = new Item('span');
                dataNode.setHtml(/** @type {string} */ item);
                item = dataNode;
            }
            parentNode.appendChild(/** @type {!Item} */ item);
            if (item.getAttribute('title') || item.getAttribute('desc')) {
                const tooltip = new Tooltip(/** @type {!Item} */ item);
                tooltip.render();
            }
        });
    }
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {number} columnIndex
     * @return {undefined}
     */
    _renderDataNode(tableDataNode, item, rowIndex, column, columnIndex) {
        if (inArray(['search', 'actions'], column)) {
            this._renderActions(tableDataNode, item);
        }
        else {
            const labelNode = new Item('span');
            labelNode.addClass('label');
            labelNode.setHtml(this.headerTexts[columnIndex]);
            this._renderHeader(labelNode, columnIndex);
            this._handleSortingColumn(labelNode, columnIndex);
            tableDataNode.appendChild(labelNode);
            this._renderDataNodeByItem(item, rowIndex, column, tableDataNode);
        }
    }
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderActions(tableDataNode, item) {
        const containerNode = new Item('div');
        tableDataNode.addClass('actions');
        tableDataNode.appendChild(containerNode);
        if (this.actions.length > 3) {
            containerNode.addClass('dropDown');
            this._renderDropDownNode(containerNode, item);
        }
        else {
            this._renderActionNodes(containerNode, item);
        }
    }
    /**
     * @private
     * @param {!Item} containerNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderActionNodes(containerNode, item) {
        each(this.actions, (action) => {
            this._createActionButton(containerNode, action, item);
        });
    }
    /**
     * @private
     * @param {!Item} dropDownNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderDropDownNode(dropDownNode, item) {
        const dropDown = new Dropdown(dropDownNode);
        dropDown.setActions(this.actions, item);
    }
    /**
     * @private
     * @param {!Item} containerNode
     * @param {{style: !Function, click: !Function}} action
     * @param {!Objekt} item
     * @return {undefined}
     */
    _createActionButton(containerNode, action, item) {
        const [icon, title, disabled, removed] = action.style(item);
        if (!removed) {
            const buttonNode = new Item('button');
            containerNode.appendChild(buttonNode);
            buttonNode.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
                'mdl-button--primary',
            ]);
            if (disabled) {
                buttonNode.setAttribute('disabled');
            }
            else {
                buttonNode.addEventListener('click', () => {
                    action.click(item);
                });
            }
            if (title) {
                const tooltip = new Tooltip(buttonNode);
                tooltip.render(title);
            }
            const iconNode = new Item('em');
            iconNode.addClass('material-icons');
            iconNode.setHtml(/** @type {string} */ icon);
            buttonNode.appendChild(iconNode);
        }
    }
    /**
     * @param {!Array} items
     * @return {undefined}
     */
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
     * @param {number} count
     * @return {undefined}
     */
    setCount(count) {
        this.pager.setCount(count);
        this.pager.draw();
    }
    /**
     * @private
     * @return {!Array}
     */
    _getItems() {
        let items = this.collection.getItems();
        if (this.collection.size() > this.options.row_count) {
            items = this.collection.limit(this.pager.offset, this.options.row_count);
        }
        return items;
    }
    /**
     * @private
     * @return {undefined}
     */
    _draw() {
        this.tbody.removeChildren();
        each(this._getItems(), (item, rowIndex) => {
            this._addHeaderRow(item, rowIndex);
            this._addRow(item, rowIndex);
        });
        mdl(this.tbody);
    }
    /**
     * @return {undefined}
     */
    render() {
        if (!this.tableNode.isEmpty()) {
            this._updateSorting();
        }
    }
}
