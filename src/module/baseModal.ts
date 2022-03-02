import { isString, isNumber, noop, contain } from "../base";
import { Async } from "../core/async";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {BaseModal}
 */
export const BaseModal = function() {
};

/**
 * @protected
 * @return {undefined}
 */
BaseModal.prototype._initBase = function() {
  this.windowWidth = 0;
  this.windowHeight = 0;

  this.mainContainerNode = new Query('.main-container').getItem();
  this.hasBlur = false;

  this._initButtons();
};

/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._initButtons = function() {
  this._initCloseButton();
  this._initMinimizeButton();
  this._initMaximizeButton();
};

/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._initMinimizeButton = function() {
  const btnMinimize = new Query('.minimize', this.modal).getItem();
  if (!btnMinimize.isEmpty()) {
    btnMinimize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnMinimize.addEventListener('click', () => {
      this._actionMinimize();
    });
    this.btnMinimize = btnMinimize;
  }
};

/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._initMaximizeButton = function() {
  const btnMaximize = new Query('.maximize', this.modal).getItem();
  if (!btnMaximize.isEmpty()) {
    btnMaximize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnMaximize.addEventListener('click', () => {
      this._actionMaximize();
    });
    this.btnMaximize = btnMaximize;
  }
};

/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._initCloseButton = function() {
  const btnClose = new Query('.close', this.modal).getItem();
  if (!btnClose.isEmpty()) {
    btnClose.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnClose.addEventListener('click', () => {
      this._actionCancel();
    });
    this.btnClose = btnClose;
  }
};

/**
 * @return {boolean}
 */
BaseModal.prototype.isOpened = function() {
  return this.modal.hasClass('visible-flex');
};

/**
 * @private
 * @param {boolean=} opt_allowClose
 * @return {undefined}
 */
BaseModal.prototype._handleCloseButton = function(opt_allowClose = true) {
  if (this.btnClose) {
    if (opt_allowClose) {
      this.btnClose.removeClass('hidden');
    } else {
      this.btnClose.addClass('hidden');
    }
  }
};

/**
 * @param {boolean=} opt_allowClose
 * @return {undefined}
 */
BaseModal.prototype.open = function(opt_allowClose = true) {
  this.hasBlur = this.mainContainerNode.hasClass('blur');
  if (!this.hasBlur) {
    this.mainContainerNode.addClass('blur');
    this.body.addClass('overflow-hidden');
  }

  this.modal.addClass('visible-flex');
  this.modal.removeClass('hidden');

  this._handleCloseButton(opt_allowClose);

  this._handleCenterPosition();
  this.interval = setInterval(() => {
    this._handleCenterPosition();
  }, 1000);
};

/**
 * @return {undefined}
 */
BaseModal.prototype.close = function() {
  clearInterval(this.interval);

  if (!this.hasBlur) {
    this.mainContainerNode.removeClass('blur');
    this.body.removeClass('overflow-hidden');
  }

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
BaseModal.prototype._setTitle = function(opt_title) {
  this.modalTitle.setHtml(opt_title);

  if ((isString(opt_title) && opt_title.length > 0) || isNumber(opt_title)) {
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
BaseModal.prototype._reset = function() {
  this.eventOK = noop();
  this.eventCancel = noop();
};

/**
 * @protected
 * @return {undefined}
 */
BaseModal.prototype._actionOK = function() {
  const async = new Async();
  const calls = [this.eventOK.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @protected
 * @return {undefined}
 */
BaseModal.prototype._actionCancel = function() {
  const async = new Async();
  const calls = [this.eventCancel.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._actionMinimize = function() {

};

/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._actionMaximize = function() {

};

/**
 * @param {number} width
 * @param {number} height
 * @return {undefined}
 */
BaseModal.prototype.setSize = function(width, height) {
  this.windowWidth = width;
  this.windowHeight = height;
  this._handleCenterPosition();
};


/**
 * @private
 * @return {undefined}
 */
BaseModal.prototype._handleCenterPosition = function() {
  const style = this.modalWindow.getComputedStyle();
  let height = style.getPropertyValue('height');
  if (contain(height, 'px')) {
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
