goog.provide('SUI.Document');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.Document}
 * @param {!Object=} opt_options
 */
SUI.Document = function(opt_options) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Document.prototype._setOptions = function(opt_options) {
  const _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Document.prototype._init = function() {
  this.document = document;
  this.document.addEventListener('click', (event) => {
    const target = new SUI.Node(/** @type {!Element} */ (event.target));
    this.eventClick(target, event);
  });
};

/**
 * @param {string} title
 * @return {undefined}
 */
SUI.Document.prototype.setTitle = function(title) {
  this.document.title = title;
};

/**
 * @param {!SUI.Node} target
 * @param {!Event} event
 * @return {undefined}
 */
SUI.Document.prototype.eventClick = function(target, event) {
  SUI.consoleWarn('Document.eventClick()', target, event);
};

/**
 * @param {string} email
 * @param {string=} opt_subject
 * @return {undefined}
 */
SUI.Document.prototype.mailTo = function(email, opt_subject = '') {
  this.document.location.href = 'mailto:' + email + '?subject=' + opt_subject;
};
