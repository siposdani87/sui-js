import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Navigation');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Query');
goog.require('SUI.Http');

/**
 * @constructor
 * @this {SUI.Navigation}
 * @param {!SUI.Http=} opt_http
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
  _self.options = new SUI.Objekt();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Navigation.prototype._init = function() {
  this.container = /** @type {!SUI.Collection<!SUI.Objekt>} */ (new SUI.Collection());

  this.linkNodeKey = 'node';
};

/**
 * @param {!SUI.Objekt} item
 * @return {undefined}
 */
SUI.Navigation.prototype.add = function(item) {
  const id = /** @type {string} */ (item.get('id'));
  const image = /** @type {string} */ (item.get('image'));
  const icon = /** @type {string} */ (item.get('icon'));
  const title = /** @type {string} */ (item.get('title'));
  const counter = /** @type {string} */ (item.get('counter'));
  const href = /** @type {string} */ (item.get('href'));
  const action = /** @type {!Function} */ (item.get('action'));
  const disabled = /** @type {boolean} */ (item.get('disabled'));

  if (image) {
    this.addImage(id, image, title, action, href, item);
  } else if (icon) {
    this.addIcon(id, icon, title, action, href, item);
  } else if (!SUI.isUndefined(counter)) {
    this.addCounter(id, counter, title, action, href, item);
  } else {
    this.addText(id, title, action, href, item);
  }

  if (disabled) {
    this.setDisabled(id);
  }
};

/**
 * @param {string} id
 * @param {string} counter
 * @param {?string} title
 * @param {!Function} action
 * @param {string=} opt_href
 * @param {!Object=} opt_data
 * @return {undefined}
 */
SUI.Navigation.prototype.addCounter = function(id, counter, title, action, opt_href = '', opt_data = {}) {
  const item = this._setItem(id, title, action, opt_href, opt_data);
  const counterSpan = new SUI.Item('span');
  counterSpan.addClass('counter');
  counterSpan.setHtml(counter);

  const linkNode = item.get(this.linkNodeKey);
  linkNode.beforeChild(counterSpan);
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
  const iconNode = new SUI.Item('em');
  iconNode.addClass(['material-icons']);
  iconNode.setHtml(icon);

  const imageSpan = new SUI.Item('span');
  imageSpan.addClass('image');
  imageSpan.appendChild(iconNode);

  const linkNode = item.get(this.linkNodeKey);
  linkNode.beforeChild(imageSpan);
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

  const imageSpan = new SUI.Item('span');
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
    const imageTag = new SUI.Item('img');
    imageTag.setAttribute('src', image);
    if (title) {
      imageTag.setAttribute('alt', title);
    }
    imageSpan.appendChild(imageTag);
  }

  const linkNode = item.get(this.linkNodeKey);
  linkNode.beforeChild(imageSpan);
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
 * @return {!SUI.Objekt}
 */
SUI.Navigation.prototype._setItem = function(id, title, action, opt_href = '', opt_data = {}) {
  const linkNode = new SUI.Item('a');
  if (title) {
    const titleSpan = new SUI.Item('span');
    titleSpan.addClass('title');
    titleSpan.setHtml(title);
    linkNode.appendChild(titleSpan);
  }
  linkNode.setAttribute('href', opt_href || 'javascript:void(0)');
  const href = linkNode.getAttribute('href');

  const listener = linkNode.addEventListener('click', () => {
    action(href);
  });

  const item = new SUI.Objekt(opt_data);
  item.merge({
    'id': id,
    'title': title,
    'href': href,
    'action': action,
    'listener': listener,
  });
  item.setRaw(this.linkNodeKey, linkNode);

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
 * @param {!SUI.Item} containerNode
 * @return {undefined}
 */
SUI.Navigation.prototype.bindToContainer = function(containerNode) {
  containerNode.removeChildren();
  this.each((item) => {
    const linkNode = item.get(this.linkNodeKey);
    containerNode.appendChild(linkNode);
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
 * @param {!SUI.Objekt} item
 * @return {undefined}
 */
SUI.Navigation.prototype._disabled = function(item) {
  const linkNode = item.get(this.linkNodeKey);
  linkNode.addClass('disabled');
  linkNode.removeEventListener('click', item.get('listener'));
  linkNode.setAttribute('href', 'javascript:void(0)');
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
 * @param {!SUI.Objekt} item
 * @return {undefined}
 */
SUI.Navigation.prototype._enabled = function(item) {
  this._disabled(item);
  const linkNode = item.get(this.linkNodeKey);
  linkNode.removeClass('disabled');
  const action = /** @type {function(string):undefined} */ (item.get('action'));
  const href = /** @type {string} */ (item.get('href'));
  linkNode.setAttribute('href', href);
  const listener = linkNode.addEventListener('click', () => {
    action(href);
  });
  item.set('listener', listener);
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.setActive = function(id) {
  this.each((item) => {
    const linkNode = item.get(this.linkNodeKey);
    linkNode.removeClass('active');
    const itemId = item.get('id');
    if (itemId[itemId.length - 1] === '.' && SUI.contain(id, itemId) || SUI.eq(id, itemId)) {
      linkNode.addClass('active');
    }
  });
};

/**
 * @return {undefined}
 */
SUI.Navigation.prototype.setAllInactive = function() {
  this.each((item) => {
    const linkNode = item.get(this.linkNodeKey);
    linkNode.removeClass('active');
  });
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Navigation.prototype.show = function(id) {
  const item = this.container.findById(id);
  if (item) {
    const linkNode = item.get(this.linkNodeKey);
    linkNode.removeClass('hidden');
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
    const linkNode = item.get(this.linkNodeKey);
    linkNode.addClass('hidden');
    this._disabled(item);
  }
};
