goog.provide('SUI.lib.Dialog');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Deferred');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Dialog}
 * @param {!SUI.lib.Http} http
 * @param {!Object=} opt_options
 */
SUI.lib.Dialog = function(http, opt_options = {}) {
  this.http = http;
  this._setOptions(opt_options);
  this._init();
  this._initButtons();
};

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._setOptions = function(opt_options = {}) {
  let _self = this;
  _self.options = new SUI.Object({
    id: '#dialog',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._init = function() {
  this.body = new SUI.Query('body').getItem();
  this.dialog = new SUI.Query(this.options.id, this.body).getItem();
  this.dialogWindow = new SUI.Query('#dialog-window', this.dialog).getItem();
  this.modalHeader = new SUI.Query('.modal-header', this.dialog).getItem();
  this.modalTitle = new SUI.Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new SUI.Query('.modal-body', this.dialog).getItem();
  this.modalFooter = new SUI.Query('.modal-footer', this.dialog).getItem();

  this.windowWidth = 0;
  this.windowHeight = 0;

  this.tooltip = new SUI.Tooltip(this.modalTitle);
  this.tooltip.render();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._initButtons = function() {
  this._initCloseButton();
  this._initMinimizeButton();
  this._initMaximizeButton();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._initMinimizeButton = function() {
  this.btnMinimize = new SUI.Query('.minimize', this.dialog).getItem();
  this.btnMinimize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnMinimize.addEventListener('click', () => {
    this._actionMinimize();
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._initMaximizeButton = function() {
  this.btnMaximize = new SUI.Query('.maximize', this.dialog).getItem();
  this.btnMaximize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnMaximize.addEventListener('click', () => {
    this._actionMaximize();
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._initCloseButton = function() {
  this.btnClose = new SUI.Query('.close', this.dialog).getItem();
  this.btnClose.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnClose.addEventListener('click', () => {
    this._actionCancel();
  });
};

/**
 * @return {boolean}
 */
SUI.lib.Dialog.prototype.isOpened = function() {
  return this.dialog.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype.open = function() {
  this.body.addClass('overflow-hidden');
  this.dialog.addClass('visible-flex');
  this.dialog.removeClass('hidden');
  this._handleCenterPosition();
};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype.close = function() {
  this.body.removeClass('overflow-hidden');
  this.dialog.addClass('hidden');
  this.dialog.removeClass('visible-flex');
  this.modalTitle.removeChildren();
  this.modalBody.removeChildren();
  this.modalFooter.removeChildren();
};

/**
 * @param {string} url
 * @return {!SUI.Promise}
 */
SUI.lib.Dialog.prototype.loadTemplate = function(url) {
  this._reset();
  let deferred = new SUI.Deferred();
  this.http.get(url).then((data) => {
    let node = this._handleDom(data);
    deferred.resolve(node);
  }, (data) => {
    let node = this._handleMessage(data);
    deferred.reject(node);
    this.open();
  });
  return deferred.promise();
};

/**
 * @param {!SUI.Node} dom
 * @return {!SUI.Node}
 */
SUI.lib.Dialog.prototype._handleMessage = function(dom) {
  let messageNode = new SUI.Query('.message', dom).getItem();
  let title = new SUI.Query('title', dom).getItem();
  this._setTitle(title.getText());
  this.modalBody.insert(messageNode);
  SUI.mdl(messageNode);
  return messageNode;
};

/**
 * @param {!SUI.Node} dom
 * @return {!SUI.Node}
 */
SUI.lib.Dialog.prototype._handleDom = function(dom) {
  let titleNode = new SUI.Query('#title', dom).getItem();
  if (!titleNode.isEmpty()) {
    this._setTitle(titleNode.getText());
  }

  let contentNode = new SUI.Query('#content', dom).getItem();
  this.modalBody.insert(contentNode);
  SUI.mdl(contentNode);

  this._handleActions(dom);

  return contentNode;
};

/**
 * @param {string=} opt_title
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._setTitle = function(opt_title) {
  this.modalTitle.setHtml(opt_title);

  if (SUI.isString(opt_title) && opt_title.length > 0) {
    this.modalHeader.removeClass('hidden');
  } else {
    this.modalHeader.addClass('hidden');
  }
  this.tooltip.setMessage(opt_title);
};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._reset = function() {
  this.eventOK = SUI.noop();
  this.eventCancel = SUI.noop();
};

/**
 * @param {!SUI.Node} dom
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._handleActions = function(dom) {
  let actionNode = new SUI.Query('#action', dom).getItem();
  if (!actionNode.isEmpty()) {
    let buttons = new SUI.Query('button', actionNode);
    let size = buttons.size();
    let actions = [this._actionOK.bind(this)];
    let cssClasses = ['mdl-button--primary'];
    if (size === 2) {
      actions = [this._actionCancel.bind(this), this._actionOK.bind(this)];
      cssClasses = ['mdl-button--accent', 'mdl-button--primary'];
    }
    buttons.each(function(button, i) {
      let buttonClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'].concat([cssClasses[i]]);
      button.addClass(buttonClasses);
      button.addEventListener('click', actions[i]);
    });

    this.modalFooter.insert(actionNode);
    SUI.mdl(actionNode);
  } else {
    this.modalFooter.removeChildren();
  }
};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._actionOK = function() {
  let async = new SUI.Async();
  let calls = [this.eventOK.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._actionCancel = function() {
  let async = new SUI.Async();
  let calls = [this.eventCancel.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._actionMinimize = function() {

};

/**
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._actionMaximize = function() {

};

/**
 * @param {number} width
 * @param {number} height
 * @return {undefined}
 */
SUI.lib.Dialog.prototype.setSize = function(width, height) {
  this.windowWidth = width;
  this.windowHeight = height;
  this._handleCenterPosition();
};


/**
 * @private
 * @return {undefined}
 */
SUI.lib.Dialog.prototype._handleCenterPosition = function() {
  let style = this.dialogWindow.getComputedStyle();
  let height = style.getPropertyValue('height');
  if (SUI.contain(height, 'px')) {
    height = parseInt(height.slice(0, -2), 10);
    if (height > this.windowHeight) {
      this.dialog.removeClass('center');
    } else {
      this.dialog.addClass('center');
    }
  } else {
    this.dialog.addClass('center');
  }
};
