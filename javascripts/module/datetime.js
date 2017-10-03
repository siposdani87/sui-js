goog.provide('SUI.Datetime');

goog.require('SUI.Calendar');
goog.require('SUI.Clock');
goog.require('SUI.Node');

/**
 * @constructor
 * @this {SUI.Datetime}
 * @param {!SUI.Node} node
 * @param {!Object} options
 */
SUI.Datetime = function(node, options) {
  this.datetimeNode = node;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @returns {undefined}
 */
SUI.Datetime.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._init = function() {
  this._initVariables();
  this._setValue(this.options.value);
  this._initStructure();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._initStructure = function() {
  this._initDateTimeNode();
  this._initCalendarNode();
  this._initClockNode();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._initDateTimeNode = function() {
  this.datetimeNode.addClass('datetime');
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._initCalendarNode = function() {
  if (this.config.calendar_type) {
    this.calendarNode = new SUI.Node('div');
    this.calendarNode.addClass('calendar');
    this.datetimeNode.appendChild(this.calendarNode);
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._initClockNode = function() {
  if (this.config.clock_type) {
    this.clockNode = new SUI.Node('div');
    this.clockNode.addClass('clock');
    this.datetimeNode.appendChild(this.clockNode);
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._initVariables = function() {
  this.types = {
    'datetime-local': {
      format: 'YYYY-MM-DDTHH:mm:ss', //2016-05-26T11:25:00 (UTC)
      calendar_type: 'date',
      clock_type: 'hour'
    },
    'datetime': {
      format: '', //2016-05-26T13:25:00+02:00 (ISO 8601, Hungary)
      calendar_type: 'date',
      clock_type: 'hour'
    },
    'date': {
      format: 'YYYY-MM-DD', //2016-05-26
      calendar_type: 'date',
      clock_type: ''
    },
    'time': {
      format: 'HH:mm:ss', //13:25:00
      calendar_type: '',
      clock_type: 'hour'
    },
    'month': {
      format: 'YYYY-MM', // 2016-05
      calendar_type: 'month',
      clock_type: ''
    },
    'week': {
      format: 'YYYY-\\Www', // 2016-W22
      calendar_type: 'week',
      clock_type: ''
    },
    'year': {
      format: 'YYYY', // 2016
      calendar_type: 'year',
      clock_type: ''
    }
  };
  this.config = this.types[this.options.type];
};

/**
 * @private
 * @param {string} value
 * @returns {undefined}
 */
SUI.Datetime.prototype._setValue = function(value) {
  value = value || window['moment']()['format'](this.config.format);
  this.value = window['moment'](value, this.config.format);
};

/**
 * @returns {string}
 */
SUI.Datetime.prototype.getValue = function() {
  return this.value['format'](this.config.format);
};

/**
 * @returns {undefined}
 */
SUI.Datetime.prototype.draw = function() {
  this._drawCalendar();
  this._drawClock();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._drawCalendar = function() {
  if (this.config.calendar_type) {
    var calendar = new SUI.Calendar(this.calendarNode, {
      date: this.value,
      type: this.config.calendar_type,
      start_day: 1
    });
    calendar.eventClick = function(date) {
      this.value['year'](date['year']());
      this.value['month'](date['month']());
      this.value['date'](date['date']());
      this._onClick();
    }.bind(this);
    calendar.draw();
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._drawClock = function() {
  if (this.config.clock_type) {
    var clock = new SUI.Clock(this.clockNode, {
      time: this.value,
      type: this.config.clock_type
    });
    clock.eventClick = function(date) {
      this.value['hour'](date['hour']());
      this.value['minute'](date['minute']());
      this._onClick();
    }.bind(this);
    clock.draw();
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.Datetime.prototype._onClick = function() {
  var value = this.getValue();
  this.eventClick(value);
};

/**
 * @param {string} value
 * @returns {undefined}
 */
SUI.Datetime.prototype.eventClick = function(value) {
  console.warn(value);
};
