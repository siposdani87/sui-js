/**
 * @license
 * Copyright 2015 Dániel Sipos (siposdani87@gmail.com),
 * SUI-JS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * A component handler interface using the revealing module design pattern.
 * More details on this design pattern here
 *
 * @author Dániel Sipos
 */

goog.provide('SUI');

goog.requireType('SUI.Node');

/**
 * @struct
 */
const SUI = {
  title: 'SUI-JS',
  description: 'Frontend framework helps to build fast and modern web applications',
  version: '0.5.0',
  const: {},
  config: {},
  res: {},
  // lib: {},
  // test: {},
  // widget: {},
  coreRes: {},
  _scrollInterval: null,
};

/**
 * @export
 */
SUI.coreRes = {
  // CORE
  app: 'app',
  config: 'config',
  event: 'event',
  scheduler: 'scheduler',
  http: 'http',
  flash: 'flash',
  template: 'template',
  dialog: 'dialog',
  confirm: 'confirm',
  viewer: 'viewer',
  header: 'header',
  topMenu: 'topMenu',
  leftMenu: 'leftMenu',
  leftSidebar: 'leftSidebar',
  rightSidebar: 'rightSidebar',
  footer: 'footer',
  bottomMenu: 'bottomMenu',
  navBar: 'navBar',
  script: 'script',
  style: 'style',
  state: 'state',
  dom: 'dom',
  document: 'document',
  window: 'window',
  helper: 'helper',
  cookie: 'cookie',
  localStorage: 'localStorage',
  sessionStorage: 'sessionStorage',
  browser: 'browser',
  loader: 'loader',
  progressBar: 'progressBar',
  geoLocation: 'geoLocation',
  instances: 'instances',
  console: 'console',
  serviceWorker: 'serviceWorker',
  actionCable: 'actionCable',
};

/**
 * @export
 * @define {boolean}
 */
SUI.production = false;

/**
 * @param {...*} message
 */
SUI.consoleLog = function(...message) {
  if (!SUI.production) {
    console.log(...message);
  }
};

/**
 * @param {...*} message
 */
SUI.consoleInfo = function(...message) {
  if (!SUI.production) {
    console.info(...message);
  }
};

/**
 * @param {...*} message
 */
SUI.consoleWarn = function(...message) {
  if (!SUI.production) {
    console.warn(...message);
  }
};

/**
 * @param {...*} message
 */
SUI.consoleError = function(...message) {
  if (!SUI.production) {
    console.error(...message);
  }
};

/**
 * @export
 * @param {*} value
 * @return {*}
 */
SUI.typeCast = function(value) {
  let result = value;
  if (SUI.isString(value) && !SUI.contain(/** @type {string} */(value), ' ')) {
    const lowerCaseValue = value.toLowerCase();
    if (SUI.eq(lowerCaseValue, '')) {
      result = '';
    } else if (SUI.eq(lowerCaseValue, 'undefined')) {
      result = undefined;
    } else if (SUI.eq(lowerCaseValue, 'null')) {
      result = null;
    } else if (SUI.eq(lowerCaseValue, 'true')) {
      result = true;
    } else if (SUI.eq(lowerCaseValue, 'false')) {
      result = false;
    } else if (SUI.eq(lowerCaseValue, 'infinity')) {
      result = Infinity;
    } else if (SUI.isNumber(lowerCaseValue)) {
      result = Number(lowerCaseValue);
    }
  }
  return result;
};

/**
 * @param {!Object} baseModule
 * @param {!Array} baseModuleArgs
 * @param {!Object=} opt_extendModule
 * @param {!Array=} opt_extendModuleArgs
 * @return {!Object}
 */
SUI.invoke = function(baseModule, baseModuleArgs, opt_extendModule, opt_extendModuleArgs) {
  /**
   * @constructor
   * @this {SUI.Cls}
   * @return {!Object}
   */
  SUI.Cls = function() {
    if (opt_extendModule) {
      opt_extendModule.apply(this, opt_extendModuleArgs || baseModuleArgs);
    }
    return baseModule.apply(this, baseModuleArgs);
  };

  if (opt_extendModule) {
    SUI.Cls.prototype = SUI.merge(opt_extendModule.prototype, baseModule.prototype);
    SUI.Cls.prototype.constructor = SUI.Cls;
  } else {
    SUI.Cls.prototype = baseModule.prototype;
  }

  return new SUI.Cls();
};

