import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Objekt');

goog.require('SUI');

/**
 * @export
 * @constructor
 * @this {SUI.Objekt}
 * @param {!Object=} opt_object
 */
SUI.Objekt = function(opt_object) {
  opt_object = opt_object || {};
  Object.call(this, opt_object);
  this.merge(opt_object);
};
SUI.Objekt.prototype = Object.create(/** @type {!Object} */(Object.prototype));
SUI.Objekt.prototype.constructor = SUI.Objekt;

/**
 * @export
 * @param {*} object
 * @return {!SUI.Objekt}
 */
SUI.Objekt.prototype.merge = function(object) {
  if (SUI.isObject(object)) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (!SUI.isNull(object[key]) && SUI.isObject(object[key]) && !SUI.isArray(object[key])) {
          if (!SUI.instanceOf(this[key], SUI.Objekt)) {
            this[key] = new SUI.Objekt(this[key]);
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
  return this;
};

/**
 * @param {*} object
 * @param {string} key
 * @return {undefined}
 */
SUI.Objekt.prototype._convertObject = function(object, key) {
  SUI.each(object[key], function(obj, i) {
    object[key][i] = new SUI.Objekt(obj);
  });
};

/**
 * @deprecated Use get()
 * @param {string=} opt_attribute
 * @param {*=} opt_defaultValue
 * @param {boolean=} opt_isSafe
 * @return {*}
 */
SUI.Objekt.prototype.speedGet = function(opt_attribute, opt_defaultValue, opt_isSafe = false) {
  let value = this;
  if (opt_attribute) {
    value = this[opt_attribute];
    const attributes = opt_isSafe ? [opt_attribute] : opt_attribute.split('.');
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
 * @export
 * @param {string=} opt_attribute
 * @param {*=} opt_defaultValue
 * @param {boolean=} opt_isSafe
 * @return {*}
 */
SUI.Objekt.prototype.get = function(opt_attribute, opt_defaultValue, opt_isSafe = false) {
  let value = this;
  if (opt_attribute) {
    const attributes = opt_isSafe ? [opt_attribute] : opt_attribute.split('.');
    value = this._get(this, attributes);
  }
  return !SUI.isUndefined(value) ? value : opt_defaultValue;
};

/**
 * @param {!Object|!SUI.Objekt} object
 * @param {!Array} attributes
 * @return {!Object|!SUI.Objekt|undefined}
 */
SUI.Objekt.prototype._get = function(object, attributes) {
  let result = undefined;
  SUI.each(object, (_value, property) => {
    if (attributes.length === 1 && property.toString() === attributes[0]) {
      result = object[property];
    } else if (property.toString() === attributes[0] && !SUI.isNull(object[property]) && SUI.isObject(object[property])) {
      const copyAttributes = SUI.copyArray(attributes);
      copyAttributes.shift();
      result = this._get(object[property], copyAttributes);
    }
  });
  return result;
};

/**
 * @param {!Object|!SUI.Objekt} object
 * @param {!Array} attributes
 * @param {*} value
 * @return {undefined}
 */
SUI.Objekt.prototype._set = function(object, attributes, value) {
  SUI.eachObject(object, (_oldValue, property) => {
    if (attributes.length === 1 && property === attributes[0]) {
      object[property] = value;
    } else if (property === attributes[0] && !SUI.isNull(object[property]) && SUI.isObject(object[property])) {
      const copyAttributes = SUI.copyArray(attributes);
      copyAttributes.shift();
      this._set(object[property], copyAttributes, value);
    }
  });
};

/**
 * @export
 * @param {string} attribute
 * @param {*} value
 * @return {undefined}
 */
SUI.Objekt.prototype.set = function(attribute, value) {
  let object = {};
  object = this._attributesToObject(object, attribute.split('.'), value);
  this.merge(object);
};

/**
 * @export
 * @param {string} attribute
 * @param {*} value
 * @param {boolean=} opt_isSafe
 * @return {undefined}
 */
SUI.Objekt.prototype.setRaw = function(attribute, value, opt_isSafe = false) {
  this.set(attribute, null);
  const attributes = opt_isSafe ? [attribute] : attribute.split('.');
  this._set(this, attributes, value);
};

/**
 * @export
 * @param {string} attribute
 * @return {undefined}
 */
SUI.Objekt.prototype.remove = function(attribute) {
  const attributes = attribute.split('.');
  this._remove(this, attributes);
};

/**
 * @export
 * @return {undefined}
 */
SUI.Objekt.prototype.clear = function() {
  SUI.clear(this);
};

/**
 * @param {!Object|!SUI.Objekt} object
 * @param {!Array} attributes
 * @return {undefined}
 */
SUI.Objekt.prototype._remove = function(object, attributes) {
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      if (attributes.length === 1 && property === attributes[0]) {
        delete object[property];
      } else if (property === attributes[0] && !SUI.isNull(object[property]) && SUI.isObject(object[property])) {
        const copyAttributes = SUI.copyArray(attributes);
        copyAttributes.shift();
        this._remove(object[property], copyAttributes);
      }
    }
  }
};

/**
 * @export
 * @param {!Function} next
 * @param {!Object=} opt_properties
 * @param {!Array=} opt_attributes
 * @return {undefined}
 */
SUI.Objekt.prototype.each = function(next, opt_properties, opt_attributes) {
  const properties = opt_properties || this;
  const attributes = opt_attributes || [];

  SUI.eachObject(properties, (value, property) => {
    const attributesCopy = SUI.copyArray(attributes);
    attributesCopy.push(property);
    if (!SUI.isNull(value) && SUI.isObject(value)) {
      this.each(next, value, attributesCopy);
    } else {
      next(value, attributesCopy.join('.'));
    }
  });
};

/**
 * @param {!Object} object
 * @param {!Array} attributes
 * @param {*} value
 * @return {!Object}
 */
SUI.Objekt.prototype._attributesToObject = function(object, attributes, value) {
  const lastAttribute = attributes.pop();
  let base = object;
  for (let i = 0; i < attributes.length; i++) {
    base = base[attributes[i]] = base[attributes[i]] || {};
  }
  base[lastAttribute] = value;
  return object;
};

/**
 * @export
 * @param {boolean=} opt_isNative
 * @return {!SUI.Objekt}
 */
SUI.Objekt.prototype.copy = function(opt_isNative = false) {
  let result = /** @type {!SUI.Objekt} */(SUI.copyObject(this));
  if (!opt_isNative) {
    result = new SUI.Objekt(result);
  }
  return result;
};

/**
 * @export
 * @return {boolean}
 */
SUI.Objekt.prototype.isEmpty = function() {
  return SUI.isEmpty(this);
};


/**
 * @export
 * @param {!Array} keys
 * @return {!SUI.Objekt}
 */
SUI.Objekt.prototype.allowKeys = function(keys) {
  return this.filterKeys(this, (key) => {
    return SUI.inArray(keys, key);
  });
};

/**
 * @export
 * @param {!Array} keys
 * @return {!SUI.Objekt}
 */
SUI.Objekt.prototype.denyKeys = function(keys) {
  return this.filterKeys(this, (key) => {
    return !SUI.inArray(keys, key);
  });
};

/**
 * @export
 * @param {!SUI.Objekt} obj
 * @param {!Function} condition
 * @return {!SUI.Objekt}
 */
SUI.Objekt.prototype.filterKeys = function(obj, condition) {
  const resultObj = new SUI.Objekt();
  obj.each((value, key) => {
    if (condition(key)) {
      resultObj.set(key, value);
    }
  });
  return resultObj;
};
