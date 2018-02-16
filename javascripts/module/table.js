goog.provide('SUI.Table');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Dropdown');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Table}
 * @param {!SUI.Node} dom
 * @param {!Object=} opt_options
 * @param {string=} opt_selector
 */
SUI.Table = function(dom, opt_options, opt_selector = 'table') {
  this.table = new SUI.Query(opt_selector, dom).getItem();
  this.tableResponsive = this.table.getParent();
  if (!this.table.isEmpty()) {
    this._setOptions(opt_options);
    this._init();
  }
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Table.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object({
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
  this._initHeader();
  this._initSearch();
  this._initStructure();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._initSearch = function() {
  if (this.options.columns[this.options.columns.length - 1] === 'search') {
    let searchNode = new SUI.Node('div');
    searchNode.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--expandable']);
    this.heads.get(this.heads.size() - 1).insert(searchNode);

    let labelNode = new SUI.Node('label');
    labelNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    labelNode.setFor('table-search');
    searchNode.appendChild(labelNode);

    let iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml('search');
    labelNode.appendChild(iconNode);

    let inputBlock = new SUI.Node('div');
    inputBlock.addClass('mdl-textfield__expandable-holder');
    searchNode.appendChild(inputBlock);

    let inputNode = new SUI.Node('input');
    inputNode.setAttribute('type', 'text');
    inputNode.setId('table-search');
    inputNode.addClass('mdl-textfield__input');
    inputNode.addEventListener('keypress', function(inputNode, event) {
      if (SUI.eq(event.keyCode, 13)) {
        this.query = inputNode.getNode().value;
        this.refresh(1);
      }
    }.bind(this));
    inputBlock.appendChild(inputNode);

    let subLabelNode = new SUI.Node('label');
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
  this.heads = new SUI.Query('thead th', this.table);
  this.heads.each((head, i) => {
    let text = head.getHtml();
    this.headerTexts.push(text);
    this._renderHeader(head, i);
  });
};

/**
 * @private
 * @param {!SUI.Node} head
 * @param {number} i
 * @return {undefined}
 */
SUI.Table.prototype._renderHeader = function(head, i) {
  let column = this.options.columns[i];
  let columnsWithOrder = this.options.sorted.filter((sort) => {
    return SUI.contain(sort, column);
  });
  if (columnsWithOrder.length === 1) {
    head.setData('column', columnsWithOrder[0]);
    head.addEventListener('click', (head) => {
      let column = head.getData('column');
      this._toggleSorting(column);
    });

    let iconsNode = new SUI.Node('span');
    head.appendChild(iconsNode);

    let iconUp = new SUI.Node('i');
    iconUp.addClass(['material-icons', 'asc']);
    iconUp.setHtml('arrow_drop_up');
    iconsNode.appendChild(iconUp);

    let iconDown = new SUI.Node('i');
    iconDown.addClass(['material-icons', 'desc']);
    iconDown.setHtml('arrow_drop_down');
    iconsNode.appendChild(iconDown);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Table.prototype._initStructure = function() {
  this.tbody = new SUI.Node('tbody');
  this.table.appendChild(this.tbody);

  this.tfoot = new SUI.Node('tfoot');
  this.table.appendChild(this.tfoot);

  let footerRow = new SUI.Node('tr');

  let statisticsNode = new SUI.Node('td');
  statisticsNode.addClass('pager-statistics');
  footerRow.appendChild(statisticsNode);

  let pagerNode = new SUI.Node('td');
  pagerNode.addClass('pager');
  pagerNode.setAttribute('colspan', this.heads.size() - 1);
  footerRow.appendChild(pagerNode);

  this.tfoot.appendChild(footerRow);

  this.pager = new SUI.Pager(this.tfoot, this.options);
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
  let params = new SUI.Object({
    'query': this.query,
    'column': this.options.sort.column,
    'order': this.options.sort.order,
    'offset': this.pager.offset,
    'limit': this.options.row_count,
  });
  this.eventAction(params);
};

/**
 * @param {!Object} params
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
  let column = this.options.columns[i];
  if ((SUI.eq(this.options.sort.column, null) && SUI.eq(i, 0)) || SUI.eq(column, this.options.sort.column)) {
    let iconNode = new SUI.Query(SUI.format('i.{0}', [this.options.sort.order]), head).getItem();
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
  this.heads.each((head, i) => {
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
  let icons = new SUI.Query('thead th i', this.table);
  icons.each(function(icon) {
    icon.removeClass('active');
  });
};

/**
 * @private
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._addHeaderRow = function(item) {
  let headerRow = new SUI.Node('tr');
  headerRow.addEventListener('click', (node) => {
    node.toggleClass('active');
    let dataRow = headerRow.getNextSibling();
    dataRow.toggleClass('open');
  });
  headerRow.addClass('header');
  this.tbody.appendChild(headerRow);

  const column = this.options.column || this.options.columns[0];
  let headerNameCell = new SUI.Node('td');
  let dataNode = this._getDataNodeByItem(item, column);
  headerNameCell.appendChild(dataNode);
  headerNameCell.setAttribute('colspan', this.heads.size() - 2);
  headerRow.appendChild(headerNameCell);

  let headerActionCell = new SUI.Node('td');
  headerRow.appendChild(headerActionCell);
  this._renderActions(headerActionCell, item);
};

/**
 * @private
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._addRow = function(item) {
  let tableRow = new SUI.Node('tr');
  tableRow.addClass('data');
  this.tbody.appendChild(tableRow);
  SUI.each(this.options.columns, (column, index) => {
    let tableDataNode = new SUI.Node('td');
    tableRow.appendChild(tableDataNode);
    this._renderDataNode(tableDataNode, item, column, index);
  });
};

/**
 * @param {!Array} actions
 * @return {undefined}
 */
SUI.Table.prototype.setActions = function(actions) {
  this.actions = actions;
};

/**
 * @private
 * @param {!SUI.Object} item
 * @param {string} column
 * @return {!SUI.Node}
 */
SUI.Table.prototype._getDataNodeByItem = function(item, column) {
  let data = item.get(column);
  let calculation = this.options.calculations[column];
  if (SUI.isFunction(calculation)) {
    data = calculation(item);
  }
  if (!SUI.instanceOf(data, SUI.Node)) {
    let node = new SUI.Node('span');
    node.setHtml(/** @type {string} */(data));
    return node;
  }
  return /** @type {!SUI.Node} */ (data);
};

/**
 * @private
 * @param {!SUI.Node} tableDataNode
 * @param {!SUI.Object} item
 * @param {string} column
 * @param {number} index
 * @return {undefined}
 */
SUI.Table.prototype._renderDataNode = function(tableDataNode, item, column, index) {
  if (SUI.inArray(['search', 'actions'], column)) {
    this._renderActions(tableDataNode, item);
  } else {
    let labelNode = new SUI.Node('span');
    labelNode.addClass('label');
    labelNode.setHtml(this.headerTexts[index]);
    this._renderHeader(labelNode, index);
    this._handleSortingColumn(labelNode, index);
    tableDataNode.appendChild(labelNode);
    let dataNode = this._getDataNodeByItem(item, column);
    tableDataNode.appendChild(dataNode);
  }
};

/**
 * @private
 * @param {!SUI.Node} tableDataNode
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._renderActions = function(tableDataNode, item) {
  let containerNode = new SUI.Node('div');
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
  let dropDown = new SUI.Dropdown(dropDownNode);
  dropDown.setActions(this.actions, item);
};

/**
 * @private
 * @param {!SUI.Node} containerNode
 * @param {!Object} action
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Table.prototype._createActionButton = function(containerNode, action, item) {
  let [icon, title, disabled, removed] = action.style(item);
  if (!removed) {
    let buttonNode = new SUI.Node('button');
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
      new SUI.Tooltip(buttonNode, title);
    }
    let iconNode = new SUI.Node('i');
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
  this._drawTable();
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
SUI.Table.prototype._drawTable = function() {
  this.tbody.removeChildren();
  SUI.each(this._getItems(), (item) => {
    this._addHeaderRow(item);
    this._addRow(item);
  });
  SUI.mdl(/** @type {!SUI.Node} */(this.tbody));
};

/**
 * @return {undefined}
 */
SUI.Table.prototype.render = function() {
  if (!this.table.isEmpty()) {
    this._updateSorting();
  }
};
