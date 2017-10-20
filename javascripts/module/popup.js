goog.provide('SUI.Popup');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Popup}
 * @param {!SUI.Node=} opt_content
 * @param {!SUI.Node=} opt_parent
 * @param {boolean=} opt_withClose
 */
SUI.Popup = function(opt_content, opt_parent, opt_withClose = false) {
  this.content = opt_content;
  this.parent = opt_parent;
  this.withClose = opt_withClose;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Popup.prototype._init = function() {
  this.container = new SUI.Query('.main-container').getItem();

  if (this.content && this.parent) {
    this.popupNode = new SUI.Node('div');
    this.popupNode.addClass(['popup', 'hidden']);

    this.parent.addClass('popup-parent');
    this.parent.appendChild(this.popupNode);

    this.draw(this.content, this.withClose);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Popup.prototype._initCloseButton = function() {
  if (this.withClose) {
    var btnClose = new SUI.Node('button');
    btnClose.setAttribute('type', 'button');
    btnClose.addClass(['close', 'mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnClose.addEventListener('click', function() {
      this.close();
    }.bind(this));

    var icon = new SUI.Node('i');
    icon.addClass('material-icons');
    icon.setHtml('close');
    btnClose.appendChild(icon);

    this.popupNode.appendChild(btnClose);

    SUI.mdl(btnClose);
  }
};

/**
 * @param {!SUI.Node} content
 * @param {boolean=} opt_withClose
 * @return {undefined}
 */
SUI.Popup.prototype.draw = function(content, opt_withClose) {
  this.content = content;
  this.withClose = opt_withClose;
  this._initCloseButton();
  this.popupNode.appendChild(this.content);
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.open = function() {
  this.closeAll();
  this.popupNode.removeClass('hidden');
  this._setPosition();
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.close = function() {
  this._closeNode(this.popupNode);
};

/**
 * @private
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Popup.prototype._closeNode = function(node) {
  node.addClass('hidden');
  node.setStyle({
    'top': 'auto',
    'bottom': 'auto',
    'left': 'auto',
    'right': 'auto'
  });
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  }
  else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.Popup.prototype.isOpened = function() {
  return !this.popupNode.hasClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.closeAll = function() {
  var popups = new SUI.Query('.popup');
  popups.each(function(popupNode) {
    this._closeNode(popupNode);
  }.bind(this));
};

/**
 * @private
 * @return {undefined}
 */
SUI.Popup.prototype._setPosition = function() {
  var containerNode = this.container.getNode();

  var top = containerNode.offsetHeight - containerNode.scrollHeight;
  var absoluteTop = top === 0 ? 'auto' : top + 'px';

  //var left = containerNode.offsetWidth - containerNode.scrollWidth;
  //var absoluteLeft = left === 0 ? 'auto' : left + 'px';

  this.popupNode.setStyle({
    'top': absoluteTop,
    'left': 0 //absoluteLeft
  });
};
