goog.provide('SUI.Item');

goog.require('SUI');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.Item}
 * @param {!Object} properties
 * @param {!Object} parent
 */
SUI.Item = function(properties, parent) {
  this.properties = new SUI.Object(properties);
  this.parent = parent;
};

/**
 * @param {string} attribute
 * @param {*} value
 * @return {undefined}
 */
SUI.Item.prototype.set = function(attribute, value) {
  this.properties.set(attribute, value);
};

/**
 * @param {!Object} properties
 * @return {undefined}
 */
SUI.Item.prototype.merge = function(properties) {
  this.properties.merge(properties);
};

/**
 * @param {string} attribute
 * @return {*}
 */
SUI.Item.prototype.get = function(attribute) {
  return this.properties.get(attribute);
};
