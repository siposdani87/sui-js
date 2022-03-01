import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Carousel');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Carousel}
 * @param {!SUI.Item} dom
 * @param {string=} opt_selector
 * @param {!Object=} opt_options
 */
SUI.Carousel = function(dom, opt_selector = '.carousel', opt_options = {}) {
  this.carouselNode = new SUI.Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Carousel.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt({});
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Carousel.prototype._init = function() {
  // this._initStructure();
};
