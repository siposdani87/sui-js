goog.provide('SUI.Year');

goog.require('SUI.Node');

/**
 * @constructor
 * @this {SUI.Year}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
SUI.Year = function (date, currentDate, options) {
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
SUI.Year.prototype._setOptions = function (options) {
    this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Year.prototype._init = function () {
    var current = this.date['format']('YYYY') === this.currentDate['format']('YYYY') ? 'current' : null;
    var now = this.date['format']('YYYY') === window['moment']()['format']('YYYY') ? 'now' : null;
  this.cssClasses = ['year', this.options.css_class, now, current];
};

/**
 * @return {!SUI.Node}
 */
SUI.Year.prototype.getNode = function () {
  var node = new SUI.Node('span');
  node.addClass(this.cssClasses);
    var text = parseInt(this.date['format']('YYYY'), 10);
  node.setHtml(text);
    node.addEventListener('click', function () {
        this.eventClick(this.date);
    }.bind(this));
    return node;
};

/**
 * @param {!Object} date
 */
SUI.Year.prototype.eventClick = function (date) {
    console.warn('SUI.Year.eventClick()', date);
};
