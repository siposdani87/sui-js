goog.provide('SUI.Sidebar');

goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Sidebar}
 * @param {string} selector
 */
SUI.Sidebar = function(selector) {
  this.selector = selector;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Sidebar.prototype._init = function() {
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
SUI.Sidebar.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.Sidebar.prototype.isOpened = function() {
  return this.sidebar.hasClass('open');
};

/**
 * @return {undefined}
 */
SUI.Sidebar.prototype.open = function() {
  this.sidebar.addClass('open');
};

/**
 * @return {undefined}
 */
SUI.Sidebar.prototype.close = function() {
  this.sidebar.removeClass('open');
};

/**
 * @return {undefined}
 */
SUI.Sidebar.prototype.show = function() {
  this.sidebar.removeClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.Sidebar.prototype.hide = function() {
  this.sidebar.addClass('hidden');
};

/**
 * @param {number} scrollTop
 * @param {number} windowHeight
 * @return {undefined}
 */
SUI.Sidebar.prototype.setButtonPosition = function(scrollTop, windowHeight) {
  const height = Math.round(scrollTop + (windowHeight / 2));
  this.button.setStyle({
    'top': height + 'px',
  });
};
