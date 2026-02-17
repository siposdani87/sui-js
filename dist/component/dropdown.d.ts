import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Action } from '../utils';
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
export declare class Dropdown {
    dropdown: Knot;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Objekt | null;
    buttonKnot: Knot;
    menuKnot: Knot;
    /**
     * @description Creates a new Dropdown attached to the given element.
     * @param {Knot} element - The container element for the dropdown.
     * @param {object} [opt_options] - Configuration options (id).
     */
    constructor(element: Knot, opt_options?: object | undefined);
    /**
     * @description Merges user options with defaults, generating a unique ID.
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions;
    /**
     * @description Initializes the collection, actions, and appends the button and menu DOM elements.
     */
    private _init;
    /**
     * @description Creates and appends the MDL icon button that triggers the dropdown menu.
     */
    private _appendButton;
    /**
     * @description Creates and appends the MDL menu list element.
     */
    private _appendMenu;
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
    setActions(actions: Array<Action>, item: Objekt): void;
    /**
     * @description Renders menu items from the actions array, applying style and disabled states.
     */
    private _renderMenu;
}
