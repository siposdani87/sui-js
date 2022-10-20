import { eachArray } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { generateId } from '../utils/coder';
import { Action } from '../utils';
import { mdl } from '../utils/render';

/**
 * @class
 */
export class Dropdown {
    dropdown: Knot;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Object;
    buttonNode: Knot;
    menuNode: Knot;
    /**
     * @param {!Knot} element
     * @param {!Object=} opt_options
     */
    constructor(element: Knot, opt_options: Object | undefined = {}) {
        this.dropdown = element;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
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
    private _init(): void {
        this.collection = new Collection();
        this.actions = [];
        this.item = null;
        this._appendButton();
        this._appendMenu();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _appendButton(): void {
        this.buttonNode = new Knot('button');
        this.buttonNode.setId(this.options.id);
        this.buttonNode.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);

        const iconNode = new Knot('em');
        iconNode.addClass('material-icons');
        iconNode.setHtml('more_vert');
        this.buttonNode.appendChild(iconNode);

        this.dropdown.appendChild(this.buttonNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _appendMenu(): void {
        this.menuNode = new Knot('ul');
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
    private _renderMenu(): void {
        eachArray(this.actions, (action) => {
            const [icon, title, disabled, removed] = action.style(this.item);
            if (!removed) {
                const menuKnotNode = new Knot<HTMLLIElement>('li');
                menuKnotNode.addClass('mdl-menu__item');
                menuKnotNode.setHtml(title || icon);
                if (disabled) {
                    menuKnotNode.setAttribute('disabled');
                }
                menuKnotNode.addEventListener('click', () => {
                    action.click(this.item);
                });
                this.menuNode.appendChild(menuKnotNode);
            }
        });
    }
}
