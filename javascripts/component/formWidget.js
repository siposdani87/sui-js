import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.FormWidget');

goog.requireType('SUI.Form');

goog.require('SUI');
goog.require('SUI.Query');
goog.require('SUI.Item');
goog.require('SUI.BaseWidget');
goog.require('SUI.Button');
goog.require('SUI.Checkbox');
goog.require('SUI.Color');
goog.require('SUI.DateTime');
goog.require('SUI.DateTimeRange');
goog.require('SUI.File');
goog.require('SUI.Hidden');
goog.require('SUI.IconToggle');
goog.require('SUI.Location');
goog.require('SUI.Number');
goog.require('SUI.Radiobutton');
goog.require('SUI.Range');
goog.require('SUI.Reset');
goog.require('SUI.Search');
goog.require('SUI.Select');
goog.require('SUI.Submit');
goog.require('SUI.Switch');
goog.require('SUI.Text');
goog.require('SUI.Textarea');
goog.require('SUI.Url');

/**
 * @constructor
 * @this {SUI.FormWidget}
 * @extends {SUI.BaseWidget}
 * @param {!SUI.Item} inputBlock
 * @param {!SUI.Form} form
 * @return {?SUI.BaseWidget}
 */
SUI.FormWidget = function(inputBlock, form) {
  let input = inputBlock;
  let label = null;
  let error = null;

  let selectedIndex = false;
  let tagName = inputBlock.getTagName();
  const tagType = inputBlock.getAttribute('type');
  if (SUI.eq(tagName, 'input') && !SUI.inArray(['hidden', 'reset', 'submit', 'button'], tagType)) {
    inputBlock = /** @type {!SUI.Item}*/ (inputBlock.getParentNode());
    selectedIndex = 0;
  }
  tagName = inputBlock.getTagName();
  if (SUI.eq(tagName, 'div')) {
    const inputs = new SUI.Query('input, textarea, select', inputBlock).getItems();
    const index = selectedIndex !== false ? /** @type {number} */ (selectedIndex) : inputs.length - 1;
    input = inputs[index];

    label = new SUI.Query('label', inputBlock).getItem();

    error = inputBlock.createElement('span');
    error.addClass(['mdl-textfield__error', 'text-truncate']);
    inputBlock.appendChild(error);
    inputBlock.addClass('init-widget');
  }
  return this._getWidget(input, label, error, inputBlock, form);
};

/**
 * @param {!SUI.Item} input
 * @param {?SUI.Item} label
 * @param {?SUI.Item} error
 * @param {!SUI.Item} inputBlock
 * @param {!SUI.Form} form
 * @return {?SUI.BaseWidget}
 */
SUI.FormWidget.prototype._getWidget = function(input, label, error, inputBlock, form) {
  input.addClass('init-widget');
  const dataType = input.getData('type');
  const tagName = input.getTagName();
  let result = null;
  if (SUI.eq(tagName, 'textarea')) {
    result = new SUI.Textarea(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
  }
  if (SUI.eq(tagName, 'select')) {
    result = new SUI.Select(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
  } else if (SUI.eq(tagName, 'input') || SUI.eq(tagName, 'button')) {
    const type = input.get('type');
    switch (type) {
      case 'submit':
        result = new SUI.Submit(input);
        break;
      case 'button':
        result = new SUI.Button(input);
        break;
      case 'reset':
        result = new SUI.Reset(input);
        break;
      case 'datetime':
      case 'datetime-local':
      case 'date':
      case 'time':
      case 'month':
      case 'week':
      case 'year':
        const inputs = new SUI.Query('input', inputBlock);
        if (inputs.size() === 2) {
          let handledInput = /** @type {!SUI.Item} */ (inputs.get(0));
          let isStartInput = true;
          if (handledInput.getAttribute('name') === input.getAttribute('name')) {
            handledInput = /** @type {!SUI.Item} */ (inputs.get(1));
            isStartInput = false;
          }
          result = new SUI.DateTimeRange(handledInput, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock, isStartInput);
        } else {
          result = new SUI.DateTime(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        }
        break;
      case 'file':
        result = new SUI.File(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
      case 'checkbox':
        if (SUI.eq(dataType, 'switch')) {
          result = new SUI.Switch(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        } else if (SUI.eq(dataType, 'icon-toggle')) {
          result = new SUI.IconToggle(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        } else {
          result = new SUI.Checkbox(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        }
        break;
      case 'radio':
        result = new SUI.Radiobutton(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock, form);
        break;
      case 'range':
        result = new SUI.Range(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
      case 'color':
        result = new SUI.Color(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
      case 'hidden':
        result = new SUI.Hidden(input);
        break;
      case 'number':
        result = new SUI.Number(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
      case 'url':
        result = new SUI.Url(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
      case 'search':
        result = new SUI.Search(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
      case 'text':
        if (SUI.eq(dataType, 'location')) {
          result = new SUI.Location(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        } else {
          result = new SUI.Text(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        }
        break;
      default:
        result = new SUI.Text(input, /** @type {!SUI.Item} */ (label), /** @type {!SUI.Item} */ (error), inputBlock);
        break;
    }
  }
  return result;
};
