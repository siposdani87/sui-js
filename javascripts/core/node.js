goog.provide('SUI.Node');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Node}
 * @param {?Element|string} node
 * @param {!SUI.Query=} opt_parent
 */
SUI.Node = function(node, opt_parent) {
  if (SUI.isString(node)) {
    if (SUI.contain(/** @type {string} */ (node), '<') && SUI.contain(/** @type {string} */ (node), '</')) {
      var template = document.createElement('template');
      template.innerHTML = node;
      node = template.content.firstElementChild;
    }
    else {
      node = document.createElement(/** @type {string} */ (node));
    }
  }
  this.node = /** @type {!Element} */ (node);
  this.parent = opt_parent;
};

/**
 * @param {string} attribute
 * @param {boolean|number|string} value
 * @returns {undefined}
 */
SUI.Node.prototype.set = function(attribute, value) {
  if (SUI.eq(attribute, 'id')) {
    this.setId(value);
  }
  else {
    this.setAttribute(attribute, value);
  }
};

/**
 * @param {!Object} properties
 * @returns {undefined}
 */
SUI.Node.prototype.merge = function(properties) {
  SUI.each(properties, function(value, attribute) {
    this.set(attribute, value);
  }.bind(this));
};

/**
 * @param {string} attribute
 * @returns {string|null}
 */
SUI.Node.prototype.get = function(attribute) {
  if (SUI.eq(attribute, 'id')) {
    return this.getId();
  }
  return this.getAttribute(attribute);
};

/**
 * @returns {!Element}
 */
SUI.Node.prototype.getNode = function() {
  return this.node;
};

/**
 * @param {boolean=} opt_isInner
 * @returns {string}
 */
SUI.Node.prototype.getHtml = function(opt_isInner = false) {
  if (this.node) {
    return opt_isInner ? this.node.innerHTML : this.node.outerHTML;
  }
  return '';
};

/**
 * @returns {string}
 */
SUI.Node.prototype.getTagName = function() {
  return this.node.tagName.toLowerCase();
};

/**
 * @returns {string|null}
 */
SUI.Node.prototype.getId = function() {
  return this.node.id || null;
};

/**
 * @param {boolean|number|string} id
 * @returns {undefined}
 */
SUI.Node.prototype.setId = function(id) {
  this.node.id = id;
};

/**
 * @param {boolean|number|string} htmlFor
 * @returns {undefined}
 */
SUI.Node.prototype.setFor = function(htmlFor) {
  this.node.htmlFor = htmlFor;
  this.setAttribute('for', htmlFor);
};

/**
 * @returns {string|null}
 */
SUI.Node.prototype.getFor = function() {
  return this.node.htmlFor || this.getAttribute('for');
};

/**
 * @param {string} cssClass
 * @returns {boolean}
 */
SUI.Node.prototype.hasClass = function(cssClass) {
  return this.node.classList.contains(cssClass);
};

/**
 * @param {!Array|string} cssClasses
 * @param {!Function} callback
 * @returns {undefined}
 */
SUI.Node.prototype._handleClassList = function(cssClasses, callback) {
  if (SUI.isArray(cssClasses)) {
    SUI.each(cssClasses, function(cssClass) {
      callback(cssClass);
    });
  }
  else {
    callback(cssClasses);
  }
};

/**
 * @param {!Array|string} cssClasses
 * @returns {undefined}
 */
SUI.Node.prototype.addClass = function(cssClasses) {
  this._handleClassList(cssClasses, (cssClass) => {
    if (cssClass) {
      this.node.classList.add(cssClass);
    }
  });
};

/**
 * @param {!Array|string} cssClasses
 * @returns {undefined}
 */
SUI.Node.prototype.removeClass = function(cssClasses) {
  this._handleClassList(cssClasses, (cssClass) => {
    this.node.classList.remove(cssClass);
  });
};

/**
 * @param {!Array|string} cssClasses
 * @returns {undefined}
 */
SUI.Node.prototype.toggleClass = function(cssClasses) {
  this._handleClassList(cssClasses, (cssClass) => {
    this.node.classList.toggle(cssClass);
  });
};

/**
 * @returns {!Array}
 */
SUI.Node.prototype.getClasses = function() {
  return this.node.classList.value.split(' ');
};

/**
 * @param {string} attribute
 * @param {!Function|boolean|number|string|null=} opt_value
 * @returns {undefined}
 */
SUI.Node.prototype.setAttribute = function(attribute, opt_value) {
  var value = SUI.isUndefined(opt_value) ? attribute : opt_value;
  if (SUI.isFunction(value)){
    this.node[attribute] = value;
  }
  else{
    this.node.setAttribute(attribute, /** @type {string} */ (value));
  }
};

/**
 * @param {string} attribute
 * @returns {string|null}
 */
SUI.Node.prototype.getAttribute = function(attribute) {
  return this.node.getAttribute(attribute) || null;
};

/**
 * @param {string} attribute
 * @returns {undefined}
 */
SUI.Node.prototype.removeAttribute = function(attribute) {
  this.node.removeAttribute(attribute);
};

/**
 * @param {string} eventName
 * @param {!Function} callback
 * @returns {!Function}
 */
SUI.Node.prototype.addEventListener = function(eventName, callback) {
  var listener = function(event) {
    var node = new SUI.Node(/** @type {!Element} */ (this));
    callback(node, event);
    event.stopPropagation();
  };
  this.node.addEventListener(eventName, listener);

  return listener;
};

