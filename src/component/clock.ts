import { consoleWarn } from "../base";
import { Item } from "../core/item";
import { Time } from "./time";

/**
 * @constructor
 * @this {Clock}
 * @param {!Item} node
 * @param {!Object} options
 */
export const Clock = function(node, options) {
  this.clockNode = node;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
Clock.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._init = function() {
  this.modes = ['HOUR', 'MINUTE'];
  this.types = {
    'hour': this.modes[0],
    'minute': this.modes[1],
  };

  this._initStructure();
};

/**
 * @private
 * @param {!Function} hourCallback
 * @param {!Function} minuteCallback
 * @return {undefined}
 */
Clock.prototype._switchMode = function(hourCallback, minuteCallback) {
  let result = null;
  switch (this.activeMode) {
    case 'HOUR':
      result = hourCallback();
      break;
    case 'MINUTE':
      result = minuteCallback();
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
Clock.prototype._initStructure = function() {
  this._initHeaderNode();
  this._initContentNode();
  this._initMode(this.types[this.options.type]);

  this.setTime(this.options.time);
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._initHeaderNode = function() {
  this.headerNode = new Item('div');
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
Clock.prototype._initPeriodHeaderNode = function() {
  this.periodHeaderNode = new Item('div');
  this.periodHeaderNode.addClass('period');
  this.periodHeaderNode.addEventListener('click', this._togglePeriod.bind(this));
  this.headerNode.appendChild(this.periodHeaderNode);
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._togglePeriod = function() {
  if (this.period === 'pm') {
    this.time['subtract'](12, 'hours');
  } else {
    this.time['add'](12, 'hours');
  }
  this._onClick(this.time);
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._initMinutesHeaderNode = function() {
  this.minutesHeaderNode = new Item('div');
  this.minutesHeaderNode.addClass('minutes');
  this.minutesHeaderNode.addEventListener('click', () => {
    this._setMode(this.types['minute']);
  });
  this.headerNode.appendChild(this.minutesHeaderNode);
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._initHoursHeaderNode = function() {
  this.hoursHeaderNode = new Item('div');
  this.hoursHeaderNode.addClass('hours');
  this.hoursHeaderNode.addEventListener('click', () => {
    this._setMode(this.types['hour']);
  });
  this.headerNode.appendChild(this.hoursHeaderNode);
};

/**
 * @private
 * @param {string} mode
 * @return {undefined}
 */
Clock.prototype._setMode = function(mode) {
  this._initMode(mode);
  this.setTime(this.time);
  this.draw();
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._initSeparatorHeaderNode = function() {
  const separatorHeaderNode = new Item('div');
  separatorHeaderNode.addClass('separator');
  separatorHeaderNode.setHtml(':');
  this.headerNode.appendChild(separatorHeaderNode);
};

/**
 * @private
 * @return {undefined}
 */
Clock.prototype._initContentNode = function() {
  this.contentNode = new Item('div');
  this.contentNode.addClass('content');
  this.clockNode.appendChild(this.contentNode);
};

/**
 * @private
 * @return {!Item}
 */
Clock.prototype._getTimeNode = function() {
  this.contentNode.removeChildren();
  const hoursNode = new Item('div');
  hoursNode.addClass('time');
  this.contentNode.appendChild(hoursNode);
  return hoursNode;
};

/**
 * @private
 * @param {number} hours
 * @return {undefined}
 */
Clock.prototype._setHours = function(hours) {
  this.hours = hours;
  const cssClass = this.activeMode === this.types['hour'] ? 'active' : null;
  this.hoursHeaderNode.removeClass('active');
  this.hoursHeaderNode.addClass(['hours', cssClass]);
  const text = hours < 10 ? '0' + hours : hours;
  this.hoursHeaderNode.setHtml(text);
};

/**
 * @private
 * @param {number} minutes
 * @return {undefined}
 */
Clock.prototype._setMinutes = function(minutes) {
  this.minutes = minutes;
  const cssClass = this.activeMode === this.types['minute'] ? 'active' : null;
  this.minutesHeaderNode.removeClass('active');
  this.minutesHeaderNode.addClass(['minutes', cssClass]);
  const text = minutes < 10 ? '0' + minutes : minutes;
  this.minutesHeaderNode.setHtml(text);
};

/**
 * @private
 * @param {string} period
 * @return {undefined}
 */
Clock.prototype._setPeriod = function(period) {
  this.period = period;
  this.periodHeaderNode.removeClass(['am', 'pm']);
  this.periodHeaderNode.addClass(['period', this.period]);
  const text = window['moment']['localeData']()['meridiem'](this.time['hour'](), this.time['minute'](), true);
  this.periodHeaderNode.setHtml(text);
};

/**
 * @param {!Object} time
 * @return {undefined}
 */
Clock.prototype.setTime = function(time) {
  this.time = window['moment'](time);

  const hours = this.time['hour']() % 12 || 12;
  this._setHours(hours);

  const minutes = this.time['minute']();
  this._setMinutes(minutes);

  const period = this.time['hour']() > 12 ? 'pm' : 'am';
  this._setPeriod(period);
};

/**
 * @private
 * @param {string} mode
 * @return {undefined}
 */
Clock.prototype._initMode = function(mode) {
  this.contentNode.removeChildren();
  this.activeMode = mode;
};

/**
 * @private
 * @param {number} direction
 * @return {string}
 */
Clock.prototype._getMode = function(direction) {
  let position = this.modes.indexOf(this.activeMode);
  if (position !== -1) {
    position += direction;
  }
  const mode = this.modes[position];
  return mode ? mode : this.types[this.options.type];
};

/**
 * @private
 * @param {number} direction
 * @return {undefined}
 */
Clock.prototype._changeMode = function(direction) {
  const mode = this._getMode(direction);
  this._initMode(mode);
};

/**
 * @return {undefined}
 */
Clock.prototype.draw = function() {
  const timeNode = this._getTimeNode();

  this._switchMode(() => {
    this._drawHours(timeNode);
  }, () => {
    this._drawMinutes(timeNode);
  });
};

/**
 * @private
 * @param {!Item} timeNode
 * @return {undefined}
 */
Clock.prototype._drawMinutes = function(timeNode) {
  const timeMinutes = new Time(timeNode, {
    selected: this.minutes,
    captions: ['00', '05'],
  });
  timeMinutes.eventClick = (index) => {
    this._changeMode(-1);
    const time = this.time['minute'](index);
    this._onClick(time);
  };
  timeMinutes.draw(0, 59, 5, true);
};

/**
 * @private
 * @param {!Item} timeNode
 * @return {undefined}
 */
Clock.prototype._drawHours = function(timeNode) {
  const timeHours = new Time(timeNode, {
    selected: this.hours,
  });
  timeHours.eventClick = (index) => {
    this._changeMode(1);
    let hour = this.period === 'pm' ? index + 12 : index;
    hour = hour === 24 ? 0 : hour;
    const time = this.time['hour'](hour);
    this._onClick(time);
  };
  timeHours.draw(1, 12, 1, true);
};

/**
 * @private
 * @param {!Object} selectedTime
 * @return {undefined}
 */
Clock.prototype._onClick = function(selectedTime) {
  this.setTime(selectedTime);
  this.draw();
  this.eventClick(selectedTime);
};

/**
 * @param {!Object} time
 * @return {undefined}
 */
Clock.prototype.eventClick = function(time) {
  consoleWarn('Clock.eventClick()', time);
};
