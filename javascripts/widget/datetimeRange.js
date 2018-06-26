goog.provide('SUI.widget.DatetimeRange');

goog.require('SUI');
goog.require('SUI.Datetime');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.DatetimeRange}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 * @param {boolean} isStartInput
 */
SUI.widget.DatetimeRange = function(input, label, error, inputBlock, isStartInput) {
  SUI.Widget.call(this, input, label, error, inputBlock);

  this.isStartInput = isStartInput;
  this._init();
};
goog.inherits(SUI.widget.DatetimeRange, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype._init = function() {
  this.inputBlock.addClass('datetime-range-widget');
  this.input.addClass('hidden');

  this.datetimeInput = new SUI.Node('div');
  this.datetimeInput.addClass('datetime-range-input');
  this.datetimeInput.addEventListener('click', () => {
    this.datetimeInput.addClass('active');
    this.popup.open();
  });
  this.inputBlock.appendChild(this.datetimeInput);

  this._initInput();
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype._initInput = function() {
  this.format = this.input.getData('format');

  this.input.addEventListener('change', () => {
    let value = this.getValue().toString();
    this.modelChange(value);
    this.checkValidity();
  });

  let type = this.input.getAttribute('type');
  let value = /** @type {string} */ (this.getValue().toString());

  this.datetimeNode = new SUI.Node('div');
  this.datetime = new SUI.Datetime(this.datetimeNode, {
    value: value,
    type: type,
  });
  this.datetime.eventClick = (value) => {
    this.setValue(value);
  };

  this.popup = new SUI.Popup(this.datetimeNode, this.inputBlock);
  this.popup.eventClose = () => {
    this.datetimeInput.removeClass('active');
  };

  if (value) {
    let formattedValue = this.datetime.getValue();
    this._setTag(formattedValue);
  }
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype.render = function() {
  let iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons', 'size-24']);
  if (this.isStartInput) {
    iconNode.setHtml('remove');
  } else {
    iconNode.setHtml('date_range');
  }
  iconNode.addEventListener('click', () => {
    this.datetimeInput.addClass('active');
    this.popup.open();
  });
  this.datetimeInput.insertAfter(iconNode);

  this.refresh();
};

/**
 * @override
 */
SUI.widget.DatetimeRange.prototype.refresh = function() {
  this.datetime.draw();
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype.setValue = function(value) {
  this._setTag(/** @type {string} */(value));
  this.input.setAttribute('value', value);
  this.input.trigger('change');
};

/**
 * @private
 * @param {string} value
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype._setTag = function(value) {
  this.datetimeInput.removeChildren();
  if (value) {
    let formattedValue = window['moment'](value, this.datetime.getConfig().format)['format'](this.format);
    let tagNode = new SUI.Node('div');
    tagNode.addClass('tag');
    tagNode.setHtml(formattedValue);
    this.datetimeInput.appendChild(tagNode);

    let iconNode = new SUI.Node('i');
    iconNode.addClass(['material-icons', 'size-18']);
    iconNode.setHtml('close');
    iconNode.addEventListener('click', () => {
      this.setValue('');
    });
    tagNode.appendChild(iconNode);
  }
};
