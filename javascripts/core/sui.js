/**
 * @license
 * Copyright 2016 Daniel Sipos (siposdani87@gmail.com),
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
 * @author Daniel Sipos
 */

/**
 * @private
 * @param {!Object} object
 * @param {!Array} attributes
 * @param {*} value
 * @return {!Object}
 */
let _attributesToObject = function(object, attributes, value) {
  // TODO duplicated Object._attributesToObject function
  let lastAttribute = attributes.pop();
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
 * @param {*} value
 * @return {*}
 */
SUI.typeCast = function(value) {
  let result = value;
  if (SUI.isString(value) && !SUI.contain(/** @type {string} */(value), ' ')) {
    let lowerCaseValue = value.toLowerCase();
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
 * @param {!Object} constructor
 * @param {!Array} args
 * @param {!Object=} opt_extendModule
 * @return {!Object}
 */
SUI.invoke = function(constructor, args, opt_extendModule) {
  /**
   * @constructor
   * @this {SUI.Cls}
   * @return {!Object}
   */
  SUI.Cls = function() {
    return constructor.apply(this, args);
  };

  if (opt_extendModule) {
    SUI.Cls.prototype = SUI.merge(opt_extendModule.prototype, constructor.prototype);
    SUI.Cls.prototype.constructor = SUI.Cls;
  } else {
    SUI.Cls.prototype = constructor.prototype;
  }

  return new SUI.Cls();
};

/**
 * @param {!Object} objA
 * @param {!Object} objB
 * @return {!Object|undefined}
 */
SUI.merge = function(objA, objB) {
  let obj = SUI.copy(objA);
  for (let key in objB) {
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
    let regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
    str = str.replace(regex, value);
  });
  return str;
};

/**
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
 * @param {*} item
 * @param {*} value
 * @return {*}
 */

SUI.defaultValue = function(item, value) {
  return !SUI.isUndefined(item) ? item : value;
};

/**
 * @param {*=} opt_result
 * @return {!Function}
 */
SUI.noop = function(opt_result) {
  return function() {
    return opt_result;
  };
};

/**
 * Equivalent
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.eq = function(a, b) {
  return a === b;
};

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.neq = function(a, b) {
  return a !== b;
};

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.gt = function(a, b) {
  return a > b;
};

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.gte = function(a, b) {
  return a >= b;
};

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.lt = function(a, b) {
  return a < b;
};

/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
SUI.lte = function(a, b) {
  return a <= b;
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isArray = function(item) {
  return SUI.instanceOf(item, Array);
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isFunction = function(item) {
  return SUI.is(item, 'function');
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isString = function(item) {
  return SUI.is(item, 'string');
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isNumber = function(item) {
  return !isNaN(item);
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isFloat = function(item) {
  return parseFloat(item) === item;
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isInteger = function(item) {
  return parseInt(item, 0) === item;
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isObject = function(item) {
  return SUI.is(item, 'object');
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isNull = function(item) {
  return (item === null);
};

/**
 * @param {*} item
 * @return {boolean}
 */
SUI.isUndefined = function(item) {
  return SUI.is(item, 'undefined');
};

/**
 * @param {*} value
 * @return {boolean}
 */
SUI.isFinite = function(value) {
  return isFinite(value);
};

/**
 * @param {*} item
 * @param {string} type
 * @return {boolean}
 */
SUI.is = function(item, type) {
  return (typeof item === type);
};

/**
 * @param {*} item
 * @param {!Object} object
 * @return {boolean}
 */
SUI.instanceOf = function(item, object) {
  return item instanceof object;
};

/**
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
 * @param {!Object} object
 * @param {!Function} next
 * @return {undefined}
 */
SUI.eachObject = function(object, next) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      next(object[key], key);
    }
  }
};

/**
 * @param {function(number):*} next
 * @param {number} i
 * @param {number} length
 * @param {number} duration
 * @return {undefined}
 */
SUI.sleepEach = function(next, i, length, duration) {
  let loop = function() {
    next(i);
    i++;
    if (i < length) {
      setTimeout(loop, duration);
    }
  };
  loop();
};

/*
 SUI.iterator = function(items, callback, next){
 };
 SUI.while = function(items, callback){
 let i = 0;
 while (i < items.length && callback(items[i], i)){
 i++;
 }
 return
 };
 */

/**
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
 * @param {!Array} items
 * @return {undefined}
 */
SUI.clearArray = function(items) {
  items.splice(0, items.length);
};

/**
 * @param {!Object} items
 * @return {undefined}
 */
SUI.clearObject = function(items) {
  for (let key in items) {
    if (items.hasOwnProperty(key)) {
      delete items[key];
    }
  }
};
/**
 * @param {!Array} items
 * @param {*} item
 * @return {boolean}
 */
SUI.inArray = function(items, item) {
  return items.indexOf(item) !== -1;
};

/**
 * @param {string} str
 * @param {string} subStr
 * @return {boolean}
 */
SUI.contain = function(str, subStr) {
  return str.indexOf(subStr) !== -1;
};

/**
 * @param {!Array} items
 * @param {*} item
 * @return {undefined}
 */
SUI.remove = function(items, item) {
  let position = items.indexOf(item);
  if (SUI.neq(position, -1)) {
    items.splice(position, 1);
  }
};

/**
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
 * @param {!Array} args
 * @param {!Function} callback
 * @return {undefined}
 */
SUI.list = function(args, callback) {
  callback(...args);
};

/**
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
 * @param {string} data
 * @return {string}
 */
SUI.encodeBase64 = function(data) {
  return window.btoa(data);
};

/**
 * @param {string} encodedData
 * @return {string}
 */
SUI.decodeBase64 = function(encodedData) {
  return window.atob(encodedData);
};

/**
 * @param {string} str
 * @return {string}
 */
