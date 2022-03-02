import { BaseWidget } from "../component/baseWidget";
import { Popup } from "../component/popup";
import { Date } from "../component/date";
import { Item } from "../core/item";
import { Query } from "../core/query";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {DateTimeRange}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 * @param {boolean} isStartInput
 */
export const DateTimeRange = function(input, label, error, inputBlock, isStartInput) {
  BaseWidget.call(this, input, label, error, inputBlock);

  this.isStartInput = isStartInput;
  this._init();
};
DateTimeRange.prototype = Object.create(BaseWidget.prototype);
DateTimeRange.prototype.constructor = DateTimeRange;

/**
 * @private
 * @return {undefined}
 */
DateTimeRange.prototype._init = function() {
  this.inputBlock.addClass('datetime-range-widget');
  this.input.addClass('hidden');

  this.datetimeContainer = new Query('.datetime-container', this.inputBlock).getItem();
  if (this.isStartInput) {
    this.datetimeContainer = new Item('div');
    this.datetimeContainer.addClass('datetime-container');
    this.input.insertAfter(this.datetimeContainer);
  }

  this.datetimeInput = new Item('div');
  this.datetimeInput.addClass('datetime-input');
  this.datetimeInput.addEventListener('click', this._onClick.bind(this));
  this.datetimeContainer.appendChild(this.datetimeInput);

  this._initInput();
};

/**
 * @private
 * @return {undefined}
 */
DateTimeRange.prototype._initInput = function() {
  this.format = this.input.getData('format');

  this.input.addEventListener('change', () => {
    const value = this.getValue().toString();
    this.modelChange(value);
    return true;
  });

  const type = this.input.getAttribute('type');
  const value = /** @type {string} */ (this.getValue().toString());

  this.datetimeNode = new Item('div');
  this.datetime = new Date(this.datetimeNode, {
    value: value,
    type: type,
  });
  this.datetime.eventClick = (value) => {
    this.setValue(value);
  };

  this.popup = new Popup(this.datetimeNode, this.inputBlock);
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
DateTimeRange.prototype.render = function() {
  if (this.label && this.label.exists()) {
    this.label.addClass('widget-label');
  }

  const iconNode = new Item('a');
  iconNode.setAttribute('href', 'javascript:void(0)');
  iconNode.addClass(['material-icons', 'size-24', 'expander']);
  if (this.isStartInput) {
    iconNode.setHtml('remove');
    this.datetimeInput.insertAfter(iconNode);
  } else {
    iconNode.setHtml('date_range');
    this.actionContainerNode.appendChild(iconNode);
  }
  iconNode.addEventListener('click', this._onClick.bind(this));

  this.refresh();
  this.datetime.draw();
};

/**
 * @override
 */
DateTimeRange.prototype.refresh = function() {
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
DateTimeRange.prototype.setValue = function(value) {
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
DateTimeRange.prototype._setTag = function(value) {
  this.datetimeInput.removeChildren();
  if (value) {
    const formattedValue = window['moment'](value, this.datetime.getConfig().format)['format'](this.format);
    const tagNode = new Item('div');
    tagNode.addClass('widget-tag');
    tagNode.setHtml(formattedValue);
    this.datetimeInput.appendChild(tagNode);

    if (this.isEnabled()) {
      const iconNode = new Item('a');
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
DateTimeRange.prototype._onClick = function() {
  if (this.isEnabled()) {
    this.datetimeInput.addClass('active');
    this.popup.toggle();
  }
};
