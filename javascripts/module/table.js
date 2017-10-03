goog.provide('SUI.Table');

goog.require('SUI');
goog.require('SUI.Collection');
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
SUI.Table = function (dom, opt_options, opt_selector = 'table') {
  this.table = new SUI.Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @returns {undefined}
 */
SUI.Table.prototype._setOptions = function (opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    row_count: 10,
    pager_num: 4,
    sort: {
      column: null,
      order: 'desc'
    },
    columns: [],
    calculations: {},
    sorted: []
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._init = function () {
  this.collection = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
  this.query = '';
  this.actions = [];
  this._initHeader();
  this._initSearch();
  this._initStructure();
  this.pager = new SUI.Pager(this.tfoot, this.options);
  this.pager.eventAction = () => {
    this.refresh();
  };
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._initSearch = function () {
  if (this.options.columns[this.options.columns.length - 1] === 'actions') {
    var searchNode = new SUI.Node('div');
    searchNode.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--expandable']);
    this.heads.get(this.heads.size() - 1).insert(searchNode);

    var labelNode = new SUI.Node('label');
    labelNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    labelNode.setAttribute('for', 'table-search');
    searchNode.appendChild(labelNode);

    var iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml('search');
    labelNode.appendChild(iconNode);

    var inputBlock = new SUI.Node('div');
    inputBlock.addClass('mdl-textfield__expandable-holder');
    searchNode.appendChild(inputBlock);

    var inputNode = new SUI.Node('input');
    inputNode.setAttribute('type', 'text');
    inputNode.setId('table-search');
    inputNode.addClass('mdl-textfield__input');
    inputNode.addEventListener('keypress', function (inputNode, event) {
      if (SUI.eq(event.keyCode, 13)) {
        var value = inputNode.getNode().value;
        this._setQuery(value);
      }
    }.bind(this));
    inputBlock.appendChild(inputNode);

    var subLabelNode = new SUI.Node('label');
    subLabelNode.addClass('mdl-textfield__label');
    inputBlock.appendChild(subLabelNode);

    SUI.mdl(searchNode);
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._initHeader = function () {
  this.heads = new SUI.Query('thead th', this.table);
  this.heads.each((head, i) => {
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
  });
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._initStructure = function () {
  this.tbody = new SUI.Node('tbody');
  this.table.appendChild(this.tbody);

  this.tfoot = new SUI.Node('tfoot');
  this.table.appendChild(this.tfoot);

  var footerRow = new SUI.Node('tr');

  var statisticsNode = new SUI.Node('td');
  statisticsNode.addClass('pager-statistics');
  footerRow.appendChild(statisticsNode);

  var pagerNode = new SUI.Node('td');
  pagerNode.addClass('pager');
  pagerNode.setAttribute('colspan', this.heads.size() - 1);
  footerRow.appendChild(pagerNode);

  this.tfoot.appendChild(footerRow);
};

/**
 * @private
 * @param {string} query
 * @returns {undefined}
 */
SUI.Table.prototype._setQuery = function (query) {
  this.query = query;
  this.refresh();
};

/**
 * @param {number=} opt_page
 * @returns {undefined}
 */
SUI.Table.prototype.refresh = function (opt_page = -1) {
  if (opt_page > -1) {
    this.pager.setPage(opt_page);
  }
  var params = new SUI.Object({
    'query': this.query,
    'column': this.options.sort.column,
    'order': this.options.sort.order,
    'offset': this.pager.offset,
    'limit': this.options.row_count
  });
  this.eventAction(params);
};

/**
 * @param {!Object} params
 * @returns {undefined}
 */
SUI.Table.prototype.eventAction = function (params) {
  console.warn('SUI.Table.eventAction()', params);
};

/**
 * @private
 * @param {string} columnWithOrder
 * @returns {undefined}
 */
SUI.Table.prototype._toggleSorting = function (columnWithOrder) {
  let [column, order] = columnWithOrder.split(':', 2);
  order = order || 'desc';
  if (SUI.eq(this.options.sort.column, column) && SUI.eq(this.options.sort.order, order)) {
    order = (order === 'asc') ? 'desc' : 'asc';
  }
  this._setSorting(column, order);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._updateSorting = function () {
  this._resetSorting();
  this.heads.each(function (head, i) {
    var column = this.options.columns[i];
    if ((SUI.eq(this.options.sort.column, null) && SUI.eq(i, 0)) || SUI.eq(column, this.options.sort.column)) {
      var iconNode = new SUI.Query(SUI.format('i.{0}', [this.options.sort.order]), head).getItem();
      if (!iconNode.isEmpty()) {
        iconNode.addClass('active');
      }
    }
  }.bind(this));
  this.refresh();
};

/**
 * @private
 * @param {string} column
 * @param {string=} opt_order
 * @returns {undefined}
 */
SUI.Table.prototype._setSorting = function (column, opt_order = 'asc') {
  this.options.sort.column = column;
  this.options.sort.order = opt_order;
  this._updateSorting();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._resetSorting = function () {
  var icons = new SUI.Query('thead th i', this.table);
  icons.each(function (icon) {
    icon.removeClass('active');
  });
};

/**
 * @private
 * @param {!SUI.Object} item
 * @returns {undefined}
 */
SUI.Table.prototype._addRow = function (item) {
  var tableRow = new SUI.Node('tr');
  this.tbody.appendChild(tableRow);
  SUI.each(this.options.columns, function (column) {
    var dataNode = this._getDataNode(item, column);
    tableRow.appendChild(dataNode);
  }.bind(this));
};

/**
 * @param {!Array} actions
 * @returns {undefined}
 */
SUI.Table.prototype.setActions = function (actions) {
  this.actions = actions;
};

/**
 * @private
 * @param {!SUI.Object} item
 * @param {string} column
 * @returns {!SUI.Node}
 */
SUI.Table.prototype._getDataNode = function (item, column) {
  var tableData = new SUI.Node('td');
  if (SUI.eq(column, 'actions')) {
    var actionNodes = this._getActionNodes(item);
    SUI.each(actionNodes, function (actionNode) {
      tableData.appendChild(actionNode);
    }.bind(this));
  }
  else {
    var text = item.get(column);
    var calculation = this.options.calculations[column];
    if (SUI.isFunction(calculation)) {
      text = calculation(item);
    }
    tableData.setHtml(/** @type {string} */ (text));
  }
  return tableData;
};

/**
 * @private
 * @param {!SUI.Object} item
 * @returns {!Array}
 */
SUI.Table.prototype._getActionNodes = function (item) {
  var nodes = [];
  SUI.each(this.actions, (action) => {
    var node = this._createActionButton(action, item);
    nodes.push(node);
  });
  return nodes;
};

/**
 * @private
 * @param {!Object} action
 * @param {!SUI.Object} item
 * @returns {!SUI.Node}
 */
SUI.Table.prototype._createActionButton = function (action, item) {
  var style = action.style(item);
  var buttonNode = new SUI.Node('button');
  buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon', 'mdl-button--primary']);
  if (style[1]) {
    //TODO Firefox issues :(
    buttonNode.setAttribute('disabled');
  }
  else {
    buttonNode.addEventListener('click', function (button) {
      action.click(item);
    }.bind(this));
  }
  var iconNode = new SUI.Node('i');
  iconNode.addClass('material-icons');
  iconNode.setHtml(/** @type {string} */ (style[0]));
  buttonNode.appendChild(iconNode);
  return buttonNode;
};

/**
 * @param {!Array} items
 * @returns {undefined}
 */
SUI.Table.prototype.setData = function (items) {
  this.collection.reload(items);
  this._draw();
};

/**
 * @param {number} count
 * @returns {undefined}
 */
SUI.Table.prototype.setCount = function (count) {
  this.pager.setCount(count);
  this.pager.draw();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Table.prototype._draw = function () {
  this.tbody.removeChildren();
  var items = this.collection.getItems();
  if (this.collection.size() > this.options.row_count) {
    items = this.collection.limit(this.pager.offset, this.options.row_count);
  }
  SUI.each(items, function (item) {
    this._addRow(item);
  }.bind(this));
  SUI.mdl(/** @type {!SUI.Node} */ (this.tbody));
};

/**
 * @returns {undefined}
 */
SUI.Table.prototype.render = function () {
  this._updateSorting();
};
