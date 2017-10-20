goog.provide('SUI.lib.Script');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Script}
 * @param {!SUI.lib.ProgressBar} progressBar
 * @param {!Object=} opt_options
 */
SUI.lib.Script = function(progressBar, opt_options) {
  this.progressBar = progressBar;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.lib.Script.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Script.prototype._init = function() {
  this.head = new SUI.Query('head').getItem();
};

/**
 * @param {string} id
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {!SUI.Promise}
 */
SUI.lib.Script.prototype.load = function(id, url, opt_params) {
  this.progressBar.show();
  var deferred = new SUI.Deferred();
  var script = new SUI.Query('#' + id);
  if (script.size() > 0){
    this.progressBar.hide();
    deferred.resolve(true);
  }else{
    var node = new SUI.Node('script');
    node.setId(id);
    var urlWithQueryString = SUI.urlWithQueryString(url, opt_params);
    node.setAttribute('src', urlWithQueryString);

    node.setAttribute('onload', function(){
      this.progressBar.hide();
      deferred.resolve(true);
    }.bind(this));

    node.setAttribute('onerror', function(){
      this.progressBar.hide();
      deferred.reject(false);
    }.bind(this));

    this.head.appendChild(node);
  }
  return deferred.promise();
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.lib.Script.prototype.remove = function(id){
  var script = new SUI.Query('#' + id).getItem();
  if (!script.isEmpty()){
    script.remove();
  }
};