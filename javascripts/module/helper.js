import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Helper');

goog.require('SUI');
goog.require('SUI.Tooltip');
goog.require('SUI.Item');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Helper}
 */
SUI.Helper = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Helper.prototype._init = function() {

};

/**
 * @param {string} name
 * @param {!Function=} opt_callback
 * @param {string=} opt_href
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Item}
 */
SUI.Helper.prototype.createLink = function(name, opt_callback, opt_href = 'javascript:void(0)', opt_description = '', opt_allowAccess = true, opt_cssClasses = ['link']) {
  const linkNode = new SUI.Item('a');
  linkNode.setHtml(name);
  this.linkElement(linkNode, opt_callback, opt_href, opt_description, opt_allowAccess, opt_cssClasses);
  return linkNode;
};

/**
 * @param {string} selector
 * @param {!SUI.Item} dom
 * @param {!Function=} opt_callback
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.Helper.prototype.multipleLink = function(selector, dom, opt_callback, opt_cssClasses = []) {
  const linkNodes = new SUI.Query(selector, dom);
  linkNodes.each((linkNode) => {
    this.linkElement(linkNode, opt_callback, '', '', true, opt_cssClasses);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Item} dom
 * @param {!Function=} opt_callback
 * @param {string=} opt_href
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Item}
 */
SUI.Helper.prototype.link = function(selector, dom, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true, opt_cssClasses = []) {
  const linkNode = new SUI.Query(selector, dom).getItem();
  this.linkElement(linkNode, opt_callback, opt_href, opt_description, opt_allowAccess, opt_cssClasses);
  return linkNode;
};

/**
 * @param {!SUI.Item} linkNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_href
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.Helper.prototype.linkElement = function(linkNode, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true, opt_cssClasses = []) {
  if (!linkNode.isEmpty()) {
    if (opt_allowAccess) {
      linkNode.addClass(opt_cssClasses);

      if (!linkNode.getId()) {
        linkNode.setId(SUI.generateId('link'));
      } else {
        linkNode.removeEventListeners('click');
      }
      if (opt_href) {
        linkNode.setAttribute('href', opt_href);
      }
      if (opt_callback) {
        const href = linkNode.getAttribute('href');
        linkNode.addEventListener('click', function() {
          opt_callback(href, linkNode);
        });
      }

      this._setTooltip(linkNode, opt_description);
    } else {
      linkNode.remove();
    }
  }
};

/**
 * @param {string} name
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Item}
 */
SUI.Helper.prototype.createButton = function(name, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  const buttonNode = new SUI.Item('button');
  buttonNode.setHtml(name);
  this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {string} selector
 * @param {!SUI.Item} dom
 * @param {!Function=} opt_callback
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.Helper.prototype.multipleButton = function(selector, dom, opt_callback, opt_cssClasses = ['mdl-button--primary']) {
  const buttonNodes = new SUI.Query(selector, dom);
  buttonNodes.each((buttonNode) => {
    this.buttonElement(buttonNode, opt_callback, '', true, opt_cssClasses);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Item} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Item}
 */
SUI.Helper.prototype.button = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  const buttonNode = new SUI.Query(selector, dom).getItem();
  this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {!SUI.Item} buttonNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.Helper.prototype.buttonElement = function(buttonNode, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  if (!buttonNode.isEmpty()) {
    if (opt_allowAccess) {
      if (!buttonNode.getId()) {
        buttonNode.setId(SUI.generateId('button'));
      } else {
        const oldCssClasses = /** @type {!Array} */ (buttonNode.getData('cssClasses'));
        buttonNode.removeClass(oldCssClasses);
        buttonNode.removeEventListeners('click');
      }
      const cssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--raised'].concat(opt_cssClasses);
      buttonNode.setData('cssClasses', cssClasses);
      buttonNode.addClass(cssClasses);
      if (opt_callback) {
        buttonNode.addEventListener('click', () => {
          opt_callback(buttonNode.getId(), buttonNode);
        });
      }

      this._setTooltip(buttonNode, opt_description);
    } else {
      buttonNode.remove();
    }
  }
};

/**
 * @param {string} iconName
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Item}
 */
SUI.Helper.prototype.createIconButton = function(iconName, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  const buttonNode = new SUI.Item('button');
  this._createIconNode(iconName, buttonNode);
  this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {string} selector
 * @param {!SUI.Item} dom
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.Helper.prototype.multipleIconButton = function(selector, dom, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  const buttonNodes = new SUI.Query(selector, dom);
  buttonNodes.each((buttonNode) => {
    this.iconButtonElement(buttonNode, undefined, undefined, true, opt_cssClasses);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Item} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Item}
 */
SUI.Helper.prototype.iconButton = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  const buttonNode = new SUI.Query(selector, dom).getItem();
  this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {!SUI.Item} buttonNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.Helper.prototype.iconButtonElement = function(buttonNode, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  if (!buttonNode.isEmpty()) {
    if (opt_allowAccess) {
      if (!buttonNode.getId()) {
        buttonNode.setId(SUI.generateId('button'));
      } else {
        const oldCssClasses = /** @type {!Array} */ (buttonNode.getData('cssClasses'));
        buttonNode.removeClass(oldCssClasses);
        buttonNode.removeEventListeners('click');
      }
      const cssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--icon'].concat(opt_cssClasses);
      buttonNode.setData('cssClasses', cssClasses);
      buttonNode.addClass(cssClasses);
      if (opt_callback) {
        buttonNode.addEventListener('click', () => {
          opt_callback(buttonNode.getId(), buttonNode);
        });
      }

      this._setTooltip(buttonNode, opt_description);
    } else {
      buttonNode.remove();
    }
  }
};

/**
 * @private
 * @param {string} iconName
 * @param {!SUI.Item} parentNode
 * @return {undefined}
 */
SUI.Helper.prototype._createIconNode = function(iconName, parentNode) {
  const iconNode = new SUI.Item('em');
  iconNode.addClass('material-icons');
  iconNode.setHtml(iconName);
  parentNode.appendChild(iconNode);
};

/**
 * @param {!SUI.Item} node
 * @param {string=} opt_description
 * @return {undefined}
 */
SUI.Helper.prototype._setTooltip = function(node, opt_description = '') {
  if (opt_description) {
    node.setAttribute('title', opt_description);
  }
  const tooltip = new SUI.Tooltip(node);
  tooltip.render(opt_description);
  SUI.mdl(node);
};

/**
 * @param {!SUI.Item} imageNode
 * @param {string} defaultImageUrl
 * @param {string} email
 * @param {number=} opt_size
 * @param {string=} opt_rating
 * @return {undefined}
 */
SUI.Helper.prototype.setGravatar = function(imageNode, defaultImageUrl, email, opt_size = 500, opt_rating = 'g') {
  const src = SUI.format('https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404', [SUI.md5(email), opt_size, opt_rating]);
  imageNode.setAttribute('src', src);
  imageNode.setAttribute('onError', SUI.format('this.onerror=null;this.src=\'{0}\';', [defaultImageUrl]));
};
