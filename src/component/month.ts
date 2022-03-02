import { consoleWarn } from "../base";
import { Item } from "../core/item";

/**
 * @constructor
 * @this {Month}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
export const Month = function(date, currentDate, options) {
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
Month.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
Month.prototype._init = function() {
  const current = this.date['format']('YYYY-MM') === this.currentDate['format']('YYYY-MM') ? 'current' : null;
  const now = this.date['format']('YYYY-MM') === window['moment']()['format']('YYYY-MM') ? 'now' : null;
  this.cssClasses = ['month', this.options.css_class, now, current];
};

/**
 * @return {!Item}
 */
Month.prototype.getNode = function() {
  const node = new Item('span');
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
Month.prototype.eventClick = function(date) {
  consoleWarn('Month.eventClick()', date);
};
