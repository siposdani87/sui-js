goog.provide('SUI.lib.Confirm');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.lib');
goog.require('SUI.lib.BaseModal');

/**
 * @constructor
 * @extends {SUI.lib.BaseModal}
 * @this {SUI.lib.Confirm}
 * @param {!Object=} opt_options
 */
SUI.lib.Confirm = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
  this._initBase();
};
goog.inherits(SUI.lib.Confirm, SUI.lib.BaseModal);

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.lib.Confirm.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    id: '#confirm',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Confirm.prototype._init = function() {
  this.body = new SUI.Query('body').getItem();
  this.modal = new SUI.Query(this.options.id).getItem();
  this.modalWindow = new SUI.Query('#confirm-window', this.modal).getItem();
  this.modalHeader = new SUI.Query('.modal-header', this.modal).getItem();
  this.modalTitle = new SUI.Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new SUI.Query('.modal-body', this.modal).getItem();
  this.modalFooter = new SUI.Query('.modal-footer', this.modal).getItem();

  this.tooltip = new SUI.Tooltip(this.modalTitle);
  this.tooltip.render();
};

/**
 * @param {string} message
 * @param {string} okText
 * @param {string=} opt_cancelText
 * @param {string=} opt_title
 * @param {string=} opt_type
 */
SUI.lib.Confirm.prototype.load = function(message, okText, opt_cancelText = '', opt_title = '', opt_type = 'normal') {
  this._reset();
  this._setTitle(opt_title);

  this.modalWindow.removeClass(['normal', 'info', 'warning', 'error', 'success', 'choice']);
  this.modalWindow.addClass(opt_type);

  this.modalBody.setHtml(message);

  this.modalFooter.removeChildren();

  if (opt_cancelText) {
    const cancelCssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'];
    if (opt_type === 'choice') {
      cancelCssClasses.push('mdl-button--primary');
    }
    const cancelButton = new SUI.Node('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setHtml(opt_cancelText);
    cancelButton.addClass(cancelCssClasses);
    cancelButton.addEventListener('click', this._actionCancel.bind(this));
    this.modalFooter.appendChild(cancelButton);
  }

  const okCssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--primary'];
  const okButton = new SUI.Node('button');
  okButton.setAttribute('type', 'button');
  okButton.setHtml(okText);
  okButton.addClass(okCssClasses);
  okButton.addEventListener('click', this._actionOK.bind(this));
  this.modalFooter.appendChild(okButton);

  SUI.mdl(this.modalFooter);
};
