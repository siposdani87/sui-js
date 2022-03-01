import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.PopupContainer');

goog.requireType('SUI.Popup');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Item');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.PopupContainer}
 * @param {string=} opt_selector
 */
SUI.PopupContainer = function(opt_selector = 'body') {
  this.selector = opt_selector;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.PopupContainer.prototype._init = function() {
  this.container = new SUI.Query(this.selector).getItem();
};

/**
 * @private
 * @param {!Function} type
 * @return {undefined}
 */
SUI.PopupContainer.prototype._initCollection = function(type) {
  window['popup_collection'] = window['popup_collection'] || /** @type {!SUI.Collection<!SUI.Popup>} */ (new SUI.Collection([], type));
};

/**
 * @param {!Function} type
 * @param {!SUI.Popup} popup
 * @return {undefined}
 */
SUI.PopupContainer.prototype.push = function(type, popup) {
  this._initCollection(type);
  if (window['popup_collection']) {
    window['popup_collection'].push(popup);
  }
};

/**
 * @param {!SUI.Popup} popup
 * @return {undefined}
 */
SUI.PopupContainer.prototype.delete = function(popup) {
  if (window['popup_collection']) {
    window['popup_collection'].delete(popup);
  }
};

/**
 * @return {undefined}
 */
SUI.PopupContainer.prototype.closeAll = function() {
  if (window['popup_collection']) {
    window['popup_collection'].each((popup) => {
      popup.close();
    });
  }
};

/**
 * @param {!SUI.Item} popupNode
 * @return {undefined}
 */
SUI.PopupContainer.prototype.setPosition = function(popupNode) {
  // const containerNode = this.container.getNode();

  // const top = containerNode.offsetHeight - containerNode.scrollHeight;
  // const absoluteTop = top === 0 ? 'auto' : top + 'px';

  // let left = containerNode.offsetWidth - containerNode.scrollWidth;
  // let absoluteLeft = left === 0 ? 'auto' : left + 'px';

  popupNode.setStyle({
    // 'top': 0, // absoluteTop,
    'left': 0, // absoluteLeft
  });
};

/**
 * @param {!SUI.Item} popupNode
 * @return {undefined}
 */
SUI.PopupContainer.prototype.clearPosition = function(popupNode) {
  popupNode.setStyle({
    'top': 'auto',
    'bottom': 'auto',
    'left': 'auto',
    'right': 'auto',
  });
};
