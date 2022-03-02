import { consoleWarn, inArray, isSame, isUndefined, remove } from "../base";
import { Collection } from "../core/collection";
import { Objekt } from "../core/objekt";
import { Query } from "../core/query";
import { FormWidget } from "./formWidget";

/**
 * @constructor
 * @export
 * @this {Form}
 * @extends {Collection}
 * @param {!Item} dom
 * @param {string=} opt_selector
 */
export const Form = function(dom, opt_selector = 'form') {
  this.formNode = new Query(opt_selector, dom).getItem();
  this.formNode.setAttribute('novalidate');
  Collection.call(this, [], FormWidget, {
    parent: this.formNode,
  });

  this._init();
};
Form.prototype = Object.create(Collection.prototype);
Form.prototype.constructor = Form;

/**
 * @private
 * @return {undefined}
 */
Form.prototype._init = function() {
  this.previousModel = new Objekt();
  this.model = new Objekt();
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
Form.prototype._initFormEvent = function() {
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
Form.prototype._initSubmitFormEvent = function() {
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
Form.prototype._initResetFormEvent = function() {
  this.formNode.addEventListener('reset', (node, event) => {
    event.preventDefault();
    this.eventReset(this.model, node);
  });
};

/**
 * @private
 * @return {undefined}
 */
Form.prototype._initWidgets = function() {
  const widgets = new Query(this.widgetClasses.concat(this.buttonClasses).join(', '), this.formNode).getItems();
  this.load(widgets);

  const updatedWidgets = [];
  const initWidgets = [];
  this.each((widget) => {
    const widgetName = widget.getName();
    if (inArray(this.initWidgets, widgetName)) {
      if (!inArray(updatedWidgets, widgetName)) {
        widget.refresh();
        widget.setValue(widget.getValue());
        updatedWidgets.push(widgetName);
      }
    } else {
      widget.modelChange = (value) => {
        this._widgetValueChange(widget, value);
      };
      widget.getPreviousValue = () => {
        this._getPreviousValue(widget);
      };
      widget.eventClick = (node) => {
        this.eventButton(this.model, node);
      };
      if (!inArray(updatedWidgets, widgetName)) {
        this._setValue(widgetName, widget.getValue());
        updatedWidgets.push(widgetName);
      }
      widget.render();
      if (!inArray(initWidgets, widgetName)) {
        initWidgets.push(widgetName);
      }
    }
  });
  this.initWidgets = this.initWidgets.concat(initWidgets);
};

/**
 * @param {!Objekt} model
 * @param {boolean=} opt_force
 * @param {boolean=} opt_showMessage
 * @return {undefined}
 */
Form.prototype.setModel = function(model, opt_force = true, opt_showMessage = false) {
  this.previousModel = this.model.copy();
  this.model.merge(model);
  this.each((widget) => {
    const name = widget.getName();
    const value = this.model.get(name);
    if (!isUndefined(value)) {
      widget.setValue(value);
      widget.checkValidity(opt_force, opt_showMessage);
    }
  });
};

/**
 * @return {!Objekt}
 */
Form.prototype.getModel = function() {
  return this.model;
};

/**
 * @param {boolean=} opt_force
 * @param {boolean=} opt_showMessage
 * @return {undefined}
 */
Form.prototype.reset = function(opt_force = true, opt_showMessage = false) {
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
Form.prototype._setValue = function(name, value) {
  const currentValue = this._getValue(name);
  if (!isSame(value, currentValue)) {
    this.previousModel.set(name, currentValue);
    this.model.set(name, value);
  }
};

/**
 * @private
 * @param {string} name
 * @return {*}
 */
Form.prototype._getValue = function(name) {
  return this.model.get(name);
};

/**
 * @private
 * @param {!BaseWidget} widget
 * @return {*}
 */
Form.prototype._getPreviousValue = function(widget) {
  const widgetName = widget.getName();
  return this.previousModel.get(widgetName);
};

/**
 * @private
 * @param {!BaseWidget} widget
 * @param {*} value
 * @return {undefined}
 */
Form.prototype._widgetValueChange = function(widget, value) {
  const widgetName = widget.getName();
  const currentValue = this._getValue(widgetName);
  if (!isSame(value, currentValue)) {
    this._setValue(widgetName, value);
    widget.eventChange(value, currentValue);
  }
  this.checkValidity(true, false);
};

/**
 * @param {!Object} data
 * @return {undefined}
 */
Form.prototype.setErrors = function(data) {
  const errors = new Objekt(data);
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
Form.prototype.checkValidity = function(opt_force = false, opt_showMessage = true) {
  this.each(function(widget) {
    widget.checkValidity(opt_force, opt_showMessage);
  });
  return this.formNode.getNode().checkValidity();
};

/**
 * @return {boolean}
 */
Form.prototype.isValid = function() {
  return this.checkValidity(true);
};

/**
 * @return {boolean}
 */
Form.prototype.isInvalid = function() {
  return !this.isValid();
};

/**
 * @return {undefined}
 */
Form.prototype.refresh = function() {
  this.deleteAllByCondition((widget) => {
    const exists = widget.exists();
    if (!exists) {
      const widgetName = widget.getName();
      this.model.remove(widgetName);
      remove(this.initWidgets, widgetName);
    }
    return !exists;
  });

  this._initWidgets();
};

/**
 * @param {string} value
 * @return {!BaseWidget}
 */
Form.prototype.findByModel = function(value) {
  return this.findByCondition((item, i) => {
    const modelName = this.get(i, 'model');
    return modelName === value;
  });
};

/**
 * @param {!Objekt} model
 * @param {!Item} node
 * @return {undefined}
 */
Form.prototype.eventSubmit = function(model, node) {
  consoleWarn('Form.eventSubmit()', model, node);
};

/**
 * @param {!Objekt} model
 * @param {!Item} node
 * @return {undefined}
 */
Form.prototype.eventReset = function(model, node) {
  consoleWarn('Form.eventReset()', model, node);
};

/**
 * @param {!Objekt} model
 * @param {!Item} node
 * @return {undefined}
 */
Form.prototype.eventButton = function(model, node) {
  consoleWarn('Form.eventButton()', model, node);
};

/**
 * @return {undefined}
 */
Form.prototype.lock = function() {
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
Form.prototype.unlock = function() {
  this.each((widget) => {
    widget.setDisabled(widget.disabled);
  });
};
