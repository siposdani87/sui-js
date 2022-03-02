import { Query } from "../core/query";

/**
 * @constructor
 * @this {Sidebar}
 * @param {string} selector
 */
export const Sidebar = function(selector) {
  this.selector = selector;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
Sidebar.prototype._init = function() {
  this.sidebar = new Query(this.selector).getItem();
  this.button = new Query('a', this.sidebar).getItem();
  this.button.setAttribute('href', 'javascript:void(0)');
  this.button.addEventListener('click', function() {
    this.toggle();
  }.bind(this));
};

/**
 * @return {undefined}
 */
Sidebar.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
Sidebar.prototype.isOpened = function() {
  return this.sidebar.hasClass('open');
};

/**
 * @return {undefined}
 */
Sidebar.prototype.open = function() {
  this.sidebar.addClass('open');
};

/**
 * @return {undefined}
 */
Sidebar.prototype.close = function() {
  this.sidebar.removeClass('open');
};

/**
 * @return {undefined}
 */
Sidebar.prototype.show = function() {
  this.sidebar.removeClass('hidden');
};

/**
 * @return {undefined}
 */
Sidebar.prototype.hide = function() {
  this.sidebar.addClass('hidden');
};

/**
 * @param {number} scrollTop
 * @param {number} windowHeight
 * @return {undefined}
 */
Sidebar.prototype.setButtonPosition = function(scrollTop, windowHeight) {
  const height = Math.round(scrollTop + (windowHeight / 2));
  this.button.setStyle({
    'top': height + 'px',
  });
};
