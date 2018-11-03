goog.provide('SUI.CardCollection');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.ContentHandler');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Pager');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.CardCollection}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 * @param {?Object=} opt_ctrl
 * @param {!Object=} opt_options
 */
SUI.CardCollection = function(dom, opt_selector = '.card-collection', opt_ctrl = null, opt_options = {}) {
  this.cardCollectionNode = new SUI.Query(opt_selector, dom).getItem();
  this.ctrl = opt_ctrl;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.CardCollection.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    no_content: {
      image_url: null,
      text: '',
    },
    row_count: 12,
    pager_num: 4,
    sort: {
      column: null,
      order: 'asc',
    },
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.CardCollection.prototype._init = function() {
  this.collection = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
  this.query = '';
  this._initContentHandler();
  this._initStructure();
  this._initTemplate();
  this.pager = new SUI.Pager(this.cardCollectionNode, ['.pager', '.pager-statistics'], this.options);
  this.pager.eventAction = (page) => {
    this.refresh(page);
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.CardCollection.prototype._initContentHandler = function() {
  this.contentHandler = new SUI.ContentHandler(this.cardCollectionNode, this.options.no_content);
};

/**
 * @private
 * @return {undefined}
 */
SUI.CardCollection.prototype._initStructure = function() {
  this.cardCollectionNode.addClass('card-collection');

  this.body = new SUI.Node('div');
  this.body.addClass('cards');
  this.cardCollectionNode.appendChild(this.body);

  this.cardFooterNode = new SUI.Node('div');
  this.cardFooterNode.addClass('card-footer');
  this.cardCollectionNode.appendChild(this.cardFooterNode);

  this.pagerNode = new SUI.Node('div');
  this.pagerNode.addClass('pager-statistics');
  this.cardFooterNode.appendChild(this.pagerNode);

  this.pagerNode = new SUI.Node('div');
  this.pagerNode.addClass('pager');
  this.cardFooterNode.appendChild(this.pagerNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.CardCollection.prototype._initTemplate = function() {
  this.cardTemplate = new SUI.Query('template', this.cardCollectionNode).getItem();
  this.cardTemplate.remove();
  this.template = this.cardTemplate.toString(false);
};

/**
 * @private
 * @param {!SUI.Object} item
 * @return {!SUI.Node}
 */
SUI.CardCollection.prototype._getCardNode = function(item) {
  const regex = new RegExp('{{[a-zA-Z._,() ]*}}', 'g');
  const matches = this.template.match(regex);
  let cloneTemplate = this.template;
  SUI.each(matches, (match) => {
    const expression = match.replace('{{', '').replace('}}', '');
    if (SUI.contain(expression, 'ctrl.')) {
      const paramsRegex = new RegExp('(([a-zA-Z._, ]*))', 'g');
      const expressionMatches = expression.match(paramsRegex);
      const fnName = expressionMatches[0].replace('ctrl.', '');
      const fnKeys = expressionMatches[2].split(', ');
      const fnParams = [];
      SUI.each(fnKeys, (key) => {
        if (key === 'item') {
          fnParams.push(item);
        } else {
          fnParams.push(item.get(key));
        }
      });
      if (this.ctrl) {
        const method = this.ctrl[fnName];
        if (method) {
          const result = method.apply(this.ctrl, fnParams);
          cloneTemplate = cloneTemplate.replace(match, result);
        } else {
          console.warn(SUI.format('ctrl.{0}() missing', [fnName]));
        }
      }
    } else {
      cloneTemplate = cloneTemplate.replace(match, item.get(expression));
    }
  });
  return new SUI.Node(cloneTemplate);
};

/**
 * @param {number=} opt_page
 * @return {undefined}
 */
SUI.CardCollection.prototype.refresh = function(opt_page = -1) {
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
SUI.CardCollection.prototype.eventAction = function(params) {
  console.warn('SUI.CardCollection.eventAction()', params);
};

/**
 * @param {!SUI.Node} cardNode
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.CardCollection.prototype.eventCardNode = function(cardNode, item) {
  console.warn('SUI.CardCollection.eventCardNode()', cardNode, item);
};

/**
 * @private
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.CardCollection.prototype._addCard = function(item) {
  const cardNode = this._getCardNode(item);
  this.body.appendChild(cardNode);
  this.eventCardNode(cardNode, item);
  SUI.mdl(cardNode);
};

/**
 * @param {!Array} items
 * @return {undefined}
 */
SUI.CardCollection.prototype.setData = function(items) {
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
SUI.CardCollection.prototype.setCount = function(count) {
  this.pager.setCount(count);
  this.pager.draw();
};

/**
 * @private
 * @return {!Array}
 */
SUI.CardCollection.prototype._getItems = function() {
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
SUI.CardCollection.prototype._draw = function() {
  this.body.removeChildren();
  SUI.each(this._getItems(), (item) => {
    this._addCard(item);
  });
  SUI.mdl(this.body);
};

/**
 * @return {undefined}
 */
SUI.CardCollection.prototype.render = function() {
  this.refresh();
};
