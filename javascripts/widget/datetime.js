import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.DateTime');

goog.require('SUI');
goog.require('SUI.Date');
goog.require('SUI.Item');
goog.require('SUI.Popup');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.DateTime}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.DateTime = function(input, label, error, inputBlock) {
  SUI.DateTime.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.DateTime, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.DateTime.prototype._init = function() {
  this.inputBlock.addClass('datetime-widget');
  this.input.addClass('hidden');

  this.datetimeContainer = new SUI.Item('div');
  this.datetimeContainer.addClass('datetime-container');
  this.input.insertAfter(this.datetimeContainer);

  this.datetimeInput = new SUI.Item('div');
  this.datetimeInput.addClass('datetime-input');
  this.datetimeInput.addEventListener('click', this._onClick.bind(this));
  this.datetimeContainer.appendChild(this.datetimeInput);

  this._initInput();
};

/**
 * @private
 * @return {undefined}
 */
SUI.DateTime.prototype._initInput = function() {
  this.format = this.input.getData('format');

  this.input.addEventListener('change', () => {
    const value = this.getValue().toString();
    this.modelChange(value);
    return true;
  });

  const type = this.input.getAttribute('type');
  const value = /** @type {string} */ (this.getValue().toString());

  this.datetimeNode = new SUI.Item('div');
  this.datetime = new SUI.Date(this.datetimeNode, {
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
SUI.DateTime.prototype.render = function() {
  if (this.label && this.label.exists()) {
    this.label.addClass('widget-label');
  }

  const iconNode = new SUI.Item('a');
  iconNode.setAttribute('href', 'javascript:void(0)');
  iconNode.addClass(['material-icons', 'size-24', 'expander']);
  iconNode.setHtml('date_range');
  iconNode.addEventListener('click', this._onClick.bind(this));
  this.actionContainerNode.appendChild(iconNode);

  this.refresh();
  this.datetime.draw();
};

/**
 * @override
 */
SUI.DateTime.prototype.refresh = function() {
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
SUI.DateTime.prototype.setValue = function(value) {
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
SUI.DateTime.prototype._setTag = function(value) {
  this.datetimeInput.removeChildren();
  if (value) {
    const formattedValue = window['moment'](value, this.datetime.getConfig().format)['format'](this.format);
    const tagNode = new SUI.Item('div');
    tagNode.addClass('widget-tag');
    tagNode.setHtml(formattedValue);
    this.datetimeInput.appendChild(tagNode);

    if (this.isEnabled()) {
      const iconNode = new SUI.Item('a');
      iconNode.setAttribute('href', 'javascript:void(0)');
      iconNode.addClass(['material-icons', 'size-18', 'close']);
      iconNode.setHtml('close');
      iconNode.addEventListener('click', () => {
        this.setValue('');
      });
      tagNode.addClass('tag-with-action');
      tagNode.appendChild(iconNode);
    }
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.DateTime.prototype._onClick = function() {
  if (this.isEnabled()) {
    this.datetimeInput.addClass('active');
    this.popup.toggle();
  }
};
