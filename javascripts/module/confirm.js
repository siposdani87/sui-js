import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Confirm');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.BaseModal');

/**
 * @constructor
 * @extends {SUI.BaseModal}
 * @this {SUI.Confirm}
 * @param {!Object=} opt_options
 */
SUI.Confirm = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
  this._initBase();
};
goog.inherits(SUI.Confirm, SUI.BaseModal);

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.Confirm.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt({
    id: '#confirm',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Confirm.prototype._init = function() {
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
SUI.Confirm.prototype.load = function(message, okText, opt_cancelText = '', opt_title = '', opt_type = 'normal') {
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
    const cancelButton = new SUI.Item('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setHtml(opt_cancelText);
    cancelButton.addClass(cancelCssClasses);
    cancelButton.addEventListener('click', this._actionCancel.bind(this));
    this.modalFooter.appendChild(cancelButton);
  }

  const okCssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--primary'];
  const okButton = new SUI.Item('button');
  okButton.setAttribute('type', 'button');
  okButton.setHtml(okText);
  okButton.addClass(okCssClasses);
  okButton.addEventListener('click', this._actionOK.bind(this));
  this.modalFooter.appendChild(okButton);

  SUI.mdl(this.modalFooter);
};
