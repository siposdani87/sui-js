goog.provide('SUI.lib.Dialog');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Deferred');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Dialog}
 * @param {!SUI.lib.Http} http
 * @param {!Object=} opt_options
 */
SUI.lib.Dialog = function(http, opt_options) {
  this.http = http;
  this._setOptions(opt_options);
  this._init();
  this._initButtons();
};

/**
 * @param {!Object=} opt_options
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    id: '#dialog'
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._init = function() {
  this.body = new SUI.Query('body').getItem();
  this.dialog = new SUI.Query(this.options.id).getItem();
  this.dialogWindow = new SUI.Query('#dialog-window', this.dialog).getItem();
  this.modalHeader = new SUI.Query('.modal-header', this.dialog).getItem();
  this.modalTitle = new SUI.Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new SUI.Query('.modal-body', this.dialog).getItem();
  this.modalFooter = new SUI.Query('.modal-footer', this.dialog).getItem();

  this.windowWidth = 0;
  this.windowHeight = 0;
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._initButtons = function() {
  this._initCloseButton();
  this._initMinimizeButton();
  this._initMaximizeButton();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._initMinimizeButton = function() {
  this.btnMinimize = new SUI.Query('.minimize', this.dialog).getItem();
  this.btnMinimize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnMinimize.addEventListener('click', function() {
    this._actionMinimize();
  }.bind(this));
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._initMaximizeButton = function() {
  this.btnMaximize = new SUI.Query('.maximize', this.dialog).getItem();
  this.btnMaximize.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnMaximize.addEventListener('click', function() {
    this._actionMaximize();
  }.bind(this));
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._initCloseButton = function() {
  this.btnClose = new SUI.Query('.close', this.dialog).getItem();
  this.btnClose.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  this.btnClose.addEventListener('click', function() {
    this._actionCancel();
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype.open = function() {
  this.body.addClass('overflow-hidden');
  this.dialog.addClass('visible-flex');
  this.dialog.removeClass('hidden');
  this._handleCenterPosition();
};

/**
 * @returns {undefined}
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
 * @returns {!SUI.Promise}
 */
SUI.lib.Dialog.prototype.loadTemplate = function(url) {
  this._reset();
  var deferred = new SUI.Deferred();
  this.http.get(url).then(function(data) {
    var node = this._handleDom(data);
    deferred.resolve(node);
  }.bind(this), function(data) {
    var node = this._handleMessage(data);
    deferred.reject(node);
  }.bind(this));
  return deferred.promise();
};

/**
 * @param {!SUI.Node} dom
 * @returns {!SUI.Node}
 */
SUI.lib.Dialog.prototype._handleMessage = function(dom) {
  var messageNode = new SUI.Query('#message', dom).getItem();
  //var title = messageNode.getNode().classList.toString();
  //this._setTitle(title);
  this.modalBody.insert(messageNode);
  SUI.mdl(messageNode);

  return messageNode;
};

/**
 * @param {!SUI.Node} dom
 * @returns {!SUI.Node}
 */
SUI.lib.Dialog.prototype._handleDom = function(dom) {
  var titleNode = new SUI.Query('#title', dom).getItem();
  if (!titleNode.isEmpty()) {
    this._setTitle(titleNode.getText());
  }

  var contentNode = new SUI.Query('#content', dom).getItem();
  this.modalBody.insert(contentNode);
  SUI.mdl(contentNode);

  this._handleActions(dom);

  return contentNode;
};

/**
 * @param {string=} opt_title
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._setTitle = function(opt_title) {
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
SUI.lib.Dialog.prototype._reset = function() {
  this.eventOK = SUI.noop();
  this.eventCancel = SUI.noop();
};

/**
 * @param {!SUI.Node} dom
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._handleActions = function(dom) {
  var actionNode = new SUI.Query('#action', dom).getItem();
  if (!actionNode.isEmpty()) {
    var buttons = new SUI.Query('button', actionNode);
    var size = buttons.size();
    var actions = [this._actionOK.bind(this)];
    var cssClasses = ['mdl-button--primary'];
    if (size === 2) {
      actions = [this._actionCancel.bind(this), this._actionOK.bind(this)];
      cssClasses = ['mdl-button--accent', 'mdl-button--primary'];
    }
    buttons.each(function(button, i) {
      var buttonClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'].concat([cssClasses[i]]);
      button.addClass(buttonClasses);
      button.addEventListener('click', actions[i]);
    });

    this.modalFooter.insert(actionNode);
    SUI.mdl(actionNode);
  }
  else {
    this.modalFooter.removeChildren();
  }
};

/**
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._actionOK = function() {
  var async = new SUI.Async();
  var calls = [this.eventOK.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._actionCancel = function() {
  var async = new SUI.Async();
  var calls = [this.eventCancel.bind(this), this.close.bind(this)];
  async.serial(calls);
};

/**
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._actionMinimize = function() {

};

/**
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._actionMaximize = function() {

};

/**
 * @param {number} width
 * @param {number} height
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype.setSize = function(width, height) {
  this.windowWidth = width;
  this.windowHeight = height;
  this._handleCenterPosition();
};


/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Dialog.prototype._handleCenterPosition = function() {
  var style = this.dialogWindow.getComputedStyle();
  var height = style.getPropertyValue('height');
  if (SUI.contain(height, 'px')) {
    height = parseInt(height.slice(0, -2), 10);
    if (height > this.windowHeight) {
      this.dialog.removeClass('center');
    }
    else {
      this.dialog.addClass('center');
    }
  }
  else {
    this.dialog.addClass('center');
  }
};