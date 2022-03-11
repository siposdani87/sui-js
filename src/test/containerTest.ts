import { BaseTest } from './baseTest';
import { Collection } from '../core/collection';
import { Objekt } from '../core';

/**
 * @class
 * @extends {BaseTest}
 */
export class ContainerTest extends BaseTest {
    collection: Collection<Objekt>;
    /**
     *
     */
    constructor() {
        super('Deferred');
    }
    /**
     * @override
     * @return {undefined}
     */
    init(): void {
        this.collection = /** @type {!Collection<!Objekt>} */ new Collection([
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
