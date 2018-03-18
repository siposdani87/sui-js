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
SUI.Navigation = function(opt_http, opt_options) {
  this.http = opt_http;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Navigation.prototype._setOptions = function(opt_options) {
  let _self = this;
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
  let id = /** @type {string} */ (item.get('id'));
  let image = /** @type {string} */ (item.get('image'));
  let icon = /** @type {string} */ (item.get('icon'));
  let title = /** @type {string} */ (item.get('title'));
  let action = /** @type {!Function} */ (item.get('action'));
  let disabled = /** @type {boolean} */ (item.get('disabled'));

  if (image) {
    this.addImage(id, image, title, action, item);
  } else if (icon) {
    this.addIcon(id, icon, title, action, item);
  } else {
    this.addText(id, title, action, item);
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
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addIcon = function(id, icon, title, action, opt_data) {
  let item = this._setItem(id, title, action, opt_data);
  let iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons']);
  iconNode.setHtml(icon);

  let imageSpan = new SUI.Node('span');
  imageSpan.addClass('image');
  imageSpan.appendChild(iconNode);

  let node = item.get('node');
  node.beforeChild(imageSpan);
};

/**
 * @param {string} id
 * @param {string} image
 * @param {?string} title
 * @param {!Function} action
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addImage = function(id, image, title, action, opt_data) {
  let item = this._setItem(id, title, action, opt_data);

  let imageSpan = new SUI.Node('span');
  imageSpan.addClass('image');

  if (image.indexOf('.svg') !== -1) {
    this.http.get(image).then(function(data) {
      let svgTag = new SUI.Query('svg', data).getItem();
      imageSpan.appendChild(svgTag);
    });
  } else {
    let imageTag = new SUI.Node('img');
    imageTag.setAttribute('src', image);
    if (title) {
      imageTag.setAttribute('alt', title);
    }
    imageSpan.appendChild(imageTag);
  }

  let node = item.get('node');
  node.beforeChild(imageSpan);
};

/**
 * @param {string} id
 * @param {string} title
 * @param {!Function} action
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addText = function(id, title, action, opt_data) {
  this._setItem(id, title, action, opt_data);
};

/**
 * @private
 * @param {string} id
 * @param {?string} title
 * @param {!Function} action
 * @param {!Object=} opt_data
 * @return {!SUI.Object}
 */
SUI.Navigation.prototype._setItem = function(id, title, action, opt_data) {
  let node = new SUI.Node('a');
  if (title) {
    let titleSpan = new SUI.Node('span');
    titleSpan.addClass('title');
    titleSpan.setHtml(title);
    node.appendChild(titleSpan);
  }
  node.setAttribute('href', 'javascript:void(0)');

  let listener = node.addEventListener('click', action);

  let item = new SUI.Object(opt_data);
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
    let node = item.get('node');
    containerNode.appendChild(node);
  });
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setDisabled = function(id) {
  let item = this.container.findById(id);
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
  let node = item.get('node');
  node.addClass('disabled');
  node.removeEventListener('click', item.get('listener'));
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setEnabled = function(id) {
  let item = this.container.findById(id);
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
  let node = item.get('node');
  node.removeClass('disabled');
  let listener = node.addEventListener('click', item.get('action'));
  item.set('listener', listener);
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setActive = function(id) {
  this.each(function(item) {
    let node = item.get('node');
    node.removeClass('active');
    let itemId = item.get('id');
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
    let node = item.get('node');
    node.removeClass('active');
  });
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.show = function(id) {
  let item = this.container.findById(id);
  if (item) {
    let node = item.get('node');
    node.removeClass('hidden');
    this._enabled(item);
  }
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.hide = function(id) {
  let item = this.container.findById(id);
  if (item) {
    let node = item.get('node');
    node.addClass('hidden');
    this._disabled(item);
  }
};