SUI.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @param {!Array} items
 * @param {string} attribute
 * @return {!Array}
 */
SUI.pluck = function(items, attribute) {
  let results = [];
  SUI.each(items, (item) => {
    let result = item.get(attribute);
    results.push(result);
  });
  return results;
};

/**
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
  let parts = price.toFixed(opt_precision).toString().split('.');
  let decimal = parts[1];
  let currency = parts[0].split('').reverse().map((char, index) => {
    return !(index % 3) && index ? char + opt_delimiter : char;
  }).reverse().join('');
  if (decimal) {
    currency += opt_separator + decimal;
  }
  return currency;
};

/**
 * @param {number} num
 * @param {number} exp
 * @return {string}
 */
SUI.number = function(num, exp) {
  let si = [
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
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let result = Math10.round(num, exp).toString().replace(rx, '$1');
  let i = 0;
  while (i < si.length && num < si[i].value) {
    result = Math10.round((num / (si[i + 1].value || 1)), exp).toString().replace(rx, '$1') + si[i + 1].symbol;
    i++;
  }
  return result;
};

/**
 * @param {!SUI.Node|!Element} node
 * @return {undefined}
 */
SUI.mdl = function(node) {
  let element = node || document;
  if (SUI.isFunction(element.getNode)) {
    element = element.getNode();
  }
  if (node) {
    window['componentHandler']['upgradeElement'](element);
  } else {
    window['componentHandler']['upgradeDom']();
  }
};

/**
 * @param {string} type
 * @param {!Object} props
 * @param {!SUI.Node} mountNode
 * @return {!Object}
 */
SUI.reactRender = function(type, props, mountNode) {
  return window['ReactDOM']['render'](
    window['React']['createElement'](window[type], props),
    mountNode.getNode()
  );
};

/**
 * @param {!SUI.Node} mountNode
 * @return {undefined}
 */
SUI.reactUnmount = function(mountNode) {
  window['ReactDOM']['unmountComponentAtNode'](mountNode.getNode());
};

/**
 * @param {!Object} marker
 * @param {string} title
 * @return {!Object}
 */
SUI.mapLabel = function(marker, title) {
  // https://github.com/googlemaps/js-map-label/blob/gh-pages/src/maplabel.js
  // https://googlemaps.github.io/js-map-label/docs/reference.html
  let mapLabel = new window['MapLabel']({
    'text': title,
    'strokeWeight': 2,
    'fontFamily': 'sans-serif',
  });

  mapLabel['bindTo']('position', marker);
  mapLabel['bindTo']('map', marker);

  return mapLabel;
};

/**
 * @param {*} value
 * @param {string} passPhrase
 * @return {string}
 */
SUI.encrypt = function(value, passPhrase) {
  let item = JSON.stringify(value);
  return window['CryptoJS']['AES']['encrypt'](item, passPhrase);
};

/**
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
SUI.decrypt = function(item, passPhrase) {
  let value = window['CryptoJS']['AES']['decrypt'](item, passPhrase)['toString'](window['CryptoJS']['enc']['Utf8']);
  return JSON.parse(value || 'null');
};

/**
 * @param {string} str
 * @return {string}
 */
SUI.md5 = function(str) {
  return window['CryptoJS']['MD5'](str);
};

/**
 * @param {string} name
 * @return {string}
 */
SUI.generateId = function(name) {
  let guid = SUI.guid();
  return [name, guid].join('-');
};

/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @return {string}
 */
SUI.guid = function() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
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
 * @param {string} selector
 * @param {number=} opt_duration
 * @param {number=} opt_step
 * @return {undefined}
 */
SUI.scrollToElement = function(selector, opt_duration = 500, opt_step = 20) {
  let node = new SUI.Query(selector).getItem();
  let element = node.getNode();
  let y = element.offsetTop;
  SUI.scrollTo(0, y, opt_duration, opt_step);
};

/**
 * @param {!Function} func
 * @param {number=} opt_wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
SUI.debounce = function(func, opt_wait = 250, opt_immediate = false) {
  let timeout;
  return function(...args) {
    let later = function() {
      timeout = null;
      if (!opt_immediate) func(...args);
    };
    let callNow = opt_immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, opt_wait);
    if (callNow) func(...args);
  };
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.urlWithQueryString = function(url, opt_params) {
  let queryString = SUI.getQueryString(opt_params);
  return url + queryString;
};

/**
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.getQueryString = function(opt_params) {
  let queries = [];
  SUI.each(opt_params, function(param, key) {
    if (SUI.isArray(param)) {
      SUI.eachArray(param, (value) => {
        queries.push(SUI.format('{0}[]={1}', [key, value]));
      });
    } else if (!SUI.isUndefined(param)) {
      queries.push(SUI.format('{0}={1}', [key, param]));
    }
  });
  return SUI.isEmpty(queries) ? '' : '?' + queries.join('&');
};

/**
 * @export
 * @param {string} url
 * @return {string}
 */
SUI.getExtensionName = function(url) {
  let realUrl = url.split('?', 2)[0];
  return realUrl.slice((Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1);
};

/**
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
 * @param {string} hexColor
 * @param {number=} opt_diff
 * @return {string}
 */
SUI.colorContras = function(hexColor, opt_diff = .5) {
  const colors = SUI.hexColorToRGB(hexColor);
  let i = 0;
  while (i < colors.length) {
    colors[i] += (colors[i] * opt_diff);
    if (colors[i] < 0) {
      colors[i] = 0;
    } else if (colors[i] > 255) {
      colors[i] = 255;
    } else if (colors[i] <= 16) {
      colors[i] = '0' + colors[i].toString(16);
    } else {
      colors[i] = colors[i].toString(16);
    }
    i++;
  }
  return colors.join('');
};
