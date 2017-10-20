goog.provide('SUI.lib.Document');

goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Document}
 * @param {!Object} options
 */
SUI.lib.Document = function(options) {
  var _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(options);

  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Document.prototype._init = function() {
  this.document = document;
  this.document.addEventListener('click', function(event) {
    var target = new SUI.Node(event.target);
    this.eventClick(target, event);
  }.bind(this));
};

/**
 * @param {string} title
 * @return {undefined}
 */
SUI.lib.Document.prototype.setTitle = function(title) {
  this.document.title = title;
};

/**
 * @return {string}
 */
SUI.lib.Document.prototype.getAppTitle = function() {
  return this.options.title;
};

/**
 * @param {!SUI.Node} target
 * @param {!Event} event
 * @return {undefined}
 */
SUI.lib.Document.prototype.eventClick = function(target, event) {
  console.warn('Document.eventClick()', target, event);
};


/**
 * @param {string} email
 * @param {string=} opt_subject
 * @return {undefined}
 */
SUI.lib.Document.prototype.mailTo = function(email, opt_subject = ''){
  this.document.location.href = 'mailto:' + email + '?subject=' + opt_subject;
};
