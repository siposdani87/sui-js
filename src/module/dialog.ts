import { mdl } from "../base";
import { Tooltip } from "../component/tooltip";
import { Deferred } from "../core/deferred";
import { Objekt } from "../core/objekt";
import { Query } from "../core/query";
import { BaseModal } from "./baseModal";

/**
 * @constructor
 * @extends {BaseModal}
 * @this {Dialog}
 * @param {!Http} http
 * @param {!Object=} opt_options
 */
export const Dialog = function(http, opt_options = {}) {
  this.http = http;
  this._setOptions(opt_options);
  this._init();
  this._initBase();
};
Dialog.prototype = Object.create(BaseModal.prototype);
Dialog.prototype.constructor = Dialog;

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
Dialog.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt({
    id: '#dialog',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Dialog.prototype._init = function() {
  this.body = new Query('body').getItem();
  this.modal = new Query(this.options.id, this.body).getItem();
  this.modalWindow = new Query('#dialog-window', this.modal).getItem();
  this.modalHeader = new Query('.modal-header', this.modal).getItem();
  this.modalTitle = new Query('.modal-title', this.modalHeader).getItem();
  this.modalBody = new Query('.modal-body', this.modal).getItem();
  this.modalFooter = new Query('.modal-footer', this.modal).getItem();

  this.tooltip = new Tooltip(this.modalTitle);
  this.tooltip.render();
};

/**
 * @param {string} url
 * @return {!Promize}
 */
Dialog.prototype.loadTemplate = function(url) {
  this._reset();
  const deferred = new Deferred();
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
 * @param {!Item} dom
 * @return {!Item}
 */
Dialog.prototype._handleMessage = function(dom) {
  const messageNode = new Query('.message', dom).getItem();
  const title = new Query('title', dom).getItem();
  this._setTitle(title.getText());
  this.modalBody.insert(messageNode);
  mdl(messageNode);
  return messageNode;
};

/**
 * @param {!Item} dom
 * @return {!Item}
 */
Dialog.prototype._handleDom = function(dom) {
  const titleNode = new Query('#title', dom).getItem();
  if (!titleNode.isEmpty()) {
    this._setTitle(titleNode.getText());
  }

  const contentNode = new Query('#content', dom).getItem();
  this.modalBody.insert(contentNode);
  mdl(contentNode);

  this._handleActions(dom);

  return contentNode;
};

/**
 * @param {!Item} dom
 * @return {undefined}
 */
Dialog.prototype._handleActions = function(dom) {
  const actionNode = new Query('#action', dom).getItem();
  if (!actionNode.isEmpty()) {
    const buttons = new Query('button', actionNode);
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
    mdl(actionNode);
  } else {
    this.modalFooter.removeChildren();
  }
};
