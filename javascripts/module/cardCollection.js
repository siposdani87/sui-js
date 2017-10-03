goog.provide('SUI.CardCollection');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.CardCollection}
 * @param {!SUI.Node} dom
 * @param {!Object} ctrl
 * @param {!Object=} opt_options
 * @param {string=} opt_selector
 */
SUI.CardCollection = function(dom, ctrl, opt_options, opt_selector = '.card-collection') {
  this.cardCollection = new SUI.Query(opt_selector, dom).getItem();
  this.ctrl = ctrl;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @returns {undefined}
 */
SUI.CardCollection.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    row_count: 12,
    pager_num: 4,
    sort: {
      column: null,
      order: 'asc'
    }
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.CardCollection.prototype._init = function() {
  this.collection = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
  this.query = '';
  this._initStructure();
  this._initTemplate();
  this.pager = new SUI.Pager(this.cardCollection, this.options);
  this.pager.eventAction = () => {
    this.refresh();
  };
};

/**
 * @private
 * @returns {undefined}
 */
SUI.CardCollection.prototype._initStructure = function() {
  this.cardCollection.addClass('card-collection');

  this.body = new SUI.Node('div');
  this.body.addClass('cards');
  this.cardCollection.appendChild(this.body);

  this.cardFooterNode = new SUI.Node('div');
  this.cardFooterNode.addClass('card-footer');
  this.cardCollection.appendChild(this.cardFooterNode);

  this.pagerNode = new SUI.Node('div');
  this.pagerNode.addClass('pager-statistics');
  this.cardFooterNode.appendChild(this.pagerNode);

  this.pagerNode = new SUI.Node('div');
  this.pagerNode.addClass('pager');
  this.cardFooterNode.appendChild(this.pagerNode);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.CardCollection.prototype._initTemplate = function() {
  this.cardTemplate = new SUI.Query('template', this.cardCollection).getItem();
  this.cardTemplate.remove();
  this.template = this.cardTemplate.toString(false);
};

/**
 * @private
 * @param {!SUI.Object} item
 * @returns {!SUI.Node}
 */
SUI.CardCollection.prototype._getCardNode = function(item) {
  var regex = new RegExp('{{[a-zA-Z._,() ]*}}', 'g');
  var matches = this.template.match(regex);
  var cloneTemplate = this.template;
  SUI.each(matches, function(match) {
    var expression = match.replace('{{', '').replace('}}', '');
    if (SUI.contain(expression, 'ctrl.')) {
      var paramsRegex = new RegExp('(([a-zA-Z._, ]*))', 'g');
      var expressionMatches = expression.match(paramsRegex);
      var fnName = expressionMatches[0].replace('ctrl.', '');
      var fnKeys = expressionMatches[2].split(', ');
      var fnParams = [];
      SUI.each(fnKeys, function(key) {
        if (key === 'item') {
          fnParams.push(item);
        }
        else {
          fnParams.push(item.get(key));
        }
      }.bind(this));
      var method = this.ctrl[fnName];
      if (method) {
        var result = method.apply(this.ctrl, fnParams);
        cloneTemplate = cloneTemplate.replace(match, result);
      }
      else{
        console.warn(SUI.format('ctrl.{0}() missing', [fnName]));
      }
    }
    else {
      cloneTemplate = cloneTemplate.replace(match, item.get(expression));
    }
  }.bind(this));
  return new SUI.Node(cloneTemplate);
};


/**
 * @param {string} query
 * @returns {undefined}
 */
SUI.CardCollection.prototype.setQuery = function(query) {
  this.query = query;
  this.refresh();
};

/**
 * @param {number=} opt_page
 * @returns {undefined}
 */
SUI.CardCollection.prototype.refresh = function(opt_page = -1) {
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
 * @param {!SUI.Object} params
 * @returns {undefined}
 */
SUI.CardCollection.prototype.eventAction = function(params) {
  console.warn('SUI.CardCollection.eventAction()', params);
};

/**
 * @param {!SUI.Node} cardNode
 * @param {!SUI.Object} item
 * @returns {undefined}
 */
SUI.CardCollection.prototype.eventCardNode = function(cardNode, item) {
  console.warn('SUI.CardCollection.eventCardNode()', cardNode, item);
};

/**
 * @private
 * @param {!SUI.Object} item
 * @returns {undefined}
 */
SUI.CardCollection.prototype._addCard = function(item) {
  var cardNode = this._getCardNode(item);
  this.body.appendChild(cardNode);
  this.eventCardNode(cardNode, item);
  SUI.mdl(cardNode);
};

/**
 * @param {!Array} items
 * @returns {undefined}
 */
SUI.CardCollection.prototype.setData = function(items) {
  this.collection.reload(items);
  this._draw();
};

/**
 * @param {number} count
 * @returns {undefined}
 */
SUI.CardCollection.prototype.setCount = function(count) {
  this.pager.setCount(count);
  this.pager.draw();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.CardCollection.prototype._draw = function() {
  this.body.removeChildren();
  var items = this.collection.getItems();
  if (this.collection.size() > this.options.row_count) {
    items = this.collection.limit(this.pager.offset, this.options.row_count);
  }
  SUI.each(items, function(item) {
    this._addCard(item);
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.CardCollection.prototype.render = function() {
  this.refresh();
};