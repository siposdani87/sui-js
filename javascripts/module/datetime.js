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
 * @return {undefined}
 */
SUI.Datetime.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._init = function() {
  this._initVariables();
  this._initStructure();
  this._setValue(this.options.value);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._initVariables = function() {
  this.types = {
    'datetime-local': {
      format: 'YYYY-MM-DDTHH:mm:ss', // 2016-05-26T11:25:00 (UTC)
      calendar_type: 'date',
      clock_type: 'hour',
    },
    'datetime': {
      format: '', // 2016-05-26T13:25:00+02:00 (ISO 8601, Hungary)
      calendar_type: 'date',
      clock_type: 'hour',
    },
    'date': {
      format: 'YYYY-MM-DD', // 2016-05-26
      calendar_type: 'date',
      clock_type: '',
    },
    'time': {
      format: 'HH:mm:ss', // 13:25:00
      calendar_type: '',
      clock_type: 'hour',
    },
    'month': {
      format: 'YYYY-MM', // 2016-05
      calendar_type: 'month',
      clock_type: '',
    },
    'week': {
      format: 'YYYY-\\Www', // 2016-W22
      calendar_type: 'week',
      clock_type: '',
    },
    'year': {
      format: 'YYYY', // 2016
      calendar_type: 'year',
      clock_type: '',
    },
  };
  this.config = this.types[this.options.type];
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._initStructure = function() {
  this._initDateTimeNode();
  this._initCalendarNode();
  this._initClockNode();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._initDateTimeNode = function() {
  this.datetimeNode.addClass('datetime');
  this.datetimeNode.removeChildren();
};

/**
 * @private
 * @return {undefined}
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
 * @return {undefined}
 */
SUI.Datetime.prototype._initClockNode = function() {
  if (this.config.clock_type) {
    this.clockNode = new SUI.Node('div');
    this.clockNode.addClass('clock');
    this.datetimeNode.appendChild(this.clockNode);
  }
};

/**
 * @return {!Object}
 */
SUI.Datetime.prototype.getConfig = function() {
  return this.config;
};

/**
 * @private
 * @param {string} value
 * @return {undefined}
 */
SUI.Datetime.prototype._setValue = function(value) {
  value = value || window['moment']()['format'](this.config.format);
  this.value = window['moment'](value, this.config.format);
};

/**
 * @param {string} value
 * @return {undefined}
 */
SUI.Datetime.prototype.setValue = function(value) {
  this._initStructure();
  this._setValue(value);
  this.draw();
};

/**
 * @return {string}
 */
SUI.Datetime.prototype.getValue = function() {
  return this.value['format'](this.config.format);
};

/**
 * @return {undefined}
 */
SUI.Datetime.prototype.draw = function() {
  this._drawCalendar();
  this._drawClock();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._drawCalendar = function() {
  if (this.config.calendar_type) {
    let calendar = new SUI.Calendar(this.calendarNode, {
      date: this.value,
      type: this.config.calendar_type,
      start_day: 1,
    });
    calendar.eventClick = (date) => {
      this.value['year'](date['year']());
      this.value['month'](date['month']());
      this.value['date'](date['date']());
      this._onClick();
    };
    calendar.draw();
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._drawClock = function() {
  if (this.config.clock_type) {
    let clock = new SUI.Clock(this.clockNode, {
      time: this.value,
      type: this.config.clock_type,
    });
    clock.eventClick = (date) => {
      this.value['hour'](date['hour']());
      this.value['minute'](date['minute']());
      this._onClick();
    };
    clock.draw();
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Datetime.prototype._onClick = function() {
  let value = this.getValue();
  this.eventClick(value);
};

/**
 * @param {string} value
 * @return {undefined}
 */
SUI.Datetime.prototype.eventClick = function(value) {
  console.warn(value);
};
