goog.provide('SUI.widget.Radiobutton');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Radiobutton}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Radiobutton = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Radiobutton, SUI.Widget);

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Radiobutton.prototype._init = function() {

  this.label.addEventListener('click', () => {
    let value = this.input.getAttribute('value');
    this.modelChange(value);
    this.checkValidity();
  });
};

/**
 * @override
 * @returns {undefined}
 */
SUI.widget.Radiobutton.prototype.render = function() {
  this.label.addClass(['mdl-radio', 'mdl-js-radio', 'mdl-js-ripple-effect']);
  let id = this.input.getId();
  this.label.setAttribute('for', id);

  let labelText = this.label.getHtml(true);

  this.spanLabel = new SUI.Node('span');
  this.spanLabel.addClass('mdl-radio__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-radio__button');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  SUI.mdl(this.label);
};


/**
 * @override
 * @param {!Function|boolean|number|string|null|undefined} value
 */
SUI.widget.Radiobutton.prototype.setValue = function(value) {
  if (this.getValue() === value) {
    this.input.getNode().checked = true;
    this.input.trigger('change');
  }
};
