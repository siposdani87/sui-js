goog.provide('SUI.Object');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Object}
 * @param {!Object=} opt_object
 */
SUI.Object = function(opt_object) {
  opt_object = opt_object || {};
  Object.call(this, opt_object);
  this.merge(opt_object);
};

SUI.Object.prototype = Object.create(/** @type {!Object} */ (Object.prototype));
SUI.Object.prototype.constructor = SUI.Object;

/**
 * @param {*} object
 * @returns {undefined}
 */
SUI.Object.prototype.merge = function(object) {
  if (SUI.isObject(object)) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if (!SUI.isNull(object[key]) && SUI.isObject(object[key]) && !SUI.isArray(object[key])) {
          if (!SUI.instanceOf(this[key], SUI.Object)) {
            this[key] = new SUI.Object(this[key]);
          }
          this[key].merge(object[key]);
        } else if (SUI.isArray(object[key]) && !SUI.isNull(object[key][0]) && SUI.isObject(object[key][0])) {
          this._convertObject(object, key);
          this[key] = object[key];
        } else {
          this[key] = SUI.typeCast(object[key]);
        }
      }
    }
  }
};

/**
 * @param {*} object
 * @param {string} key
 * @returns {undefined}
 */
SUI.Object.prototype._convertObject = function(object, key) {
  SUI.each(object[key], function(obj, i) {
    object[key][i] = new SUI.Object(obj);
  });
};

/**
 * @deprecated Use get()
 * @param {string=} opt_attribute
 * @param {*=} opt_defaultValue
 * @param {boolean=} opt_isSafe
 * @returns {*}
 */
SUI.Object.prototype.speedGet = function(opt_attribute, opt_defaultValue, opt_isSafe = false) {
  let value = this;
  if (opt_attribute) {
    value = this[opt_attribute];
    let attributes = opt_isSafe ? [opt_attribute] : opt_attribute.split('.');
    if (attributes.length > 1) {
      let properties = this;
      let i = 0;
      while (i < attributes.length && !SUI.isUndefined(properties[attributes[i]])) {
        value = properties = properties[attributes[i]];
        i++;
      }
      if (attributes.length !== i) {
        return opt_defaultValue;
      }
    }
  }
  return value;
};

/**
 * @param {string=} opt_attribute
 * @param {*=} opt_defaultValue
 * @param {boolean=} opt_isSafe
 * @returns {*}
 */
SUI.Object.prototype.get = function(opt_attribute, opt_defaultValue, opt_isSafe = false) {
  let value = this;
  if (opt_attribute) {
    let attributes = opt_isSafe ? [opt_attribute] : opt_attribute.split('.');
    value = this._get(this, attributes);
  }
  return !SUI.isUndefined(value) ? value : opt_defaultValue;
};

/**
 * @param {!Object|!SUI.Object} object
 * @param {!Array} attributes
 * @returns {!Object|!SUI.Object|undefined}
 */
SUI.Object.prototype._get = function(object, attributes) {
  let result = undefined;
  SUI.eachObject(object, function(value, property) {
    if (attributes.length === 1 && property === attributes[0]) {
      result = object[property];
    } else if (property === attributes[0] && !SUI.isNull(object[property]) && SUI.isObject(object[property])) {
      let copyAttributes = SUI.copy(attributes);
      copyAttributes.shift();
      result = this._get(object[property], copyAttributes);
    }
  }.bind(this));
  return result;
};


/**
 * @param {!Object|!SUI.Object} object
 * @param {!Array} attributes
 * @param {*} value
 * @returns {undefined}
 */
SUI.Object.prototype._set = function(object, attributes, value) {
  SUI.eachObject(object, function(oldValue, property) {
    if (attributes.length === 1 && property === attributes[0]) {
      object[property] = value;
    } else if (property === attributes[0] && !SUI.isNull(object[property]) && SUI.isObject(object[property])) {
      let copyAttributes = SUI.copy(attributes);
      copyAttributes.shift();
      this._set(object[property], copyAttributes, value);
    }
  }.bind(this));
};


/**
 * @param {string} attribute
 * @param {*} value
 * @returns {undefined}
 */
SUI.Object.prototype.set = function(attribute, value) {
  let object = {};
  object = this._attributesToObject(object, attribute.split('.'), value);
  this.merge(object);
};

/**
 * @param {string} attribute
 * @param {*} value
 * @param {boolean=} opt_isSafe
 * @returns {undefined}
 */
SUI.Object.prototype.setRaw = function(attribute, value, opt_isSafe = false) {
  this.set(attribute, null);
  let attributes = opt_isSafe ? [attribute] : attribute.split('.');
  this._set(this, attributes, value);
};

/**
 * @param {string} attribute
 * @returns {undefined}
 */
SUI.Object.prototype.remove = function(attribute) {
  let attributes = attribute.split('.');
  this._remove(this, attributes);
};

/**
 * @returns {undefined}
 */
SUI.Object.prototype.clear = function() {
  SUI.clear(this);
};

/**
 * @param {!Object|!SUI.Object} object
 * @param {!Array} attributes
 * @returns {undefined}
 */
SUI.Object.prototype._remove = function(object, attributes) {
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      if (attributes.length === 1 && property === attributes[0]) {
        delete object[property];
      } else if (property === attributes[0] && !SUI.isNull(object[property]) && SUI.isObject(object[property])) {
        let copyAttributes = SUI.copy(attributes);
        copyAttributes.shift();
        this._remove(object[property], copyAttributes);
      }
    }
  }
};

/**
 * @param {!Function} next
 * @param {!Object=} opt_properties
 * @param {!Array=} opt_attributes
 */
SUI.Object.prototype.each = function(next, opt_properties, opt_attributes) {
  let properties = opt_properties || this;
  let attributes = opt_attributes || [];

  SUI.eachObject(properties, function(value, property) {
    if (!SUI.isNull(value) && SUI.isObject(value)) {
      let attributesCopy = SUI.copy(attributes);
      attributesCopy.push(property);
      this.each(next, value, attributesCopy);
    } else {
      next(value, attributes.join('.'));
    }
  }.bind(this));
};

/**
 * @param {!Object} object
 * @param {!Array} attributes
 * @param {*} value
 * @returns {!Object}
 */
SUI.Object.prototype._attributesToObject = function(object, attributes, value) {
  let lastAttribute = attributes.pop();
  let base = object;
  for (let i = 0; i < attributes.length; i++) {
    base = base[attributes[i]] = base[attributes[i]] || {};
  }
  base[lastAttribute] = value;
  return object;
};


/**
 * @param {boolean=} opt_isNative
 * @returns {!SUI.Object}
 */
SUI.Object.prototype.copy = function(opt_isNative) {
  let result = /** @type {!SUI.Object} */ (SUI.copy(this));
  if (!opt_isNative) {
    result = new SUI.Object(result);
  }
  return result;
};


/**
 * @returns {boolean}
 */
SUI.Object.prototype.isEmpty = function(){
  return SUI.isEmpty(this);
};

