import { BaseTest } from './baseTest';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseTest}
 */
export declare class NodeTest extends BaseTest {
    node: Item;
    /**
     *
     */
    constructor();
    /**
     * @override
     */
    init(): void;
    /**
     *
     */
    testAttribute(): void;
    /**
     *
     */
    testAttributeData(): void;
    /**
     *
     */
    testData(): void;
}
