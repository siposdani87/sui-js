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
 * @param {!SUI.Node} parentNode
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @return {undefined}
 */
SUI.lib.Helper.prototype.createLink = function(name, parentNode, callback, opt_description = '', opt_allowAccess = true) {
  let linkNode = new SUI.Node('a');
  linkNode.setHtml(name);
  parentNode.appendChild(linkNode);
  this.linkElement(linkNode, callback, opt_description, opt_allowAccess);
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @return {undefined}
 */
SUI.lib.Helper.prototype.multipleLink = function(selector, dom) {
  let linkNodes = new SUI.Query(selector, dom);
  linkNodes.each((linkNode) => {
    this.linkElement(linkNode);
  });
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function=} opt_callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @return {undefined}
 */
SUI.lib.Helper.prototype.link = function(selector, dom, opt_callback, opt_description = '', opt_allowAccess = true) {
  let linkNode = new SUI.Query(selector, dom).getItem();
  this.linkElement(linkNode, opt_callback, opt_description, opt_allowAccess);
};

/**
 * @param {!SUI.Node} linkNode
 * @param {!Function=} opt_callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @return {undefined}
 */
SUI.lib.Helper.prototype.linkElement = function(linkNode, opt_callback, opt_description = '', opt_allowAccess = true) {
  if (!linkNode.isEmpty()) {
    if (opt_allowAccess) {
      if (!linkNode.getId()) {
        linkNode.setId(SUI.generateId('link'));
      } else {
        let oldHref = /** @type {string} */ (linkNode.getData('href'));
        linkNode.setAttribute('href', oldHref);
        linkNode.removeEventListeners('click');
      }
      if (opt_callback) {
          let href = linkNode.getAttribute('href');
          linkNode.setData('href', href);
          linkNode.setAttribute('href', 'javascript:void(0)');
          linkNode.addEventListener('click', function() {
            opt_callback(href);
          });
      }

      new SUI.Tooltip(linkNode, opt_description);
      SUI.mdl(linkNode);
    } else {
      linkNode.remove();
    }
  }
};

/**
 * @param {string} name
 * @param {!SUI.Node} parentNode
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.createButton = function(name, parentNode, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  let buttonNode = new SUI.Node('button');
  buttonNode.setHtml(name);
  parentNode.appendChild(buttonNode);
  this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.multipleButton = function(selector, dom, opt_cssClasses = ['mdl-button--primary']) {
  let buttonNodes = new SUI.Query(selector, dom);
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
 * @return {undefined}
 */
SUI.lib.Helper.prototype.button = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--primary']) {
  let buttonNode = new SUI.Query(selector, dom).getItem();
  this.buttonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
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
        let oldCssClasses = /** @type {!Array} */ (buttonNode.getData('cssClasses'));
        buttonNode.removeClass(oldCssClasses);
        buttonNode.removeEventListeners('click');
      }
      let cssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--raised'].concat(opt_cssClasses);
      buttonNode.setData('cssClasses', cssClasses);
      buttonNode.addClass(cssClasses);
      buttonNode.addEventListener('click', opt_callback);

      new SUI.Tooltip(buttonNode, opt_description);
      SUI.mdl(buttonNode);
    } else {
      buttonNode.remove();
    }
  }
};

/**
 * @param {string} iconName
 * @param {!SUI.Node} parentNode
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.createIconButton = function(iconName, parentNode, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  let buttonNode = new SUI.Node('button');
  this._createIconNode(iconName, buttonNode);
  parentNode.appendChild(buttonNode);
  this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Array=} opt_cssClasses
 * @return {undefined}
 */
SUI.lib.Helper.prototype.multipleIconButton = function(selector, dom, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  let buttonNodes = new SUI.Query(selector, dom);
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
 * @return {undefined}
 */
SUI.lib.Helper.prototype.iconButton = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  let buttonNode = new SUI.Query(selector, dom).getItem();
  this.iconButtonElement(buttonNode, callback, opt_description, opt_allowAccess, opt_cssClasses);
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
        let oldCssClasses = /** @type {!Array} */ (buttonNode.getData('cssClasses'));
        buttonNode.removeClass(oldCssClasses);
        buttonNode.removeEventListeners('click');
      }
      let cssClasses = ['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect', 'mdl-button--icon'].concat(opt_cssClasses);
      buttonNode.setData('cssClasses', cssClasses);
      buttonNode.addClass(cssClasses);
      buttonNode.addEventListener('click', opt_callback);

      new SUI.Tooltip(buttonNode, opt_description);
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
  let iconNode = new SUI.Node('em');
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
SUI.lib.Helper.prototype.setGravatar = function(imageNode, defaultImageUrl, email, opt_size = 500, opt_rating = 'pg') {
  let src = SUI.format('https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404', [SUI.md5(email), opt_size, opt_rating]);
  imageNode.setAttribute('src', src);
  imageNode.setAttribute('onError', SUI.format('this.onerror=null;this.src=\'{0}\';', [defaultImageUrl]));
};
