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
  this.datetimeInput.addClass('datetime-input');
  this.datetimeInput.addEventListener('click', this._onClick.bind(this));
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
    const value = this.getValue().toString();
    this.modelChange(value);
    this.checkValidity();
  });

  const type = this.input.getAttribute('type');
  const value = /** @type {string} */ (this.getValue().toString());

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
    const formattedValue = this.datetime.getValue();
    this._setTag(formattedValue);
  }
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype.render = function() {
  if (this.label && this.label.exists()) {
    this.label.addClass('widget-label');
  }

  const iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons', 'size-24', 'expander']);
  if (this.isStartInput) {
    iconNode.setHtml('remove');
  } else {
    iconNode.setHtml('date_range');
  }
  iconNode.addEventListener('click', this._onClick.bind(this));
  this.datetimeInput.insertAfter(iconNode);

  this.refresh();
  this.datetime.draw();
};

/**
 * @override
 */
SUI.widget.DatetimeRange.prototype.refresh = function() {
  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  } else {
    this.inputBlock.removeClass('is-disabled');
  }
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
  this.datetime.setValue(value);
};

/**
 * @private
 * @param {string} value
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype._setTag = function(value) {
  this.datetimeInput.removeChildren();
  if (value) {
    const formattedValue = window['moment'](value, this.datetime.getConfig().format)['format'](this.format);
    const tagNode = new SUI.Node('div');
    tagNode.addClass('tag');
    tagNode.setHtml(formattedValue);
    this.datetimeInput.appendChild(tagNode);

    if (this.isEnabled()) {
      const iconNode = new SUI.Node('i');
      iconNode.addClass(['material-icons', 'size-18']);
      iconNode.setHtml('close');
      iconNode.addEventListener('click', () => {
        this.setValue('');
      });
      tagNode.appendChild(iconNode);
    }
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.DatetimeRange.prototype._onClick = function() {
  if (this.isEnabled()) {
    this.datetimeInput.addClass('active');
    this.popup.toggle();
  }
};
