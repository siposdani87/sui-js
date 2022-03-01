goog.provide('SUI.widget.Hidden');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.widget.Hidden}
 * @param {!SUI.Node} input
 */
SUI.widget.Hidden = function(input) {
  SUI.widget.Hidden.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.widget.Hidden, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Hidden.prototype._init = function() {
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
SUI.widget.Hidden.prototype.render = function() {

};

/**
 * @override
 */
SUI.widget.Hidden.prototype.refresh = function() {

};
