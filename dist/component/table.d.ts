import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
/**
 * @class
 */
export declare class Table {
    tableNode: any;
    options: Objekt;
    collection: Collection<Objekt>;
    query: string;
    actions: any[];
    contentHandler: ContentHandler;
    headerNodes: any;
    headerTexts: any[];
    tbody: Item;
    tfoot: Item;
    pager: Pager;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: any, opt_selector?: string, opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
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
    _renderHeader(headerNode: any, columnIndex: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStructure(): void;
    /**
     * @param {number=} opt_page
     * @return {undefined}
     */
    refresh(opt_page?: number): void;
    /**
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params: any): void;
    /**
     * @private
     * @param {string} columnWithOrder
     * @return {undefined}
     */
    _toggleSorting(columnWithOrder: any): void;
    /**
     * @private
     * @param {!Item} head
     * @param {number} i
     * @return {undefined}
     */
    _handleSortingColumn(head: any, i: any): void;
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
    _setSorting(column: any, opt_order?: string): void;
    /**
     * @private
     * @return {undefined}
     */
    _resetSorting(): void;
    /**
     * @private
     * @return {string}
     */
    _getColumn(): any;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    _addHeaderRow(item: any, rowIndex: any): void;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {!Array<string>}
     */
    _getRowStyle(item: any, rowIndex: any): any[];
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @return {undefined}
     */
    _addRow(item: any, rowIndex: any): void;
    /**
     * @param {!Array<{style: !Function, click: !Function}>} actions
     * @return {undefined}
     */
    setActions(actions: any): void;
    /**
     * @private
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {!Item} parentNode
     * @return {undefined}
     */
    _renderDataNodeByItem(item: any, rowIndex: any, column: any, parentNode: any): void;
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @param {number} rowIndex
     * @param {string} column
     * @param {number} columnIndex
     * @return {undefined}
     */
    _renderDataNode(tableDataNode: any, item: any, rowIndex: any, column: any, columnIndex: any): void;
    /**
     * @private
     * @param {!Item} tableDataNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderActions(tableDataNode: any, item: any): void;
    /**
     * @private
     * @param {!Item} containerNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderActionNodes(containerNode: any, item: any): void;
    /**
     * @private
     * @param {!Item} dropDownNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    _renderDropDownNode(dropDownNode: any, item: any): void;
    /**
     * @private
     * @param {!Item} containerNode
     * @param {{style: !Function, click: !Function}} action
     * @param {!Objekt} item
     * @return {undefined}
     */
    _createActionButton(containerNode: any, action: any, item: any): void;
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    setData(items: any): void;
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: any): void;
    /**
     * @private
     * @return {!Array}
     */
    _getItems(): Objekt[];
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
