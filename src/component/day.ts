import { consoleWarn } from "../base";
import { Item } from "../core/item";

/**
 * @constructor
 * @this {Day}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
export const Day = function(date, currentDate, options) {
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
Day.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
Day.prototype._init = function() {
  const current = window['moment'](this.date)['isSame'](this.currentDate['format']('YYYY-MM-DD')) ? 'current' : null;
  const now = window['moment'](this.date)['isSame'](window['moment']()['format']('YYYY-MM-DD')) ? 'now' : null;
  this.cssClasses = ['day', this.options.css_class, now, current];
};

/**
 * @return {!Item}
 */
Day.prototype.getNode = function() {
  const node = new Item('span');
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
Day.prototype.eventClick = function(date) {
  consoleWarn('Day.eventClick()', date);
};
