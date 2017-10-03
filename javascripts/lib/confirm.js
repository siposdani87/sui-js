goog.provide('SUI.lib.Confirm');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Confirm}
 * @param {!Object=} opt_options
 */
SUI.lib.Confirm = function(opt_options) {
  this._setOptions(opt_options);
  this._init();
  this._initButtons();
};

/**
 * @param {!Object=} opt_options
 * @private
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    id: '#confirm'
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._init = function() {
  this.confirm = new SUI.Query(this.options.id).getItem();
  this.confirmWindow = new SUI.Query('#confirm-window', this.confirm).getItem();
  this.modalHeader = new SUI.Query('.modal-header', this.confirm).getItem();
  this.modalTitle = new SUI.Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new SUI.Query('.modal-body', this.confirm).getItem();
  this.modalFooter = new SUI.Query('.modal-footer', this.confirm).getItem();

  this.windowWidth = 0;
  this.windowHeight = 0;
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._initButtons = function() {
  this._initCloseButton();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._initCloseButton = function() {
  this.btnClose = new SUI.Query('.close', this.confirm).getItem();
  this.btnClose.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnClose.addEventListener('click', function() {
    this._actionCancel();
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype.open = function() {
  this.confirm.addClass('visible-flex');
  this.confirm.removeClass('hidden');
  this._handleCenterPosition();
};

/**
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype.close = function() {
  this.confirm.addClass('hidden');
  this.confirm.removeClass('visible-flex');
  this.modalTitle.removeChildren();
  this.modalBody.removeChildren();
  this.modalFooter.removeChildren();
};


/**
 * @param {string=} opt_title
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._setTitle = function(opt_title) {
  this.modalTitle.setHtml(opt_title);

  if (SUI.isString(opt_title) && opt_title.length > 0) {
    this.modalHeader.removeClass('hidden');
  }
  else {
    this.modalHeader.addClass('hidden');
  }
};

/**
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._reset = function() {
  this.eventOK = SUI.noop();
  this.eventCancel = SUI.noop();
};


/**
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._actionOK = function() {
  var async = new SUI.Async();
  var calls = [this.eventOK.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._actionCancel = function() {
  var async = new SUI.Async();
  var calls = [this.eventCancel.bind(this), this.close.bind(this)];
  async.serial(calls);
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

  this.confirmWindow.removeClass(['normal', 'info', 'warning', 'error', 'success']);
  this.confirmWindow.addClass(opt_type);

  this.modalBody.setHtml(message);

  this.modalFooter.removeChildren();

  if (opt_cancelText) {
    var cancelButton = new SUI.Node('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setHtml(opt_cancelText);
    cancelButton.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--accent']);
    cancelButton.addEventListener('click', this._actionCancel.bind(this));
    this.modalFooter.appendChild(cancelButton);
  }

  var okButton = new SUI.Node('button');
  okButton.setAttribute('type', 'button');
  okButton.setHtml(okText);
  okButton.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--primary']);
  okButton.addEventListener('click', this._actionOK.bind(this));
  this.modalFooter.appendChild(okButton);

  SUI.mdl(this.modalFooter);
};

/**
 * @param {number} width
 * @param {number} height
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype.setSize = function(width, height) {
  this.windowWidth = width;
  this.windowHeight = height;
  this._handleCenterPosition();
};


/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Confirm.prototype._handleCenterPosition = function() {
  var style = this.confirmWindow.getComputedStyle();
  var height = style.getPropertyValue('height');
  if (SUI.contain(height, 'px')) {
    height = parseInt(height.slice(0, -2), 10);
    if (height > this.windowHeight) {
      this.confirm.removeClass('center');
    }
    else {
      this.confirm.addClass('center');
    }
  }
  else {
    this.confirm.addClass('center');
  }
};