goog.provide('SUI.widget.Button');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Button}
 * @param {!SUI.Node} input
 */
SUI.widget.Button = function(input) {
  SUI.Widget.call(this, input);
  this._init();
};
goog.inherits(SUI.widget.Button, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Button.prototype._init = function() {
  this.input.setAttribute('name', 'button');
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Button.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent']);

  this.input.addEventListener('click', (node) => {
    this.eventClick(node);
  });

  this.refresh();
};

/**
 * @override
 */
SUI.widget.Button.prototype.refresh = function() {
  SUI.mdl(this.input);
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.widget.Button.prototype.eventClick = function(node) {
  console.warn('SUI.widget.Button.eventClick()', node);
};
