goog.provide('SUI.widget.Search');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Search}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Search = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Search, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Search.prototype._init = function() {
  
  this.input.addEventListener('keyup', (input, event) => {
    var inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
    if (SUI.eq(event.keyCode, 13)) {
      this.eventEnter(inputNode.value);
    }
  });

  this.input.addEventListener('change', (input) => {
    var inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Search.prototype.render = function() {

  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--expandable']);
  this.input.addClass(['mdl-textfield__input']);

  this.label.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  var iconNode = new SUI.Node('i');
  iconNode.addClass('material-icons');
  iconNode.setHtml('search');
  this.label.insert(iconNode);

  var holderNode = new SUI.Node('div');
  holderNode.addClass('mdl-textfield__expandable-holder');
  holderNode.appendChild(this.input);
  this.inputBlock.appendChild(holderNode);

  var labelNode = new SUI.Node('label');
  labelNode.addClass('mdl-textfield__label');
  holderNode.appendChild(labelNode);

  SUI.mdl(this.inputBlock);
};

/**
 * @param {string} value
 * @return {undefined}
 */
SUI.widget.Search.prototype.eventEnter = function(value) {

};

