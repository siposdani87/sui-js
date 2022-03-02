import { Item } from "../core/item";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {ContentHandler}
 * @param {!Item} containerNode
 * @param {!Object=} opt_options
 */
export const ContentHandler = function(containerNode, opt_options = {}) {
  this.containerNode = containerNode;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
ContentHandler.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt({
    image_url: null,
    text: '',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
ContentHandler.prototype._init = function() {
  this.contentNode = new Item('div');
  this.contentNode.addClass('content-handler');
  this.containerNode.insertAfter(this.contentNode);

  if (this.options.image_url) {
    const imageNode = new Item('img');
    imageNode.setAttribute('src', this.options.image_url);
    this.contentNode.appendChild(imageNode);
  }
  if (this.options.text) {
    const textNode = new Item('p');
    textNode.setHtml(this.options.text);
    this.contentNode.appendChild(textNode);
  }

  this.show();
};

/**
 * @return {undefined}
 */
ContentHandler.prototype.show = function() {
  this.contentNode.addClass('visible-flex');
  this.containerNode.addClass('hidden');
};

/**
 * @return {undefined}
 */
ContentHandler.prototype.hide = function() {
  this.contentNode.removeClass('visible-flex');
  this.containerNode.removeClass('hidden');
};
