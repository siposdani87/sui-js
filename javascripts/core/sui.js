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
 * @private
 * @param {!Object} object
 * @param {!Array} attributes
 * @param {*} value
 * @return {!Object}
 */
const _attributesToObject = function(object, attributes, value) {
  // TODO duplicated on Object._attributesToObject function
  const lastAttribute = attributes.pop();
  let base = object;
  for (let i = 0; i < attributes.length; i++) {
    base = base[attributes[i]] = base[attributes[i]] || {};
  }
  base[lastAttribute] = value;
  return object;
};

const goog = {
  provide: function(name) {
  },
  require: function(name) {
  },
  exportSymbol: function(publicPath, object) {
    // window[publicPath] = object;
    _attributesToObject(window, publicPath.split('.'), object);
  },
  exportProperty: function(object, publicName, symbol) {
    object[publicName] = symbol;
    // attributesToObject(object, publicName.split('.'), symbol);
  },
  inherits: function(object, parentObject) {
    object.prototype = Object.create(parentObject.prototype);
    object.prototype.constructor = object;
  },
};

goog.provide('SUI');

/**
 * @struct
 */
const SUI = {
  title: 'SUI.Frontend',
  description: 'A frontend framework, these help you build fast, modern applications',
  version: '0.4.10',
  const: {},
  config: {},
  res: {},
  lib: {},
  test: {},
  widget: {},
  coreRes: {},
  _scrollInterval: null,
};


SUI.coreRes = {
  // CORE
  app: 'app',
  config: 'config',
  event: 'event',
  http: 'http',
  notification: 'notification',
  template: 'template',
  dialog: 'dialog',
  confirm: 'confirm',
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
  appCache: 'appCache',
  serviceWorker: 'serviceWorker',
  actionCable: 'actionCable',
};

/**
 * @define {boolean}
 */
SUI.debug = true;

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
      if (SUI.neq(lowerCaseValue.indexOf('.'), -1)) {
        result = parseFloat(lowerCaseValue);
      } else {
        result = parseInt(lowerCaseValue, 0);
      }
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
  const obj = SUI.copy(objA);
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
 * @param {!Object|!Array=} opt_params
 * @param {string=} opt_prefix
 * @param {string=} opt_postfix
 * @return {string}
 */
SUI.format = function(str, opt_params, opt_prefix = '\\{', opt_postfix = '\\}') {
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
  return !isNaN(value) && (!SUI.inArray(['0', '+'], value[0]) || value === '0');
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
  return parseInt(value, 0) === value;
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
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.isSame = function(a, b) {
  const strA = JSON.stringify(a);
  const strB = JSON.stringify(b);
  if (SUI.isObject(a) && SUI.isObject(b) && SUI.eq(strA.length, strB.length)) {
    let result = true;
    SUI.eachObject(/** @type {!Object} */ (a), (value, key) => {
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
  // TODO object, array copy
  // return JSON.parse(JSON.stringify(items));
  let results;
  if (SUI.isArray(items)) {
    results = [].concat(items);
  } else if (SUI.isObject(items)) {
    results = {};
    SUI.each(items, function(item, key) {
      results[key] = SUI.isObject(item) ? SUI.copy(item) : item;
    });
  }
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
 * @param {string} data
 * @return {string}
 */
SUI.encodeBase64 = function(data) {
  return window.btoa(data);
};

/**
 * @export
 * @param {string} encodedData
 * @return {string}
 */
SUI.decodeBase64 = function(encodedData) {
  return window.atob(encodedData);
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
  SUI.each(items, (item) => {
    const result = item.get(attribute);
    results.push(result);
  });
  return results;
};

/**
 * @export
 * @param {!Object} obj
 * @param {!Function} condition
 * @return {!Array}
 */
SUI.pluckKeys = function(obj, condition) {
  const results = [];
  SUI.eachObject(obj, (value, key) => {
    if (condition(value)) {
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
    {value: 1E3, symbol: 'k'},
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
    if (window.scrollX !== x || window.scrollY !== y) {
      if ((scrollStepX > 0 && window.scrollX + scrollStepX > x) || (scrollStepX < 0 && window.scrollX + scrollStepX < x)) {
        scrollStepX = x - window.scrollX;
      }
      if ((scrollStepY > 0 && window.scrollY + scrollStepY > y) || (scrollStepY < 0 && window.scrollY + scrollStepY < y)) {
        scrollStepY = y - window.scrollY;
      }
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
  const node = new SUI.Query(selector).getItem();
  const element = node.getNode();
  const y = element.offsetTop;
  SUI.scrollTo(0, y, opt_duration, opt_step);
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
    } else if (!SUI.isUndefined(param)) {
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
 * @param {string} hexColor
 * @return {!Array}
 */
SUI.hexColorToRGB = function(hexColor) {
  const red = parseInt(hexColor.substr(1, 2), 16);
  const green = parseInt(hexColor.substr(3, 2), 16);
  const blue = parseInt(hexColor.substr(5, 2), 16);
  return [red, green, blue];
};

/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
SUI.RGBtoHexColor = function(red, green, blue) {
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
 * @param {string=} opt_lightColor
 * @param {string=} opt_darkColor
 * @return {string}
 */
SUI.colorContrastYIQ = function(hexColor, opt_lightColor = '#FEFEFE', opt_darkColor = '#252525') {
  const colors = SUI.hexColorToRGB(hexColor);
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
  const colors = SUI.hexColorToRGB(hexColor);
  for (let i = 0; i < colors.length; i++) {
    colors[i] += Math.round((colors[i] * opt_diff));
    if (colors[i] < 0) {
      colors[i] = 0;
    } else if (colors[i] > 255) {
      colors[i] = 255;
    }
  }
  return SUI.RGBtoHexColor.apply(null, colors);
};

/**
 * @export
 * @param {!Object} obj
 * @param {!Array} keys
 * @return {!Object}
 */
SUI.allowKeys = function(obj, keys) {
  return SUI.filterKeys(obj, (key) => {
    return SUI.inArray(keys, key);
  });
};

/**
 * @export
 * @param {!Object} obj
 * @param {!Array} keys
 * @return {!Object}
 */
SUI.denyKeys = function(obj, keys) {
  return SUI.filterKeys(obj, (key) => {
    return !SUI.inArray(keys, key);
  });
};

/**
 * @export
 * @param {!Object} obj
 * @param {!Function} condition
 * @return {!Object}
 */
SUI.filterKeys = function(obj, condition) {
  const copyObj = new SUI.Object(obj).copy();
  const resultObj = new SUI.Object();
  copyObj.each((value, key) => {
    if (condition(key)) {
      resultObj.set(key, value);
    }
  });
  return resultObj;
};

/**
 * @export
 * @param {string} str
 * @return {string}
 */
SUI.normalize = function(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
