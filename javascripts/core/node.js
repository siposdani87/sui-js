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
    if (SUI.contain(/** @type {string} */(node), '<') && SUI.contain(/** @type {string} */(node), '</')) {
      let template = document.createElement('template');
      template.innerHTML = node;
      node = template.content.firstElementChild;
    } else {
      node = document.createElement(/** @type {string} */(node));
    }
  }
  this.node = /** @type {!Element} */ (node);
  this.parent = opt_parent;
  this.listenerStoreKey = '_listeners';
};

/**
 * @param {string} attribute
 * @param {boolean|number|string} value
 * @return {undefined}
 */
SUI.Node.prototype.set = function(attribute, value) {
  if (SUI.eq(attribute, 'id')) {
    this.setId(value);
  } else {
    this.setAttribute(attribute, value);
  }
};

/**
 * @param {!Object} properties
 * @return {undefined}
 */
SUI.Node.prototype.merge = function(properties) {
  SUI.each(properties, (value, attribute) => {
    this.set(attribute, value);
  });
};

/**
 * @param {string} attribute
 * @return {string|null}
 */
SUI.Node.prototype.get = function(attribute) {
  if (SUI.eq(attribute, 'id')) {
    return this.getId();
  }
  return this.getAttribute(attribute);
};

/**
 * @return {!Element}
 */
SUI.Node.prototype.getNode = function() {
  return this.node;
};

/**
 * @param {boolean=} opt_isInner
 * @return {string}
 */
SUI.Node.prototype.getHtml = function(opt_isInner = false) {
  if (!this.isEmpty()) {
    return opt_isInner ? this.node.innerHTML : this.node.outerHTML;
  }
  return '';
};

/**
 * @return {string}
 */
SUI.Node.prototype.getTagName = function() {
  return this.node.tagName.toLowerCase();
};

/**
 * @return {string|null}
 */
SUI.Node.prototype.getId = function() {
  return this.node.id || null;
};

/**
 * @param {boolean|number|string} id
 * @return {undefined}
 */
SUI.Node.prototype.setId = function(id) {
  this.node.id = id;
};

/**
 * @param {boolean|number|string} htmlFor
 * @return {undefined}
 */
SUI.Node.prototype.setFor = function(htmlFor) {
  this.node.htmlFor = htmlFor;
  this.setAttribute('for', htmlFor);
};

/**
 * @return {string|null}
 */
SUI.Node.prototype.getFor = function() {
  return this.node.htmlFor || this.getAttribute('for');
};

/**
 * @param {string} cssClass
 * @return {boolean}
 */
SUI.Node.prototype.hasClass = function(cssClass) {
  return this.node.classList.contains(cssClass);
};

/**
 * @param {!Array|string} cssClasses
 * @param {!Function} callback
 * @return {undefined}
 */
SUI.Node.prototype._handleClassList = function(cssClasses, callback) {
  if (SUI.isArray(cssClasses)) {
    SUI.each(cssClasses, function(cssClass) {
      callback(cssClass);
    });
  } else {
    callback(cssClasses);
  }
};

/**
 * @param {!Array|string} cssClasses
 * @return {undefined}
 */
SUI.Node.prototype.addClass = function(cssClasses) {
  this._handleClassList(cssClasses, (cssClass) => {
    if (cssClass && !this.hasClass(cssClass)) {
      this.node.classList.add(cssClass);
    }
  });
};

/**
 * @param {!Array|string} cssClasses
 * @return {undefined}
 */
SUI.Node.prototype.removeClass = function(cssClasses) {
  this._handleClassList(cssClasses, (cssClass) => {
    this.node.classList.remove(cssClass);
  });
};

/**
 * @param {!Array|string} cssClasses
 * @return {undefined}
 */
SUI.Node.prototype.toggleClass = function(cssClasses) {
  this._handleClassList(cssClasses, (cssClass) => {
    this.node.classList.toggle(cssClass);
  });
};

/**
 * @return {!Array}
 */
SUI.Node.prototype.getClasses = function() {
  return this.node.classList.value.split(' ');
};

