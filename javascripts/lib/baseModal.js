goog.provide('SUI.lib.BaseModal');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.BaseModal}
 */
SUI.lib.BaseModal = function() {
  this.windowWidth = 0;
  this.windowHeight = 0;
};

/**
 * @protected
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._initButtons = function() {
  this._initCloseButton();
  this._initMinimizeButton();
  this._initMaximizeButton();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._initMinimizeButton = function() {
  const btnMinimize = new SUI.Query('.minimize', this.modal).getItem();
  if (!btnMinimize.isEmpty()) {
    btnMinimize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnMinimize.addEventListener('click', () => {
      this._actionMinimize();
    });
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._initMaximizeButton = function() {
  const btnMaximize = new SUI.Query('.maximize', this.modal).getItem();
  if (!btnMaximize.isEmpty()) {
    btnMaximize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnMaximize.addEventListener('click', () => {
      this._actionMaximize();
    });
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._initCloseButton = function() {
  const btnClose = new SUI.Query('.close', this.modal).getItem();
  if (!btnClose.isEmpty()) {
    btnClose.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnClose.addEventListener('click', () => {
      this._actionCancel();
    });
  }
};

/**
 * @return {boolean}
 */
SUI.lib.BaseModal.prototype.isOpened = function() {
  return this.modal.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype.open = function() {
  this.body.addClass('overflow-hidden');
  this.modal.addClass('visible-flex');
  this.modal.removeClass('hidden');
  this._handleCenterPosition();
};

/**
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype.close = function() {
  this.body.removeClass('overflow-hidden');
  this.modal.addClass('hidden');
  this.modal.removeClass('visible-flex');
  this.modalTitle.removeChildren();
  this.modalBody.removeChildren();
  this.modalFooter.removeChildren();
};

/**
 * @protected
 * @param {string=} opt_title
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._setTitle = function(opt_title) {
  this.modalTitle.setHtml(opt_title);

  if ((SUI.isString(opt_title) && opt_title.length > 0) || SUI.isNumber(opt_title)) {
    this.modalHeader.removeClass('hidden');
  } else {
    this.modalHeader.addClass('hidden');
  }
  this.tooltip.setMessage(opt_title);
};

/**
 * @protected
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._reset = function() {
  this.eventOK = SUI.noop();
  this.eventCancel = SUI.noop();
};

/**
 * @protected
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._actionOK = function() {
  const async = new SUI.Async();
  const calls = [this.eventOK.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @protected
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._actionCancel = function() {
  const async = new SUI.Async();
  const calls = [this.eventCancel.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._actionMinimize = function() {

};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._actionMaximize = function() {

};

/**
 * @param {number} width
 * @param {number} height
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype.setSize = function(width, height) {
  this.windowWidth = width;
  this.windowHeight = height;
  this._handleCenterPosition();
};


/**
 * @private
 * @return {undefined}
 */
SUI.lib.BaseModal.prototype._handleCenterPosition = function() {
  const style = this.modalWindow.getComputedStyle();
  let height = style.getPropertyValue('height');
  if (SUI.contain(height, 'px')) {
    height = parseInt(height.slice(0, -2), 10);
    if (height > this.windowHeight) {
      this.modal.removeClass('center');
    } else {
      this.modal.addClass('center');
    }
  } else {
    this.modal.addClass('center');
  }
};
