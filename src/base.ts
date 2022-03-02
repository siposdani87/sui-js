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

/**
 * @struct
 */
export const SUI = {
  title: 'SUI-JS',
  description: 'Frontend framework helps to build fast and modern web applications',
  version: '0.5.0',
  const: {},
  config: {},
  res: {},
  coreRes: {},
  _scrollInterval: null,
};

/**
 * 
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
const releaseMode = false;

/**
 * @param {...*} message
 */
export const consoleLog = function(...message) {
  if (!releaseMode) {
    console.log(...message);
  }
};

/**
 * @param {...*} message
 */
export const consoleInfo = function(...message) {
  if (!releaseMode) {
    console.info(...message);
  }
};

/**
 * @param {...*} message
 */
export const consoleWarn = function(...message) {
  if (!releaseMode) {
    console.warn(...message);
  }
};

/**
 * @param {...*} message
 */
export const consoleError = function(...message) {
  if (!releaseMode) {
    console.error(...message);
  }
};

/**
 * @export
 * @param {*} value
 * @return {*}
 */
export const typeCast = function(value) {
  let result = value;
  if (isString(value) && !contain(/** @type {string} */(value), ' ')) {
    const lowerCaseValue = value.toLowerCase();
    if (eq(lowerCaseValue, '')) {
      result = '';
    } else if (eq(lowerCaseValue, 'undefined')) {
      result = undefined;
    } else if (eq(lowerCaseValue, 'null')) {
      result = null;
    } else if (eq(lowerCaseValue, 'true')) {
      result = true;
    } else if (eq(lowerCaseValue, 'false')) {
      result = false;
    } else if (eq(lowerCaseValue, 'infinity')) {
      result = Infinity;
    } else if (isNumber(lowerCaseValue)) {
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
export const invoke = function(baseModule, baseModuleArgs, opt_extendModule?, opt_extendModuleArgs?) {
  /**
   * @constructor
   * @this {Cls}
   * @return {!Object}
   */
  const Cls = function() {
    if (opt_extendModule) {
      opt_extendModule.apply(this, opt_extendModuleArgs || baseModuleArgs);
    }
    // TODO: remove return value
    baseModule.apply(this, baseModuleArgs);
  };

  if (opt_extendModule) {
    Cls.prototype = merge(opt_extendModule.prototype, baseModule.prototype);
    Cls.prototype.constructor = Cls;
  } else {
    Cls.prototype = baseModule.prototype;
  }

  return new Cls();
};

/**
 * @export
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
export const merge = function(objA, objB) {
  const obj = copyObject(objA);
  for (const key in objB) {
    if (objB.hasOwnProperty(key)) {
      if (isObject(objB[key].constructor)) {
        obj[key] = merge(obj[key], objB[key]);
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
export const format = function(str, opt_params = null, opt_prefix = '\\{', opt_postfix = '\\}') {
  each(opt_params, (value, key) => {
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
export const convert = function(value, type) {
  let result = value;
  if (isNumber(value)) {
    result = convertNumber(/** @type {number} */(value), type);
  } else if (isString(value)) {
    result = convertString(/** @type {string} */(value), type);
  }
  return result;
};

/**
 * @export
 * @param {number} value
 * @param {string} type
 * @return {number|string}
 */
