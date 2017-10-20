goog.provide('SUI.widget.Datetime');

goog.require('SUI');
goog.require('SUI.Datetime');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Datetime}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Datetime = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Datetime, SUI.Widget);


/**
 * @private
 * @return {undefined}
 */
SUI.widget.Datetime.prototype._init = function() {

  this.inputBlock.addClass('datetime-widget');
  this.input.addClass('hidden');

  this.datetimeInput = new SUI.Node('div');
  this.datetimeInput.addClass('datetime-input');
  this.datetimeInput.addEventListener('click', function() {
    this.popup.open();
  }.bind(this));
  this.inputBlock.appendChild(this.datetimeInput);

  this._initInput();
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Datetime.prototype._initInput = function() {
  this.format = this.input.getData('format');

  this.input.addEventListener('change', () => {
    var value = this.getValue().toString();
    this.modelChange(value);
    this.checkValidity();
  });

  this.datetimeNode = new SUI.Node('div');

  var type = this.input.getAttribute('type');
  var value = /** @type {string} */ (this.getValue().toString());

  this.datetime = new SUI.Datetime(this.datetimeNode, {
    value: value,
    type: type
  });
  this.datetime.eventClick = function(value) {
    this.setValue(value);
  }.bind(this);

  this.popup = new SUI.Popup(this.datetimeNode, this.inputBlock);

  if (value) {
    var formattedValue = this.datetime.getValue();
    this._setTag(formattedValue);
  }
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Datetime.prototype.render = function() {
  this.datetime.draw();

  var iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons', 'size-24']);
  iconNode.setHtml('date_range');
  iconNode.addEventListener('click', function() {
    this.popup.open();
  }.bind(this));
  this.datetimeInput.insertAfter(iconNode);
};

/**
 * @override
 * @param {!Function|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Datetime.prototype.setValue = function(value) {
  this._setTag(/** @type {string} */ (value));
  this.input.setAttribute('value', value);
  this.input.trigger('change');
};

/**
 * @private
 * @param {string} value
 * @return {undefined}
 */
SUI.widget.Datetime.prototype._setTag = function(value) {
  this.datetimeInput.removeChildren();
  if (value) {
    var formattedValue = window['moment'](value, this.datetime.getConfig().format)['format'](this.format);
    var tagNode = new SUI.Node('div');
    tagNode.addClass('tag');
    tagNode.setHtml(formattedValue);
    this.datetimeInput.appendChild(tagNode);

    var iconNode = new SUI.Node('i');
    iconNode.addClass(['material-icons', 'size-18']);
    iconNode.setHtml('close');
    iconNode.addEventListener('click', () => {
      this.setValue('');
    });
    tagNode.appendChild(iconNode);
  }
};
