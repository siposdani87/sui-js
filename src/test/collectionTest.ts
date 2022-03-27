import { BaseTest } from './baseTest';
import { Collection } from '../core/collection';
import { Objekt } from '../core';

/**
 * @class
 * @extends {BaseTest}
 */
export class CollectionTest extends BaseTest {
    collection: Collection<Objekt>;
    /**
     *
     */
    constructor() {
        super('Collection');
    }
    /**
     * @override
     * @return {undefined}
     */
    init(): void {
        this.collection = new Collection([
            {
                id: 1,
                text: 'text',
            },
            {
                id: 2,
                text: 'text2',
            },
        ]);
    }
}
