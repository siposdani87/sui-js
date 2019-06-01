goog.provide('SUI.Table');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.ContentHandler');
goog.require('SUI.Dropdown');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');

/**
 * @constructor
 * @this {SUI.Table}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 * @param {!Object=} opt_options
 */
SUI.Table = function(dom, opt_selector = 'table', opt_options = {}) {
  this.tableNode = new SUI.Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Table.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
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
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._init = function() {
  this.collection = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
  this.query = '';
  this.actions = [];
  this._initContentHandler();
  this._initHeader();
  this._initSearch();
  this._initStructure();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._initContentHandler = function() {
  this.contentHandler = new SUI.ContentHandler(this.tableNode, this.options.no_content);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._initSearch = function() {
  if (this.options.columns[this.options.columns.length - 1] === 'search') {
    const searchNode = new SUI.Node('div');
    searchNode.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--expandable']);
    this.headerNodes.get(this.headerNodes.size() - 1).insert(searchNode);

    const labelNode = new SUI.Node('label');
    labelNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    labelNode.setFor('table-search');
    searchNode.appendChild(labelNode);

    const iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml('search');
    labelNode.appendChild(iconNode);

    const inputBlock = new SUI.Node('div');
    inputBlock.addClass('mdl-textfield__expandable-holder');
    searchNode.appendChild(inputBlock);

    const inputNode = new SUI.Node('input');
    inputNode.setAttribute('type', 'text');
    inputNode.setId('table-search');
    inputNode.addClass('mdl-textfield__input');
    inputNode.addEventListener('keypress', (inputNode, event) => {
      if (SUI.eq(event.keyCode, 13)) {
        this.query = inputNode.getNode().value;
        this.refresh(1);
      }
    });
    inputBlock.appendChild(inputNode);

    const subLabelNode = new SUI.Node('label');
    subLabelNode.addClass('mdl-textfield__label');
    inputBlock.appendChild(subLabelNode);

    SUI.mdl(searchNode);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._initHeader = function() {
  this.headerTexts = [];
  this.headerNodes = new SUI.Query('thead th', this.tableNode);
  this.headerNodes.each((headerNode, columnIndex) => {
    const text = headerNode.getHtml();
    this.headerTexts.push(text);
    this._renderHeader(headerNode, columnIndex);
  });
};

/**
 * @private
 * @param {!SUI.Node} headerNode
 * @param {number} columnIndex
 * @return {undefined}
 */
SUI.Table.prototype._renderHeader = function(headerNode, columnIndex) {
  const column = this.options.columns[columnIndex];
  if (SUI.inArray(['search', 'actions'], column)) {
    headerNode.addClass('actions');
  }
  const columnsWithOrder = this.options.sorted.filter((sort) => {
    return SUI.contain(sort, column);
  });
  if (columnsWithOrder.length === 1) {
    headerNode.setData('column', columnsWithOrder[0]);
    headerNode.addEventListener('click', (headerNode) => {
      const column = headerNode.getData('column');
      this._toggleSorting(column);
    });

    const iconsNode = new SUI.Node('span');
    iconsNode.addClass('icons');
    headerNode.appendChild(iconsNode);

    const iconUp = new SUI.Node('i');
    iconUp.addClass(['material-icons', 'asc']);
    iconUp.setHtml('arrow_drop_up');
    iconsNode.appendChild(iconUp);

    const iconDown = new SUI.Node('i');
    iconDown.addClass(['material-icons', 'desc']);
    iconDown.setHtml('arrow_drop_down');
    iconsNode.appendChild(iconDown);
  }

  const headerTitle = /** @type {string} */ (headerNode.getAttribute('title'));
  const headerDesc = /** @type {string} */ (headerNode.getAttribute('desc'));
  if (headerTitle || headerDesc) {
    const iconInfo = new SUI.Node('i');
    if (headerTitle) {
      iconInfo.setAttribute('desc', headerTitle);
    }
    if (headerDesc) {
      iconInfo.setAttribute('desc', headerDesc);
    }
    iconInfo.addClass(['material-icons', 'info']);
    iconInfo.setHtml('info_outline');
    headerNode.appendChild(iconInfo);
    const tooltip = new SUI.Tooltip(iconInfo, 'BOTTOM');
    tooltip.render();
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._initStructure = function() {
  this.tbody = new SUI.Node('tbody');
  this.tableNode.appendChild(this.tbody);

  this.tfoot = new SUI.Node('tfoot');
  this.tableNode.appendChild(this.tfoot);

  const footerRow = new SUI.Node('tr');

  const statisticsNode = new SUI.Node('td');
  statisticsNode.addClass('pager-statistics');
  footerRow.appendChild(statisticsNode);

  const pagerNode = new SUI.Node('td');
  pagerNode.addClass('pager');
  pagerNode.setAttribute('colspan', this.headerNodes.size() - 1);
  footerRow.appendChild(pagerNode);

  this.tfoot.appendChild(footerRow);

  this.pager = new SUI.Pager(this.tfoot, ['.pager', '.pager-statistics'], this.options);
  this.pager.eventAction = (page) => {
    this.refresh(page);
  };
};

/**
 * @param {number=} opt_page
 * @return {undefined}
 */
SUI.Table.prototype.refresh = function(opt_page = -1) {
  if (opt_page > -1) {
    this.pager.setPage(opt_page);
  }
  const params = new SUI.Object({
    'query': this.query,
    'column': this.options.sort.column,
    'order': this.options.sort.order,
    'offset': this.pager.offset,
    'limit': this.options.row_count,
  });
  this.eventAction(params);
};

/**
 * @param {!SUI.Object} params
 * @return {undefined}
 */
SUI.Table.prototype.eventAction = function(params) {
  console.warn('SUI.Table.eventAction()', params);
};

/**
 * @private
 * @param {string} columnWithOrder
 * @return {undefined}
 */
SUI.Table.prototype._toggleSorting = function(columnWithOrder) {
  let [column, order] = columnWithOrder.split(':', 2);
  order = order || 'desc';
  if (SUI.eq(this.options.sort.column, column) && SUI.eq(this.options.sort.order, order)) {
    order = (order === 'asc') ? 'desc' : 'asc';
  }
  this._setSorting(column, order);
};

/**
 * @private
 * @param {!SUI.Node} head
 * @param {number} i
 * @return {undefined}
 */
SUI.Table.prototype._handleSortingColumn = function(head, i) {
  const column = this.options.columns[i];
  if ((SUI.eq(this.options.sort.column, null) && SUI.eq(i, 0)) || SUI.eq(column, this.options.sort.column)) {
    const iconNode = new SUI.Query(SUI.format('.icons i.{0}', [this.options.sort.order]), head).getItem();
    if (!iconNode.isEmpty()) {
      iconNode.addClass('active');
    }
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._updateSorting = function() {
  this._resetSorting();
  this.headerNodes.each((head, i) => {
    this._handleSortingColumn(head, i);
  });
  this.refresh();
};

/**
 * @private
 * @param {string} column
 * @param {string=} opt_order
 * @return {undefined}
 */
SUI.Table.prototype._setSorting = function(column, opt_order = 'asc') {
  this.options.sort.column = column;
  this.options.sort.order = opt_order;
  this._updateSorting();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._resetSorting = function() {
  const icons = new SUI.Query('thead th .icons i', this.tableNode);
  icons.each(function(icon) {
    icon.removeClass('active');
  });
};

/**
 * @private
 * @return {string}
 */
SUI.Table.prototype._getColumn = function() {
  return this.options.column || this.options.columns[0];
};

/**
 * @private
 * @param {!SUI.Object} item
 * @param {number} rowIndex
 * @return {undefined}
 */
SUI.Table.prototype._addHeaderRow = function(item, rowIndex) {
  const headerRow = new SUI.Node('tr');
  headerRow.addEventListener('click', (node) => {
    node.toggleClass('active');
    const dataRow = headerRow.getNextSibling();
    dataRow.toggleClass('open');
  });
  headerRow.addClass('header');
  this.tbody.appendChild(headerRow);

  const headerNameCell = new SUI.Node('td');
  headerRow.appendChild(headerNameCell);
  this._renderDataNodeByItem(item, rowIndex, this._getColumn(), headerNameCell, headerRow);
  headerNameCell.setAttribute('colspan', this.headerNodes.size() - 2);

  const headerActionCell = new SUI.Node('td');
  headerRow.appendChild(headerActionCell);
  this._renderActions(headerActionCell, item);
};

/**
 * @private
 * @param {!SUI.Object} item
 * @param {number} rowIndex
 * @return {undefined}
 */
SUI.Table.prototype._addRow = function(item, rowIndex) {
  const tableRow = new SUI.Node('tr');
  tableRow.addClass('data');
  this.tbody.appendChild(tableRow);
  SUI.each(this.options.columns, (column, columnIndex) => {
    const tableDataNode = new SUI.Node('td');
    tableRow.appendChild(tableDataNode);
    this._renderDataNode(tableDataNode, item, rowIndex, column, columnIndex, tableRow);
  });
};

/**
 * @param {!Array<{style: !Function, click: !Function}>} actions
 * @return {undefined}
 */
SUI.Table.prototype.setActions = function(actions) {
  this.actions = actions;
};

/**
 * @private
 * @param {!SUI.Object} item
 * @param {number} rowIndex
 * @param {string} column
 * @param {!SUI.Node} parentNode
 * @param {!SUI.Node} tableRow
 * @return {undefined}
 */
SUI.Table.prototype._renderDataNodeByItem = function(item, rowIndex, column, parentNode, tableRow) {
  let dataNode = item.get(column, '');
  const calculation = this.options.calculations[column];
  if (SUI.isFunction(calculation)) {
    dataNode = calculation(item, this.pager.offset + rowIndex, tableRow);
  }
  if (!SUI.instanceOf(dataNode, SUI.Node)) {
    const node = new SUI.Node('span');
    node.setHtml(/** @type {string} */(dataNode));
    dataNode = node;
  }
  parentNode.appendChild(/** @type {!SUI.Node} */ (dataNode));
  if (dataNode.getAttribute('title') || dataNode.getAttribute('desc')) {
    const tooltip = new SUI.Tooltip(/** @type {!SUI.Node} */ (dataNode));
    tooltip.render();
  }
};

/**
 * @private
 * @param {!SUI.Node} tableDataNode
 * @param {!SUI.Object} item
 * @param {number} rowIndex
 * @param {string} column
 * @param {number} columnIndex
 * @param {!SUI.Node} tableRow
 * @return {undefined}
 */
SUI.Table.prototype._renderDataNode = function(tableDataNode, item, rowIndex, column, columnIndex, tableRow) {
  if (SUI.inArray(['search', 'actions'], column)) {
    this._renderActions(tableDataNode, item);
  } else {
    const labelNode = new SUI.Node('span');
    labelNode.addClass('label');
    labelNode.setHtml(this.headerTexts[columnIndex]);
    this._renderHeader(labelNode, columnIndex);
    this._handleSortingColumn(labelNode, columnIndex);
    tableDataNode.appendChild(labelNode);
    this._renderDataNodeByItem(item, rowIndex, column, tableDataNode, tableRow);
  }
};

/**
 * @private
 * @param {!SUI.Node} tableDataNode
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._renderActions = function(tableDataNode, item) {
  const containerNode = new SUI.Node('div');
  tableDataNode.addClass('actions');
  tableDataNode.appendChild(containerNode);
  if (this.actions.length > 3) {
    containerNode.addClass('dropDown');
    this._renderDropDownNode(containerNode, item);
  } else {
    this._renderActionNodes(containerNode, item);
  }
};

/**
 * @private
 * @param {!SUI.Node} containerNode
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._renderActionNodes = function(containerNode, item) {
  SUI.each(this.actions, (action) => {
    this._createActionButton(containerNode, action, item);
  });
};

/**
 * @private
 * @param {!SUI.Node} dropDownNode
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._renderDropDownNode = function(dropDownNode, item) {
  const dropDown = new SUI.Dropdown(dropDownNode);
  dropDown.setActions(this.actions, item);
};

/**
 * @private
 * @param {!SUI.Node} containerNode
 * @param {{style: !Function, click: !Function}} action
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._createActionButton = function(containerNode, action, item) {
  const [icon, title, disabled, removed] = action.style(item);
  if (!removed) {
    const buttonNode = new SUI.Node('button');
    containerNode.appendChild(buttonNode);
    buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon', 'mdl-button--primary']);
    if (disabled) {
      buttonNode.setAttribute('disabled');
    } else {
      buttonNode.addEventListener('click', () => {
        action.click(item);
      });
    }
    if (title) {
      const tooltip = new SUI.Tooltip(buttonNode);
      tooltip.render(title);
    }
    const iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml(/** @type {string} */(icon));
    buttonNode.appendChild(iconNode);
  }
};

/**
 * @param {!Array} items
 * @return {undefined}
 */
SUI.Table.prototype.setData = function(items) {
  this.collection.reload(items);
  if (this.collection.size() === 0) {
    this.contentHandler.show();
  } else {
    this.contentHandler.hide();
    this._draw();
  }
};

/**
 * @param {number} count
 * @return {undefined}
 */
SUI.Table.prototype.setCount = function(count) {
  this.pager.setCount(count);
  this.pager.draw();
};

/**
 * @private
 * @return {!Array}
 */
SUI.Table.prototype._getItems = function() {
  let items = this.collection.getItems();
  if (this.collection.size() > this.options.row_count) {
    items = this.collection.limit(this.pager.offset, this.options.row_count);
  }
  return items;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._draw = function() {
  this.tbody.removeChildren();
  SUI.each(this._getItems(), (item, rowIndex) => {
    this._addHeaderRow(item, rowIndex);
    this._addRow(item, rowIndex);
  });
  SUI.mdl(this.tbody);
};

/**
 * @return {undefined}
 */
SUI.Table.prototype.render = function() {
  if (!this.tableNode.isEmpty()) {
    this._updateSorting();
  }
};
