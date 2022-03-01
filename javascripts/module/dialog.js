import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Dialog');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Promize');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.BaseModal');
goog.require('SUI.Http');

/**
 * @constructor
 * @extends {SUI.BaseModal}
 * @this {SUI.Dialog}
 * @param {!SUI.Http} http
 * @param {!Object=} opt_options
 */
SUI.Dialog = function(http, opt_options = {}) {
  this.http = http;
  this._setOptions(opt_options);
  this._init();
  this._initBase();
};
goog.inherits(SUI.Dialog, SUI.BaseModal);

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.Dialog.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt({
    id: '#dialog',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Dialog.prototype._init = function() {
  this.body = new SUI.Query('body').getItem();
  this.modal = new SUI.Query(this.options.id, this.body).getItem();
  this.modalWindow = new SUI.Query('#dialog-window', this.modal).getItem();
  this.modalHeader = new SUI.Query('.modal-header', this.modal).getItem();
  this.modalTitle = new SUI.Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new SUI.Query('.modal-body', this.modal).getItem();
  this.modalFooter = new SUI.Query('.modal-footer', this.modal).getItem();

  this.tooltip = new SUI.Tooltip(this.modalTitle);
  this.tooltip.render();
};

/**
 * @param {string} url
 * @return {!SUI.Promize}
 */
SUI.Dialog.prototype.loadTemplate = function(url) {
  this._reset();
  const deferred = new SUI.Deferred();
  this.http.get(url).then((data) => {
    const node = this._handleDom(data);
    deferred.resolve(node);
  }, (data) => {
    const node = this._handleMessage(data);
    deferred.reject(node);
    this.open();
  });
  return deferred.promise();
};

/**
 * @param {!SUI.Item} dom
 * @return {!SUI.Item}
 */
SUI.Dialog.prototype._handleMessage = function(dom) {
  const messageNode = new SUI.Query('.message', dom).getItem();
  const title = new SUI.Query('title', dom).getItem();
  this._setTitle(title.getText());
  this.modalBody.insert(messageNode);
  SUI.mdl(messageNode);
  return messageNode;
};

/**
 * @param {!SUI.Item} dom
 * @return {!SUI.Item}
 */
SUI.Dialog.prototype._handleDom = function(dom) {
  const titleNode = new SUI.Query('#title', dom).getItem();
  if (!titleNode.isEmpty()) {
    this._setTitle(titleNode.getText());
  }

  const contentNode = new SUI.Query('#content', dom).getItem();
  this.modalBody.insert(contentNode);
  SUI.mdl(contentNode);

  this._handleActions(dom);

  return contentNode;
};

/**
 * @param {!SUI.Item} dom
 * @return {undefined}
 */
SUI.Dialog.prototype._handleActions = function(dom) {
  const actionNode = new SUI.Query('#action', dom).getItem();
  if (!actionNode.isEmpty()) {
    const buttons = new SUI.Query('button', actionNode);
    const size = buttons.size();
    let actions = [this._actionOK.bind(this)];
    let cssClasses = ['mdl-button--primary'];
    if (size === 2) {
      actions = [this._actionCancel.bind(this), this._actionOK.bind(this)];
      cssClasses = ['mdl-button--accent', 'mdl-button--primary'];
    }
    buttons.each(function(button, i) {
      const buttonClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'].concat([cssClasses[i]]);
      button.addClass(buttonClasses);
      button.addEventListener('click', actions[i]);
    });

    this.modalFooter.insert(actionNode);
    SUI.mdl(actionNode);
  } else {
    this.modalFooter.removeChildren();
  }
};
