goog.provide('SUI.lib.Notification');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Notification}
 * @param {!Object=} opt_options
 */
SUI.lib.Notification = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Notification.prototype._init = function() {
  this.container = new SUI.Query(this.options.id).getItem();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.lib.Notification.prototype._setOptions = function(opt_options = {}) {
  let _self = this;
  _self.options = new SUI.Object({
    id: '#notifications',
    duration: 4000,
    closable: ['error'],
  });
  _self.options.merge(opt_options);
};

/**
 * @param {string} type
 * @param {string} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype._getNotificationNode = function(type, message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  let notificationNode = this.container.createElement('div');
  if (opt_id) {
    notificationNode.setAttribute('data-id', opt_id);
  }
  notificationNode.addClass(['notification', type]);
  notificationNode.setHtml(message);
  if (this._isCloseable(type, opt_closeCallback) && !SUI.eq(opt_duration, Infinity)) {
    let buttonNode = this._getCloseButton(notificationNode, opt_closeCallback);
    notificationNode.beforeChild(buttonNode);
  }
  return notificationNode;
};

/**
 * @param {!SUI.Node} notificationNode
 * @param {?Function=} opt_closeCallback
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype._getCloseButton = function(notificationNode, opt_closeCallback = null) {
  let buttonNode = notificationNode.createElement('button');
  buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);

  let buttonIcon = buttonNode.createElement('i');
  buttonIcon.addClass('material-icons');
  buttonIcon.setHtml('close');

  buttonNode.appendChild(buttonIcon);

  buttonNode.addEventListener('click', function() {
    this.remove(notificationNode, opt_closeCallback);
  }.bind(this));

  SUI.mdl(buttonNode);

  return buttonNode;
};

/**
 * @param {string} type
 * @param {string} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype._add = function(type, message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  this.removeNotificationNode(opt_id);
  let notificationNode = this._getNotificationNode(type, message, opt_duration, opt_closeCallback, opt_id);
  this.container.appendChild(notificationNode);
  if (!this._isCloseable(type, opt_closeCallback) && !SUI.eq(opt_duration, Infinity)) {
    notificationNode.addClass('closable');
    notificationNode.addEventListener('click', () => {
      this.remove(notificationNode, opt_closeCallback);
    });
    window.setTimeout(function() {
      this.remove(notificationNode, opt_closeCallback);
    }.bind(this), opt_duration || this.options.duration);
  }
  return notificationNode;
};

/**
 * @param {string=} opt_id
 */
SUI.lib.Notification.prototype.removeNotificationNode = function(opt_id = '') {
  if (opt_id) {
    let selector = SUI.format('[data-id={0}]', [opt_id]);
    let notifications = new SUI.Query(selector, this.container);
    notifications.each((notification) => {
      this.container.removeChild(notification);
    });
  }
};

/**
 * @param {string} type
 * @param {?Function=} opt_closeCallback
 * @return {boolean}
 */
SUI.lib.Notification.prototype._isCloseable = function(type, opt_closeCallback = null) {
  return this.options.closable.indexOf(type) !== -1 || SUI.isFunction(opt_closeCallback);
};

/**
 * @param {!SUI.Node} notification
 * @param {?Function=} opt_closeCallback
 * @return {undefined}
 */
SUI.lib.Notification.prototype.remove = function(notification, opt_closeCallback = null) {
  if (SUI.isFunction(opt_closeCallback)) {
    opt_closeCallback();
  }
  this.container.removeChild(notification);
};

/**
 * @param {string} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype.addSuccess = function(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  return this._add('success', message, opt_duration, opt_closeCallback, opt_id);
};

/**
 * @param {string} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype.addInfo = function(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  return this._add('info', message, opt_duration, opt_closeCallback, opt_id);
};

/**
 * @param {string} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype.addWarning = function(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  return this._add('warning', message, opt_duration, opt_closeCallback, opt_id);
};

/**
 * @param {string} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype.addError = function(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  return this._add('error', message, opt_duration, opt_closeCallback, opt_id);
};

/**
 * @param {{type: string, content: string, closable: boolean}} message
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node|null}
 */
SUI.lib.Notification.prototype.addMessage = function(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  if (SUI.isObject(message)) {
    let closeCallback = message['closable'] ? SUI.noop : opt_closeCallback;
    return this._add(message['type'], message['content'], opt_duration, closeCallback, opt_id);
  }
  return null;
};

/**
 * @param {!SUI.Node} node
 * @param {number=} opt_duration
 * @param {?Function=} opt_closeCallback
 * @param {string=} opt_id
 * @return {!SUI.Node}
 */
SUI.lib.Notification.prototype.addContent = function(node, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
  return this._add('', node.toString(), opt_duration, opt_closeCallback, opt_id);
};
