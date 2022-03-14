import { eachArray, mdl } from '../utils/operation';
import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { generateId } from '../utils/coder';
import { Action } from '../utils';

/**
 * @class
 */
export class Dropdown {
    dropdown: Item;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Object;
    buttonNode: Item;
    menuNode: Item;
    /**
     * @param {!Item} element
     * @param {!Object=} opt_options
     */
    constructor(element: Item, opt_options: Object | undefined = {}) {
        this.dropdown = element;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            id: generateId('dropdown'),
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.collection = /** @type {!Collection<!Objekt>} */ new Collection();
        this.actions = [];
        this.item = null;
        this._appendButton();
        this._appendMenu();
    }
    /**
     * @private
     * @return {undefined}
     */
    _appendButton(): void {
        this.buttonNode = new Item('button');
        this.buttonNode.setId(this.options.id);
        this.buttonNode.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);

        const iconNode = new Item('em');
        iconNode.addClass('material-icons');
        iconNode.setHtml('more_vert');
        this.buttonNode.appendChild(iconNode);

        this.dropdown.appendChild(this.buttonNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    _appendMenu(): void {
        this.menuNode = new Item('ul');
        this.menuNode.setFor(this.options.id);
        this.menuNode.addClass([
            'mdl-menu',
            'mdl-menu--bottom-right',
            'mdl-js-menu',
            'mdl-js-ripple-effect',
        ]);

        this.dropdown.appendChild(this.menuNode);
    }
    /**
     * @param {!Array} actions
     * @param {!Object} item
     * @return {undefined}
     */
    setActions(actions: Array<any>, item: Object): void {
        this.actions = actions;
        this.item = item;
        this._renderMenu();
        mdl(this.menuNode);
        mdl(this.buttonNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    _renderMenu(): void {
        eachArray(this.actions, (action) => {
            const [icon, title, disabled, removed] = action.style(this.item);
            if (!removed) {
                const menuItemNode = new Item<HTMLLIElement>('li');
                menuItemNode.addClass('mdl-menu__item');
                menuItemNode.setHtml(title || icon);
                if (disabled) {
                    menuItemNode.setAttribute('disabled');
                }
                menuItemNode.addEventListener('click', () => {
                    action.click(this.item);
                });
                this.menuNode.appendChild(menuItemNode);
            }
        });
    }
}
