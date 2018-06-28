goog.provide('SUI.lib.ProgressBar');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');
goog.require('SUI.lib.Confirm');
goog.require('SUI.lib.Dialog');

/**
 * @constructor
 * @this {SUI.lib.ProgressBar}
 * @param {!SUI.lib.Dialog} dialog
 * @param {!SUI.lib.Confirm} confirm
 * @param {!Object=} opt_options
 */
SUI.lib.ProgressBar = function(dialog, confirm, opt_options) {
  this.dialog = dialog;
  this.confirm = confirm;

  this._setOptions(opt_options);
  this._init();
};

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object({
    lock: false,
    counter: 0,
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
  this.progressBarDialog = new SUI.Query('#dialog-window > .progress-bar').getItem();
  this.progressBarConfirm = new SUI.Query('#confirm-window > .progress-bar').getItem();

  this.async = new SUI.Async(4);
  this.async.eventComplete = (isError, nodes) => {
    console.log(nodes);
    if (nodes[0] && nodes[0]['MaterialProgress']) {
      this.mProgressContainer = nodes[0]['MaterialProgress'];
    }
    if (nodes[1] && nodes[1]['MaterialProgress']) {
      this.mProgressHeader = nodes[1]['MaterialProgress'];
    }
    if (nodes[2] && nodes[2]['MaterialProgress']) {
      this.mProgressDialog = nodes[2]['MaterialProgress'];
    }
    if (nodes[3] && nodes[3]['MaterialProgress']) {
      this.mProgressConfirm = nodes[3]['MaterialProgress'];
    }

    if (this.progressValue) {
      this.setProgress(this.progressValue);
    }
    this.progressValue = 0;

    if (this.bufferValue) {
      this.setBuffer(this.bufferValue);
    }
    this.bufferValue = 0;
  };

  this.progressValue = 0;
  this.bufferValue = 0;

  this._setProgressBar(this.mProgressContainer, this.progressBarContainer);
  this._setProgressBar(this.mProgressHeader, this.progressBarHeader);
  this._setProgressBar(this.mProgressDialog, this.progressBarDialog);
  this._setProgressBar(this.mProgressConfirm, this.progressBarConfirm);
};

/**
 * @private
 * @param {*} mProgress
 * @param {!SUI.Node} node
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._setProgressBar = function(mProgress, node) {
  mProgress = {
    setProgress: (value) => {
      this.progressValue = value;
    },
    setBuffer: (value) => {
      this.bufferValue = value;
    },
  };

  node.addClass('mdl-js-progress');

  node.addEventListener('mdl-componentupgraded', (node) => {
    this.async.parallelFunction(function() {
      return node;
    });
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._progress = function() {
  if (!this.options.get('lock')) {
    this.progressBarContainer.addClass('mdl-progress');
    if (!this.dialog.isOpened() && !this.confirm.isOpened()) {
      this.progressBarHeader.addClass('mdl-progress');
    } else {
      this.progressBarHeader.removeClass('mdl-progress');
    }
    if (this.dialog.isOpened()) {
      this.progressBarDialog.addClass('mdl-progress');
    } else {
      this.progressBarDialog.removeClass('mdl-progress');
    }
    if (this.confirm.isOpened()) {
      this.progressBarConfirm.addClass('mdl-progress');
    } else {
      this.progressBarConfirm.removeClass('mdl-progress');
    }
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
  this.progressBarDialog.addClass('mdl-progress__indeterminate');
  this.progressBarConfirm.addClass('mdl-progress__indeterminate');
};

/**
 * @param {number} value
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.setProgress = function(value) {
  this._progress();
  this.mProgressContainer.setProgress(value);
  this.mProgressHeader.setProgress(value);
  this.mProgressDialog.setProgress(value);
  this.mProgressConfirm.setProgress(value);
};

/**
 * @param {number} value
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.setBuffer = function(value) {
  this._progress();
  this.mProgressContainer.setBuffer(value);
  this.mProgressHeader.setBuffer(value);
  this.mProgressDialog.setBuffer(value);
  this.mProgressConfirm.setBuffer(value);
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
    this.progressBarDialog.removeClass(['mdl-progress', 'mdl-progress__indeterminate']);
    this.progressBarConfirm.removeClass(['mdl-progress', 'mdl-progress__indeterminate']);
  }
};

/**
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.lock = function() {
  this.options.set('lock', true);
};

/**
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.unlock = function() {
  this.options.set('lock', false);
};
