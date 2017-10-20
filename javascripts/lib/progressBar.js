goog.provide('SUI.lib.ProgressBar');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.ProgressBar}
 * @param {!Object=} opt_options
 */
SUI.lib.ProgressBar = function(opt_options) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    lock: false,
    counter: 0
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._init = function() {
  this.progressBarContainer = new SUI.Query('.main-container > .progress-bar').getItem();
  this.progressBarHeader = new SUI.Query('#header > .progress-bar').getItem();

  var async = new SUI.Async(2);
  async.eventComplete = function(isError, nodes){

    if (nodes[0]['MaterialProgress']){
      this.mProgressContainer = nodes[0]['MaterialProgress'];
    }
    if (nodes[1]['MaterialProgress']){
      this.mProgressHeader = nodes[1]['MaterialProgress'];
    }

    if (this.progressValue){
      this.setProgress(this.progressValue);
    }
    this.progressValue = 0;

    if (this.bufferValue){
      this.setBuffer(this.bufferValue);
    }
    this.bufferValue = 0;
  }.bind(this);


  this.progressBarContainer.addClass('mdl-js-progress');
  this.progressBarHeader.addClass('mdl-js-progress');

  this.progressValue = 0;
  this.bufferValue = 0;

  this.mProgressContainer = this.mProgressHeader = {
    setProgress: function(value){
      this.progressValue = value;
    }.bind(this),
    setBuffer: function(value){
      this.bufferValue = value;
    }.bind(this)
  };

  this.progressBarContainer.addEventListener('mdl-componentupgraded', function(node){
    async.parallelFunction(function() {
      return node;
    });
  }.bind(this));

  this.progressBarHeader.addEventListener('mdl-componentupgraded', function(node) {
    async.parallelFunction(function() {
      return node;
    });
  }.bind(this));


};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._progress = function() {
  if (!this.options.get('lock')){
    this.progressBarContainer.addClass('mdl-progress');
    this.progressBarHeader.addClass('mdl-progress');
  }
};

/**
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.show = function() {
  this._progress();
  this.options.counter++;
  this.progressBarContainer.addClass('mdl-progress__indeterminate');
  this.progressBarHeader.addClass('mdl-progress__indeterminate');
};

/**
 * @param {number} value
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.setProgress = function(value){
  this._progress();
  this.mProgressContainer.setProgress(value);
  this.mProgressHeader.setProgress(value);
};

/**
 * @param {number} value
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.setBuffer = function(value){
  this._progress();
  this.mProgressContainer.setBuffer(value);
  this.mProgressHeader.setBuffer(value);
};

/**
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.hide = function(opt_force) {
  this.options.counter--;
  if (opt_force || SUI.eq(this.options.counter, 0)) {
    this.options.counter = 0;
    this.progressBarContainer.removeClass(['mdl-progress', 'mdl-progress__indeterminate']);
    this.progressBarHeader.removeClass(['mdl-progress', 'mdl-progress__indeterminate']);
  }
};

/**
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.lock = function(){
  this.options.set('lock', true);
};


/**
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.unlock = function(){
  this.options.set('lock', false);
};

