import { BaseTest } from './baseTest';
import { Collection } from '../core/collection';
import { Objekt } from '../core';
/**
 * @class
 * @extends {BaseTest}
 */
export declare class CollectionTest extends BaseTest {
    collection: Collection<Objekt>;
    /**
     *
     */
    constructor();
    /**
     * @override
     * @return {undefined}
     */
    init(): void;
}