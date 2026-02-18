import { eachArray } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { generateId } from '../utils/coder';
import { Action } from '../utils';
import { mdl } from '../utils/render';

/**
 * @description MDL-based dropdown action menu that renders a "more" icon button with
 * a list of context actions for a data item.
 *
 * @example
 * const dropdown = new Dropdown(containerKnot);
 * dropdown.setActions(actions, item);
 *
 * @see {@link Table} for table rows that use dropdowns for row actions
 *
 * @category Component
 */
export class Dropdown {
    dropdown: Knot;
    options!: Objekt;
    collection!: Collection<Objekt>;
    actions!: Action[];
    item!: Objekt | null;
    buttonKnot!: Knot;
    menuKnot!: Knot;

    /**
     * @description Creates a new Dropdown attached to the given element.
     * @param {Knot} element - The container element for the dropdown.
     * @param {object} [opt_options] - Configuration options (id).
     */
    constructor(element: Knot, opt_options: object | undefined = {}) {
        this.dropdown = element;
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * @description Merges user options with defaults, generating a unique ID.
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: generateId('dropdown'),
        });
        this.options.merge(opt_options);
    }

    /**
     * @description Initializes the collection, actions, and appends the button and menu DOM elements.
     */
    private _init(): void {
        this.collection = new Collection();
        this.actions = [];
        this.item = null;
        this._appendButton();
        this._appendMenu();
    }

    /**
     * @description Creates and appends the MDL icon button that triggers the dropdown menu.
     */
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

    /**
     * @description Creates and appends the MDL menu list element.
     */
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

    /**
     * @description Populates the dropdown menu with actions for the given data item.
     * @param {Array<Action>} actions - Array of action definitions with style and click callbacks.
     * @param {Objekt} item - The data item the actions apply to.
     *
     * @example
     * dropdown.setActions([
     *     { style: (item) => ['edit', 'Edit', false, false], click: (item) => edit(item) },
     * ], item);
     */
    setActions(actions: Array<Action>, item: Objekt): void {
        this.actions = actions;
        this.item = item;
        this._renderMenu();
        mdl(this.menuKnot);
        mdl(this.buttonKnot);
    }

    /**
     * @description Renders menu items from the actions array, applying style and disabled states.
     */
    private _renderMenu(): void {
        eachArray(this.actions, (action) => {
            const [icon, title, disabled, removed] = action.style(this.item!);
            if (!removed) {
                const menuKnotKnot = new Knot<HTMLLIElement>('li');
                menuKnotKnot.addClass('mdl-menu__item');
                menuKnotKnot.setHtml(title || icon);
                if (disabled) {
                    menuKnotKnot.setAttribute('disabled');
                }
                menuKnotKnot.addEventListener('click', () => {
                    action.click(this.item!);
                });
                this.menuKnot.appendChild(menuKnotKnot);
            }
        });
    }
}
