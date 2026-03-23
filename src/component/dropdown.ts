import { eachArray } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { generateId } from '../utils/coder';
import type { Action } from '../utils';

/**
 * Dropdown action menu that renders a "more" icon button with
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
     * Creates a new Dropdown attached to the given element.
     * @param {Knot} element - The container element for the dropdown.
     * @param {object} [opt_options] - Configuration options (id).
     */
    constructor(element: Knot, opt_options: object | undefined = {}) {
        this.dropdown = element;
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * Merges user options with defaults, generating a unique ID.
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: generateId('dropdown'),
        });
        this.options.merge(opt_options);
    }

    /**
     * Initializes the collection, actions, and appends the button and menu DOM elements.
     */
    private _init(): void {
        this.collection = new Collection();
        this.actions = [];
        this.item = null;
        this._appendButton();
        this._appendMenu();
    }

    /**
     * Creates and appends the icon button that triggers the dropdown menu.
     */
    private _appendButton(): void {
        this.buttonKnot = new Knot<HTMLButtonElement>('button');
        this.buttonKnot.setId(this.options.id);
        this.buttonKnot.setAttribute('aria-haspopup', 'menu');
        this.buttonKnot.setAttribute('aria-expanded', 'false');
        this.buttonKnot.addClass(['sui-button', 'sui-button--icon']);

        const iconKnot = new Knot('em');
        iconKnot.addClass('material-icons');
        iconKnot.setHtml('more_vert');
        this.buttonKnot.appendChild(iconKnot);

        this.dropdown.appendChild(this.buttonKnot);
    }

    /**
     * Creates and appends the menu list element.
     */
    private _appendMenu(): void {
        this.menuKnot = new Knot('ul');
        this.menuKnot.setAttribute('role', 'menu');
        this.menuKnot.setFor(this.options.id);
        this.menuKnot.addClass(['sui-menu', 'sui-menu--bottom-right']);

        this.dropdown.appendChild(this.menuKnot);
    }

    /**
     * Populates the dropdown menu with actions for the given data item.
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
        this._bindMenuToggle();
    }

    /**
     * Binds click events to toggle menu visibility and close on outside click.
     */
    private _bindMenuToggle(): void {
        this.buttonKnot.addEventListener('click', () => {
            this.menuKnot.toggleClass('is-visible');
            const expanded = this.menuKnot.hasClass('is-visible');
            this.buttonKnot.setAttribute('aria-expanded', String(expanded));
        });

        document.addEventListener('click', (event) => {
            const target = event.target as Node;
            if (!this.dropdown.getNode().contains(target)) {
                this.menuKnot.removeClass('is-visible');
                this.buttonKnot.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Renders menu items from the actions array, applying style and disabled states.
     */
    private _renderMenu(): void {
        eachArray(this.actions, (action) => {
            const [icon, title, disabled, removed] = action.style(this.item!);
            if (!removed) {
                const menuKnotKnot = new Knot<HTMLLIElement>('li');
                menuKnotKnot.setAttribute('role', 'menuitem');
                menuKnotKnot.addClass('sui-menu__item');
                menuKnotKnot.setHtml(title || icon);
                if (disabled) {
                    menuKnotKnot.setAttribute('disabled');
                }
                menuKnotKnot.addEventListener('click', () => {
                    action.click(this.item!);
                    this.menuKnot.removeClass('is-visible');
                });
                this.menuKnot.appendChild(menuKnotKnot);
            }
        });
    }
}
