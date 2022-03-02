import { Objekt } from "../core/objekt";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {Carousel}
 * @param {!Item} dom
 * @param {string=} opt_selector
 * @param {!Object=} opt_options
 */
export const Carousel = function(dom, opt_selector = '.carousel', opt_options = {}) {
  this.carouselNode = new Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Carousel.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt({});
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Carousel.prototype._init = function() {
  // this._initStructure();
};
