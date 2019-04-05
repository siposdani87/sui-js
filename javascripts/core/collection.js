goog.provide('SUI.Collection');

goog.require('SUI');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.Collection}
 * @template T
 * @param {!Array=} opt_items
 * @param {!Function=} opt_type
 * @param {!Object=} opt_options
 */
SUI.Collection = function(opt_items = [], opt_type = SUI.Object, opt_options = {}) {
  this.Type = opt_type;
  this._setOptions(opt_options);
  this.items = [];
  this.load(opt_items);
};

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.Collection.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    id: 'id',
    parent: undefined,
  });
  _self.options.merge(opt_options);
};

/**
 * @param {!Array} items
 * @return {undefined}
 */
SUI.Collection.prototype.load = function(items) {
  SUI.each(items, (item) => {
    this.push(item);
  });
};

/**
 * @param {!Array} items
 * @return {undefined}
 */
SUI.Collection.prototype.reload = function(items) {
  this.clear();
  this.load(items);
};

/**
 * @param {!Object|!T} object
 * @return {T}
 */
SUI.Collection.prototype.push = function(object) {
  const item = this._createItem(object);
  this.items.push(item);
  return item;
};

/**
 * @private
 * @param {!Object|!T} object
 * @return {T}
 */
SUI.Collection.prototype._createItem = function(object) {
  let item = object;
  if (!SUI.instanceOf(object, this.Type)) {
    const parent = !SUI.isUndefined(this.options.parent) ? this.options.parent : this;
    item = new this.Type(object, parent);
  }
  return item;
};

/**
 * @param {number} index
 * @param {!Object|!T} item
 * @return {T}
 */
SUI.Collection.prototype.set = function(index, item) {
  let itemObject = item;
  if (!SUI.instanceOf(item, this.Type)) {
    itemObject = new this.Type(item, this);
  }
  if (index < this.size()) {
    this.items[index] = itemObject;
  } else {
    this.push(itemObject);
  }
  return itemObject;
};

/**
 * @param {!Object|!T} item
 * @return {!T}
 */
SUI.Collection.prototype.replace = function(item) {
  const oldItem = this.findById(item.get(this.options.id));
  if (oldItem) {
    oldItem.merge(item);
  }
  return oldItem;
};

/**
 * @return {!Array<T>}
 */
SUI.Collection.prototype.getItems = function() {
  return this.items;
};

/**
 * @param {function(T)} callback
 * @param {function(T, number)} next
 * @param {!Array=} opt_items
 * @return {!Array}
 */
SUI.Collection.prototype.iterator = function(callback, next, opt_items) {
  opt_items = opt_items || this.items;
  const results = [];
  SUI.each(opt_items, (item, index) => {
    if (callback(item)) {
      next(item, index);
      results.push(item);
    }
  });
  return results;
};

/**
 * @param {function(T, number)} next
 * @return {undefined}
 */
SUI.Collection.prototype.each = function(next) {
  this.iterator(function() {
    return true;
  }, next);
};

/**
 * @param {number} index
 * @param {string=} opt_attribute
 * @return {T|*}
 */
SUI.Collection.prototype.get = function(index, opt_attribute) {
  let value = null;
  if (index >= 0 && index < this.items.length) {
    const item = this.items[index];
    value = item;
    if (opt_attribute) {
      value = item.get(opt_attribute);
    }
  }
  return value;
};

/**
 * @param {string|number} id
 * @param {string=} opt_attribute
 * @return {T|*}
 */
SUI.Collection.prototype.getById = function(id, opt_attribute) {
  const item = this.findById(id);
  if (item && opt_attribute) {
    return item.get(opt_attribute);
  }
  return item;
};

/**
 * @return {undefined}
 */
SUI.Collection.prototype.clear = function() {
  SUI.clear(this.items);
};

/**
 * @param {string|number} value
 * @return {!T}
 */
SUI.Collection.prototype.findById = function(value) {
  return this.findBy(this.options.id, value);
};

/**
 * @param {string} attribute
 * @param {*} value
 * @return {!T}
 */
SUI.Collection.prototype.findBy = function(attribute, value) {
  return this.findByCondition((item, i) => {
    return this.get(i, attribute) === value;
  });
};

/**
 * @param {!Function} conditionCallback
 * @return {!T}
 */
SUI.Collection.prototype.findByCondition = function(conditionCallback) {
  let i = 0;
  while (i < this.items.length && !conditionCallback(this.items[i], i)) {
    i++;
  }
  return this.get(i);
};

/**
 * @param {string} attribute
 * @param {*} value
 * @return {!Array}
 */
SUI.Collection.prototype.findAllBy = function(attribute, value) {
  return this.findAllByCondition((item, i) => {
    return this.get(i, attribute) === value;
  });
};

/**
 * @param {!Function} conditionCallback
 * @return {!Array}
 */
SUI.Collection.prototype.findAllByCondition = function(conditionCallback) {
  const items = [];
  SUI.each(this.items, (item, i) => {
    if (conditionCallback(item, i)) {
      items.push(this.get(i));
    }
  });
  return items;
};

/**
 * @param {!Object|!T} value
 * @return {!T}
 */
SUI.Collection.prototype.delete = function(value) {
  return this.deleteByCondition((item) => {
    return SUI.eq(item, value);
  });
};

/**
 * @param {string} value
 * @return {!T}
 */
SUI.Collection.prototype.deleteById = function(value) {
  return this.deleteBy(this.options.id, value);
};

/**
 * @param {string} attribute
 * @param {*} value
 * @return {!T}
 */
SUI.Collection.prototype.deleteBy = function(attribute, value) {
  return this.deleteByCondition((item, i) => {
    return this.get(i, attribute) === value;
  });
};

/**
 * @param {!Function} conditionCallback
 * @return {!T}
 */
SUI.Collection.prototype.deleteByCondition = function(conditionCallback) {
  let i = 0;
  while (i < this.items.length && !conditionCallback(this.items[i], i)) {
    i++;
  }
  const item = this.get(i);
  this.items.splice(i, 1);
  return item;
};

/**
 * @param {string} attribute
 * @param {*} value
 * @return {!Array}
 */
SUI.Collection.prototype.deleteAllBy = function(attribute, value) {
  return this.deleteAllByCondition((item, i) => {
    return this.get(i, attribute) === value;
  });
};

/**
 * @param {!Function} conditionCallback
 * @return {!Array}
 */
SUI.Collection.prototype.deleteAllByCondition = function(conditionCallback) {
  const items = [];
  const deletedItems = [];
  SUI.each(this.items, (item, i) => {
    if (conditionCallback(item, i)) {
      deletedItems.push(this.get(i));
    } else {
      items.push(this.get(i));
    }
  });
  this.items = items;
  return deletedItems;
};

/**
 * @return {number}
 */
SUI.Collection.prototype.size = function() {
  return this.items.length;
};

/**
 * @param {number} offset
 * @param {number=} opt_count
 * @return {!Array}
 */
SUI.Collection.prototype.limit = function(offset, opt_count = 10) {
  return this.items.slice(offset, offset + opt_count);
};

/**
 * @param {string} attribute
 * @return {!Array}
 */
SUI.Collection.prototype.pluck = function(attribute) {
  return SUI.pluck(this.items, attribute);
};
