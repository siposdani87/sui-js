import { eachArray } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { generateId } from '../utils/coder';
import { Action } from '../utils';
import { mdl } from '../utils/render';

export class Dropdown {
    dropdown: Knot;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Objekt;
    buttonKnot: Knot;
    menuKnot: Knot;

    constructor(element: Knot, opt_options: object | undefined = {}) {
        this.dropdown = element;
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: generateId('dropdown'),
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.collection = new Collection();
        this.actions = [];
        this.item = null;
        this._appendButton();
        this._appendMenu();
    }

    private _appendButton(): void {
        this.buttonKnot = new Knot<HTMLButtonElement>('button');
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

    private _appendMenu(): void {
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

    setActions(actions: Array<Action>, item: Objekt): void {
        this.actions = actions;
        this.item = item;
        this._renderMenu();
        mdl(this.menuKnot);
        mdl(this.buttonKnot);
    }

    private _renderMenu(): void {
        eachArray(this.actions, (action) => {
            const [icon, title, disabled, removed] = action.style(this.item);
            if (!removed) {
                const menuKnotKnot = new Knot<HTMLLIElement>('li');
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
