import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
import { Action } from '../utils';
/**
 * @class
 */
export declare class Table {
    tableNode: Item;
    options: Objekt;
    collection: Collection<Objekt>;
    query: string;
    actions: Action[];
    contentHandler: ContentHandler;
    headerNodes: Query<HTMLElement>;
    headerTexts: string[];
    tbody: Item;
    tfoot: Item;
    pager: Pager;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selector?: string | undefined, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initContentHandler;
    /**
     * @private
     * @return {undefined}
     */
    private _initSearch;
    /**
     * @private
     * @return {undefined}
     */
    private _initHeader;
    /**
     * @private
     * @param {!Item} headerNode
     * @param {number} columnIndex
     * @return {undefined}
     */
    private _renderHeader;
    /**
     * @private
     * @return {undefined}
     */
    private _initStructure;
    /**
     * @param {number=} opt_page
     * @return {undefined}
     */
    refresh(opt_page?: number | undefined): void;
    /**
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params: Objekt): void;
    /**
     * @private
     * @param {string} columnWithOrder
     * @return {undefined}
     */
    private _toggleSorting;
    /**
     * @private
     * @param {!Item} head
     * @param {number} i
     * @return {undefined}
     */
    private _handleSortingColumn;
    /**
     * @private
     * @return {undefined}
     */
    private _updateSorting;
    /**
     * @private
     * @param {string} column
     * @param {string=} opt_order
     * @return {undefined}
     */
    private _setSorting;
    /**
     * @private
     * @return {undefined}
     */
    private _resetSorting;
    /**
     * @private
     * @return {string}
     */
    private _getColumn;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    private _addHeaderRow;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {!Array<string>}
     */
    private _getRowStyle;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    private _addRow;
    /**
     * @param {!Array<Action>} actions
     * @return {undefined}
     */
    setActions(actions: Array<Action>): void;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {!Item} parentNode
     * @return {undefined}
     */
    private _renderDataNodeByItem;
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {number} columnIndex
     * @return {undefined}
     */
    private _renderDataNode;
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    private _renderActions;
    /**
     * @private
     * @param {!Item} containerNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    private _renderActionNodes;
    /**
     * @private
     * @param {!Item} dropDownNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    private _renderDropDownNode;
    /**
     * @private
     * @param {!Item} containerNode
     * @param {{style: !Function, click: !Function}} action
     * @param {!Objekt} item
     * @return {undefined}
     */
    private _createActionButton;
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    setData(items: Array<any>): void;
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: number): void;
    /**
     * @private
     * @return {!Array}
     */
    private _getItems;
    /**
     * @private
     * @return {undefined}
     */
    private _draw;
    /**
     * @return {undefined}
     */
    render(): void;
}
