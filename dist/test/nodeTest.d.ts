import { BaseTest } from './baseTest';
/**
 * @class
 * @extends {BaseTest}
 */
export declare class NodeTest extends BaseTest {
    node: any;
    /**
     *
     */
    constructor();
    /**
     * @override
     */
    init(): void;
    testAttribute(): void;
    testAttributeData(): void;
    testData(): void;
}
