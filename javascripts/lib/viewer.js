goog.provide('SUI.Viewer');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.BaseModal');

/**
 * @constructor
 * @extends {SUI.BaseModal}
 * @this {SUI.Viewer}
 * @param {!Object=} opt_options
 */
SUI.Viewer = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
  this._initBase();
};
goog.inherits(SUI.Viewer, SUI.BaseModal);

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.Viewer.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    id: '#viewer',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Viewer.prototype._init = function() {
  this.body = new SUI.Query('body').getItem();
  this.modal = new SUI.Query(this.options.id, this.body).getItem();
  this.modalWindow = new SUI.Query('#viewer-window', this.modal).getItem();
  this.modalHeader = new SUI.Query('.modal-header', this.modal).getItem();
  this.modalTitle = new SUI.Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new SUI.Query('.modal-body', this.modal).getItem();
  this.modalFooter = new SUI.Query('.modal-footer', this.modal).getItem();

  this.tooltip = new SUI.Tooltip(this.modalTitle, 'BOTTOM');
  this.tooltip.render();
};

/**
 * @param {string} imageUrl
 * @param {string=} opt_title
 * @return {undefined}
 */
SUI.Viewer.prototype.loadImage = function(imageUrl, opt_title = '') {
  this._reset();

  this._setImage(imageUrl);
  this._setTitle(opt_title);

  this.open();
};

/**
 * @param {string} imageUrl
 * @return {undefined}
 */
SUI.Viewer.prototype._setImage = function(imageUrl) {
  const imageNode = new SUI.Node('img');
  imageNode.setAttribute('src', imageUrl);

  this.modalBody.appendChild(imageNode);
};
