goog.provide('SUI.Day');

goog.require('SUI.Node');

/**
 * @constructor
 * @this {SUI.Day}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
SUI.Day = function(date, currentDate, options) {
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
SUI.Day.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Day.prototype._init = function() {
  const current = window['moment'](this.date)['isSame'](this.currentDate['format']('YYYY-MM-DD')) ? 'current' : null;
  const now = window['moment'](this.date)['isSame'](window['moment']()['format']('YYYY-MM-DD')) ? 'now' : null;
  this.cssClasses = ['day', this.options.css_class, now, current];
};

/**
 * @return {!SUI.Node}
 */
SUI.Day.prototype.getNode = function() {
  const node = new SUI.Node('span');
  node.addClass(this.cssClasses);
  const text = parseInt(this.date['format']('DD'), 10);
  node.setHtml(text);
  node.addEventListener('click', () => {
    this.eventClick(this.date);
  });

  return node;
};

/**
 * @param {!Object} date
 */
SUI.Day.prototype.eventClick = function(date) {
  console.warn('SUI.Day.eventClick()', date);
};
