import { BaseTest } from './baseTest';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseTest}
 */
export declare class ItemTest extends BaseTest {
    node: Item;
    /**
     *
     */
    constructor();
    /**
     * @override
     * @return {undefined}
     */
    init(): void;
    /**
     * @return {undefined}
     */
    testAttribute(): void;
    /**
     * @return {undefined}
     */
    testAttributeData(): void;
    /**
     * @return {undefined}
     */
    testData(): void;
}
