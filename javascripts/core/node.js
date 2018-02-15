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
  SUI.each(properties, function(value, attribute) {
    this.set(attribute, value);
  }.bind(this));
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
  if (this.node) {
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
    if (cssClass) {
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
 * @param {!Function|boolean|number|string|null=} opt_value
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
 * @param {!Function} callback
 * @return {!Function}
 */
SUI.Node.prototype.addEventListener = function(eventName, callback) {
  let listener = (event) => {
    // let node = new SUI.Node(/** @type {!Element} */(this));
    callback(this, event);
    event.stopPropagation();
  };
  this.node.addEventListener(eventName, listener);

  return listener;
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
  this.node.parentNode.removeChild(this.node);
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
  return new SUI.Node(/** @type {!Element} */ (referenceNode));
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
  let data = value;
  if (!SUI.isString(value)) {
    data = JSON.stringify(value);
  }
  this.node.dataset[name] = data;
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
  SUI.each(properties, function(value, propertyName) {
    this.node.style.setProperty(propertyName, value, '');
  }.bind(this));
};

/**
 * @param {!Array} properties
 * @return {undefined}
 */
SUI.Node.prototype.removeStyle = function(properties) {
  SUI.each(properties, function(property) {
    this.node.style.removeProperty(property);
  }.bind(this));
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
