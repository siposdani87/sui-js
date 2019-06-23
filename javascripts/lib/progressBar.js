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
SUI.lib.ProgressBar = function(dialog, confirm, opt_options = {}) {
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
SUI.lib.ProgressBar.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
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
  this.async.eventComplete = (_isError, nodes) => {
    if (nodes[0]['MaterialProgress']) {
      this.mProgressContainer = nodes[0]['MaterialProgress'];
    }
    if (nodes[1]['MaterialProgress']) {
      this.mProgressHeader = nodes[1]['MaterialProgress'];
    }
    if (nodes[2]['MaterialProgress']) {
      this.mProgressDialog = nodes[2]['MaterialProgress'];
    }
    if (nodes[3]['MaterialProgress']) {
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

  this.mProgressContainer = this._getProgressBar(this.progressBarContainer);
  this.mProgressHeader = this._getProgressBar(this.progressBarHeader);
  this.mProgressDialog = this._getProgressBar(this.progressBarDialog);
  this.mProgressConfirm = this._getProgressBar(this.progressBarConfirm);
};

/**
 * @private
 * @param {!SUI.Node} node
 * @return {!Object}
 */
SUI.lib.ProgressBar.prototype._getProgressBar = function(node) {
  node.addClass('mdl-js-progress');

  node.addEventListener('mdl-componentupgraded', (node) => {
    this.async.parallelFunction(() => {
      return node;
    });
  });

  return {
    setProgress: (value) => {
      this.progressValue = value;
    },
    setBuffer: (value) => {
      this.bufferValue = value;
    },
  };
};

/**
 * @private
 * @param {!Function} containerCallback
 * @param {!Function} headerCallback
 * @param {!Function} dialogCallback
 * @param {!Function} confirmCallback
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._separateProgressBars = function(containerCallback, headerCallback, dialogCallback, confirmCallback) {
  containerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
  headerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
  dialogCallback(this.dialog.isOpened());
  confirmCallback(this.confirm.isOpened());
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype._progress = function() {
  if (!this.options.get('lock')) {
    this._separateProgressBars((condition) => {
      if (condition) {
        this.progressBarContainer.addClass('mdl-progress');
      } else {
        this.progressBarContainer.removeClass('mdl-progress');
      }
    }, (condition) => {
      if (condition) {
        this.progressBarHeader.addClass('mdl-progress');
      } else {
        this.progressBarHeader.removeClass('mdl-progress');
      }
    }, (condition) => {
      if (condition) {
        this.progressBarDialog.addClass('mdl-progress');
      } else {
        this.progressBarDialog.removeClass('mdl-progress');
      }
    }, (condition) => {
      if (condition) {
        this.progressBarConfirm.addClass('mdl-progress');
      } else {
        this.progressBarConfirm.removeClass('mdl-progress');
      }
    });
  }
};

/**
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.show = function() {
  this._progress();
  this.options.counter++;
  this._separateProgressBars((condition) => {
    if (condition) {
      this.progressBarContainer.addClass('mdl-progress__indeterminate');
    } else {
      this.progressBarContainer.removeClass('mdl-progress__indeterminate');
    }
  }, (condition) => {
    if (condition) {
      this.progressBarHeader.addClass('mdl-progress__indeterminate');
    } else {
      this.progressBarHeader.removeClass('mdl-progress__indeterminate');
    }
  }, (condition) => {
    if (condition) {
      this.progressBarDialog.addClass('mdl-progress__indeterminate');
    } else {
      this.progressBarDialog.removeClass('mdl-progress__indeterminate');
    }
  }, (condition) => {
    if (condition) {
      this.progressBarConfirm.addClass('mdl-progress__indeterminate');
    } else {
      this.progressBarConfirm.removeClass('mdl-progress__indeterminate');
    }
  });
};

/**
 * @param {number} value
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.setProgress = function(value) {
  this._progress();
  this._separateProgressBars((condition) => {
    if (condition) {
      this.mProgressContainer.setProgress(value);
    }
  }, (condition) => {
    if (condition) {
      this.mProgressHeader.setProgress(value);
    }
  }, (condition) => {
    if (condition) {
      this.mProgressDialog.setProgress(value);
    }
  }, (condition) => {
    if (condition) {
      this.mProgressConfirm.setProgress(value);
    }
  });
};

/**
 * @param {number} value
 * @return {undefined}
 */
SUI.lib.ProgressBar.prototype.setBuffer = function(value) {
  this._progress();
  this._separateProgressBars((condition) => {
    if (condition) {
      this.mProgressContainer.setBuffer(value);
    }
  }, (condition) => {
    if (condition) {
      this.mProgressHeader.setBuffer(value);
    }
  }, (condition) => {
    if (condition) {
      this.mProgressDialog.setBuffer(value);
    }
  }, (condition) => {
    if (condition) {
      this.mProgressConfirm.setBuffer(value);
    }
  });
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