/**
 * @param {string} attribute
 * @param {!Object|!Function|!Array|boolean|number|string|null=} opt_value
 * @return {undefined}
 */
SUI.Node.prototype.setAttribute = function(attribute, opt_value) {
  let value = SUI.isUndefined(opt_value) ? attribute : opt_value;
  if (SUI.isFunction(value)) {
    this.node[attribute] = value;
  } else {
    this.node.setAttribute(attribute, /** @type {string} */(value));
  }
};

/**
 * @param {string} attribute
 * @return {string|null}
 */
SUI.Node.prototype.getAttribute = function(attribute) {
  return this.node.getAttribute(attribute) || null;
};

/**
 * @param {string} attribute
 * @return {undefined}
 */
SUI.Node.prototype.removeAttribute = function(attribute) {
  this.node.removeAttribute(attribute);
};

/**
 * @param {string} eventName
 * @param {!Function=} opt_callback
 * @return {!Function}
 */
SUI.Node.prototype.addEventListener = function(eventName, opt_callback) {
  let listener = SUI.noop();
  if (opt_callback) {
    listener = (event) => {
      opt_callback(this, event);
      event.stopPropagation();
    };
    this.node.addEventListener(eventName, listener);
    this._addListenerToStore(eventName, listener);
  }
  return listener;
};

/**
 * @private
 * @param {string} eventName
 * @param {!Function=} listener
 * @return {undefined}
 */
SUI.Node.prototype._addListenerToStore = function(eventName, listener) {
  if (!this.node[this.listenerStoreKey]) {
    this.node[this.listenerStoreKey] = {};
  }
  if (!this.node[this.listenerStoreKey][eventName]) {
    this.node[this.listenerStoreKey][eventName] = [];
  }
  this.node[this.listenerStoreKey][eventName].push(listener);
};

/**
 * @private
 * @param {string} eventName
 * @return {!Array}
 */
SUI.Node.prototype._getListenerToStore = function(eventName) {
  if (this.node[this.listenerStoreKey] || this.node[this.listenerStoreKey][eventName]) {
    return this.node[this.listenerStoreKey][eventName];
  }
  return [];
};

/**
 * @param {string} eventName
 * @param {!Function} listener
 * @return {undefined}
 */
SUI.Node.prototype.removeEventListener = function(eventName, listener) {
  this.node.removeEventListener(eventName, listener);
};

/**
 * @param {string} eventName
 * @return {undefined}
 */
SUI.Node.prototype.removeEventListeners = function(eventName) {
  let listeners = this._getListenerToStore(eventName);
  SUI.eachArray(listeners, (listener) => {
    this.removeEventListener(eventName, listener);
  });
};

/**
 * @param {!Event} event
 * @return {undefined}
 */
SUI.Node.prototype.dispatchEvent = function(event) {
  this.node.dispatchEvent(event);
};

/**
 * @param {string} eventName
 * @return {undefined}
 */
SUI.Node.prototype.trigger = function(eventName) {
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
  let event = new Event(eventName);
  this.dispatchEvent(event);
};

/**
 * @param {string} tagName
 * @return {!SUI.Node}
 */
