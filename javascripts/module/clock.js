goog.provide('SUI.Clock');

goog.require('SUI.Node');
goog.require('SUI.Time');

/**
 * @constructor
 * @this {SUI.Clock}
 * @param {!SUI.Node} node
 * @param {!Object} options
 */
SUI.Clock = function(node, options) {
  this.clockNode = node;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.Clock.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._init = function() {
  this.modes = ['HOUR', 'MINUTE'];
  this.types = {
    'hour': this.modes[0],
    'minute': this.modes[1]
  };

  this._initStructure();
};

/**
 * @private
 * @param {!Function} hourFun
 * @param {!Function} minuteFun
 * @return {undefined}
 */
SUI.Clock.prototype._switchMode = function(hourFun, minuteFun) {
  var result = null;
  switch (this.activeMode) {
    case 'HOUR':
      result = hourFun();
      break;
    case 'MINUTE':
      result = minuteFun();
      break;
    default:
      break;
  }
  return result;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initStructure = function() {
  this._initHeaderNode();
  this._initContentNode();
  this._initMode(this.types[this.options.type]);

  this.setTime(this.options.time);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initHeaderNode = function() {
  this.headerNode = new SUI.Node('div');
  this.headerNode.addClass('header');
  this.clockNode.appendChild(this.headerNode);

  this._initHoursHeaderNode();
  this._initSeparatorHeaderNode();
  this._initMinutesHeaderNode();
  this._initPeriodHeaderNode();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initPeriodHeaderNode = function() {
  this.periodHeaderNode = new SUI.Node('div');
  this.periodHeaderNode.addClass('period');
  this.periodHeaderNode.addEventListener('click', this._togglePeriod.bind(this));
  this.headerNode.appendChild(this.periodHeaderNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._togglePeriod = function() {
  if (this.period === 'pm') {
    this.time['subtract'](12, 'hours');
  }
  else {
    this.time['add'](12, 'hours');
  }
  this._onClick(this.time);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initMinutesHeaderNode = function() {
  this.minutesHeaderNode = new SUI.Node('div');
  this.minutesHeaderNode.addClass('minutes');
  this.minutesHeaderNode.addEventListener('click', function() {
    this._setMode(this.types.minute);
  }.bind(this));
  this.headerNode.appendChild(this.minutesHeaderNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initHoursHeaderNode = function() {
  this.hoursHeaderNode = new SUI.Node('div');
  this.hoursHeaderNode.addClass('hours');
  this.hoursHeaderNode.addEventListener('click', function() {
    this._setMode(this.types.hour);
  }.bind(this));
  this.headerNode.appendChild(this.hoursHeaderNode);
};

/**
 * @private
 * @param {string} mode
 * @return {undefined}
 */
SUI.Clock.prototype._setMode = function(mode) {
  this._initMode(mode);
  this.setTime(this.time);
  this.draw();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initSeparatorHeaderNode = function() {
  var separatorHeaderNode = new SUI.Node('div');
  separatorHeaderNode.addClass('separator');
  separatorHeaderNode.setHtml(':');
  this.headerNode.appendChild(separatorHeaderNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Clock.prototype._initContentNode = function() {
  this.contentNode = new SUI.Node('div');
  this.contentNode.addClass('content');
  this.clockNode.appendChild(this.contentNode);
};

/**
 * @private
 * @return {!SUI.Node}
 */
SUI.Clock.prototype._getTimeNode = function() {
  this.contentNode.removeChildren();
  var hoursNode = new SUI.Node('div');
  hoursNode.addClass('time');
  this.contentNode.appendChild(hoursNode);
  return hoursNode;
};

/**
 * @private
 * @param {number} hours
 * @return {undefined}
 */
SUI.Clock.prototype._setHours = function(hours) {
  this.hours = hours;
  var cssClass = this.activeMode === this.types.hour ? 'active' : null;
  this.hoursHeaderNode.removeClass('active');
  this.hoursHeaderNode.addClass(['hours', cssClass]);
  var text = hours < 10 ? '0' + hours : hours;
  this.hoursHeaderNode.setHtml(text);
};

/**
 * @private
 * @param {number} minutes
 * @return {undefined}
 */
SUI.Clock.prototype._setMinutes = function(minutes) {
  this.minutes = minutes;
  var cssClass = this.activeMode === this.types.minute ? 'active' : null;
  this.minutesHeaderNode.removeClass('active');
  this.minutesHeaderNode.addClass(['minutes', cssClass]);
  var text = minutes < 10 ? '0' + minutes : minutes;
  this.minutesHeaderNode.setHtml(text);
};

/**
 * @private
 * @param {string} period
 * @return {undefined}
 */
SUI.Clock.prototype._setPeriod = function(period) {
  this.period = period;
  this.periodHeaderNode.removeClass(['am', 'pm']);
  this.periodHeaderNode.addClass(['period', this.period]);
  var text = window['moment']['localeData']()['meridiem'](this.time['hour'](), this.time['minute'](), true);
  this.periodHeaderNode.setHtml(text);
};

/**
 * @param {!Object} time
 * @return {undefined}
 */
SUI.Clock.prototype.setTime = function(time) {
  this.time = window['moment'](time);

  var hours = this.time['hour']() % 12 || 12;
  this._setHours(hours);

  var minutes = this.time['minute']();
  this._setMinutes(minutes);

  var period = this.time['hour']() > 12 ? 'pm' : 'am';
  this._setPeriod(period);
};

/**
 * @private
 * @param {string} mode
 * @return {undefined}
 */
SUI.Clock.prototype._initMode = function(mode) {
  this.contentNode.removeChildren();
  this.activeMode = mode;
};

/**
 * @private
 * @param {number} direction
 * @return {string}
 */
SUI.Clock.prototype._getMode = function(direction) {
  var position = this.modes.indexOf(this.activeMode);
  if (position !== -1) {
    position += direction;
  }
  var mode = this.modes[position];
  return mode ? mode : this.types[this.options.type];
};

/**
 * @private
 * @param {number} direction
 * @return {undefined}
 */
SUI.Clock.prototype._changeMode = function(direction) {
  var mode = this._getMode(direction);
  this._initMode(mode);
};

/**
 * @return {undefined}
 */
SUI.Clock.prototype.draw = function() {
  var timeNode = this._getTimeNode();

  this._switchMode(function() {
    this._drawHours(timeNode);
  }.bind(this), function() {
    this._drawMinutes(timeNode);
  }.bind(this));
};

/**
 * @private
 * @param {!SUI.Node} timeNode
 * @return {undefined}
 */
SUI.Clock.prototype._drawMinutes = function(timeNode) {
  var timeMinutes = new SUI.Time(timeNode, {
    selected: this.minutes,
    captions: ['00', '05']
  });
  timeMinutes.eventClick = function(index) {
    this._changeMode(-1);
    var time = this.time['minute'](index);
    this._onClick(time);
  }.bind(this);
  timeMinutes.draw(0, 59, 5, true);
};

/**
 * @private
 * @param {!SUI.Node} timeNode
 * @return {undefined}
 */
SUI.Clock.prototype._drawHours = function(timeNode) {
  var timeHours = new SUI.Time(timeNode, {
    selected: this.hours
  });
  timeHours.eventClick = function(index) {
    this._changeMode(1);
    var hour = this.period === 'pm' ? index + 12 : index;
    hour = hour === 24 ? 0 : hour;
    var time = this.time['hour'](hour);
    this._onClick(time);
  }.bind(this);
  timeHours.draw(1, 12, 1, true);
};

/**
 * @private
 * @param {!Object} selectedTime
 * @return {undefined}
 */
SUI.Clock.prototype._onClick = function(selectedTime) {
  this.setTime(selectedTime);
  this.draw();
  this.eventClick(selectedTime);
};

/**
 * @param {!Object} time
 * @return {undefined}
 */
SUI.Clock.prototype.eventClick = function(time) {
  console.warn('SUI.Clock.eventClick()', time);
};
