import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Select');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Popup');
goog.require('SUI.Query');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Select}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.Select = function(input, label, error, inputBlock) {
  SUI.Select.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.Select, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._init = function() {
  this.input.addClass('hidden');
  this.inputBlock.addClass('select-widget');
  this.query = '';
  this.ids = [];

  this._initOptions();
  this._initChangeEvent();
  this._initPopup();
};

/**
 * @return {boolean}
 */
SUI.Select.prototype.isMultiple = function() {
  return this.input.hasAttribute('multiple');
};

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._initPopup = function() {
  this.containerNode = new SUI.Item('div');
  this._drawSearchInput();

  this.listNode = new SUI.Item('div');
  this.listNode.addClass('options-list');
  this.containerNode.appendChild(this.listNode);

  this.popup = new SUI.Popup(this.containerNode, this.inputBlock);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._initChangeEvent = function() {
  this.input.addEventListener('change', () => {
    this._change();
    return true;
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._initOptions = function() {
  this.options = /** @type {!SUI.Collection<!SUI.Objekt>} */ (new SUI.Collection());

  const optionNodes = new SUI.Query('option', this.input);
  optionNodes.each((optionNode) => {
    const value = optionNode.getAttribute('value') || '';
    const image = optionNode.getAttribute('data-image') || '';
    const item = optionNode.getAttribute('data-item') || {};
    const text = optionNode.getText() || '';
    const option = new SUI.Objekt({
      'id': value,
      'name': text,
      'image': image,
      'item': item,
    });
    option.setRaw('option_node', optionNode);
    this.options.push(option);
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.Select.prototype.render = function() {
  if (this.label && this.label.exists()) {
    this.label.addClass('widget-label');
  }

  this.iconNode = new SUI.Item('a');
  this.iconNode.setAttribute('href', 'javascript:void(0)');
  this.iconNode.addClass(['material-icons', 'size-24', 'expander']);
  this.iconNode.setHtml('expand_more');
  this.iconNode.addEventListener('click', () => {
    if (this.isEnabled()) {
      this.open();
    }
  });
  this.actionContainerNode.appendChild(this.iconNode);

  this.refresh();
};

/**
 * @override
 * @return {undefined}
 */
SUI.Select.prototype.refresh = function() {
  const selectContainerNode = new SUI.Query('.select-container', this.inputBlock).getItem();
  selectContainerNode.remove();

  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  } else {
    this.inputBlock.removeClass('is-disabled');
  }

  this.selectContainerNode = new SUI.Item('div');
  this.selectContainerNode.addClass('select-container');
  this.selectContainerNode.addEventListener('click', () => {
    if (this.isEnabled()) {
      this.open();
    }
  });
  this.input.insertAfter(this.selectContainerNode);

  this.selectNode = new SUI.Item('div');
  this.selectNode.addClass('select-input');
  this.selectContainerNode.appendChild(this.selectNode);

  const ids = this._getSelectedIds();
  this._setSelectTags(ids);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.Select.prototype.setValue = function(value) {
  this.ids = value;
  if (!SUI.isArray(value)) {
    this.ids = [value];
  }
  this._setSelectedIds(/** @type {!Array} */(this.ids));
};

/**
 * @override
 * @return {*}
 */
SUI.Select.prototype.getValue = function() {
  let ids = this._getSelectedIds();
  ids = ids.filter((id) => {
    return !SUI.eq(id, '');
  });
  return this.isMultiple() ? ids : (ids[0] || null);
};

/**
 * @param {string=} opt_attribute
 * @return {*}
 */
SUI.Select.prototype.getOptionValue = function(opt_attribute) {
  const value = this.getValue();
  if (value) {
    const option = this.options.findById(value);
    return opt_attribute ? option.get(SUI.format('item.{0}', [opt_attribute])) : option;
  }
  return value;
};

/**
 * @return {undefined}
 */
SUI.Select.prototype.showLoader = function() {
  this.iconNode.setHtml('refresh');
  this.iconNode.addClass('rotate');
};

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._hideLoader = function() {
  this.iconNode.setHtml('expand_more');
  this.iconNode.removeClass('rotate');
};

/**
 * @param {!Array<!SUI.Objekt>} items
 * @param {string=} opt_value
 * @param {string=} opt_name
 * @param {string=} opt_image
 * @return {undefined}
 */
SUI.Select.prototype.setOptions = function(items, opt_value = 'value', opt_name = 'name', opt_image = '') {
  const optionNodes = new SUI.Query('option', this.input);
  optionNodes.each((optionNode) => {
    if (optionNode.getAttribute('value')) {
      optionNode.remove();
    }
  });

  SUI.each(items, (item) => {
    const value = item.get(opt_value);
    const name = item.get(opt_name);
    let image = '';
    if (opt_image) {
      image = item.get(opt_image);
    }
    const optionNode = new SUI.Item('option');
    optionNode.setAttribute('value', value);
    optionNode.setAttribute('data-image', image);
    optionNode.setAttribute('data-item', item);
    optionNode.setHtml(name);
    this.input.appendChild(optionNode);
  });

  this._initOptions();
  this._hideLoader();
  this.setValue(this.ids);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._change = function() {
  const ids = this._getSelectedIds();
  this._setSelectTags(ids);
  const value = this.getValue();
  this.modelChange(value);
};

/**
 * @private
 * @param {!Array} ids
 * @return {undefined}
 */
SUI.Select.prototype._setSelectTags = function(ids) {
  if (this.isRequired() && ids.length === 1 && ids[0] === '') {
    this.inputBlock.addClass('is-invalid');
  }
  if (this.isMultiple()) {
    this._setMultipleTag(ids);
  } else {
    this._setSimpleTag(ids[0]);
  }
};

/**
 * @param {string} id
 * @return {undefined}
 * @private
 */
SUI.Select.prototype._setSimpleTag = function(id) {
  const option = this.options.findById(id);
  this._setTags(option);
};

/**
 * @param {!Array} ids
 * @return {undefined}
 * @private
 */
SUI.Select.prototype._setMultipleTag = function(ids) {
  const options = [];
  SUI.each(ids, (id) => {
    const option = this.options.findById(id);
    if (option) {
      options.push(option);
    }
  });
  if (SUI.neq(options.length, 0)) {
    this._setTags(options);
  } else if (this.isRequired()) {
    const option = this.options.get(0);
    this._setTags(option);
  } else if (SUI.eq(ids.length, 0)) {
    this._setTags([]);
  }
};

/**
 * @private
 * @param {!Array|string} tags
 */
SUI.Select.prototype._setTags = function(tags) {
  if (!SUI.isArray(tags)) {
    tags = [tags];
  }
  this.selectNode.removeChildren();

  SUI.each(tags, (tag) => {
    const tagNode = new SUI.Item('div');
    tagNode.addClass('widget-tag');
    tagNode.setHtml(tag.get('name'));
    if (this.isEnabled()) {
      tagNode.addEventListener('click', () => {
        this.open();
      });
    }
    this.selectNode.appendChild(tagNode);

    const id = tag.get('id');
    if (SUI.neq(id, '') && this.isEnabled()) {
      const iconNode = new SUI.Item('a');
      iconNode.setAttribute('href', 'javascript:void(0)');
      iconNode.addClass(['material-icons', 'size-18', 'close']);
      iconNode.setHtml('close');
      iconNode.addEventListener('click', () => {
        this._handleSelectedId(id);
      });
      tagNode.addClass('tag-with-action');
      tagNode.appendChild(iconNode);
    }
  });
};

/**
 * @private
 * @param {!Array} ids
 * @return {undefined}
 */
SUI.Select.prototype._setSelectedIds = function(ids) {
  this.options.each(function(option) {
    const id = option.get('id');
    const selected = SUI.inArray(ids, id);
    const optionNode = option.get('option_node');
    const node = optionNode.getNode();
    if (selected) {
      node.setAttribute('selected', selected);
    } else {
      node.removeAttribute('selected');
    }
    node.selected = selected;
  });
  this._change();
};

/**
 * @private
 * @return {!Array}
 */
SUI.Select.prototype._getSelectedIds = function() {
  const ids = [];
  this.options.each(function(option) {
    const optionNode = option.get('option_node');
    const node = optionNode.getNode();
    if (node.selected) {
      const id = option.get('id');
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
SUI.Select.prototype._handleSelectedId = function(id) {
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
  this.query = '';
  this._setSelectedIds(ids);
  this.close();
};

/**
 * @private
 * @param {!Array} items
 * @return {undefined}
 */
SUI.Select.prototype._drawItems = function(items) {
  this.listNode.removeChildren();
  const ids = this._getSelectedIds();
  SUI.each(items, (item) => {
    const id = item.get('id');
    const listItem = new SUI.Item('a');
    listItem.setAttribute('href', 'javascript:void(0)');
    if (SUI.inArray(ids, id)) {
      listItem.addClass('selected');
    }
    listItem.addEventListener('click', () => {
      this._handleSelectedId(id);
    });
    this.listNode.appendChild(listItem);

    const image = item.get('image');
    if (image) {
      const imageNode = new SUI.Item('img');
      imageNode.setAttribute('src', image);
      listItem.appendChild(imageNode);
    }

    const name = item.get('name');
    const nameNode = new SUI.Item('span');
    nameNode.setHtml(name);
    listItem.appendChild(nameNode);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Select.prototype._drawSearchInput = function() {
  const searchParentNode = new SUI.Item('div');
  searchParentNode.addClass('search-box');
  this.containerNode.appendChild(searchParentNode);

  const searchNode = new SUI.Item('div');
  searchNode.addClass(['mdl-textfield', 'mdl-js-textfield']);
  searchNode.addEventListener('click', () => {

  });
  searchParentNode.appendChild(searchNode);

  const id = SUI.generateId('select');

  this.searchInputNode = new SUI.Item('input');
  this.searchInputNode.setId(id);
  this.searchInputNode.setAttribute('type', 'text');
  this.searchInputNode.addClass('mdl-textfield__input');
  this.searchInputNode.addEventListener('keyup', (input) => {
    const node = input.getNode();
    this._search(node.value);
    return true;
  });
  searchNode.appendChild(this.searchInputNode);

  const labelNode = new SUI.Item('label');
  labelNode.setFor(id);
  labelNode.addClass('mdl-textfield__label');
  searchNode.appendChild(labelNode);

  SUI.mdl(searchNode);
};

/**
 * @return {undefined}
 */
SUI.Select.prototype.open = function() {
  this._search(this.query);
  this.popup.open();
  this.searchInputNode.getNode().focus();
};

/**
 * @return {undefined}
 */
SUI.Select.prototype.close = function() {
  this.popup.close();
};

/**
 * @private
 * @param {string} query
 * @return {undefined}
 */
SUI.Select.prototype._search = function(query) {
  this.query = query;
  this.searchInputNode.getNode().value = query;
  this.searchInputNode.set('value', query);

  const regExp = new RegExp(query, 'i');
  const items = [];
  this.options.each(function(option) {
    const name = option.get('name');
    if (regExp.test(name)) {
      items.push(option);
    }
  });
  this._drawItems(items);
};
