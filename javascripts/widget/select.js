goog.provide('SUI.widget.Select');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Popup');
goog.require('SUI.Query');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Select}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Select = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Select, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._init = function() {
  this.isMultiple = !!this.input.getAttribute('multiple');
  this.isRequired = !!this.input.getAttribute('required');

  this.inputBlock.addClass('select-widget');
  this.query = '';

  this._initOptions();
  this._initChangeEvent();
  this._initPopup();
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._initPopup = function() {

  this.containerNode = new SUI.Node('div');
  this._drawSearchInput();

  this.listNode = new SUI.Node('div');
  this.listNode.addClass('options-list');
  this.containerNode.appendChild(this.listNode);

  this.popup = new SUI.Popup(this.containerNode, this.inputBlock);
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._initChangeEvent = function() {
  this.input.addEventListener('change', () => {
    this._change(true);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._initOptions = function() {

  this.options = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());

  var optionNodes = new SUI.Query('option', this.input);
  optionNodes.each((optionNode) => {
    var value = optionNode.getAttribute('value') || '';
    var text = optionNode.getText() || '';
    var item = new SUI.Object({
      'id': value,
      'name': text
    });
    item.setRaw('option_node', optionNode);
    this.options.push(item);
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Select.prototype.render = function() {
  this.input.addClass('hidden');

  this.selectNode = new SUI.Node('div');
  this.selectNode.addClass('select-input');
  this.input.insertAfter(this.selectNode);

  var iconNode = new SUI.Node('i');
  iconNode.addClass(['material-icons', 'size-24']);
  iconNode.setHtml('expand_more');
  iconNode.addEventListener('click', () => {
    this.open();
  });
  this.selectNode.insertAfter(iconNode);

  var ids = this._getSelectedIds();
  this._setSelectInput(ids);
};

/**
 * @override
 * @param {!Array|!Function|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Select.prototype.setValue = function(value) {
  var ids = value;
  if (!SUI.isArray(value)) {
    ids = [value];
  }
  this._setSelectedIds(/** @type {!Array} */ (ids));
};

/**
 * @override
 * @return {*}
 */
SUI.widget.Select.prototype.getValue = function() {
  var ids = this._getSelectedIds();
  ids = ids.filter((id) => {
    return !SUI.eq(id, '');
  });
  return this.isMultiple ? ids : ids[0];
};

/**
 * @param {!Array<!SUI.Object>} items
 * @param {string=} opt_value
 * @param {string=} opt_name
 * @return {*}
 */
SUI.widget.Select.prototype.setOptions = function(items, opt_value = 'value', opt_name = 'name') {

  var optionNodes = new SUI.Query('option', this.input);
  optionNodes.each((optionNode) => {
    if (optionNode.getAttribute('value')) {
      optionNode.remove();
    }
  });

  SUI.each(items, (item) => {
    var value = item.get(opt_value);
    var name = item.get(opt_name);

    var optionNode = new SUI.Node('option');
    optionNode.setAttribute('value', value);
    optionNode.setHtml(name);
    this.input.appendChild(optionNode);
  });

  this._initOptions();
  this.setValue([]);
};

/**
 * @private
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.widget.Select.prototype._change = function(opt_force = false) {
  var ids = this._getSelectedIds();
  this._setSelectInput(ids);
  var value = this.getValue();
  this.modelChange(value);
  this.checkValidity(opt_force);
};

/**
 * @private
 * @param {!Array} ids
 * @return {undefined}
 */
SUI.widget.Select.prototype._setSelectInput = function(ids) {
  if (this.isRequired && ids.length === 1 && ids[0] === '') {
    this.inputBlock.addClass('is-invalid');
  }
  if (this.isMultiple) {
    this._setMultipleInput(ids);
  }
  else {
    this._setSimpleInput(ids[0]);
  }
};

/**
 * @param {string} id
 * @return {undefined}
 * @private
 */
SUI.widget.Select.prototype._setSimpleInput = function(id) {
  var item = this.options.findById(id);
  if (this.isRequired) {
    this._setTags(item);
  }
  else {
    if (id) {
      this._setTags(item);
    }
    else {
      this._setTags([]);
    }
  }
};

/**
 * @param {!Array} ids
 * @return {undefined}
 * @private
 */
SUI.widget.Select.prototype._setMultipleInput = function(ids) {
  var items = [];
  SUI.each(ids, (id) => {
    var item = this.options.findById(id);
    if (item) {
      items.push(item);
    }
  });
  if (SUI.neq(items.length, 0)) {
    this._setTags(items);
  }
  else if (this.isRequired) {
    var item = this.options.get(0);
    this._setTags(item);
  }
  else if (SUI.eq(ids.length, 0)) {
    this._setTags([]);
  }
};

/**
 * @private
 * @param {!Array|string} tags
 */
SUI.widget.Select.prototype._setTags = function(tags) {
  if (!SUI.isArray(tags)) {
    tags = [tags];
  }
  this.selectNode.removeChildren();

  SUI.each(tags, (tag) => {
    var tagNode = new SUI.Node('div');
    tagNode.addClass('tag');
    tagNode.setHtml(tag.get('name'));
    tagNode.addEventListener('click', () => {
        this.open();
    });
    this.selectNode.appendChild(tagNode);

    var id = tag.get('id');
    if (SUI.neq(id, '')) {
      var iconNode = new SUI.Node('i');
      iconNode.addClass(['material-icons', 'size-18']);
      iconNode.setHtml('close');
      iconNode.setData('id', id);
      iconNode.addEventListener('click', function(iconNode) {
        var id = iconNode.getData('id');
        this._handleSelectedId(id);
      }.bind(this));
      tagNode.appendChild(iconNode);
    }
  });
};

/**
 * @private
 * @param {!Array} ids
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.widget.Select.prototype._setSelectedIds = function(ids, opt_force = false) {
  this.options.each(function(option) {
    var id = option.get('id');
    var optionNode = option.get('option_node');
    var node = optionNode.getNode();
    node.selected = SUI.inArray(ids, id);
  });
  this._change(opt_force);
};

/**
 * @private
 * @return {!Array}
 */
SUI.widget.Select.prototype._getSelectedIds = function() {
  var ids = [];
  this.options.each(function(option) {
    var optionNode = option.get('option_node');
    var node = optionNode.getNode();
    if (node.selected) {
      var id = option.get('id');
      ids.push(id);
    }
  });
  return ids.length === 0 ? [''] : ids;
};

/**
 * @param {number} id
 * @return {undefined}
 * @private
 */
SUI.widget.Select.prototype._handleSelectedId = function(id) {
  var ids = this._getSelectedIds();
  if (this.isMultiple) {
    if (SUI.eq(id, '') || SUI.eq(ids[0], '')) {
      SUI.clear(ids);
    }
    if (SUI.inArray(ids, id)) {
      SUI.remove(ids, id);
    }
    else {
      ids.push(id);
    }
    if (ids.length === 0) {
      ids = [''];
    }
  }
  else {
    if (SUI.inArray(ids, id)) {
      ids = [''];
    }
    else {
      ids = [id];
    }
  }
  this._setSelectedIds(ids, true);
  this.close();
};

/**
 * @private
 * @param {!Array} items
 * @return {undefined}
 */
SUI.widget.Select.prototype._drawItems = function(items) {
  this.listNode.removeChildren();
  var ids = this._getSelectedIds();
  SUI.each(items, function(item) {
    var id = item.get('id');
    var listItem = new SUI.Node('a');
    listItem.setAttribute('href', 'javascript:void(0)');
    if (SUI.inArray(ids, id)) {
      listItem.addClass('selected');
    }
    listItem.setHtml(item.get('name'));
    listItem.addEventListener('click', function() {
      this._handleSelectedId(id);
    }.bind(this));
    this.listNode.appendChild(listItem);
  }.bind(this));
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._drawSearchInput = function() {
  var searchParentNode = new SUI.Node('div');
  searchParentNode.addClass('search-box');
  this.containerNode.appendChild(searchParentNode);

  var searchNode = new SUI.Node('div');
  searchNode.addClass(['mdl-textfield', 'mdl-js-textfield']);
  searchNode.addEventListener('click', () => {

  });
  searchParentNode.appendChild(searchNode);

  var id = SUI.generateId('select');

  this.searchInputNode = new SUI.Node('input');
  this.searchInputNode.setId(id);
  this.searchInputNode.setAttribute('type', 'text');
  this.searchInputNode.addClass('mdl-textfield__input');
  this.searchInputNode.addEventListener('keyup', function(input) {
    var node = input.getNode();
    this._search(node.value);
  }.bind(this));
  searchNode.appendChild(this.searchInputNode);

  var labelNode = new SUI.Node('label');
  labelNode.setFor(id);
  labelNode.addClass('mdl-textfield__label');
  searchNode.appendChild(labelNode);

  SUI.mdl(searchNode);
};

/**
 * @return {undefined}
 */
SUI.widget.Select.prototype.open = function() {
  this._search(this.query);
  this.popup.open();
  this.searchInputNode.getNode().focus();
};

/**
 * @return {undefined}
 */
SUI.widget.Select.prototype.close = function() {
  this.popup.close();
};

/**
 * @private
 * @param {string} query
 * @return {undefined}
 */
SUI.widget.Select.prototype._search = function(query) {
  this.query = query;
  var regExp = new RegExp(query, 'i');
  var items = [];
  this.options.each(function(option) {
    var name = option.get('name');
    if (regExp.test(name)) {
      items.push(option);
    }
  });
  this._drawItems(items);
};

