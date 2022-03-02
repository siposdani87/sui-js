import { consoleWarn } from '../base';
import { Item } from '../core/item';

/**
 * @constructor
 * @this {Year}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
export const Year = function(date, currentDate, options) {
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
Year.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
Year.prototype._init = function() {
  const current = this.date['format']('YYYY') === this.currentDate['format']('YYYY') ? 'current' : null;
  const now = this.date['format']('YYYY') === window['moment']()['format']('YYYY') ? 'now' : null;
  this.cssClasses = ['year', this.options.css_class, now, current];
};

/**
 * @return {!Item}
 */
Year.prototype.getNode = function() {
  const node = new Item('span');
  node.addClass(this.cssClasses);
  const text = parseInt(this.date['format']('YYYY'), 10);
  node.setHtml(text);
  node.addEventListener('click', () => {
    this.eventClick(this.date);
  });
  return node;
};

/**
 * @param {!Object} date
 */
Year.prototype.eventClick = function(date) {
  consoleWarn('Year.eventClick()', date);
};