/**
 * @export
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
SUI.merge = function(objA, objB) {
  const obj = SUI.copyObject(objA);
  for (const key in objB) {
    if (objB.hasOwnProperty(key)) {
      if (SUI.isObject(objB[key].constructor)) {
        obj[key] = SUI.merge(obj[key], objB[key]);
      } else {
        obj[key] = objB[key];
      }
    }
  }
  return obj;
};

/**
 * @export
 * @param {string} str
 * @param {!Object|!Array|null=} opt_params
 * @param {string=} opt_prefix
 * @param {string=} opt_postfix
 * @return {string}
 */
SUI.format = function(str, opt_params = null, opt_prefix = '\\{', opt_postfix = '\\}') {
  SUI.each(opt_params, (value, key) => {
    const regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
    str = str.replace(regex, value);
  });
  return str;
};

/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {*}
 */
SUI.convert = function(value, type) {
  let result = value;
  if (SUI.isNumber(value)) {
    result = SUI.convertNumber(/** @type {number} */(value), type);
  } else if (SUI.isString(value)) {
    result = SUI.convertString(/** @type {string} */(value), type);
  }
  return result;
};

/**
 * @export
 * @param {number} value
 * @param {string} type
 * @return {number|string}
 */
SUI.convertNumber = function(value, type) {
  let result = value;
  switch (type) {
    case 'string':
      result = value.toString();
      break;
  }
  return result;
};

/**
 * @export
 * @param {string} value
 * @param {string} type
 * @return {string|number}
 */
SUI.convertString = function(value, type) {
  let result = value;
  switch (type) {
    case 'integer':
      result = parseInt(value, 10);
      break;
    case 'float':
      result = parseFloat(value);
      break;
  }
  return result;
};

/**
 * @export
 * @param {*} value
 * @param {*} default_value
 * @return {*}
 */

SUI.defaultValue = function(value, default_value) {
  return !SUI.isUndefined(value) ? value : default_value;
};

/**
 * @export
 * @param {*=} opt_result
 * @return {!Function}
 */
