import { isNull, generateId, format, mdl } from "../base";
import { Item } from "../core/item";
import { Query } from "../core/query";

/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @constructor
 * @this {Tooltip}
 * @param {!Item} element
 * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
 */
export const Tooltip = function(element, opt_position = 'TOP') {
  this.element = element;
  this.valid = false;
  this._initPositions(opt_position);
  this._init();
};

/**
 * @private
 * @param {string=} opt_position
 * @return {undefined}
 */
Tooltip.prototype._initPositions = function(opt_position = '') {
  this.positionCssClass = 'mdl-tooltip--top';
  switch (opt_position) {
    case 'TOP':
      this.positionCssClass = 'mdl-tooltip--top';
      break;
    case 'BOTTOM':
      this.positionCssClass = 'mdl-tooltip--bottom';
      break;
    case 'LEFT':
      this.positionCssClass = 'mdl-tooltip--left';
      break;
    case 'RIGHT':
      this.positionCssClass = 'mdl-tooltip--right';
      break;
  }
};

/**
 * @private
 * @return {undefined}
 */
Tooltip.prototype._init = function() {
  this._createTooltip();
};

/**
 * @param {string=} opt_message
 * @return {string}
 */
Tooltip.prototype._getMessage = function(opt_message = '') {
  if (!opt_message) {
    opt_message = /** @type {string} */ (this.element.getAttribute('desc')) || '';
    if (opt_message) {
      this.tooltip.addClass('mdl-tooltip--large');
    }
    opt_message = /** @type {string} */ (this.element.getAttribute('title')) || opt_message;
  }
  return opt_message;
};

/**
 * @private
 * @return {undefined}
 */
Tooltip.prototype._createTooltip = function() {
  let id = this.element.getId();
  if (isNull(id)) {
    id = generateId('tooltip');
    this.element.setId(id);
    this.element.addClass('has-tooltip');
  }
  const oldElement = new Query(format('[for="{0}"]', [id]), this.element).getItem();
  oldElement.remove();

  const cssClasses = ['mdl-tooltip', this.positionCssClass];
  this.tooltip = new Item('span');
  this.tooltip.addClass(cssClasses);
  this.tooltip.setFor(/** @type {string} */(id));
  this.valid = this.element.insertAfter(this.tooltip);
};

/**
 * @param {string=} opt_message
 * @return {undefined}
 */
Tooltip.prototype.render = function(opt_message) {
  const message = this._getMessage(opt_message);
  this.setMessage(message);
  this._handleAttributes();
};

/**
 * @private
 * @return {undefined}
 */
Tooltip.prototype._handleAttributes = function() {
  if (this.valid) {
    this.element.removeAttribute('desc');
    this.element.removeAttribute('title');
    mdl(this.tooltip);
  }
};

/**
 * @param {string=} opt_message
 * @return {undefined}
 */
Tooltip.prototype.setMessage = function(opt_message = '') {
  if (opt_message) {
    this.tooltip.removeStyle(['display']);
    this.tooltip.setHtml(/** @type {string} */(opt_message));
  } else {
    this.tooltip.setStyle({
      'display': 'none',
    });
    this.tooltip.setHtml('');
  }
};

/**
 * @return {undefined}
 */
Tooltip.prototype.open = function() {
  this.tooltip.addClass('is-active');
};

/**
 * @return {undefined}
 */
Tooltip.prototype.close = function() {
  this.tooltip.removeClass('is-active');
};

/**
 * @return {boolean}
 */
Tooltip.prototype.isOpen = function() {
  return this.tooltip.hasClass('is-active');
};

/**
 * @return {undefined}
 */
Tooltip.prototype.toggle = function() {
  if (this.isOpen()) {
    this.close();
  } else {
    this.open();
  }
};