SUI.Node.prototype.createElement = function(tagName) {
  let node = document.createElement(tagName);
  return new SUI.Node(node, this.parent);
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.appendChild = function(node) {
  this.node.appendChild(node.getNode());
};

/**
 * @return {undefined}
 */
SUI.Node.prototype.removeChildren = function() {
  while (this.hasChildren()) {
    this.node.removeChild(this.node.firstChild);
  }
};

/**
 * @return {boolean}
 */
SUI.Node.prototype.hasChildren = function() {
  return this.node.hasChildNodes();
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.removeChild = function(node) {
  if (this.hasChildren()) {
    try {
      this.node.removeChild(node.getNode());
    } catch (e) {
      console.warn(e);
    }
  }
};

/**
 * @return {undefined}
 */
SUI.Node.prototype.remove = function() {
  if (!this.isEmpty()) {
    this.node.parentNode.removeChild(this.node);
  }
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.insert = function(node) {
  this.removeChildren();
  this.appendChild(node);
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.beforeChild = function(node) {
  let referenceNode = this.node.firstChild || this.node.firstElementChild;
  this.node.insertBefore(node.getNode(), referenceNode);
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.insertBefore = function(node) {
  this.node.parentNode.insertBefore(node.getNode(), this.node);
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.insertAfter = function(node) {
  let nextSiblingNode = this.getNextSibling();
  this.node.parentNode.insertBefore(node.getNode(), nextSiblingNode.getNode());
};

/**
 * @return {!SUI.Node}
 */
SUI.Node.prototype.getNextSibling = function() {
  let referenceNode = this.node.nextSibling || this.node.nextElementSibling;
  return new SUI.Node(/** @type {!Element} */(referenceNode));
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.replaceChild = function(node) {
  this.node.parentNode.replaceChild(node.getNode(), this.node);
};

/**
 * @return {string}
 */
SUI.Node.prototype.getText = function() {
  return this.node.textContent;
};

/**
 * @param {!Element|string|number} text
 * @return {undefined}
 */
SUI.Node.prototype.setHtml = function(text) {
  this.node.innerHTML = text;
};

/**
 * @param {string} text
 * @return {undefined}
 */
SUI.Node.prototype.setText = function(text) {
  this.node.nodeValue = text;
};

/**
 * @param {string} name
 * @param {*} value
 * @return {undefined}
 */
SUI.Node.prototype.setData = function(name, value) {
  if (!this.isEmpty()) {
    let data = value;
    if (!SUI.isString(value)) {
      data = JSON.stringify(value);
    }
    this.node.dataset[name] = data;
  }
};

/**
 * @param {string} name
 * @return {*}
 */
SUI.Node.prototype.getData = function(name) {
  let data = this.node.dataset[name];
  if (data && (SUI.eq(data[0], '[') || SUI.eq(data[0], '{'))) {
    data = JSON.parse(this.node.dataset[name]);
  }
  return SUI.typeCast(data);
};

/**
 * @return {?SUI.Node}
 */
SUI.Node.prototype.getParent = function() {
  let parent = this.node.parentElement;
  if (parent) {
    return new SUI.Node(parent, this.parent);
  }
  return null;
};

/**
 * @return {?CSSStyleDeclaration}
 */
SUI.Node.prototype.getComputedStyle = function() {
  return window.getComputedStyle(this.node);
};

/**
 * @return {!Object}
 */
SUI.Node.prototype.getStyle = function() {
  return this.node.style;
};

/**
 * @param {!Object} properties
 * @return {undefined}
 */
SUI.Node.prototype.setStyle = function(properties) {
  SUI.each(properties, (value, propertyName) => {
    this.node.style.setProperty(propertyName, value, '');
  });
};

/**
 * @param {!Array} properties
 * @return {undefined}
 */
SUI.Node.prototype.removeStyle = function(properties) {
  SUI.each(properties, (property) => {
    this.node.style.removeProperty(property);
  });
};

/**
 * @return {boolean}
 */
SUI.Node.prototype.isEmpty = function() {
  return !this.node;
};

/**
 * @return {boolean}
 */
SUI.Node.prototype.exists = function() {
  return document.body.contains(this.node);
};

/**
 * @override
 * @param {boolean=} opt_isRoot
 * @return {string}
 */
SUI.Node.prototype.toString = function(opt_isRoot = true) {
  if (opt_isRoot) {
    return this.node.outerHTML;
  }
  return this.node.innerHTML;
};

/**
 * @param {boolean=} opt_deep
 * @return {SUI.Node}
 */
SUI.Node.prototype.cloneNode = function(opt_deep = false) {
  if (!this.isEmpty()) {
    let cloneNode = this.node.cloneNode(opt_deep);
    return new SUI.Node(cloneNode, this.parent);
  }
  return null;
};

/**
 * @return {undefined}
 */
SUI.Node.prototype.clearNode = function() {
  let cloneNode = this.cloneNode(true);
  if (cloneNode) {
    this.replaceChild(cloneNode);
    this.node = cloneNode.getNode();
  }
};
