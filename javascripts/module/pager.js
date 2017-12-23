goog.provide('SUI.Pager');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Pager}
 * @param {!SUI.Node} dom
 * @param {!Object=} opt_options
 * @param {!Array=} opt_selectors
 */
SUI.Pager = function(dom, opt_options, opt_selectors = ['.pager', '.pager-statistics']) {
  this.pager = new SUI.Query(opt_selectors[0], dom).getItem();
  this.pagerStatistics = new SUI.Query(opt_selectors[1], dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Pager.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object({
    row_count: 10,
    pager_num: 4,
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._init = function() {
  this.count = this.options.row_count;
  this.setPage(1);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._drawPager = function() {
  this.pager.removeChildren();
  this.pageNum = Math.ceil(this.count / this.options.row_count);
  this._drawPreviousButton();
  this._drawPageNumbers();
  this._drawNextButton();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._drawStatistics = function() {
  let page = this.page - 1;
  let from = page * this.options.row_count + 1;
  let to = page * this.options.row_count + this.options.row_count;
  to = to > this.count ? this.count : to;
  if (to > 0) {
    this.pagerStatistics.setHtml(SUI.format('{0}‒{1} / {2}', [from, to, this.count]));
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._drawPreviousButton = function() {
  if (this.pageNum > 1) {
    let previousButton = new SUI.Node('button');
    previousButton.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
    previousButton.addEventListener('click', () => {
      this._previous();
    });
    let iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml('chevron_left');
    previousButton.appendChild(iconNode);
    SUI.mdl(previousButton);
    this.pager.appendChild(previousButton);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._drawNextButton = function() {
  if (this.pageNum > 1) {
    let nextButton = new SUI.Node('button');
    nextButton.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
    nextButton.addEventListener('click', () => {
      this._next();
    });
    let iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml('chevron_right');
    nextButton.appendChild(iconNode);
    SUI.mdl(nextButton);
    this.pager.appendChild(nextButton);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._drawPageNumbers = function() {
  let pagers = this._getPagers();
  if (pagers.length > 1) {
    SUI.each(pagers, (pager) => {
      let pageNode = new SUI.Node('button');
      pageNode.setData('page', pager.page);
      pageNode.setHtml(pager.text);
      pageNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
      if (this.page === pager.page) {
        pageNode.addClass('mdl-button--accent');
      }
      pageNode.addEventListener('click', (node) => {
        const page = node.getData('page');
        this._go(page);
      });
      SUI.mdl(pageNode);
      this.pager.appendChild(pageNode);
    });
  }
};

/**
 * @private
 * @return {!Array}
 */
SUI.Pager.prototype._getPagers = function() {
  let part = Math.floor((this.page - 1) / this.options.pager_num);
  let pagers = [];
  if (part > 0) {
    pagers.push({
      text: '...',
      page: part * this.options.pager_num,
    });
  }
  for (let i = 1; i <= this.options.pager_num; i++) {
    let page = part * this.options.pager_num + i;
    if (page <= this.pageNum) {
      pagers.push({
        text: page,
        page: page,
      });
    }
  }
  if (this.pageNum > this.options.pager_num && part !== Math.floor(this.pageNum / this.options.pager_num)) {
    pagers.push({
      text: '...',
      page: part * this.options.pager_num + this.options.pager_num + 1,
    });
  }
  return pagers;
};


/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._next = function() {
  let page = this.page + 1;
  if (page > this.pageNum) {
    page = 1;
  }
  this._go(page);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Pager.prototype._previous = function() {
  let page = this.page - 1;
  if (page < 1) {
    page = this.pageNum;
  }
  this._go(page);
};

/**
 * @param {number} count
 * @return {undefined}
 */
SUI.Pager.prototype.setCount = function(count) {
  this.count = count;
};

/**
 * @private
 * @param {number} page
 * @return {undefined}
 */
SUI.Pager.prototype._go = function(page) {
  this.setPage(page);
  this.eventAction(this.page);
};

/**
 * @param {number} page
 * @return {undefined}
 */
SUI.Pager.prototype.setPage = function(page) {
  this.page = page;
  this.offset = (this.page - 1) * this.options.row_count;
};

/**
 * @return {undefined}
 */
SUI.Pager.prototype.draw = function() {
  this._drawStatistics();
  this._drawPager();
};

/**
 * @param {number} page
 * @return {undefined}
 */
SUI.Pager.prototype.eventAction = function(page) {
  console.warn('SUI.Pager.eventAction()', page);
};

