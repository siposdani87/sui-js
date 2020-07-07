goog.provide('SUI.widget.Search');

goog.require('SUI');
goog.require('SUI.Node');
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
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
    if (SUI.eq(event.keyCode, 13)) {
      this.eventEnter(inputNode.value);
    }
    return true;
  });

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
SUI.widget.Search.prototype.render = function() {
  this.inputBlock.addClass(['search-widget', 'mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--expandable']);
  this.input.addClass(['mdl-textfield__input']);

  this.label.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  const iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons', 'search-button']);
  iconNode.setHtml('search');
  this.label.insert(iconNode);

  this.holderNode = new SUI.Node('div');
  this.holderNode.addClass('mdl-textfield__expandable-holder');
  this.holderNode.appendChild(this.input);
  this.inputBlock.appendChild(this.holderNode);

  const labelNode = new SUI.Node('label');
  labelNode.addClass('mdl-textfield__label');
  this.holderNode.appendChild(labelNode);

  this._initClearButton();
  this.refresh();
};

/**
 * @override
 */
SUI.widget.Search.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Search.prototype._initClearButton = function() {
  const clearButton = new SUI.Node('a');
  clearButton.setAttribute('href', 'javascript:void(0)');
  clearButton.addClass(['material-icons', 'clear-button']);
  clearButton.setHtml('clear');
  clearButton.addEventListener('click', () => {
    if (this.isEnabled()) {
      this.inputBlock.removeClass(['is-dirty', 'is-focused']);
      this.setValue('');
      this.eventEnter('');
    }
  });
  this.holderNode.appendChild(clearButton);
};

/**
 * @param {string} value
 * @return {undefined}
 */
SUI.widget.Search.prototype.eventEnter = function(value) {

};
