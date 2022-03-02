import { BaseWidget } from "../component/baseWidget";
import { Popup } from "../component/popup";
import { Date } from "../component/date";
import { Item } from "../core/item";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {DateTime}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const DateTime = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
DateTime.prototype = Object.create(BaseWidget.prototype);
DateTime.prototype.constructor = DateTime;

/**
 * @private
 * @return {undefined}
 */
DateTime.prototype._init = function() {
  this.inputBlock.addClass('datetime-widget');
  this.input.addClass('hidden');

  this.datetimeContainer = new Item('div');
  this.datetimeContainer.addClass('datetime-container');
  this.input.insertAfter(this.datetimeContainer);

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
DateTime.prototype._initInput = function() {
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
DateTime.prototype.render = function() {
  if (this.label && this.label.exists()) {
    this.label.addClass('widget-label');
  }

  const iconNode = new Item('a');
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
DateTime.prototype.refresh = function() {
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
DateTime.prototype.setValue = function(value) {
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
DateTime.prototype._setTag = function(value) {
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
DateTime.prototype._onClick = function() {
  if (this.isEnabled()) {
    this.datetimeInput.addClass('active');
    this.popup.toggle();
  }
};
