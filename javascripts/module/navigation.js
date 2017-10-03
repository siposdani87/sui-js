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
 * @returns {undefined}
 */
SUI.Navigation.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Navigation.prototype._init = function() {
  this.container = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
};

/**
 * @param {!SUI.Object} item
 * @returns {undefined}
 */
SUI.Navigation.prototype.add = function(item) {
  var id = /** @type {string} */ (item.get('id'));
  var image = /** @type {string} */ (item.get('image'));
  var icon = /** @type {string} */ (item.get('icon'));
  var title = /** @type {string} */ (item.get('title'));
  var action = /** @type {!Function} */ (item.get('action'));
  var disabled = /** @type {boolean} */ (item.get('disabled'));

 if (image){
   this.addImage(id, image, title, action, item);
 } else if (icon){
   this.addIcon(id, icon, title, action, item);
  }
  else{
   this.addText(id, title, action, item);
 }

 if (disabled){
   this.setDisabled(id);
 }
};

/**
 * @param {string} id
 * @param {string} icon
 * @param {?string} title
 * @param {!Function} action
 * @param {!Object=} opt_data
 * @returns {undefined}
 */
SUI.Navigation.prototype.addIcon = function(id, icon, title, action, opt_data) {
  var item = this._setItem(id, title, action, opt_data);
  var iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons']);
  iconNode.setHtml(icon);

  var imageSpan = new SUI.Node('span');
  imageSpan.addClass('image');
  imageSpan.appendChild(iconNode);

  var node = item.get('node');
  node.beforeChild(imageSpan);
};

/**
 * @param {string} id
 * @param {string} image
 * @param {?string} title
 * @param {!Function} action
 * @param {!Object=} opt_data
 * @returns {undefined}
 */
SUI.Navigation.prototype.addImage = function(id, image, title, action, opt_data) {
  var item = this._setItem(id, title, action, opt_data);

  var imageSpan = new SUI.Node('span');
  imageSpan.addClass('image');

  if (image.indexOf('.svg') !== -1) {
    this.http.get(image).then(function(data) {
      var svgTag = new SUI.Query('svg', data).getItem();
      imageSpan.appendChild(svgTag);
    });
  }
  else{
    var imageTag = new SUI.Node('img');
    imageTag.setAttribute('src', image);
    if (title){
      imageTag.setAttribute('alt', title);
    }
    imageSpan.appendChild(imageTag);
  }

  var node = item.get('node');
  node.beforeChild(imageSpan);
};

/**
 * @param {string} id
 * @param {string} title
 * @param {!Function} action
 * @param {!Object=} opt_data
 * @returns {undefined}
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
 * @returns {!SUI.Object}
 */
SUI.Navigation.prototype._setItem = function(id, title, action, opt_data) {
  var node = new SUI.Node('a');
  if (title) {
    var titleSpan = new SUI.Node('span');
    titleSpan.addClass('title');
    titleSpan.setHtml(title);
    node.appendChild(titleSpan);
  }
  node.setAttribute('href', 'javascript:void(0)');

  var listener = node.addEventListener('click', action);

  var item = new SUI.Object(opt_data);
  item.merge({
    'id': id,
    'title': title,
    'action': action,
    'listener': listener
  });
  item.setRaw('node', node);

  this.container.push(item);

  return item;
};

/**
 * @param {!Function} next
 * @returns {undefined}
 */
SUI.Navigation.prototype.each = function(next) {
  this.container.each(function(item){
    next(item);
  });
};

/**
 * @param {!SUI.Node} containerNode
 * @returns {undefined}
 */
SUI.Navigation.prototype.bindToContainer = function(containerNode) {
  containerNode.removeChildren();
  this.each(function(item) {
    var node = item.get('node');
    containerNode.appendChild(node);
  }.bind(this));
};

/**
 * @param {string} id
 * @returns {undefined}
 */
SUI.Navigation.prototype.setDisabled = function(id) {
  var item = this.container.findById(id);
  if (item){
    this._disabled(item);
  }
};

/**
 * @private
 * @param {!SUI.Object} item
 * @returns {undefined}
 */
SUI.Navigation.prototype._disabled = function(item) {
  var node = item.get('node');
  node.addClass('disabled');
  node.removeEventListener('click', item.get('listener'));
};

/**
 * @param {string} id
 * @returns {undefined}
 */
SUI.Navigation.prototype.setEnabled = function(id) {
  var item = this.container.findById(id);
  if (item) {
    this._enabled(item);
  }
};

/**
 * @private
 * @param {!SUI.Object} item
 * @returns {undefined}
 */
SUI.Navigation.prototype._enabled = function(item) {
  this._disabled(item);
  var node = item.get('node');
  node.removeClass('disabled');
  var listener = node.addEventListener('click', item.get('action'));
  item.set('listener', listener);
};

/**
 * @param {string} id
 * @returns {undefined}
 */
SUI.Navigation.prototype.setActive = function(id) {
  this.each(function(item){
    var node = item.get('node');
    node.removeClass('active');
    var itemId = item.get('id');
    if (itemId[itemId.length-1] === '.' && SUI.contain(id, itemId) || SUI.eq(id, itemId)){
      node.addClass('active');
    }
  });
};

/**
 * @returns {undefined}
 */
SUI.Navigation.prototype.setAllInactive = function() {
  this.each((item) => {
    var node = item.get('node');
    node.removeClass('active');
  });
};

/**
 * @param {string} id
 * @returns {undefined}
 */
SUI.Navigation.prototype.show = function(id) {
  var item = this.container.findById(id);
  if (item){
    var node = item.get('node');
    node.removeClass('hidden');
    this._enabled(item);
  }
};

/**
 * @param {string} id
 * @returns {undefined}
 */
SUI.Navigation.prototype.hide = function(id) {
  var item = this.container.findById(id);
  if (item){
    var node = item.get('node');
    node.addClass('hidden');
    this._disabled(item);
  }
};

