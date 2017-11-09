goog.provide('SUI.FormWidget');

goog.require('SUI');
goog.require('SUI.Query');
goog.require('SUI.widget.Button');
goog.require('SUI.widget.Checkbox');
goog.require('SUI.widget.Color');
goog.require('SUI.widget.Datetime');
goog.require('SUI.widget.File');
goog.require('SUI.widget.Hidden');
goog.require('SUI.widget.IconToggle');
goog.require('SUI.widget.Radiobutton');
goog.require('SUI.widget.Range');
goog.require('SUI.widget.Reset');
goog.require('SUI.widget.Select');
goog.require('SUI.widget.Submit');
goog.require('SUI.widget.Switch');
goog.require('SUI.widget.Text');
goog.require('SUI.widget.Textarea');

/**
 * @constructor
 * @this {SUI.FormWidget}
 * @extends {SUI.Widget}
 * @param {!SUI.Node} inputBlock
 * @return {?SUI.Widget}
 */
SUI.FormWidget = function(inputBlock) {
  let input = inputBlock;
  let label = null;
  let error = null;

  let selectedIndex = false;
  let tagName = inputBlock.getTagName();
  let tagType = inputBlock.getAttribute('type');
  if (SUI.eq(tagName, 'input') && !SUI.inArray(['hidden', 'reset', 'submit', 'button'], tagType)) {
    inputBlock = /** @type {!SUI.Node}*/ (inputBlock.getParent());
    selectedIndex = 0;
  }
  tagName = inputBlock.getTagName();
  if (SUI.eq(tagName, 'div')) {
    let inputs = new SUI.Query('input, textarea, select', inputBlock).getItems();
    let index = selectedIndex !== false ? /** @type {number} */ (selectedIndex) : inputs.length - 1;
    input = inputs[index];

    label = new SUI.Query('label', inputBlock).getItem();

    error = inputBlock.createElement('span');
    error.addClass(['mdl-textfield__error', 'text-truncate']);
    inputBlock.appendChild(error);
    inputBlock.addClass('init-widget');
  }
  return this._getWidget(input, label, error, inputBlock);
};

/**
 * @param {!SUI.Node} input
 * @param {?SUI.Node} label
 * @param {?SUI.Node} error
 * @param {!SUI.Node} inputBlock
 * @return {?SUI.Widget}
 */
SUI.FormWidget.prototype._getWidget = function(input, label, error, inputBlock) {
  input.addClass('init-widget');
  let dataType = input.getData('type');
  let tagName = input.getTagName();
  let result = null;
  if (SUI.eq(tagName, 'textarea')) {
    result = new SUI.widget.Textarea(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
  }
  if (SUI.eq(tagName, 'select')) {
    result = new SUI.widget.Select(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
  } else if (SUI.eq(tagName, 'input') || SUI.eq(tagName, 'button')) {
    let type = input.get('type');
    switch (type) {
      case 'submit':
        result = new SUI.widget.Submit(input);
        break;
      case 'button':
        result = new SUI.widget.Button(input);
        break;
      case 'reset':
        result = new SUI.widget.Reset(input);
        break;
      case 'datetime':
      case 'datetime-local':
      case 'date':
      case 'time':
      case 'month':
      case 'week':
      case 'year':
        let inputs = new SUI.Query('input', inputBlock);
        if (inputs.size() === 2) {
          let handledInput = /** @type {!SUI.Node} */ (inputs.get(0));
          let isStartInput = true;
          if (handledInput.getAttribute('name') === input.getAttribute('name')) {
            handledInput = /** @type {!SUI.Node} */ (inputs.get(1));
            isStartInput = false;
          }
          result = new SUI.widget.DatetimeRange(handledInput, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock, isStartInput);
        } else {
          result = new SUI.widget.Datetime(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        }
        break;
      case 'file':
        result = new SUI.widget.File(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'checkbox':
        if (SUI.eq(dataType, 'switch')) {
          result = new SUI.widget.Switch(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        } else if (SUI.eq(dataType, 'icon-toggle')) {
          result = new SUI.widget.IconToggle(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        } else {
          result = new SUI.widget.Checkbox(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        }
        break;
      case 'radio':
        result = new SUI.widget.Radiobutton(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'range':
        result = new SUI.widget.Range(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'color':
        result = new SUI.widget.Color(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'hidden':
        result = new SUI.widget.Hidden(input);
        break;
      case 'number':
        result = new SUI.widget.Number(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'url':
        result = new SUI.widget.Url(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'search':
        result = new SUI.widget.Search(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
      case 'text':
        if (SUI.eq(dataType, 'location')) {
          result = new SUI.widget.Location(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        } else {
          result = new SUI.widget.Text(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        }
        break;
      default:
        result = new SUI.widget.Text(input, /** @type {!SUI.Node} */ (label), /** @type {!SUI.Node} */ (error), inputBlock);
        break;
    }
  }
  return result;
};
