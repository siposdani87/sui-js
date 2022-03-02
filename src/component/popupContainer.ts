import { Collection } from "../core/collection";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {PopupContainer}
 * @param {string=} opt_selector
 */
export const PopupContainer = function(opt_selector = 'body') {
  this.selector = opt_selector;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
PopupContainer.prototype._init = function() {
  this.container = new Query(this.selector).getItem();
};

/**
 * @private
 * @param {!Function} type
 * @return {undefined}
 */
PopupContainer.prototype._initCollection = function(type) {
  window['popup_collection'] = window['popup_collection'] || /** @type {!Collection<!Popup>} */ (new Collection([], type));
};

/**
 * @param {!Function} type
 * @param {!Popup} popup
 * @return {undefined}
 */
PopupContainer.prototype.push = function(type, popup) {
  this._initCollection(type);
  if (window['popup_collection']) {
    window['popup_collection'].push(popup);
  }
};

/**
 * @param {!Popup} popup
 * @return {undefined}
 */
PopupContainer.prototype.delete = function(popup) {
  if (window['popup_collection']) {
    window['popup_collection'].delete(popup);
  }
};

/**
 * @return {undefined}
 */
PopupContainer.prototype.closeAll = function() {
  if (window['popup_collection']) {
    window['popup_collection'].each((popup) => {
      popup.close();
    });
  }
};

/**
 * @param {!Item} popupNode
 * @return {undefined}
 */
PopupContainer.prototype.setPosition = function(popupNode) {
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
 * @param {!Item} popupNode
 * @return {undefined}
 */
PopupContainer.prototype.clearPosition = function(popupNode) {
  popupNode.setStyle({
    'top': 'auto',
    'bottom': 'auto',
    'left': 'auto',
    'right': 'auto',
  });
};
