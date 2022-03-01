goog.provide('SUI.Hidden');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Hidden}
 * @param {!SUI.Node} input
 */
SUI.Hidden = function(input) {
  SUI.Hidden.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.Hidden, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Hidden.prototype._init = function() {
  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    return true;
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.Hidden.prototype.render = function() {

};

/**
 * @override
 */
SUI.Hidden.prototype.refresh = function() {

};
