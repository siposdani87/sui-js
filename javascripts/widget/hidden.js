goog.provide('SUI.widget.Hidden');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Hidden}
 * @param {!SUI.Node} input
 */
SUI.widget.Hidden = function(input) {
  SUI.Widget.call(this, input);
  this._init();
};
goog.inherits(SUI.widget.Hidden, SUI.Widget);

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Hidden.prototype._init = function() {

  this.input.addEventListener('change', function(input) {
    var inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
  }.bind(this));
};

/**
 * @override
 * @returns {undefined}
 */
SUI.widget.Hidden.prototype.render = function() {

};

