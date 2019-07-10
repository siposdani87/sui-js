goog.provide('SUI.Node');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Node}
 * @param {?Element|string} node
 * @param {!SUI.Node=} opt_parentNode
 */
SUI.Node = function(node, opt_parentNode) {
  if (SUI.isString(node)) {
    if (SUI.contain(/** @type {string} */(node), '<') && SUI.contain(/** @type {string} */(node), '</')) {
      const template = document.createElement('template');
      template.innerHTML = node;
      node = template.content.firstElementChild;
    } else {
      node = document.createElement(/** @type {string} */(node));
    }
  }
  this.node = /** @type {!Element} */ (node);
  this.parentNode = opt_parentNode;
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
 * @return {*}
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
  return this.node.htmlFor || /** @type {string} */ (this.getAttribute('for'));
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
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined=} opt_value
 * @return {undefined}
 */
SUI.Node.prototype.setAttribute = function(attribute, opt_value) {
  const value = SUI.isUndefined(opt_value) ? attribute : opt_value;
  if (SUI.isFunction(value)) {
    this.node[attribute] = value;
  } else if (SUI.contain(attribute, 'data-') && SUI.isObject(value)) {
    this.node.setAttribute(attribute, JSON.stringify(value));
  } else {
    this.node.setAttribute(attribute, /** @type {string} */(value));
  }
};

/**
 * @param {string} attribute
 * @return {*}
 */
SUI.Node.prototype.getAttribute = function(attribute) {
  const data = this.node.getAttribute(attribute);
  if (SUI.contain(attribute, 'data-') && data && (SUI.eq(data[0], '[') || SUI.eq(data[0], '{'))) {
    return JSON.parse(data) || null;
  }
  return SUI.typeCast(data || null);
};

/**
 * @param {string} attribute
 * @return {undefined}
 */
SUI.Node.prototype.removeAttribute = function(attribute) {
  this.node.removeAttribute(attribute);
};

/**
 * @param {string} attribute
 * @return {boolean}
 */
SUI.Node.prototype.hasAttribute = function(attribute) {
  return this.node.hasAttribute(attribute);
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
      event.stopPropagation();
      if (!opt_callback(this, event)) {
        event.preventDefault();
      }
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
  const listeners = this._getListenerToStore(eventName);
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
  const event = new Event(eventName);
  this.dispatchEvent(event);
};

/**
 * @param {string} tagName
 * @return {!SUI.Node}
 */
SUI.Node.prototype.createElement = function(tagName) {
  const node = document.createElement(tagName);
  return new SUI.Node(node, this);
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
  const parentElement = this._getParentElement();
  if (!this.isEmpty() && parentElement) {
    parentElement.removeChild(this.node);
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
  const referenceNode = this.node.firstChild || this.node.firstElementChild;
  this.node.insertBefore(node.getNode(), referenceNode);
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.afterChild = function(node) {
  const parentElement = this._getParentElement();
  if (parentElement) {
    parentElement.appendChild(node.getNode());
  }
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.insertBefore = function(node) {
  const parentElement = this._getParentElement();
  if (parentElement) {
    parentElement.insertBefore(node.getNode(), this.node);
  }
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.insertAfter = function(node) {
  const nextSiblingNode = this.getNextSibling();
  const parentElement = this._getParentElement();
  if (parentElement) {
    parentElement.insertBefore(node.getNode(), nextSiblingNode.getNode());
  }
};

/**
 * @return {!SUI.Node}
 */
SUI.Node.prototype.getNextSibling = function() {
  const referenceNode = this.node.nextSibling || this.node.nextElementSibling;
  return new SUI.Node(/** @type {!Element} */(referenceNode));
};

/**
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.Node.prototype.replaceChild = function(node) {
  const parentElement = this._getParentElement();
  if (parentElement) {
    parentElement.replaceChild(node.getNode(), this.node);
  }
};

/**
 * @param {!Element|string|number} text
 * @return {undefined}
 */
SUI.Node.prototype.setHtml = function(text) {
  this.node.innerHTML = text;
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
 * @param {string} text
 * @return {undefined}
 */
SUI.Node.prototype.setText = function(text) {
  this.node.nodeValue = text;
};

/**
 * @return {string}
 */
SUI.Node.prototype.getText = function() {
  return this.node.textContent;
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
    data = JSON.parse(data);
  }
  return SUI.typeCast(data);
};

/**
 * @param {string} name
 * @return {undefined}
 */
SUI.Node.prototype.removeData = function(name) {
  if (!this.isEmpty()) {
    delete this.node.dataset[name];
    this.node.removeAttribute('data-' + name);
  }
};

/**
 * @return {?SUI.Node}
 */
SUI.Node.prototype.getParentNode = function() {
  const parentElement = this._getParentElement();
  if (parentElement) {
    return new SUI.Node(parentElement);
  }
  return null;
};

/**
 * @return {?Element}
 */
SUI.Node.prototype._getParentElement = function() {
  if (this.parentNode && !this.parentNode.isEmpty()) {
    return this.parentNode.getNode();
  } else if (this.node) {
    return this.node.parentElement;
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
 * @return {?SUI.Node}
 */
SUI.Node.prototype.cloneNode = function(opt_deep = false) {
  if (!this.isEmpty()) {
    const cloneNode = this.node.cloneNode(opt_deep);
    return new SUI.Node(cloneNode, this.parentNode);
  }
  return null;
};

/**
 * @return {undefined}
 */
SUI.Node.prototype.clearNode = function() {
  const cloneNode = this.cloneNode(true);
  if (cloneNode) {
    this.replaceChild(cloneNode);
    this.node = cloneNode.getNode();
  }
};
