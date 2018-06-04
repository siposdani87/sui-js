goog.provide('SUI.Carousel');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Carousel}
 * @param {!SUI.Node} dom
 * @param {!Object=} opt_options
 * @param {string=} opt_selector
 */
SUI.Carousel = function(dom, opt_options, opt_selector = '.carousel') {
  this.carouselNode = new SUI.Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Carousel.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object({});
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Carousel.prototype._init = function() {
  // this._initStructure();
};


