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
  this.input.addClass('hidden');
  this.inputBlock.addClass('select-widget');
  this.query = '';

  this._initOptions();
  this._initChangeEvent();
  this._initPopup();
};

/**
 * @return {boolean}
 */
SUI.widget.Select.prototype.isMultiple = function() {
  return !!this.input.getAttribute('multiple');
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

  let optionNodes = new SUI.Query('option', this.input);
  optionNodes.each((optionNode) => {
    let value = optionNode.getAttribute('value') || '';
    let image = optionNode.getAttribute('data-image') || '';
    let text = optionNode.getText() || '';
    let item = new SUI.Object({
      'id': value,
      'name': text,
      'image': image,
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
  this.refresh();
};

/**
 * @override
 */
SUI.widget.Select.prototype.refresh = function() {
  let selectContainerNode = new SUI.Query('.select-container', this.inputBlock).getItem();
  selectContainerNode.remove();

  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  } else {
    this.inputBlock.removeClass('is-disabled');
  }

  this.selectContainerNode = new SUI.Node('div');
  this.selectContainerNode.addClass('select-container');
  if (!this.isDisabled()) {
    this.selectContainerNode.addEventListener('click', () => {
      this.open();
    });
  }
  this.input.insertAfter(this.selectContainerNode);

  this.selectNode = new SUI.Node('div');
  this.selectNode.addClass('select-input');
  this.selectContainerNode.appendChild(this.selectNode);

  this.iconNode = new SUI.Node('i');
  this.iconNode.addClass(['material-icons', 'size-24', 'expander']);
  this.iconNode.setHtml('expand_more');
  this.selectContainerNode.appendChild(this.iconNode);

  let ids = this._getSelectedIds();
  this._setSelectInput(ids);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Select.prototype.setValue = function(value) {
  let ids = value;
  if (!SUI.isArray(value)) {
    ids = [value];
  }
  this._setSelectedIds(/** @type {!Array} */(ids));
};

/**
 * @override
 * @return {*}
 */
SUI.widget.Select.prototype.getValue = function() {
  let ids = this._getSelectedIds();
  ids = ids.filter((id) => {
    return !SUI.eq(id, '');
  });
  return this.isMultiple() ? ids : ids[0];
};

/**
 * @return {undefined}
 */
SUI.widget.Select.prototype.showLoader = function() {
  this.iconNode.setHtml('refresh');
  this.iconNode.addClass('rotate');
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._hideLoader = function() {
  this.iconNode.setHtml('expand_more');
  this.iconNode.removeClass('rotate');
};

/**
 * @param {!Array<!SUI.Object>} items
 * @param {string=} opt_value
 * @param {string=} opt_name
 * @param {string=} opt_image
 * @return {undefined}
 */
SUI.widget.Select.prototype.setOptions = function(items, opt_value = 'value', opt_name = 'name', opt_image = '') {
  let optionNodes = new SUI.Query('option', this.input);
  optionNodes.each((optionNode) => {
    if (optionNode.getAttribute('value')) {
      optionNode.remove();
    }
  });

  SUI.each(items, (item) => {
    let value = item.get(opt_value);
    let name = item.get(opt_name);
    let image = '';
    if (opt_image) {
      image = item.get(opt_image);
    }
    let optionNode = new SUI.Node('option');
    optionNode.setAttribute('value', value);
    optionNode.setAttribute('data-image', image);
    optionNode.setHtml(name);
    this.input.appendChild(optionNode);
  });

  this._initOptions();
  this._hideLoader();
  this.setValue([]);
};

/**
 * @private
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.widget.Select.prototype._change = function(opt_force = false) {
  let ids = this._getSelectedIds();
  this._setSelectInput(ids);
  let value = this.getValue();
  this.modelChange(value);
  this.checkValidity(opt_force);
};

/**
 * @private
 * @param {!Array} ids
 * @return {undefined}
 */
SUI.widget.Select.prototype._setSelectInput = function(ids) {
  if (this.isRequired() && ids.length === 1 && ids[0] === '') {
    this.inputBlock.addClass('is-invalid');
  }
  if (this.isMultiple()) {
    this._setMultipleInput(ids);
  } else {
    this._setSimpleInput(ids[0]);
  }
};

/**
 * @param {string} id
 * @return {undefined}
 * @private
 */
SUI.widget.Select.prototype._setSimpleInput = function(id) {
  let item = this.options.findById(id);
  this._setTags(item);
};

/**
 * @param {!Array} ids
 * @return {undefined}
 * @private
 */
SUI.widget.Select.prototype._setMultipleInput = function(ids) {
  let items = [];
  SUI.each(ids, (id) => {
    let item = this.options.findById(id);
    if (item) {
      items.push(item);
    }
  });
  if (SUI.neq(items.length, 0)) {
    this._setTags(items);
  } else if (this.isRequired()) {
    let item = this.options.get(0);
    this._setTags(item);
  } else if (SUI.eq(ids.length, 0)) {
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
    let tagNode = new SUI.Node('div');
    tagNode.addClass('tag');
    tagNode.setHtml(tag.get('name'));
    if (!this.isDisabled()) {
      tagNode.addEventListener('click', () => {
        this.open();
      });
    }
    this.selectNode.appendChild(tagNode);

    let id = tag.get('id');
    if (SUI.neq(id, '') && !this.isDisabled()) {
      let iconNode = new SUI.Node('i');
      iconNode.addClass(['material-icons', 'size-18']);
      iconNode.setHtml('close');
      iconNode.addEventListener('click', (iconNode) => {
        this._handleSelectedId(id);
      });
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
    let id = option.get('id');
    let optionNode = option.get('option_node');
    let node = optionNode.getNode();
    node.selected = SUI.inArray(ids, id);
  });
  this._change(opt_force);
};

/**
 * @private
 * @return {!Array}
 */
SUI.widget.Select.prototype._getSelectedIds = function() {
  let ids = [];
  this.options.each(function(option) {
    let optionNode = option.get('option_node');
    let node = optionNode.getNode();
    if (node.selected) {
      let id = option.get('id');
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
  let ids = this._getSelectedIds();
  if (this.isMultiple()) {
    if (SUI.eq(id, '') || SUI.eq(ids[0], '')) {
      SUI.clear(ids);
    }
    if (SUI.inArray(ids, id)) {
      SUI.remove(ids, id);
    } else {
      ids.push(id);
    }
    if (ids.length === 0) {
      ids = [''];
    }
  } else {
    if (SUI.inArray(ids, id)) {
      ids = [''];
    } else {
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
  let ids = this._getSelectedIds();
  SUI.each(items, (item) => {
    let id = item.get('id');
    let listItem = new SUI.Node('a');
    listItem.setAttribute('href', 'javascript:void(0)');
    if (SUI.inArray(ids, id)) {
      listItem.addClass('selected');
    }
    listItem.addEventListener('click', () => {
      this._handleSelectedId(id);
    });
    this.listNode.appendChild(listItem);

    let image = item.get('image');
    if (image) {
      let imageNode = new SUI.Node('img');
      imageNode.setAttribute('src', image);
      listItem.appendChild(imageNode);
    }

    let name = item.get('name');
    let nameNode = new SUI.Node('span');
    nameNode.setHtml(name);
    listItem.appendChild(nameNode);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Select.prototype._drawSearchInput = function() {
  let searchParentNode = new SUI.Node('div');
  searchParentNode.addClass('search-box');
  this.containerNode.appendChild(searchParentNode);

  let searchNode = new SUI.Node('div');
  searchNode.addClass(['mdl-textfield', 'mdl-js-textfield']);
  searchNode.addEventListener('click', () => {

  });
  searchParentNode.appendChild(searchNode);

  let id = SUI.generateId('select');

  this.searchInputNode = new SUI.Node('input');
  this.searchInputNode.setId(id);
  this.searchInputNode.setAttribute('type', 'text');
  this.searchInputNode.addClass('mdl-textfield__input');
  this.searchInputNode.addEventListener('keyup', (input) => {
    let node = input.getNode();
    this._search(node.value);
  });
  searchNode.appendChild(this.searchInputNode);

  let labelNode = new SUI.Node('label');
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
  let regExp = new RegExp(query, 'i');
  let items = [];
  this.options.each(function(option) {
    let name = option.get('name');
    if (regExp.test(name)) {
      items.push(option);
    }
  });
  this._drawItems(items);
};

