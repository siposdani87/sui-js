goog.provide('SUI.Form');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.FormWidget');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.Widget');

/**
 * @constructor
 * @export
 * @this {SUI.Form}
 * @extends {SUI.Collection}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 */
SUI.Form = function(dom, opt_selector = 'form') {
  this.formNode = new SUI.Query(opt_selector, dom).getItem();
  this.formNode.setAttribute('novalidate');
  SUI.Form.base(this, 'constructor', [], SUI.FormWidget, {
    parent: this.formNode,
  });

  this._init();
};
goog.inherits(SUI.Form, SUI.Collection);

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._init = function() {
  this.previousModel = new SUI.Object();
  this.model = new SUI.Object();
  this.initWidgets = [];

  this.buttonClasses = ['input[type=submit]:not(.init-widget)', 'input[type=button]:not(.init-widget)', 'input[type=reset]:not(.init-widget)', 'button:not(.init-widget)'];
  this.widgetClasses = ['.input-block input:not([type="hidden"])+input:not([type="hidden"])', '.input-block:not(.init-widget)', 'form > input[type=hidden]:not(.init-widget)'];

  this._initWidgets();
  this._initFormEvent();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initFormEvent = function() {
  this.formNode.addEventListener('keydown', function(node, event) {
    const textArea = /textarea/i.test((event.target || event.srcElement).tagName);
    if (!(textArea || (event.keyCode || event.which || event.charCode || 0) !== 13)) {
      event.preventDefault();
    }
    return true;
  });

  this._initSubmitFormEvent();
  this._initResetFormEvent();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initSubmitFormEvent = function() {
  this.formNode.addEventListener('submit', (node, event) => {
    event.preventDefault();
    if (this.checkValidity(true)) {
      this.eventSubmit(this.model, node);
    }
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initResetFormEvent = function() {
  this.formNode.addEventListener('reset', (node, event) => {
    event.preventDefault();
    this.eventReset(this.model, node);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initWidgets = function() {
  const widgets = new SUI.Query(this.widgetClasses.concat(this.buttonClasses).join(', '), this.formNode).getItems();
  this.load(widgets);

  const updatedWidgets = [];
  const initWidgets = [];
  this.each((widget) => {
    const widgetName = widget.getName();
    if (SUI.inArray(this.initWidgets, widgetName)) {
      if (!SUI.inArray(updatedWidgets, widgetName)) {
        widget.refresh();
        widget.setValue(widget.getValue());
        updatedWidgets.push(widgetName);
      }
    } else {
      widget.modelChange = (value) => {
        this._widgetValueChange(widget, value);
      };
      widget.eventClick = (node) => {
        this.eventButton(this.model, node);
      };
      if (!SUI.inArray(updatedWidgets, widgetName)) {
        this._setValue(widgetName, widget.getValue());
        updatedWidgets.push(widgetName);
      }
      widget.render();
      if (!SUI.inArray(initWidgets, widgetName)) {
        initWidgets.push(widgetName);
      }
    }
  });
  this.initWidgets = this.initWidgets.concat(initWidgets);
};

/**
 * @param {!SUI.Object} model
 * @param {boolean=} opt_force
 * @param {boolean=} opt_showMessage
 * @return {undefined}
 */
SUI.Form.prototype.setModel = function(model, opt_force = true, opt_showMessage = false) {
  this.previousModel = this.model.copy();
  this.model.merge(model);
  this.each((widget) => {
    const name = widget.getName();
    const value = model.get(name);
    if (!SUI.isUndefined(value)) {
      widget.setValue(value);
      widget.checkValidity(opt_force, opt_showMessage);
    }
  });
};

/**
 * @return {!SUI.Object}
 */
SUI.Form.prototype.getModel = function() {
  return this.model;
};

/**
 * @param {boolean=} opt_force
 * @param {boolean=} opt_showMessage
 * @return {undefined}
 */
SUI.Form.prototype.reset = function(opt_force = true, opt_showMessage = false) {
  this.each((widget) => {
    widget.setValue();
    widget.checkValidity(opt_force, opt_showMessage);
  });
  this.previousModel = this.model.copy();
  this.model.clear();
};

/**
 * @private
 * @param {string} name
 * @param {*} value
 * @return {undefined}
 */
SUI.Form.prototype._setValue = function(name, value) {
  const currentValue = this._getValue(name);
  this.previousModel.set(name, currentValue);
  this.model.set(name, value);
};

/**
 * @private
 * @param {string} name
 * @return {*}
 */
SUI.Form.prototype._getValue = function(name) {
  return this.model.get(name);
};

/**
 * @private
 * @param {string} name
 * @return {*}
 */
SUI.Form.prototype._getPreviousValue = function(name) {
  return this.previousModel.get(name);
};

/**
 * @private
 * @param {!SUI.Widget} widget
 * @param {*} value
 * @return {undefined}
 */
SUI.Form.prototype._widgetValueChange = function(widget, value) {
  const widgetName = widget.getName();
  const previousValue = this._getPreviousValue(widgetName);
  this._setValue(widgetName, value);
  if (!SUI.isSame(value, previousValue)) {
    widget.eventChange(value, previousValue);
  }
};

/**
 * @param {!Object} data
 * @return {undefined}
 */
SUI.Form.prototype.setErrors = function(data) {
  const errors = new SUI.Object(data);
  this.each(function(widget) {
    const name = widget.getName();
    const error = errors.get(name, []);
    widget.setError(error.join(', '), true);
  });
};

/**
 * @param {boolean=} opt_force
 * @param {boolean=} opt_showMessage
 * @return {boolean}
 */
SUI.Form.prototype.checkValidity = function(opt_force = false, opt_showMessage = true) {
  this.each(function(widget) {
    widget.checkValidity(opt_force, opt_showMessage);
  });
  return this.formNode.getNode().checkValidity();
};

/**
 * @return {boolean}
 */
SUI.Form.prototype.isValid = function() {
  return this.checkValidity(true);
};

/**
 * @return {boolean}
 */
SUI.Form.prototype.isInvalid = function() {
  return !this.isValid();
};

/**
 * @return {undefined}
 */
SUI.Form.prototype.refresh = function() {
  this.deleteAllByCondition((widget) => {
    const exists = widget.exists();
    if (!exists) {
      const widgetName = widget.getName();
      this.model.remove(widgetName);
      SUI.remove(this.initWidgets, widgetName);
    }
    return !exists;
  });

  this._initWidgets();
};

/**
 * @param {string} value
 * @return {!SUI.Widget}
 */
SUI.Form.prototype.findByModel = function(value) {
  return this.findByCondition((item, i) => {
    const modelName = this.get(i, 'model');
    return modelName === value;
  });
};

/**
 * @param {!SUI.Object} model
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Form.prototype.eventSubmit = function(model, node) {
  console.warn('SUI.Form.eventSubmit()', model, node);
};

/**
 * @param {!SUI.Object} model
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Form.prototype.eventReset = function(model, node) {
  console.warn('SUI.Form.eventReset()', model, node);
};

/**
 * @param {!SUI.Object} model
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Form.prototype.eventButton = function(model, node) {
  console.warn('SUI.Form.eventButton()', model, node);
};

/**
 * @return {undefined}
 */
SUI.Form.prototype.lock = function() {
  this.each((widget) => {
    widget.disabled = widget.isDisabled();
  });
  this.each((widget) => {
    widget.setDisabled(true);
  });
};

/**
 * @return {undefined}
 */
SUI.Form.prototype.unlock = function() {
  this.each((widget) => {
    widget.setDisabled(widget.disabled);
  });
};
