goog.provide('SUI.Navigation');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Navigation}
 * @param {!SUI.lib.Http=} opt_http
 * @param {!Object=} opt_options
 */
SUI.Navigation = function(opt_http, opt_options = {}) {
  this.http = opt_http;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Navigation.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Navigation.prototype._init = function() {
  this.container = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
};

/**
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Navigation.prototype.add = function(item) {
  const id = /** @type {string} */ (item.get('id'));
  const image = /** @type {string} */ (item.get('image'));
  const icon = /** @type {string} */ (item.get('icon'));
  const title = /** @type {string} */ (item.get('title'));
  const href = /** @type {string} */ (item.get('href'));
  const action = /** @type {!Function} */ (item.get('action'));
  const disabled = /** @type {boolean} */ (item.get('disabled'));

  if (image) {
    this.addImage(id, image, title, action, href, item);
  } else if (icon) {
    this.addIcon(id, icon, title, action, href, item);
  } else {
    this.addText(id, title, action, href, item);
  }

  if (disabled) {
    this.setDisabled(id);
  }
};

/**
 * @param {string} id
 * @param {string} icon
 * @param {?string} title
 * @param {!Function} action
 * @param {string=} opt_href
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addIcon = function(id, icon, title, action, opt_href = '', opt_data = {}) {
  const item = this._setItem(id, title, action, opt_href, opt_data);
  const iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons']);
  iconNode.setHtml(icon);

  const imageSpan = new SUI.Node('span');
  imageSpan.addClass('image');
  imageSpan.appendChild(iconNode);

  const node = item.get('node');
  node.beforeChild(imageSpan);
};

/**
 * @param {string} id
 * @param {string} image
 * @param {?string} title
 * @param {!Function} action
 * @param {string=} opt_href
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addImage = function(id, image, title, action, opt_href = '', opt_data = {}) {
  const item = this._setItem(id, title, action, opt_href, opt_data);

  const imageSpan = new SUI.Node('span');
  imageSpan.addClass('image');

  if (image.indexOf('.svg') !== -1) {
    this.http.get(image, {}, {
      'Authorization': '',
      'X-Requested-With': '',
    }).then(function(data) {
      const svgTag = new SUI.Query('svg', data).getItem();
      imageSpan.appendChild(svgTag);
    });
  } else {
    const imageTag = new SUI.Node('img');
    imageTag.setAttribute('src', image);
    if (title) {
      imageTag.setAttribute('alt', title);
    }
    imageSpan.appendChild(imageTag);
  }

  const node = item.get('node');
  node.beforeChild(imageSpan);
};

/**
 * @param {string} id
 * @param {string} title
 * @param {!Function} action
 * @param {string=} opt_href
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addText = function(id, title, action, opt_href = '', opt_data = {}) {
  this._setItem(id, title, action, opt_href, opt_data);
};

/**
 * @private
 * @param {string} id
 * @param {?string} title
 * @param {!Function} action
 * @param {string=} opt_href
 * @param {!Object=} opt_data
 * @return {!SUI.Object}
 */
SUI.Navigation.prototype._setItem = function(id, title, action, opt_href = '', opt_data = {}) {
  const node = new SUI.Node('a');
  if (title) {
    const titleSpan = new SUI.Node('span');
    titleSpan.addClass('title');
    titleSpan.setHtml(title);
    node.appendChild(titleSpan);
  }
  node.setAttribute('href', opt_href || 'javascript:void(0)');

  const listener = node.addEventListener('click', action);

  const item = new SUI.Object(opt_data);
  item.merge({
    'id': id,
    'title': title,
    'action': action,
    'listener': listener,
  });
  item.setRaw('node', node);

  this.container.push(item);

  return item;
};

/**
 * @param {!Function} next
 * @return {undefined}
 */
SUI.Navigation.prototype.each = function(next) {
  this.container.each(function(item) {
    next(item);
  });
};

/**
 * @param {!SUI.Node} containerNode
 * @return {undefined}
 */
SUI.Navigation.prototype.bindToContainer = function(containerNode) {
  containerNode.removeChildren();
  this.each((item) => {
    const node = item.get('node');
    containerNode.appendChild(node);
  });
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setDisabled = function(id) {
  const item = this.container.findById(id);
  if (item) {
    this._disabled(item);
  }
};

/**
 * @private
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Navigation.prototype._disabled = function(item) {
  const node = item.get('node');
  node.addClass('disabled');
  node.removeEventListener('click', item.get('listener'));
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setEnabled = function(id) {
  const item = this.container.findById(id);
  if (item) {
    this._enabled(item);
  }
};

/**
 * @private
 * @param {!SUI.Object} item
 * @return {undefined}
 */
SUI.Navigation.prototype._enabled = function(item) {
  this._disabled(item);
  const node = item.get('node');
  node.removeClass('disabled');
  const listener = node.addEventListener('click', item.get('action'));
  item.set('listener', listener);
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setActive = function(id) {
  this.each(function(item) {
    const node = item.get('node');
    node.removeClass('active');
    const itemId = item.get('id');
    if (itemId[itemId.length - 1] === '.' && SUI.contain(id, itemId) || SUI.eq(id, itemId)) {
      node.addClass('active');
    }
  });
};

/**
 * @return {undefined}
 */
SUI.Navigation.prototype.setAllInactive = function() {
  this.each((item) => {
    const node = item.get('node');
    node.removeClass('active');
  });
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.show = function(id) {
  const item = this.container.findById(id);
  if (item) {
    const node = item.get('node');
    node.removeClass('hidden');
    this._enabled(item);
  }
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.hide = function(id) {
  const item = this.container.findById(id);
  if (item) {
    const node = item.get('node');
    node.addClass('hidden');
    this._disabled(item);
  }
};