/**
 * @param {string} eventName
 * @param {!Function} listener
 * @returns {undefined}
 */
SUI.Node.prototype.removeEventListener = function(eventName, listener) {
  this.node.removeEventListener(eventName, listener);
};

/**
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.Node.prototype.dispatchEvent = function(event) {
  this.node.dispatchEvent(event);
};

/**
 * @param {string} eventName
 * @returns {undefined}
 */
SUI.Node.prototype.trigger = function(eventName){
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
  var event = new Event(eventName);
  this.dispatchEvent(event);
};

/**
 * @param {string} tagName
 * @returns {!SUI.Node}
 */
SUI.Node.prototype.createElement = function(tagName) {
  var node = document.createElement(tagName);
  return new SUI.Node(node, this.parent);
};

/**
 * @param {!SUI.Node} node
 * @returns {undefined}
 */
SUI.Node.prototype.appendChild = function(node) {
  this.node.appendChild(node.getNode());
};

/**
 * @returns {undefined}
 */
SUI.Node.prototype.removeChildren = function() {
  while (this.hasChildren()) {
    this.node.removeChild(this.node.firstChild);
  }
};

/**
 * @returns {boolean}
 */
SUI.Node.prototype.hasChildren = function(){
  return this.node.hasChildNodes();
};

/**
 * @param {!SUI.Node} node
 * @returns {undefined}
 */
SUI.Node.prototype.removeChild = function(node) {
  if (this.hasChildren()){
    try {
      this.node.removeChild(node.getNode());
    } catch(e) {
      console.warn(e);
    }
  }
};

/**
 * @returns {undefined}
 */
SUI.Node.prototype.remove = function(){
  this.node.parentNode.removeChild(this.node);
};

/**
 * @param {!SUI.Node} node
 * @returns {undefined}
 */
SUI.Node.prototype.insert = function(node) {
  this.removeChildren();
  this.appendChild(node);
};

/**
 * @param {!SUI.Node} node
 * @returns {undefined}
 */
SUI.Node.prototype.beforeChild = function(node) {
  var referenceNode = this.node.firstChild || this.node.firstElementChild;
  this.node.insertBefore(node.getNode(), referenceNode);
};

/**
 * @param {!SUI.Node} node
 * @returns {undefined}
 */
SUI.Node.prototype.insertBefore = function(node){
  this.node.parentNode.insertBefore(node.getNode(), this.node);
};

/**
 * @param {!SUI.Node} node
 */
SUI.Node.prototype.insertAfter = function(node) {
  var referenceNode = this.node.nextSibling || this.node.nextElementSibling;
  this.node.parentNode.insertBefore(node.getNode(), referenceNode);
};

/**
 * @returns {string}
 */
SUI.Node.prototype.getText = function() {
  return this.node.textContent;
};

/**
 * @param {!Element|string|number} text
 * @returns {undefined}
 */
SUI.Node.prototype.setHtml = function(text) {
  this.node.innerHTML = text;
};

/**
 * @param {string} text
 * @returns {undefined}
 */
SUI.Node.prototype.setText = function(text) {
  this.node.nodeValue = text;
};

/**
 * @param {string} name
 * @param {*} value
 * @returns {undefined}
 */
SUI.Node.prototype.setData = function(name, value) {
  var data = value;
  if (!SUI.isString(value)){
    data = JSON.stringify(value);
  }
  this.node.dataset[name] = data;
};


/**
 * @param {string} name
 * @returns {*}
 */
SUI.Node.prototype.getData = function(name) {
  var data = this.node.dataset[name];
  if (data && (SUI.eq(data[0], '[') || SUI.eq(data[0], '{'))){
    data = JSON.parse(this.node.dataset[name]);
  }
  return SUI.typeCast(data);
};

/**
 * @returns {?SUI.Node}
 */
SUI.Node.prototype.getParent = function() {
  var parent = this.node.parentElement;
  if (parent) {
    return new SUI.Node(parent, this.parent);
  }
  return null;
};

/**
 * @returns {?CSSStyleDeclaration}
 */
SUI.Node.prototype.getComputedStyle = function() {
  return window.getComputedStyle(this.node);
};

/**
 * @returns {!Object}
 */
SUI.Node.prototype.getStyle = function() {
  return this.node.style;
};

/**
 * @param {!Object} properties
 * @returns {undefined}
 */
SUI.Node.prototype.setStyle = function(properties) {
  SUI.each(properties, function(value, propertyName) {
    this.node.style.setProperty(propertyName, value, '');
  }.bind(this));
};

/**
 * @param {!Array} properties
 * @returns {undefined}
 */
SUI.Node.prototype.removeStyle = function(properties) {
  SUI.each(properties, function(property) {
    this.node.style.removeProperty(property);
  }.bind(this));
};

/**
 * @returns {boolean}
 */
SUI.Node.prototype.isEmpty = function() {
  return !this.node;
};

/**
 * @returns {boolean}
 */
SUI.Node.prototype.exists = function() {
  return document.body.contains(this.node);
};


/**
 * @override
 * @param {boolean=} opt_isRoot
 * @returns {string}
 */
SUI.Node.prototype.toString = function(opt_isRoot = true) {
  if (opt_isRoot) {
    return this.node.outerHTML;
  }
  return this.node.innerHTML;
};