SUI.noop = function(opt_result) {
  return function() {
    return opt_result;
  };
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.eq = function(a, b) {
  return a === b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.neq = function(a, b) {
  return a !== b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.gt = function(a, b) {
  return a > b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.gte = function(a, b) {
  return a >= b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.lt = function(a, b) {
  return a < b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.lte = function(a, b) {
  return a <= b;
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isArray = function(value) {
  return SUI.instanceOf(value, Array);
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isFunction = function(value) {
  return SUI.is(value, 'function');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isString = function(value) {
  return SUI.is(value, 'string');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isNumber = function(value) {
  return value !== null && value !== '' && !isNaN(value) && (!SUI.inArray(['0', '+'], value?.[0]) || value === '0') && Number(value).toString() !== 'NaN' && Number(value).toString() !== 'Infinity';
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isFloat = function(value) {
  return parseFloat(value) === value;
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isInteger = function(value) {
  return parseInt(value, 10) === value;
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isObject = function(value) {
  return SUI.is(value, 'object');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isNull = function(value) {
  return (value === null);
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isUndefined = function(value) {
  return SUI.is(value, 'undefined');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
SUI.isFinite = function(value) {
  return isFinite(value);
};

/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
SUI.is = function(value, type) {
  return (typeof value === type);
};

/**
 * @export
 * @param {*} value
 * @param {!Object} object
 * @return {boolean}
 */
SUI.instanceOf = function(value, object) {
  return value instanceof object;
};

/**
 * @export
 * @param {*} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
SUI.each = function(items, next, opt_start, opt_end) {
  if (SUI.isArray(items)) {
    SUI.eachArray(/** @type {!Array} */(items), next, opt_start, opt_end);
  } else if (SUI.isObject(items)) {
    SUI.eachObject(/** @type {!Object} */(items), next);
  }
};

/**
 * @export
 * @param {!Array} items
 * @param {!Function} next
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {undefined}
 */
SUI.eachArray = function(items, next, opt_start, opt_end) {
  opt_start = opt_start || 0;
  opt_end = opt_end || items.length;
  for (let i = opt_start; i < opt_end; i++) {
    next(items[i], i);
  }
};

/**
 * @export
 * @param {!Object} object
 * @param {!Function} next
 * @return {undefined}
 */
SUI.eachObject = function(object, next) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      next(object[key], key);
    }
  }
};

/**
 * @export
 * @param {function(number):*} next
 * @param {number} i
 * @param {number} length
 * @param {number} duration
 * @return {undefined}
 */
SUI.sleepEach = function(next, i, length, duration) {
  const loop = function() {
    next(i);
    i++;
    if (i < length) {
      setTimeout(loop, duration);
    }
  };
  loop();
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {undefined}
 */
SUI.clear = function(items) {
  if (SUI.isArray(items)) {
    SUI.clearArray(/** @type {!Array} */(items));
  } else if (SUI.isObject(items)) {
    SUI.clearObject(/** @type {!Object} */(items));
  }
};

/**
 * @export
 * @param {!Array} items
 * @return {undefined}
 */
SUI.clearArray = function(items) {
  items.splice(0, items.length);
};

/**
 * @export
 * @param {!Object} items
 * @return {undefined}
 */
SUI.clearObject = function(items) {
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      delete items[key];
    }
  }
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
SUI.inArray = function(items, item) {
  return items.indexOf(item) !== -1;
};

/**
 * @export
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
SUI.contain = function(str, subStr) {
  return str.indexOf(subStr) !== -1;
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
SUI.inContainArray = function(items, item) {
  let i = 0;
  while (i < items.length && !SUI.contain(/** @type {string} */(item), items[i])) {
    i++;
  }
  return i < items.length;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.isSame = function(a, b) {
  const strA = JSON.stringify(a);
  const strB = JSON.stringify(b);
  if (SUI.isObject(a) && SUI.isObject(b) && SUI.eq(strA.length, strB.length)) {
    let result = true;
    SUI.eachObject(/** @type {!Object} */(a), (value, key) => {
      if (!SUI.isSame(b[key], value)) {
        result = false;
      }
    });
    return result;
  }
  return SUI.eq(strA, strB);
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {undefined}
 */
SUI.remove = function(items, item) {
  const position = items.indexOf(item);
  if (SUI.neq(position, -1)) {
    items.splice(position, 1);
  }
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {!Array|!Object|undefined}
 */
SUI.copy = function(items) {
  let results;
  if (SUI.isArray(items)) {
    results = SUI.copyArray(/** @type {!Array} */(items));
  } else if (SUI.isObject(items)) {
    results = SUI.copyObject(/** @type {!Object} */(items));
  }
  return results;
};

/**
 * @export
 * @param {!Array} items
 * @return {!Array}
 */
SUI.copyArray = function(items) {
  // TODO object, array copy
  // return JSON.parse(JSON.stringify(items));
  return [].concat(items);
};

/**
 * @export
 * @param {!Object} items
 * @return {!Object}
 */
SUI.copyObject = function(items) {
  const results = {};
  SUI.eachObject(items, function(item, key) {
    results[key] = SUI.isObject(item) ? SUI.copyObject(item) : item;
  });
  return results;
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {boolean}
 */
SUI.isEmpty = function(items) {
  let result = false;
  if (SUI.isArray(items)) {
    result = items.length === 0;
  } else if (SUI.isObject(items)) {
    let counter = 0;
    SUI.each(items, function() {
      counter++;
    });
    result = counter === 0;
  }
  return result;
};

/**
 * @export
 * @param {!Array} args
 * @param {!Function} callback
 * @return {undefined}
 */
SUI.list = function(args, callback) {
  callback(...args);
};

/**
 * @export
 * @param {number} min
 * @param {number} max
 * @param {boolean=} opt_onlyFloat
 * @return {number}
 */
SUI.random = function(min, max, opt_onlyFloat = false) {
  let result;
  if (opt_onlyFloat) {
    result = Math.random() * (max - min) + min;
  } else {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return result;
};

/**
 * @export
 * @param {string} text
 * @return {string}
 */
SUI.encodeBase64 = function(text) {
  const words = window['CryptoJS']['enc']['Utf8']['parse'](text);
  return window['CryptoJS']['enc']['Base64']['stringify'](words);
};

/**
 * @export
 * @param {string} encodedText
 * @return {string}
 */
SUI.decodeBase64 = function(encodedText) {
  const words = window['CryptoJS']['enc']['Base64']['parse'](encodedText);
  return window['CryptoJS']['enc']['Utf8']['stringify'](words);
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
SUI.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @export
 * @param {!Array} items
 * @param {string} attribute
 * @return {!Array}
 */
SUI.pluck = function(items, attribute) {
  const results = [];
  SUI.eachArray(items, (item) => {
    const result = item.get(attribute);
    results.push(result);
  });
  return results;
};

/**
 * @export
 * @param {!Object} obj
 * @param {function(*, string)} condition
 * @return {!Array}
 */
SUI.pluckKeys = function(obj, condition) {
  const results = [];
  SUI.eachObject(obj, (value, key) => {
    if (condition(value, key)) {
      results.push(key);
    }
  });
  return results;
};

/**
 * @export
 * @param {number} price
 * @param {string=} opt_delimiter
 * @param {string=} opt_separator
 * @param {number=} opt_precision
 * @return {string}
 */
SUI.currency = function(price, opt_delimiter = ' ', opt_separator = ',', opt_precision = 0) {
  if (!price) {
    price = 0;
  }
  price = Math10.round(price, opt_precision * -1);
  const parts = price.toFixed(opt_precision).toString().split('.');
  const decimal = parts[1];
  let currency = parts[0].split('').reverse().map((char, index) => {
    return !(index % 3) && index ? char + opt_delimiter : char;
  }).reverse().join('');
  if (decimal) {
    currency += opt_separator + decimal;
  }
  return currency;
};

/**
 * @export
 * @param {number} num
 * @param {number} exp
 * @return {string}
 */
SUI.number = function(num, exp) {
  const si = [
    {value: 1E24, symbol: 'Y'},
    {value: 1E21, symbol: 'Z'},
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'K'},
    {value: 0, symbol: ''},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let result = Math10.round(num, exp).toString().replace(rx, '$1');
  let i = 0;
  while (i < si.length && num < si[i].value) {
    result = Math10.round((num / (si[i + 1].value || 1)), exp).toString().replace(rx, '$1') + si[i + 1].symbol;
    i++;
  }
  return result;
};

/**
 * @export
 * @param {!SUI.Node|!Element=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
SUI.mdl = function(opt_node, opt_forceDowngrade = true) {
  let element = opt_node || document;
  if (SUI.isFunction(element.getNode)) {
    element = element.getNode();
  }
  if (opt_node) {
    if (opt_forceDowngrade) {
      window['componentHandler']['downgradeElements'](element);
    }
    window['componentHandler']['upgradeElement'](element);
  } else {
    window['componentHandler']['upgradeDom']();
  }
};

/**
 * @export
 * @param {string} type
 * @param {!Object} props
 * @param {!SUI.Node} mountNode
 * @return {!Object}
 */
SUI.reactRender = function(type, props, mountNode) {
  return window['ReactDOM']['render'](window['React']['createElement'](window[type], props), mountNode.getNode());
};

/**
 * @export
 * @param {!SUI.Node} mountNode
 * @return {undefined}
 */
SUI.reactUnmount = function(mountNode) {
  window['ReactDOM']['unmountComponentAtNode'](mountNode.getNode());
};

/**
 * @export
 * @param {!Object} marker
 * @param {string} title
 * @return {!Object}
 */
SUI.mapLabel = function(marker, title) {
  // https://github.com/googlemaps/js-map-label/blob/gh-pages/src/maplabel.js
  // https://googlemaps.github.io/js-map-label/docs/reference.html
  const mapLabel = new window['MapLabel']({
    'text': title,
    'strokeWeight': 2,
    'fontFamily': 'sans-serif',
  });

  mapLabel['bindTo']('position', marker);
  mapLabel['bindTo']('map', marker);

  return mapLabel;
};

/**
 * @export
 * @param {string} title
 * @param {!Object} position
 * @param {!Object} map
 * @return {!Object}
 */
SUI.mapText = function(title, position, map) {
  return new window['MapLabel']({
    'text': title,
    'strokeWeight': 2,
    'fontFamily': 'sans-serif',
    'position': position,
    'map': map,
  });
};

/**
 * @export
 * @param {*} value
 * @param {string} passPhrase
 * @return {string}
 */
SUI.encrypt = function(value, passPhrase) {
  const item = JSON.stringify(value);
  return window['CryptoJS']['AES']['encrypt'](item, passPhrase);
};

/**
 * @export
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
SUI.decrypt = function(item, passPhrase) {
  const value = window['CryptoJS']['AES']['decrypt'](item, passPhrase)['toString'](window['CryptoJS']['enc']['Utf8']);
  return JSON.parse(value || 'null');
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
SUI.md5 = function(str) {
  return window['CryptoJS']['MD5'](str);
};

/**
 * @export
 * @param {string} name
 * @return {string}
 */
SUI.generateId = function(name) {
  const guid = SUI.guid();
  return [name, guid].join('-');
};

/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @export
 * @return {string}
 */
SUI.guid = function() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
 * @export
 * @return {string}
 */
SUI.uuid = function() {
  return [
    Math.random().toString(16).slice(2, 10),
    Math.random().toString(16).slice(2, 6),
    (Math.random() * .0625 /* 0x.1 */ + .25 /* 0x.4 */).toString(16).slice(2, 6),
    (Math.random() * .25 /* 0x.4 */ + .5 /* 0x.8 */).toString(16).slice(2, 6),
    Math.random().toString(16).slice(2, 14),
  ].join('-');
};

/**
 * @export
 * @param {number} x
 * @param {number} y
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
SUI.scrollTo = function(x, y, opt_duration = 500, opt_step = 20) {
  clearInterval(SUI._scrollInterval);
  let scrollStepX = -(window.scrollX - x) / (opt_duration / opt_step);
  let scrollStepY = -(window.scrollY - y) / (opt_duration / opt_step);
  SUI._scrollInterval = setInterval(() => {
    if ((scrollStepX > 0 && window.scrollX + scrollStepX > x) || (scrollStepX < 0 && window.scrollX + scrollStepX < x)) {
      scrollStepX = x - window.scrollX;
    }
    if ((scrollStepY > 0 && window.scrollY + scrollStepY > y) || (scrollStepY < 0 && window.scrollY + scrollStepY < y)) {
      scrollStepY = y - window.scrollY;
    }
    if (window.scrollX !== x || window.scrollY !== y) {
      window.scrollBy(scrollStepX, scrollStepY);
    } else {
      clearInterval(SUI._scrollInterval);
    }
  }, opt_step);
};

/**
 * @export
 * @param {string} selector
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
SUI.scrollToElement = function(selector, opt_duration = 500, opt_step = 20) {
  const nodeList = document.querySelectorAll(selector);
  const element = nodeList[0];
  const x = element.offsetLeft;
  const y = element.offsetTop;
  SUI.scrollTo(x, y, opt_duration, opt_step);
};

/**
 * @export
 * @param {string} selector
 * @param {string=} opt_behavior
 * @return {undefined}
 */
SUI.scrollIntoView = function(selector, opt_behavior = 'smooth') {
  document.querySelector(selector).scrollIntoView({
    behavior: opt_behavior,
  });
};

/**
 * @export
 * @param {!Function} func
 * @param {number=} opt_wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
SUI.debounce = function(func, opt_wait = 250, opt_immediate = false) {
  let timeout;
  return function(...args) {
    const later = function() {
      timeout = null;
      if (!opt_immediate) func(...args);
    };
    const callNow = opt_immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, opt_wait);
    if (callNow) func(...args);
  };
};

/**
 * @export
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.urlWithQueryString = function(url, opt_params) {
  const queryString = SUI.getQueryString(opt_params);
  const separator = SUI.contain(url, '?') ? '&' : '?';
  return url + (queryString ? separator + queryString : '');
};

/**
 * @export
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.getQueryString = function(opt_params) {
  const queries = [];
  SUI.each(opt_params, function(param, key) {
    if (SUI.isArray(param)) {
      SUI.eachArray(param, (value) => {
        queries.push(SUI.format('{0}[]={1}', [key, value]));
      });
    } else if (!SUI.isUndefined(param) && !SUI.isNull(param)) {
      queries.push(SUI.format('{0}={1}', [key, param]));
    }
  });
  return SUI.isEmpty(queries) ? '' : queries.join('&');
};

/**
 * @export
 * @param {string} url
 * @return {string}
 */
SUI.getExtensionName = function(url) {
  const realUrl = url.split('?', 2)[0];
  return realUrl.slice((Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1);
};

/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {!Array}
 */
SUI.RGBToHSV = function(red, green, blue) {
  const rabs = red / 255;
  const gabs = green / 255;
  const babs = blue / 255;
  const v = Math.max(rabs, gabs, babs);
  const diff = v - Math.min(rabs, gabs, babs);
  const diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  const percentRoundFn = (num) => Math.round(num * 100) / 100;
  let h = 0;
  let s = 0;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    const rr = diffc(rabs);
    const gg = diffc(gabs);
    const bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)];
};

/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
SUI.RGBToHEX = function(red, green, blue) {
  const colors = [red, green, blue];
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] <= 16) {
      colors[i] = '0' + colors[i].toString(16);
    } else {
      colors[i] = '' + colors[i].toString(16);
    }
  }
  return '#' + colors.join('');
};

/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
SUI.HEXToHSV = function(hexColor) {
  const [red, green, blue] = SUI.HEXToRGB(hexColor);
  return SUI.RGBToHSV(red, green, blue);
};

/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
SUI.HEXToRGB = function(hexColor) {
  const hex = hexColor || '';
  const red = parseInt(hex.substr(1, 2), 16);
  const green = parseInt(hex.substr(3, 2), 16);
  const blue = parseInt(hex.substr(5, 2), 16);
  return [red, green, blue];
};

/**
 * @export
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {!Array}
 */
SUI.HSVToRGB = function(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0;
  let g = 0;
  let b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/**
 * @export
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {string}
 */
SUI.HSVToHEX = function(h, s, v) {
  const [red, green, blue] = SUI.HSVToRGB(h, s, v);
  return SUI.RGBToHEX(red, green, blue);
};

/**
 * @export
 * @param {string} hexColor
 * @param {string=} opt_lightColor
 * @param {string=} opt_darkColor
 * @return {string}
 */
SUI.colorContrastYIQ = function(hexColor, opt_lightColor = '#FEFEFE', opt_darkColor = '#252525') {
  const colors = SUI.HEXToRGB(hexColor);
  const yiq = ((colors[0] * 299) + (colors[1] * 587) + (colors[2] * 114)) / 1000;
  return yiq >= 128 ? opt_darkColor : opt_lightColor;
};

/**
 * @export
 * @param {string} hexColor
 * @param {number=} opt_diff
 * @return {string}
 */
SUI.colorContrast = function(hexColor, opt_diff = .5) {
  const colors = SUI.HEXToRGB(hexColor);
  for (let i = 0; i < colors.length; i++) {
    colors[i] += Math.round((colors[i] * opt_diff));
    if (colors[i] < 0) {
      colors[i] = 0;
    } else if (colors[i] > 255) {
      colors[i] = 255;
    }
  }
  return SUI.RGBToHEX.apply(null, colors);
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
SUI.normalize = function(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * @export
 * @param {string} str
 * @return {undefined}
 */
SUI.copyToClipboard = function(str) {
  const textareaElement = document.createElement('textarea');
  textareaElement.value = str;
  textareaElement.setAttribute('readonly', '');
  textareaElement.style.position = 'absolute';
  textareaElement.style.left = '-9999px';
  document.body.appendChild(textareaElement);
  textareaElement.select();
  document.execCommand('copy');
  document.body.removeChild(textareaElement);
};

// exports = SUI;
