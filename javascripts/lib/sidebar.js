goog.provide('SUI.lib.Sidebar');

goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Sidebar}
 * @param {string} selector
 */
SUI.lib.Sidebar = function(selector) {
  this.selector = selector;
  this._init();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype._init = function() {
  this.sidebar = new SUI.Query(this.selector).getItem();
  this.button = new SUI.Query('a', this.sidebar).getItem();
  this.button.setAttribute('href', 'javascript:void(0)');
  this.button.addEventListener('click', function() {
    this.toggle();
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype.toggle = function() {
  var isOpened = this.sidebar.hasClass('open');
  if (isOpened) {
    this.close();
  }
  else {
    this.open();
  }
};

/**
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype.open = function() {
  this.sidebar.addClass('open');
};

/**
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype.close = function() {
  this.sidebar.removeClass('open');
};

/**
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype.show = function() {
  this.sidebar.removeClass('hidden');
};

/**
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype.hide = function() {
  this.sidebar.addClass('hidden');
};

/**
 * @param {number} scrollTop
 * @param {number} windowHeight
 * @returns {undefined}
 */
SUI.lib.Sidebar.prototype.setButtonPosition = function(scrollTop, windowHeight) {
  var height = Math.round(scrollTop + (windowHeight / 2));
  this.button.setStyle({
    'top': height + 'px'
  });
};
