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
 * @return {undefined}
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
 * @return {undefined}
 */
SUI.lib.Sidebar.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.lib.Sidebar.prototype.isOpened = function() {
  return this.sidebar.hasClass('open');
};

/**
 * @return {undefined}
 */
SUI.lib.Sidebar.prototype.open = function() {
  this.sidebar.addClass('open');
};

/**
 * @return {undefined}
 */
SUI.lib.Sidebar.prototype.close = function() {
  this.sidebar.removeClass('open');
};

/**
 * @return {undefined}
 */
SUI.lib.Sidebar.prototype.show = function() {
  this.sidebar.removeClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.lib.Sidebar.prototype.hide = function() {
  this.sidebar.addClass('hidden');
};

/**
 * @param {number} scrollTop
 * @param {number} windowHeight
 * @return {undefined}
 */
SUI.lib.Sidebar.prototype.setButtonPosition = function(scrollTop, windowHeight) {
  let height = Math.round(scrollTop + (windowHeight / 2));
  this.button.setStyle({
    'top': height + 'px',
  });
};
