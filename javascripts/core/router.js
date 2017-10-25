goog.provide('SUI.Router');

goog.require('SUI');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Router}
 * @param {string} route
 */
SUI.Router = function(route) {
  this.route = route || '';
  this.param = new RegExp('([:*])(\\w+)', 'g');

  let basePath = '#';
  let baseMeta = new SUI.Query('base').getItem();
  if (!baseMeta.isEmpty()) {
    basePath = baseMeta.getAttribute('href') || '';
  }
  this.escape = new RegExp('[-[]{}()+?.,^' + basePath + 's]', 'g');

  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Router.prototype._init = function() {
  this.names = [];
  this.regex = this.route;
  this.regex = this.regex.replace(this.escape, '\\$&');
  this.regex = this.regex.replace(this.param, (param, mode, name) => {
    this.names.push(name);
    return mode === ':' ? '([^/]*)' : '(.*)';
  });
  this.regex = new RegExp('^' + this.regex + '$');
};

/**
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.Router.prototype.stringify = function(opt_params) {
  let route = this.route;
  if (opt_params) {
    for (let key in opt_params) {
      if (opt_params.hasOwnProperty(key)) {
        let regex = new RegExp('[:*]' + key + '\\b');
        if (regex.test(route)) {
          route = route.replace(regex, opt_params[key]);
        } else {
          if (route.indexOf('?') === -1) {
            route += '?';
          } else {
            route += '&';
          }
          route += [key, opt_params[key]].join('=');
        }
      }
    }
  }
  return route.replace(this.param, '');
};

/**
 * @param {string} url
 * @return {?Array}
 */
SUI.Router.prototype.getMatches = function(url) {
  let question = url.indexOf('?');
  if (question !== -1) {
    url = url.substring(0, question);
  }
  return url.match(this.regex);
};

/**
 * @param {string} url
 * @return {!Object}
 */
SUI.Router.prototype.parse = function(url) {
  let matches = this.getMatches(url);
  if (!matches) {
    return {};
  }
  let params = this._parseParams(url);
  let i = 0;
  while (i < this.names.length) {
    let key = this.names[i++];
    params[key] = SUI.typeCast(matches[i]);
  }
  return params;
};

/**
 * @private
 * @param {string} url
 * @return {!Object}
 */
SUI.Router.prototype._parseParams = function(url) {
  let params = {};
  let question = url.indexOf('?');
  if (question !== -1) {
    let pieces = url.substr(question + 1).split('&');
    for (let i = 0; i < pieces.length; i++) {
      let parts = pieces[i].replace('==', '&&').split('=');
      if (parts.length < 2) {
        parts.push('');
      }
      params[window.decodeURIComponent(parts[0])] = window.decodeURIComponent(parts[1].replace('&&', '=='));
    }
  }
  return params;
};