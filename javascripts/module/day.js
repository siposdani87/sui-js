goog.provide('SUI.Day');

goog.require('SUI.Node');

/**
 * @constructor
 * @this {SUI.Day}
 * @param {string} date
 * @param {!Object} currentDate
 * @param {!Object} options
 */
SUI.Day = function (date, currentDate, options) {
    this.date = window['moment'](date, 'YYYY-MM-DD');
    this.currentDate = currentDate;
    this._setOptions(options);
    this._init();
};

/**
 * @private
 * @param {!Object} options
 * @returns {undefined}
 */
SUI.Day.prototype._setOptions = function (options) {
    this.options = options;
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Day.prototype._init = function () {
    var current = window['moment'](this.date)['isSame'](this.currentDate['format']('YYYY-MM-DD')) ? 'current' : null;
    var now = window['moment'](this.date)['isSame'](window['moment']()['format']('YYYY-MM-DD')) ? 'now' : null;
  this.cssClasses = ['day', this.options.css_class, now, current];
};

/**
 * @returns {!SUI.Node}
 */
SUI.Day.prototype.getNode = function () {
  var node = new SUI.Node('span');
  node.addClass(this.cssClasses);
    var text = parseInt(this.date['format']('DD'), 10);
  node.setHtml(text);
    node.addEventListener('click', function () {
        this.eventClick(this.date);
    }.bind(this));

    return node;
};

/**
 * @param {!Object} date
 */
SUI.Day.prototype.eventClick = function (date) {
    console.warn('SUI.Day.eventClick()', date);
};
