goog.provide('SUI.Month');

goog.require('SUI.Node');

/**
 * @constructor
 * @this {SUI.Month}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
SUI.Month = function(date, currentDate, options) {
  this.date = window['moment'](date, 'YYYY-MM-DD');
  this.currentDate = currentDate;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.Month.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Month.prototype._init = function() {
  const current = this.date['format']('YYYY-MM') === this.currentDate['format']('YYYY-MM') ? 'current' : null;
  const now = this.date['format']('YYYY-MM') === window['moment']()['format']('YYYY-MM') ? 'now' : null;
  this.cssClasses = ['month', this.options.css_class, now, current];
};

/**
 * @return {!SUI.Node}
 */
SUI.Month.prototype.getNode = function() {
  const node = new SUI.Node('span');
  node.addClass(this.cssClasses);
  const i = this.date['month']();
  const text = window['moment']['monthsShort'](i);
  node.setHtml(text);
  node.addEventListener('click', () => {
    this.eventClick(this.date);
  });
  return node;
};

/**
 * @param {!Object} date
 */
SUI.Month.prototype.eventClick = function(date) {
  console.warn('SUI.Month.eventClick()', date);
};