export const convertNumber = function(value, type) {
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
export const convertString = function(value, type) {
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
 * @param {*} defaultValue
 * @return {*}
 */

export const defaultValue = function(value, defaultValue) {
  return !isUndefined(value) ? value : defaultValue;
};

/**
 * @export
 * @param {*=} opt_result
 * @return {!Function}
 */
export const noop = function(opt_result?) {
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
export const eq = function(a, b) {
  return a === b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const neq = function(a, b) {
  return a !== b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gt = function(a, b) {
  return a > b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const gte = function(a, b) {
  return a >= b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lt = function(a, b) {
  return a < b;
};

/**
 * @export
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const lte = function(a, b) {
  return a <= b;
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isArray = function(value) {
  return instanceOf(value, Array);
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFunction = function(value) {
  return is(value, 'function');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isString = function(value) {
  return is(value, 'string');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isNumber = function(value) {
  return value !== null && value !== '' && !isNaN(value) && (!inArray(['0', '+'], value?.[0]) || value === '0') && Number(value).toString() !== 'NaN' && Number(value).toString() !== 'Infinity';
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFloat = function(value) {
  return parseFloat(value) === value;
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isInteger = function(value) {
  return parseInt(value, 10) === value;
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isObject = function(value) {
  return is(value, 'object');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isNull = function(value) {
  return (value === null);
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isUndefined = function(value) {
  return is(value, 'undefined');
};

/**
 * @export
 * @param {*} value
 * @return {boolean}
 */
export const isFinite = function(value) {
  return isFinite(value);
};

/**
 * @export
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export const is = function(value, type) {
  return (typeof value === type);
};

/**
 * @export
 * @param {*} value
 * @param {!Object} object
 * @return {boolean}
 */
export const instanceOf = function(value, object) {
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
export const each = function(items, next, opt_start?, opt_end?) {
  if (isArray(items)) {
    eachArray(/** @type {!Array} */(items), next, opt_start, opt_end);
  } else if (isObject(items)) {
    eachObject(/** @type {!Object} */(items), next);
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
export const eachArray = function(items, next, opt_start?, opt_end?) {
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
export const eachObject = function(object, next) {
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
export const sleepEach = function(next, i, length, duration) {
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
export const clear = function(items) {
  if (isArray(items)) {
    clearArray(/** @type {!Array} */(items));
  } else if (isObject(items)) {
    clearObject(/** @type {!Object} */(items));
  }
};

/**
 * @export
 * @param {!Array} items
 * @return {undefined}
 */
export const clearArray = function(items) {
  items.splice(0, items.length);
};

/**
 * @export
 * @param {!Object} items
 * @return {undefined}
 */
export const clearObject = function(items) {
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
export const inArray = function(items, item) {
  return items.indexOf(item) !== -1;
};

/**
 * @export
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
export const contain = function(str, subStr) {
  return str.indexOf(subStr) !== -1;
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
export const inContainArray = function(items, item) {
  let i = 0;
  while (i < items.length && !contain(/** @type {string} */(item), items[i])) {
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
export const isSame = function(a, b) {
  const strA = JSON.stringify(a);
  const strB = JSON.stringify(b);
  if (isObject(a) && isObject(b) && eq(strA.length, strB.length)) {
    let result = true;
    eachObject(/** @type {!Object} */(a), (value, key) => {
      if (!isSame(b[key], value)) {
        result = false;
      }
    });
    return result;
  }
  return eq(strA, strB);
};

/**
 * @export
 * @param {!Array} items
 * @param {*} item
 * @return {undefined}
 */
export const remove = function(items, item) {
  const position = items.indexOf(item);
  if (neq(position, -1)) {
    items.splice(position, 1);
  }
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {!Array|!Object|undefined}
 */
export const copy = function(items) {
  let results;
  if (isArray(items)) {
    results = copyArray(/** @type {!Array} */(items));
  } else if (isObject(items)) {
    results = copyObject(/** @type {!Object} */(items));
  }
  return results;
};

/**
 * @export
 * @param {!Array} items
 * @return {!Array}
 */
export const copyArray = function(items) {
  // TODO object, array copy
  // return JSON.parse(JSON.stringify(items));
  return [].concat(items);
};

/**
 * @export
 * @param {!Object} items
 * @return {!Object}
 */
export const copyObject = function(items) {
  const results = {};
  eachObject(items, function(item, key) {
    results[key] = isObject(item) ? copyObject(item) : item;
  });
  return results;
};

/**
 * @export
 * @param {!Array|!Object} items
 * @return {boolean}
 */
export const isEmpty = function(items) {
  let result = false;
  if (isArray(items)) {
    result = items.length === 0;
  } else if (isObject(items)) {
    let counter = 0;
    each(items, function() {
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
export const list = function(args, callback) {
  callback(...args);
};

/**
 * @export
 * @param {number} min
 * @param {number} max
 * @param {boolean=} opt_onlyFloat
 * @return {number}
 */
export const random = function(min, max, opt_onlyFloat = false) {
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
export const encodeBase64 = function(text) {
  const words = window['CryptoJS']['enc']['Utf8']['parse'](text);
  return window['CryptoJS']['enc']['Base64']['stringify'](words);
};

/**
 * @export
 * @param {string} encodedText
 * @return {string}
 */
export const decodeBase64 = function(encodedText) {
  const words = window['CryptoJS']['enc']['Base64']['parse'](encodedText);
  return window['CryptoJS']['enc']['Utf8']['stringify'](words);
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @export
 * @param {!Array} items
 * @param {string} attribute
 * @return {!Array}
 */
export const pluck = function(items, attribute) {
  const results = [];
  eachArray(items, (item) => {
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
export const pluckKeys = function(obj, condition) {
  const results = [];
  eachObject(obj, (value, key) => {
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
export const currency = function(price, opt_delimiter = ' ', opt_separator = ',', opt_precision = 0) {
  if (!price) {
    price = 0;
  }
  price = round(price, opt_precision * -1);
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
export const number = function(num, exp) {
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
  let result = round(num, exp).toString().replace(rx, '$1');
  let i = 0;
  while (i < si.length && num < si[i].value) {
    result = round((num / (si[i + 1].value || 1)), exp).toString().replace(rx, '$1') + si[i + 1].symbol;
    i++;
  }
  return result;
};

/**
 * @export
 * @param {!Item|!Element=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
export const mdl = function(opt_node = null, opt_forceDowngrade = true) {
  let element = opt_node || document;
  if (isFunction(element.getNode)) {
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
 * @param {!Item} mountNode
 * @return {!Object}
 */
export const reactRender = function(type, props, mountNode) {
  return window['ReactDOM']['render'](window['React']['createElement'](window[type], props), mountNode.getNode());
};

/**
 * @export
 * @param {!Item} mountNode
 * @return {undefined}
 */
export const reactUnmount = function(mountNode) {
  window['ReactDOM']['unmountComponentAtNode'](mountNode.getNode());
};

/**
 * @export
 * @param {!Object} marker
 * @param {string} title
 * @return {!Object}
 */
export const mapLabel = function(marker, title) {
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
export const mapText = function(title, position, map) {
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
export const encrypt = function(value, passPhrase) {
  const item = JSON.stringify(value);
  return window['CryptoJS']['AES']['encrypt'](item, passPhrase);
};

/**
 * @export
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
export const decrypt = function(item, passPhrase) {
  const value = window['CryptoJS']['AES']['decrypt'](item, passPhrase)['toString'](window['CryptoJS']['enc']['Utf8']);
  return JSON.parse(value || 'null');
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const md5 = function(str) {
  return window['CryptoJS']['MD5'](str);
};

/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @export
 * @return {string}
 */
export const guid = function() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * @export
 * @param {string} name
 * @return {string}
 */
export const generateId = function(name) {
  return [name, guid()].join('-');
};

/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
 * @export
 * @return {string}
 */
export const uuid = function() {
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
export const scrollTo = function(x, y, opt_duration = 500, opt_step = 20) {
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
export const scrollToElement = function(selector, opt_duration = 500, opt_step = 20) {
  const nodeList = document.querySelectorAll(selector);
  const element = nodeList[0];
  const x = element.offsetLeft;
  const y = element.offsetTop;
  scrollTo(x, y, opt_duration, opt_step);
};

/**
 * @export
 * @param {string} selector
 * @param {string=} opt_behavior
 * @return {undefined}
 */
export const scrollIntoView = function(selector, opt_behavior = 'smooth') {
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
export const debounce = function(func, opt_wait = 250, opt_immediate = false) {
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
export const urlWithQueryString = function(url, opt_params?) {
  const queryString = getQueryString(opt_params);
  const separator = contain(url, '?') ? '&' : '?';
  return url + (queryString ? separator + queryString : '');
};

/**
 * @export
 * @param {!Object=} opt_params
 * @return {string}
 */
export const getQueryString = function(opt_params?) {
  const queries = [];
  each(opt_params, function(param, key) {
    if (isArray(param)) {
      eachArray(param, (value) => {
        queries.push(format('{0}[]={1}', [key, value]));
      });
    } else if (!isUndefined(param) && !isNull(param)) {
      queries.push(format('{0}={1}', [key, param]));
    }
  });
  return isEmpty(queries) ? '' : queries.join('&');
};

/**
 * @export
 * @param {string} url
 * @return {string}
 */
export const getExtensionName = function(url) {
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
export const RGBToHSV = function(red, green, blue) {
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
export const RGBToHEX = function(red, green, blue) {
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
export const HEXToHSV = function(hexColor) {
  const [red, green, blue] = HEXToRGB(hexColor);
  return RGBToHSV(red, green, blue);
};

/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
export const HEXToRGB = function(hexColor) {
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
export const HSVToRGB = function(h, s, v) {
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
export const HSVToHEX = function(h, s, v) {
  const [red, green, blue] = HSVToRGB(h, s, v);
  return RGBToHEX(red, green, blue);
};

/**
 * @export
 * @param {string} hexColor
 * @param {string=} opt_lightColor
 * @param {string=} opt_darkColor
 * @return {string}
 */
export const colorContrastYIQ = function(hexColor, opt_lightColor = '#FEFEFE', opt_darkColor = '#252525') {
  const colors = HEXToRGB(hexColor);
  const yiq = ((colors[0] * 299) + (colors[1] * 587) + (colors[2] * 114)) / 1000;
  return yiq >= 128 ? opt_darkColor : opt_lightColor;
};

/**
 * @export
 * @param {string} hexColor
 * @param {number=} opt_diff
 * @return {string}
 */
export const colorContrast = function(hexColor, opt_diff = .5) {
  const colors = HEXToRGB(hexColor);
  for (let i = 0; i < colors.length; i++) {
    colors[i] += Math.round((colors[i] * opt_diff));
    if (colors[i] < 0) {
      colors[i] = 0;
    } else if (colors[i] > 255) {
      colors[i] = 255;
    }
  }
  return RGBToHEX.apply(null, colors);
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const normalize = function(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * @export
 * @param {string} str
 * @return {undefined}
 */
export const copyToClipboard = function(str) {
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

/**
 * Decimal adjustment of a number.
 *
 * @param {string} type The type of adjustment.
 * @param {number} value The number.
 * @param {number} exp The exponent (the 10 logarithm of the adjustment base).
 * @returns {number} The adjusted value.
 */
const decimalAdjust = function (type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  var parts = value.toString().split('e');
  value = Math[type](+(parts[0] + 'e' + (parts[1] ? (+parts[1] - exp) : -exp)));
  // Shift back
  parts = value.toString().split('e');
  return +(parts[0] + 'e' + (parts[1] ? (+parts[1] + exp) : exp));
}

/**
 * Decimal round
 *
 * @param {number} value
 * @param {number} exp
 * @returns {number}
 */
 export const round = function(value, exp) {
  return decimalAdjust('round', value, exp);
};

/**
 * Decimal floor
 *
 * @param {number} value
 * @param {number} exp
 * @returns {number}
 */
 export const floor = function(value, exp) {
  return decimalAdjust('floor', value, exp);
};

/**
 * Decimal ceil
 *
 * @param {number} value
 * @param {number} exp
 * @returns {number}
 */
export const ceil = function(value, exp) {
  return decimalAdjust('ceil', value, exp);
};
