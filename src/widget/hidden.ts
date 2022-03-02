import { BaseWidget } from "../component/baseWidget";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Hidden}
 * @param {!Item} input
 */
export const Hidden = function(input) {
  BaseWidget.call(this, input);
  this._init();
};
Hidden.prototype = Object.create(BaseWidget.prototype);
Hidden.prototype.constructor = Hidden;

/**
 * @private
 * @return {undefined}
 */
Hidden.prototype._init = function() {
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
Hidden.prototype.render = function() {

};

/**
 * @override
 */
Hidden.prototype.refresh = function() {

};
