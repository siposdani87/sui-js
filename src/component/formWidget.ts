import { eq, inArray } from "../base";
import { Query } from "../core/query";
import { Button } from "../widget/button";
import { Checkbox } from "../widget/checkbox";
import { Color } from "../widget/color";
import { DateTime } from "../widget/dateTime";
import { DateTimeRange } from "../widget/dateTimeRange";
import { Hidden } from "../widget/hidden";
import { IconToggle } from "../widget/iconToggle";
import { Radiobutton } from "../widget/radiobutton";
import { Reset } from "../widget/reset";
import { Search } from "../widget/search";
import { Select } from "../widget/select";
import { Submit } from "../widget/submit";
import { Switch } from "../widget/switch";
import { Textarea } from "../widget/textarea";
import { Url } from "../widget/url";
import { File } from "../widget/file";
import { Range } from "../widget/range";
import { Number } from "../widget/number";
import { Location } from "../widget/location";
import { Text } from "../widget/text";

/**
 * @constructor
 * @this {FormWidget}
 * @extends {BaseWidget}
 * @param {!Item} inputBlock
 * @param {!Form} form
 * @return {?BaseWidget}
 */
export const FormWidget = function(inputBlock, form) {
  let input = inputBlock;
  let label = null;
  let error = null;

  let selectedIndex = null;
  let tagName = inputBlock.getTagName();
  const tagType = inputBlock.getAttribute('type');
  if (eq(tagName, 'input') && !inArray(['hidden', 'reset', 'submit', 'button'], tagType)) {
    inputBlock = /** @type {!Item}*/ (inputBlock.getParentNode());
    selectedIndex = 0;
  }
  tagName = inputBlock.getTagName();
  if (eq(tagName, 'div')) {
    const inputs = new Query('input, textarea, select', inputBlock).getItems();
    const index = selectedIndex !== null ? /** @type {number} */ (selectedIndex) : inputs.length - 1;
    input = inputs[index];

    label = new Query('label', inputBlock).getItem();

    error = inputBlock.createElement('span');
    error.addClass(['mdl-textfield__error', 'text-truncate']);
    inputBlock.appendChild(error);
    inputBlock.addClass('init-widget');
  }
  return this._getWidget(input, label, error, inputBlock, form);
};

/**
 * @param {!Item} input
 * @param {?Item} label
 * @param {?Item} error
 * @param {!Item} inputBlock
 * @param {!Form} form
 * @return {?BaseWidget}
 */
FormWidget.prototype._getWidget = function(input, label, error, inputBlock, form) {
  input.addClass('init-widget');
  const dataType = input.getData('type');
  const tagName = input.getTagName();
  let result = null;
  if (eq(tagName, 'textarea')) {
    result = new Textarea(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
  }
  if (eq(tagName, 'select')) {
    result = new Select(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
  } else if (eq(tagName, 'input') || eq(tagName, 'button')) {
    const type = input.get('type');
    switch (type) {
      case 'submit':
        result = new Submit(input);
        break;
      case 'button':
        result = new Button(input);
        break;
      case 'reset':
        result = new Reset(input);
        break;
      case 'datetime':
      case 'datetime-local':
      case 'date':
      case 'time':
      case 'month':
      case 'week':
      case 'year':
        const inputs = new Query('input', inputBlock);
        if (inputs.size() === 2) {
          let handledInput = /** @type {!Item} */ (inputs.get(0));
          let isStartInput = true;
          if (handledInput.getAttribute('name') === input.getAttribute('name')) {
            handledInput = /** @type {!Item} */ (inputs.get(1));
            isStartInput = false;
          }
          result = new DateTimeRange(handledInput, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock, isStartInput);
        } else {
          result = new DateTime(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        }
        break;
      case 'file':
        result = new File(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
      case 'checkbox':
        if (eq(dataType, 'switch')) {
          result = new Switch(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        } else if (eq(dataType, 'icon-toggle')) {
          result = new IconToggle(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        } else {
          result = new Checkbox(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        }
        break;
      case 'radio':
        result = new Radiobutton(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock, form);
        break;
      case 'range':
        result = new Range(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
      case 'color':
        result = new Color(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
      case 'hidden':
        result = new Hidden(input);
        break;
      case 'number':
        result = new Number(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
      case 'url':
        result = new Url(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
      case 'search':
        result = new Search(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
      case 'text':
        if (eq(dataType, 'location')) {
          result = new Location(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        } else {
          result = new Text(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        }
        break;
      default:
        result = new Text(input, /** @type {!Item} */ (label), /** @type {!Item} */ (error), inputBlock);
        break;
    }
  }
  return result;
};
