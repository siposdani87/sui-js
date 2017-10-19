goog.provide('SUI.Tooltip');

goog.require('SUI');

/**
 * https://www.getmdl.io/components/index.html#tooltips-section
 * @constructor
 * @this {SUI.Tooltip}
 * @param {!SUI.Node} element
 * @param {string=} opt_message
 */
SUI.Tooltip = function(element, opt_message = '') {
  this.element = element;
  this._init(opt_message);
};

/**
 * @private
 * @param {string=} opt_message
 * @returns {undefined}
 */
SUI.Tooltip.prototype._init = function(opt_message = ''){
  this._createTooltip();
  var message = this._getMessage(opt_message);
  this._render(message);
};

/**
 * @param {string=} opt_message
 * @returns {string}
 */
SUI.Tooltip.prototype._getMessage = function(opt_message = ''){
  if (!opt_message) {
    opt_message = this.element.getAttribute('desc') || '';
    this.element.removeAttribute('desc');
    if (opt_message){
      this.tooltip.addClass('mdl-tooltip--large');
    }
    opt_message = this.element.getAttribute('title') || opt_message;
    this.element.removeAttribute('title');
  }
  return opt_message;
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Tooltip.prototype._createTooltip = function(){
  var id = this.element.getId();
  if (SUI.isNull(id)){
    id = SUI.generateId('tooltip');
    this.element.setId(id);
  }

  this.tooltip = new SUI.Node('span');
  this.tooltip.addClass(['mdl-tooltip', 'mdl-tooltip--top']);
  this.tooltip.setFor(/** @type {string} */ (id));
  this.element.insertAfter(this.tooltip);
};

/**
 * @private
 * @param {string} message
 * @returns {undefined}
 */
SUI.Tooltip.prototype._render = function(message){
  this.setMessage(message);
  SUI.mdl(this.tooltip);
};

/**
 * @param {string=} opt_message
 * @returns {undefined}
 */
SUI.Tooltip.prototype.setMessage = function(opt_message = ''){
  if (opt_message){
    this.tooltip.removeStyle(['display']);
    this.tooltip.setHtml(/** @type {string} */ (opt_message));
  }
  else {
    this.tooltip.setStyle({
      'display': 'none'
    });
    this.tooltip.setHtml('');
  }
};
