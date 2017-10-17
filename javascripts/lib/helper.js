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
 * @returns {undefined}
 */
SUI.lib.Helper.prototype._init = function() {


};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.link = function(selector, dom, callback, opt_description = '', opt_allowAccess = true) {
  var linkNode = new SUI.Query(selector, dom).getItem();
  this.linkElement(linkNode, callback, opt_description, opt_allowAccess);
};

/**
 * @param {!SUI.Node} linkNode
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.linkElement = function(linkNode, callback, opt_description = '', opt_allowAccess = true) {
  if (!linkNode.isEmpty()) {
    if (opt_allowAccess) {
      var href = linkNode.getAttribute('href');
      linkNode.setAttribute('href', 'javascript:void(0)');
      linkNode.addEventListener('click', function() {
        callback(href);
      });

      new SUI.Tooltip(linkNode, opt_description);
    }
    else {
      linkNode.remove();
    }
  }
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.button = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--raised', 'mdl-button--primary']) {
  var buttonNode = new SUI.Query(selector, dom).getItem();
  if (!buttonNode.isEmpty()) {
    if (opt_allowAccess) {
      buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'].concat(opt_cssClasses));
      buttonNode.addEventListener('click', callback);

      new SUI.Tooltip(buttonNode, opt_description);

      SUI.mdl(buttonNode);
    }
    else {
      buttonNode.remove();
    }
  }
};

/**
 * @param {string} selector
 * @param {!SUI.Node} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {boolean=} opt_allowAccess
 * @param {!Array=} opt_cssClasses
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.iconButton = function(selector, dom, callback, opt_description = '', opt_allowAccess = true, opt_cssClasses = ['mdl-button--accent', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  var buttonNode = new SUI.Query(selector, dom).getItem();
  if (!buttonNode.isEmpty()) {
    if (opt_allowAccess) {
      buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'].concat(opt_cssClasses));
      buttonNode.addEventListener('click', callback);

      new SUI.Tooltip(buttonNode, opt_description);

      SUI.mdl(buttonNode);
    }
    else {
      buttonNode.remove();
    }
  }
};

/**
 * @param {string} iconName
 * @param {!SUI.Node} dom
 * @param {!Function} callback
 * @param {string=} opt_description
 * @param {!Array=} opt_cssClasses
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.createIconButton = function(iconName, dom, callback, opt_description = '', opt_cssClasses = ['mdl-button--primary', 'mdl-button--fab', 'mdl-button--mini-fab']) {
  var buttonNode = new SUI.Node('button');
  buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect'].concat(opt_cssClasses));
  buttonNode.addEventListener('click', callback);

  this.createIconNode(iconName, buttonNode);

  dom.appendChild(buttonNode);

  new SUI.Tooltip(buttonNode, opt_description);

  SUI.mdl(buttonNode);
};

/**
 * @param {string} iconName
 * @param {!SUI.Node} parentNode
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.createIconNode = function(iconName, parentNode) {
  var iconNode = new SUI.Node('em');
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
 * @returns {undefined}
 */
SUI.lib.Helper.prototype.setGravatar = function(imageNode, defaultImageUrl, email, opt_size = 500, opt_rating = 'pg') {
  var src = SUI.format('https://www.gravatar.com/avatar/{0}?s={1}&r={2}&d=404', [SUI.md5(email), opt_size, opt_rating]);
  imageNode.setAttribute('src', src);
  imageNode.setAttribute('onError', SUI.format('this.onerror=null;this.src=\'{0}\';', [defaultImageUrl]));
};
