goog.provide('SUI.Form');

goog.require('SUI');
goog.require('SUI.FormWidget');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Form}
 * @extends {SUI.Collection}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 */
SUI.Form = function(dom, opt_selector = 'form') {
  this.formNode = new SUI.Query(opt_selector, dom).getItem();
  this.formNode.setAttribute('novalidate');

  let options = {};
  SUI.Collection.call(this, [], SUI.FormWidget, options);

  this._init();
};
goog.inherits(SUI.Form, SUI.Collection);

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._init = function() {
  this.model = new SUI.Object();
  this.initWidgets = [];

  this.buttonClasses = ['input[type=submit]:not(.init-widget)', 'input[type=reset]:not(.init-widget)', 'button:not(.init-widget)'];
  this.widgetClasses = ['.input-block input:not([type="hidden"])+input:not([type="hidden"])', '.input-block:not(.init-widget)', 'input[type=hidden]:not(.init-widget)'];

  this._initWidgets();
  this._initFormEvent();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initFormEvent = function() {
  this.formNode.addEventListener('keydown', function(node, event) {
    let textArea = /textarea/i.test((event.target || event.srcElement).tagName);
    if (!(textArea || (event.keyCode || event.which || event.charCode || 0) !== 13)) {
      event.preventDefault();
    }
  });

  this._initSubmitFormEvent();
  this._initResetFormEvent();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initSubmitFormEvent = function() {
  this.formNode.addEventListener('submit', function(node, event) {
    event.preventDefault();
    if (this.checkValidity(true)) {
      this.eventSubmit(this.model, node);
    }
  }.bind(this));
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initResetFormEvent = function() {
  this.formNode.addEventListener('reset', function(node, event) {
    event.preventDefault();
    this.eventReset(this.model, node);
  }.bind(this));
};

/**
 * @private
 * @return {undefined}
 */
SUI.Form.prototype._initWidgets = function() {
  let widgets = new SUI.Query(this.widgetClasses.concat(this.buttonClasses).join(', '), this.formNode).getItems();
  this.load(widgets);

  let updatedWidgets = [];
  let initWidgets = [];
  this.each((widget) => {
    let widgetName = widget.getName();
    if (SUI.inArray(this.initWidgets, widgetName)) {
      if (!SUI.inArray(updatedWidgets, widgetName)) {
        widget.setValue(widget.getValue());
        updatedWidgets.push(widgetName);
      }
    } else {
      widget.modelChange = (value) => {
        widget.eventChange(value);
        this._setValue(widgetName, value);
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
 * @return {undefined}
 */
SUI.Form.prototype.setModel = function(model) {
  this.each((widget) => {
    let name = widget.getName();
    let value = model.get(name);
    if (!SUI.isUndefined(value)) {
      widget.setValue(value);
      widget.checkValidity(true);
    }
  });
  this.model.merge(model);
};

/**
 * @private
 * @param {string} name
 * @param {*} value
 * @return {undefined}
 */
SUI.Form.prototype._setValue = function(name, value) {
  this.model.set(name, value);
};

/**
 * @param {!Object} data
 * @return {undefined}
 */
SUI.Form.prototype.setErrors = function(data) {
  let errors = new SUI.Object(data);
  this.each(function(widget) {
    let name = widget.getName();
    let error = errors.get(name, []);
    widget.setError(error.join(', '), true);
  });
};

/**
 * @param {boolean=} opt_force
 * @return {boolean}
 */
SUI.Form.prototype.checkValidity = function(opt_force = false) {
  this.each(function(widget) {
    widget.checkValidity(opt_force);
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
 * @return {undefined}
 */
SUI.Form.prototype.refresh = function() {
  this.deleteAllByCondition(function(widget) {
    let exists = widget.exists();
    if (!exists) {
      let widgetName = widget.getName();
      this.model.remove(widgetName);
      SUI.remove(this.initWidgets, widgetName);
    }
    return !exists;
  }.bind(this));

  this._initWidgets();
};

/**
 * @param {string} value
 * @return {!SUI.Widget}
 */
SUI.Form.prototype.findByModel = function(value) {
  return this.findByCondition((item, i) => {
    let modelName = this.get(i, 'model');
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

