goog.provide('SUI.ContentHandler');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.ContentHandler}
 * @param {!SUI.Node} containerNode
 * @param {!Object=} opt_options
 */
SUI.ContentHandler = function(containerNode, opt_options = {}) {
  this.containerNode = containerNode;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.ContentHandler.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    image_url: null,
    text: '',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.ContentHandler.prototype._init = function() {
  this.contentNode = new SUI.Node('div');
  this.contentNode.addClass('content-handler');
  this.containerNode.insertAfter(this.contentNode);

  if (this.options.image_url) {
    const imageNode = new SUI.Node('img');
    imageNode.setAttribute('src', this.options.image_url);
    this.contentNode.appendChild(imageNode);
  }
  if (this.options.text) {
    const textNode = new SUI.Node('p');
    textNode.setHtml(this.options.text);
    this.contentNode.appendChild(textNode);
  }

  this.show();
};

/**
 * @return {undefined}
 */
SUI.ContentHandler.prototype.show = function() {
  this.contentNode.addClass('visible-flex');
  this.containerNode.addClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.ContentHandler.prototype.hide = function() {
  this.contentNode.removeClass('visible-flex');
  this.containerNode.removeClass('hidden');
};
