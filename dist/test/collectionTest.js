import { BaseTest } from './baseTest';
import { Collection } from '../core/collection';
/**
 * @class
 * @extends {BaseTest}
 */
export class CollectionTest extends BaseTest {
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
    init() {
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
