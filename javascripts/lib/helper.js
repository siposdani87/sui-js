goog.provide('SUI.lib.Helper');

goog.require('SUI');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Helper}
 */
SUI.lib.Helper = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Helper.prototype._init = function() {

};

/**
 * @param {string} name
 * @param {!Function=} opt_callback
 * @param {string=} opt_href
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @return {!SUI.Node}
 */
SUI.lib.Helper.prototype.createLink = function(name, opt_callback, opt_href = 'javascript:void(0)', opt_description = '', opt_allowAccess = true) {
  const linkNode = new SUI.Node('a');
  linkNode.setHtml(name);
  this.linkElement(linkNode, opt_callback, opt_href, opt_description, opt_allowAccess);
  return linkNode;
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function=} opt_callback
 * @return {undefined}
 */
SUI.lib.Helper.prototype.multipleLink = function(selector, dom, opt_callback) {
  const linkNodes = new SUI.Query(selector, dom);
  linkNodes.each((linkNode) => {
    this.linkElement(linkNode, opt_callback);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function=} opt_callback
 * @param {string=} opt_href
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @return {!SUI.Node}
 */
SUI.lib.Helper.prototype.link = function(selector, dom, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true) {
  const linkNode = new SUI.Query(selector, dom).getItem();
  this.linkElement(linkNode, opt_callback, opt_href, opt_description, opt_allowAccess);
  return linkNode;
};

/**
 * @param {!SUI.Node} linkNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_href
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @return {undefined}
 */
SUI.lib.Helper.prototype.linkElement = function(linkNode, opt_callback, opt_href = '', opt_description = '', opt_allowAccess = true) {
  if (!linkNode.isEmpty()) {
    if (opt_allowAccess) {
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
          opt_callback(href);
        });
      }

      const tooltip = new SUI.Tooltip(linkNode);
      tooltip.render(opt_description);
      SUI.mdl(linkNode);
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
 * @return {!SUI.Node}
 */
SUI.lib.Helper.prototype.createButton = function(name, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  const buttonNode = new SUI.Node('button');
  buttonNode.setHtml(name);
  this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.multipleButton = function(selector, dom, opt_cssClasses = ['mdl-button--primary']) {
  const buttonNodes = new SUI.Query(selector, dom);
  buttonNodes.each((buttonNode) => {
    this.buttonElement(buttonNode, undefined, undefined, true, opt_cssClasses);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Node}
 */
SUI.lib.Helper.prototype.button = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  const buttonNode = new SUI.Query(selector, dom).getItem();
  this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {!SUI.Node} buttonNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.buttonElement = function(buttonNode, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
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
        buttonNode.addEventListener('click', opt_callback);
      }

      const tooltip = new SUI.Tooltip(buttonNode);
      tooltip.render(opt_description);
      SUI.mdl(buttonNode);
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
 * @return {!SUI.Node}
 */
SUI.lib.Helper.prototype.createIconButton = function(iconName, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  const buttonNode = new SUI.Node('button');
  this._createIconNode(iconName, buttonNode);
  this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.multipleIconButton = function(selector, dom, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  const buttonNodes = new SUI.Query(selector, dom);
  buttonNodes.each((buttonNode) => {
    this.iconButtonElement(buttonNode, undefined, undefined, true, opt_cssClasses);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {!SUI.Node}
 */
SUI.lib.Helper.prototype.iconButton = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  const buttonNode = new SUI.Query(selector, dom).getItem();
  this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
  return buttonNode;
};

/**
 * @param {!SUI.Node} buttonNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.iconButtonElement = function(buttonNode, opt_callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
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
      buttonNode.addEventListener('click', opt_callback);

      const tooltip = new SUI.Tooltip(buttonNode);
      tooltip.render(opt_description);
      SUI.mdl(buttonNode);
    } else {
      buttonNode.remove();
    }
  }
};

/**
 * @private
 * @param {string} iconName
 * @param {!SUI.Node} parentNode
 * @return {undefined}
 */
SUI.lib.Helper.prototype._createIconNode = function(iconName, parentNode) {
  const iconNode = new SUI.Node('em');
  iconNode.addClass('material-icons');
  iconNode.setHtml(iconName);
  parentNode.appendChild(iconNode);
};

/**
 * @param {!SUI.Node} imageNode
 * @param {string} defaultImageUrl
 * @param {string} email
 * @param {number=} opt_size
 * @param {string=} opt_rating
 * @return {undefined}
 */
SUI.lib.Helper.prototype.setGravatar = function(imageNode, defaultImageUrl, email, opt_size = 500, opt_rating = 'g') {
  const src = SUI.format('https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404', [SUI.md5(email), opt_size, opt_rating]);
  imageNode.setAttribute('src', src);
  imageNode.setAttribute('onError', SUI.format('this.onerror=null;this.src=\'{0}\';', [defaultImageUrl]));
};
