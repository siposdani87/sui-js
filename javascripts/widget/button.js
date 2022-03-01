import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Button');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Button}
 * @param {!SUI.Item} input
 */
SUI.Button = function(input) {
  SUI.Button.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.Button, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Button.prototype._init = function() {
  this.input.setAttribute('name', 'button');
};

/**
 * @override
 * @return {undefined}
 */
SUI.Button.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent']);

  this.input.addEventListener('click', (node) => {
    this.eventClick(node);
  });

  this.refresh();
};

/**
 * @override
 */
SUI.Button.prototype.refresh = function() {
  SUI.mdl(this.input);
};

/**
 * @param {!SUI.Item} node
 * @return {undefined}
 */
SUI.Button.prototype.eventClick = function(node) {
  SUI.consoleWarn('SUI.Button.eventClick()', node);
};
