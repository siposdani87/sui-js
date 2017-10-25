goog.provide('SUI.Dropdown');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Node');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.Dropdown}
 * @param {!SUI.Node} element
 * @param {!Object=} opt_options
 */
SUI.Dropdown = function(element, opt_options) {
    this.dropdown = element;
    this._setOptions(opt_options);
    this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Dropdown.prototype._setOptions = function(opt_options) {
    let _self = this;
    _self.options = new SUI.Object({
        id: SUI.generateId('dropdown'),
    });
    _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Dropdown.prototype._init = function() {
    this.collection = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection());
    this.actions = [];
    this.item = null;
    this._appendButton();
    this._appendMenu();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Dropdown.prototype._appendButton = function() {
    this.buttonNode = new SUI.Node('button');
    this.buttonNode.setId(this.options.id);
    this.buttonNode.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--icon']);

    let iconNode = new SUI.Node('i');
    iconNode.addClass('material-icons');
    iconNode.setHtml('more_vert');
    this.buttonNode.appendChild(iconNode);

    this.dropdown.appendChild(this.buttonNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Dropdown.prototype._appendMenu = function() {
    this.menuNode = new SUI.Node('ul');
    this.menuNode.setFor(this.options.id);
    this.menuNode.addClass(['mdl-menu', 'mdl-menu--bottom-right', 'mdl-js-menu', 'mdl-js-ripple-effect']);

    this.dropdown.appendChild(this.menuNode);
};

/**
 * @param {!Array} actions
 * @param {!Object} item
 * @return {undefined}
 */
SUI.Dropdown.prototype.setActions = function(actions, item) {
    this.actions = actions;
    this.item = item;
    this._renderMenu();
    SUI.mdl(this.menuNode);
    SUI.mdl(this.buttonNode);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Dropdown.prototype._renderMenu = function() {
    SUI.eachArray(this.actions, (action) => {
        let [icon, disabled, title] = action.style(this.item);
        let menuItemNode = new SUI.Node('li');
        menuItemNode.addClass('mdl-menu__item');
        menuItemNode.setHtml(title || icon);
        if (disabled) {
            menuItemNode.setAttribute('disabled');
        }
        menuItemNode.addEventListener('click', () => {
            action.click(this.item);
        });
        this.menuNode.appendChild(menuItemNode);
    });
};