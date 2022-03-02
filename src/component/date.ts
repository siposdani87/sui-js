import { consoleWarn } from "../base";
import { Item } from "../core/item";
import { Calendar } from "./calendar";
import { Clock } from "./clock";

/**
 * @constructor
 * @this {Date}
 * @param {!Item} node
 * @param {!Object} options
 */
export const Date = function(node, options) {
  this.datetimeNode = node;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
Date.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
Date.prototype._init = function() {
  this._initVariables();
  this._initStructure();
  this._setValue(this.options.value);
};

/**
 * @private
 * @return {undefined}
 */
Date.prototype._initVariables = function() {
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
Date.prototype._initStructure = function() {
  this._initDateTimeNode();
  this._initCalendarNode();
  this._initClockNode();
};

/**
 * @private
 * @return {undefined}
 */
Date.prototype._initDateTimeNode = function() {
  this.datetimeNode.addClass('datetime');
  this.datetimeNode.removeChildren();
};

/**
 * @private
 * @return {undefined}
 */
Date.prototype._initCalendarNode = function() {
  if (this.config.calendar_type) {
    this.calendarNode = new Item('div');
    this.calendarNode.addClass('calendar');
    this.datetimeNode.appendChild(this.calendarNode);
  }
};

/**
 * @private
 * @return {undefined}
 */
Date.prototype._initClockNode = function() {
  if (this.config.clock_type) {
    this.clockNode = new Item('div');
    this.clockNode.addClass('clock');
    this.datetimeNode.appendChild(this.clockNode);
  }
};

/**
 * @return {!Object}
 */
Date.prototype.getConfig = function() {
  return this.config;
};

/**
 * @private
 * @param {string} value
 * @return {undefined}
 */
Date.prototype._setValue = function(value) {
  value = value || window['moment']()['format'](this.config.format);
  this.value = window['moment'](value, this.config.format);
};

/**
 * @param {string} value
 * @return {undefined}
 */
Date.prototype.setValue = function(value) {
  this._initStructure();
  this._setValue(value);
  this.draw();
};

/**
 * @return {string}
 */
Date.prototype.getValue = function() {
  return this.value['format'](this.config.format);
};

/**
 * @return {undefined}
 */
Date.prototype.draw = function() {
  this._drawCalendar();
  this._drawClock();
};

/**
 * @private
 * @return {undefined}
 */
Date.prototype._drawCalendar = function() {
  if (this.config.calendar_type) {
    const calendar = new Calendar(this.calendarNode, {
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
Date.prototype._drawClock = function() {
  if (this.config.clock_type) {
    const clock = new Clock(this.clockNode, {
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
Date.prototype._onClick = function() {
  const value = this.getValue();
  this.eventClick(value);
};

/**
 * @param {string} value
 * @return {undefined}
 */
Date.prototype.eventClick = function(value) {
  consoleWarn('Date.eventClick()', value);
};
