import { eachArray } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { generateId } from '../utils/coder';
import { mdl } from '../utils/render';
export class Dropdown {
    constructor(element, opt_options = {}) {
        this.dropdown = element;
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: generateId('dropdown'),
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.collection = new Collection();
        this.actions = [];
        this.item = null;
        this._appendButton();
        this._appendMenu();
    }
    _appendButton() {
        this.buttonKnot = new Knot('button');
        this.buttonKnot.setId(this.options.id);
        this.buttonKnot.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);
        const iconKnot = new Knot('em');
        iconKnot.addClass('material-icons');
        iconKnot.setHtml('more_vert');
        this.buttonKnot.appendChild(iconKnot);
        this.dropdown.appendChild(this.buttonKnot);
    }
    _appendMenu() {
        this.menuKnot = new Knot('ul');
        this.menuKnot.setFor(this.options.id);
        this.menuKnot.addClass([
            'mdl-menu',
            'mdl-menu--bottom-right',
            'mdl-js-menu',
            'mdl-js-ripple-effect',
        ]);
        this.dropdown.appendChild(this.menuKnot);
    }
    setActions(actions, item) {
        this.actions = actions;
        this.item = item;
        this._renderMenu();
        mdl(this.menuKnot);
        mdl(this.buttonKnot);
    }
    _renderMenu() {
        eachArray(this.actions, (action) => {
            const [icon, title, disabled, removed] = action.style(this.item);
            if (!removed) {
                const menuKnotKnot = new Knot('li');
                menuKnotKnot.addClass('mdl-menu__item');
                menuKnotKnot.setHtml(title || icon);
                if (disabled) {
                    menuKnotKnot.setAttribute('disabled');
                }
                menuKnotKnot.addEventListener('click', () => {
                    action.click(this.item);
                });
                this.menuKnot.appendChild(menuKnotKnot);
            }
        });
    }
}
