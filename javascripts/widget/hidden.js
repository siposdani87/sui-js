goog.provide('SUI.widget.Hidden');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Hidden}
 * @param {!SUI.Node} input
 */
SUI.widget.Hidden = function(input) {
  SUI.widget.Hidden.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.widget.Hidden, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Hidden.prototype._init = function() {
  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
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
