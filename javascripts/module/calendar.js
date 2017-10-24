goog.provide('SUI.Calendar');

goog.require('SUI.Day');
goog.require('SUI.Month');
goog.require('SUI.Node');
goog.require('SUI.Year');

/**
 * @constructor
 * @this {SUI.Calendar}
 * @param {!SUI.Node} node
 * @param {!Object} options
 */
SUI.Calendar = function(node, options) {
  this.calendarNode = node;
  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.Calendar.prototype._setOptions = function(options) {
  this.options = options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._init = function() {
  this.maxDays = 6 * 7;
  this.maxMonths = 12;
  this.maxYears = 16;

  this.modes = ['YEAR', 'MONTH', 'DAY'];
  this.types = {
    'date': this.modes[2],
    'month': this.modes[1],
    'year': this.modes[0],
    'week': this.modes[2],
    'range': this.modes[2],
  };

  this._initStructure();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._initStructure = function() {
  this._initHeaderNode();
  this._initContentNode();
  this._initMode(this.types[this.options.type]);

  let date = window['moment'](this.options.date);
  this._selectDate(date);
  this.setDate(date);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._initHeaderNode = function() {
  this.headerNode = new SUI.Node('div');
  this.headerNode.addClass('header');
  this.calendarNode.appendChild(this.headerNode);

  let previousButton = new SUI.Node('a');
  previousButton.setAttribute('href', 'javascript:void(0)');
  previousButton.addClass(['previous', 'mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  let prevIconNode = new SUI.Node('i');
  prevIconNode.addClass('material-icons');
  prevIconNode.setHtml('chevron_left');
  previousButton.appendChild(prevIconNode);
  previousButton.addEventListener('click', this._previous.bind(this));
  this.headerNode.appendChild(previousButton);

  this.currentModeNode = new SUI.Node('span');
  this.currentModeNode.addClass('current-mode');
  this.currentModeNode.addEventListener('click', function() {
    this._changeMode(-1);
    this.draw();
  }.bind(this));
  this.headerNode.appendChild(this.currentModeNode);

  let nextButton = new SUI.Node('a');
  nextButton.setAttribute('href', 'javascript:void(0)');
  nextButton.addClass(['previous', 'mdl-button', 'mdl-js-button', 'mdl-button--icon']);
  let nextIconNode = new SUI.Node('i');
  nextIconNode.addClass('material-icons');
  nextIconNode.setHtml('chevron_right');
  nextButton.appendChild(nextIconNode);
  nextButton.addEventListener('click', this._next.bind(this));
  this.headerNode.appendChild(nextButton);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._initContentNode = function() {
  this.contentNode = new SUI.Node('div');
  this.contentNode.addClass('content');
  this.calendarNode.appendChild(this.contentNode);
};

/**
 * @private
 * @param {number} direction
 * @return {undefined}
 */
SUI.Calendar.prototype._changeMode = function(direction) {
  let mode = this._getMode(direction);
  this._initMode(mode);
};

/**
 * @private
 * @param {number} direction
 * @return {string}
 */
SUI.Calendar.prototype._getMode = function(direction) {
  let position = this.modes.indexOf(this.activeMode);
  if (position !== -1) {
    position += direction;
  }
  let mode = this.modes[position];
  return mode ? mode : this.types[this.options.type];
};

/**
 * @private
 * @param {!Function} dayFun
 * @param {!Function} monthFun
 * @param {!Function} yearFun
 * @return {!Object}
 */
SUI.Calendar.prototype._switchMode = function(dayFun, monthFun, yearFun) {
  let result = null;
  switch (this.activeMode) {
    case 'DAY':
      result = dayFun();
      break;
    case 'MONTH':
      result = monthFun();
      break;
    case 'YEAR':
      result = yearFun();
      break;
    default:
      break;
  }
  return result;
};

/**
 * @private
 * @param {string} mode
 * @return {undefined}
 */
SUI.Calendar.prototype._initMode = function(mode) {
  this.contentNode.removeChildren();
  this.activeMode = mode;
  this._switchMode(this._initDaysMode.bind(this), this._initMonthsMode.bind(this), this._initYearsMode.bind(this));
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._initYearsMode = function() {
  this.yearsNode = new SUI.Node('div');
  this.yearsNode.addClass('years');
  this.contentNode.appendChild(this.yearsNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._initMonthsMode = function() {
  this.monthsNode = new SUI.Node('div');
  this.monthsNode.addClass('months');
  this.contentNode.appendChild(this.monthsNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._initDaysMode = function() {
  this.weekDaysNode = new SUI.Node('div');
  this.weekDaysNode.addClass('week-days');
  this.contentNode.appendChild(this.weekDaysNode);

  this.daysNode = new SUI.Node('div');
  this.daysNode.addClass('days');
  this.contentNode.appendChild(this.daysNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._previous = function() {
  let date = this._switchMode(function() {
    return this.previous.month;
  }.bind(this), function() {
    return this.previous.year;
  }.bind(this), function() {
    let date = this.current.day['clone']()['subtract'](this.maxYears, 'years');
    if (date['year']() < 0) {
      date = this.current.day['clone']();
    }
    return date;
  }.bind(this));
  this.setDate(date);
  this.draw();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._next = function() {
  let date = this._switchMode(function() {
    return this.next.month;
  }.bind(this), function() {
    return this.next.year;
  }.bind(this), function() {
    return this.current.day['clone']()['add'](this.maxYears, 'years');
  }.bind(this));
  this.setDate(date);
  this.draw();
};

/**
 * @private
 * @param {!Object} date
 * @return {undefined}
 */
SUI.Calendar.prototype.setDate = function(date) {
  this._setVariables(date);

  this._setPreviousMonth();
  this._setCurrentMonth();
  this._setNextMonth();
};

/**
 * @private
 * @param {!Object} date
 * @return {undefined}
 */
SUI.Calendar.prototype._setVariables = function(date) {
  this.days = [];

  this.previous = {
    day: window['moment'](date)['subtract'](1, 'days'),
    month: window['moment'](date)['subtract'](1, 'months'),
    year: window['moment'](date)['subtract'](1, 'years'),
  };

  this.current = {
    day: window['moment'](date),
  };

  this.next = {
    day: window['moment'](date)['add'](1, 'days'),
    month: window['moment'](date)['add'](1, 'months'),
    year: window['moment'](date)['add'](1, 'years'),
  };
};

/**
 * @return {undefined}
 */
SUI.Calendar.prototype.draw = function() {
  this._switchMode(this._drawDaysStructure.bind(this), this._drawMonthsStructure.bind(this), this._drawYearsStructure.bind(this));
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawDaysStructure = function() {
  this._drawHeader('YYYY MMMM');
  this._drawWeekDays();
  this._drawDays();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawMonthsStructure = function() {
  this._drawHeader('YYYY');
  this._drawMonths();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawYearsStructure = function() {
  this._drawHeader(null);
  this._drawYears();
};

/**
 * @private
 * @param {string|null} format
 * @return {undefined}
 */
SUI.Calendar.prototype._drawHeader = function(format) {
  this.currentModeNode.removeChildren();
  let text = format ? this.current.day['format'](format) : '';
  this.currentModeNode.setHtml(text);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawMonths = function() {
  this.monthsNode.removeChildren();
  for (let i = 0; i < this.maxMonths; i++) {
    let month = new SUI.Month(this.current.day['clone']()['month'](i), this.selectedDate, {});
    month.eventClick = this._onClick.bind(this);
    let node = month.getNode();
    this.monthsNode.appendChild(node);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawYears = function() {
  this.yearsNode.removeChildren();
  let startYear = this.current.day['year']() - (this.current.day['year']() % this.maxYears);
  for (let i = startYear; i < (startYear + this.maxYears); i++) {
    let year = new SUI.Year(this.current.day['clone']()['year'](i), this.selectedDate, {});
    year.eventClick = this._onClick.bind(this);
    let node = year.getNode();
    this.yearsNode.appendChild(node);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawWeekDays = function() {
  this.weekDaysNode.removeChildren();
  for (let i = this.options.start_day; i < this.options.start_day + 7; i++) {
    let node = new SUI.Node('span');
    node.addClass('day');
    let text = window['moment']['weekdaysMin'](i % 7);
    node.setHtml(text);
    this.weekDaysNode.appendChild(node);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._drawDays = function() {
  this.daysNode.removeChildren();
  for (let i = 0; i < this.days.length; i++) {
    let day = this.days[i];
    let node = day.getNode();
    this.daysNode.appendChild(node);
  }
};

/**
 * @private
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {string}
 */
SUI.Calendar.prototype._getDate = function(year, month, day) {
  let results = [year, month + 1, day];
  return results.join('-');
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._setPreviousMonth = function() {
  let diffDays = this.previous.month['endOf']('month')['day']() - this.options.start_day;
  for (let i = this.previous.month['daysInMonth']() - diffDays; i <= this.previous.month['daysInMonth'](); i++) {
    let date = this._getDate(this.previous.month['year'](), this.previous.month['month'](), i);
    let day = new SUI.Day(date, this.selectedDate, {
      css_class: 'previous-month',
    });
    day.eventClick = this._onClick.bind(this);
    this.days.push(day);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._setCurrentMonth = function() {
  for (let i = 1; i <= this.current.day['daysInMonth'](); i++) {
    let date = this._getDate(this.current.day['year'](), this.current.day['month'](), i);
    let day = new SUI.Day(date, this.selectedDate, {
      css_class: 'current-month',
    });
    day.eventClick = this._onClick.bind(this);
    this.days.push(day);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Calendar.prototype._setNextMonth = function() {
  let numOfDays = this.days.length;
  let diffDays = this.maxDays - numOfDays;
  for (let i = 1; i <= diffDays; i++) {
    let date = this._getDate(this.next.month['year'](), this.next.month['month'](), i);
    let day = new SUI.Day(date, this.selectedDate, {
      css_class: 'next-month',
    });
    day.eventClick = this._onClick.bind(this);
    this.days.push(day);
  }
};

/**
 * @private
 * @param {!Object} selectedDate
 * @return {undefined}
 */
SUI.Calendar.prototype._setModeDate = function(selectedDate) {
  let date = this.current.day['clone']();
  this._switchMode(function() {
    date['month'](selectedDate['month']());
    date['date'](selectedDate['date']());
  }, function() {
    date['month'](selectedDate['month']());
  }, function() {
    date['year'](selectedDate['year']());
  });
  this._selectDate(date);
  this.setDate(date);
};

/**
 * @private
 * @param {!Object} selectedDate
 * @return {undefined}
 */
SUI.Calendar.prototype._onClick = function(selectedDate) {
  this._setModeDate(selectedDate);

  let mode = this.types[this.options.type];
  if (this.activeMode !== mode) {
    this._changeMode(1);
  }
  this.draw();
  this.eventClick(selectedDate);
};

/**
 * @private
 * @param {!Object} date
 * @return {undefined}
 */
SUI.Calendar.prototype._selectDate = function(date) {
  this.selectedDate = date;
};

/**
 * @param {!Object} date
 * @return {undefined}
 */
SUI.Calendar.prototype.eventClick = function(date) {
  console.warn('SUI.Calendar.eventClick()', date);
};
