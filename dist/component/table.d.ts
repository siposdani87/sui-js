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
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initContentHandler(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initSearch(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initHeader(): void;
    /**
     * @private
     * @param {!Item} headerNode
     * @param {number} columnIndex
     * @return {undefined}
     */
    _renderHeader(headerNode: Item, columnIndex: number): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStructure(): void;
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
    _toggleSorting(columnWithOrder: string): void;
    /**
     * @private
     * @param {!Item} head
     * @param {number} i
     * @return {undefined}
     */
    _handleSortingColumn(head: Item, i: number): void;
    /**
     * @private
     * @return {undefined}
     */
    _updateSorting(): void;
    /**
     * @private
     * @param {string} column
     * @param {string=} opt_order
     * @return {undefined}
     */
    _setSorting(column: string, opt_order?: string | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _resetSorting(): void;
    /**
     * @private
     * @return {string}
     */
    _getColumn(): string;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    _addHeaderRow(item: Objekt, rowIndex: number): void;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {!Array<string>}
     */
    _getRowStyle(item: Objekt, rowIndex: number): Array<string>;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    _addRow(item: Objekt, rowIndex: number): void;
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
    _renderDataNodeByItem(item: Objekt, rowIndex: number, column: string, parentNode: Item): void;
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {number} columnIndex
     * @return {undefined}
     */
    _renderDataNode(tableDataNode: Item, item: Objekt, rowIndex: number, column: string, columnIndex: number): void;
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderActions(tableDataNode: Item, item: Objekt): void;
    /**
     * @private
     * @param {!Item} containerNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderActionNodes(containerNode: Item, item: Objekt): void;
    /**
     * @private
     * @param {!Item} dropDownNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderDropDownNode(dropDownNode: Item, item: Objekt): void;
    /**
     * @private
     * @param {!Item} containerNode
     * @param {{style: !Function, click: !Function}} action
     * @param {!Objekt} item
     * @return {undefined}
     */
    _createActionButton(containerNode: Item, action: {
        style: Function;
        click: Function;
    }, item: Objekt): void;
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
    _getItems(): Array<any>;
    /**
     * @private
     * @return {undefined}
     */
    _draw(): void;
    /**
     * @return {undefined}
     */
    render(): void;
}
