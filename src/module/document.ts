import { consoleWarn } from "../base";
import { Item } from "../core/item";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {Document}
 * @param {!Object=} opt_options
 */
export const Document = function(opt_options) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Document.prototype._setOptions = function(opt_options) {
  const _self = this;
  _self.options = new Objekt();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Document.prototype._init = function() {
  this.document = document;
  this.document.addEventListener('click', (event) => {
    const target = new Item(/** @type {!Element} */ (event.target));
    this.eventClick(target, event);
  });
};

/**
 * @param {string} title
 * @return {undefined}
 */
Document.prototype.setTitle = function(title) {
  this.document.title = title;
};

/**
 * @param {!Item} target
 * @param {!Event} event
 * @return {undefined}
 */
Document.prototype.eventClick = function(target, event) {
  consoleWarn('Document.eventClick()', target, event);
};

/**
 * @param {string} email
 * @param {string=} opt_subject
 * @return {undefined}
 */
Document.prototype.mailTo = function(email, opt_subject = '') {
  this.document.location.href = 'mailto:' + email + '?subject=' + opt_subject;
};
