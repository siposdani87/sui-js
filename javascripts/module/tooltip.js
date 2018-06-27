goog.provide('SUI.Tooltip');

goog.require('SUI');

/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @constructor
 * @this {SUI.Tooltip}
 * @param {!SUI.Node} element
 * @param {string=} opt_message
 * @param {string=} opt_position TOP|BOTTOM|LEFT|RIGHT
 */
SUI.Tooltip = function(element, opt_message = '', opt_position = 'TOP') {
  this.element = element;
  this._initOptions(opt_position);
  this._init(opt_message);
};

/**
 * @private
 * @param {string=} opt_position
 * @return {undefined}
 */
SUI.Tooltip.prototype._initOptions = function(opt_position = '') {
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
 * @param {string=} opt_message
 * @return {undefined}
 */
SUI.Tooltip.prototype._init = function(opt_message = '') {
  this._createTooltip();
  let message = this._getMessage(opt_message);
  this._render(message);
};

/**
 * @param {string=} opt_message
 * @return {string}
 */
SUI.Tooltip.prototype._getMessage = function(opt_message = '') {
  if (!opt_message) {
    opt_message = this.element.getAttribute('desc') || '';
    this.element.removeAttribute('desc');
    if (opt_message) {
      this.tooltip.addClass('mdl-tooltip--large');
    }
    opt_message = this.element.getAttribute('title') || opt_message;
    this.element.removeAttribute('title');
  }
  return opt_message;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Tooltip.prototype._createTooltip = function() {
  let id = this.element.getId();
  if (SUI.isNull(id)) {
    id = SUI.generateId('tooltip');
    this.element.setId(id);
  }
  let oldElement = new SUI.Query(SUI.format('[for="{0}"]', [id]), this.element).getItem();
  oldElement.remove();

  let cssClasses = ['mdl-tooltip', this.positionCssClass];
  this.tooltip = new SUI.Node('span');
  this.tooltip.addClass(cssClasses);
  this.tooltip.setFor(/** @type {string} */(id));
  this.element.insertAfter(this.tooltip);
};

/**
 * @private
 * @param {string} message
 * @return {undefined}
 */
SUI.Tooltip.prototype._render = function(message) {
  this.setMessage(message);
  SUI.mdl(this.tooltip);
};

/**
 * @param {string=} opt_message
 * @return {undefined}
 */
SUI.Tooltip.prototype.setMessage = function(opt_message = '') {
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
SUI.Tooltip.prototype.open = function() {
  this.tooltip.addClass('is-active');
};

/**
 * @return {undefined}
 */
SUI.Tooltip.prototype.close = function() {
  this.tooltip.removeClass('is-active');
};

/**
 * @return {boolean}
 */
SUI.Tooltip.prototype.isOpen = function() {
  return this.tooltip.hasClass('is-active');
};

/**
 * @return {undefined}
 */
SUI.Tooltip.prototype.toggle = function() {
  if (this.isOpen()) {
    this.close();
  } else {
    this.open();
  }
};
