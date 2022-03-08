import { BaseTest } from './baseTest';
import { Collection } from '../core/collection';
/**
 * @class
 * @extends {BaseTest}
 */
export class ContainerTest extends BaseTest {
    /**
     *
     */
    constructor() {
        super('Deferred');
    }
    /**
     * @override
     */
    init() {
        this.container = /** @type {!Collection<!Objekt>} */ new Collection([
            {
                id: 1,
                text: 'text',
            },
            {
                id: 2,
                text: 'text2',
            },
        ]);
        this.testInit();
        this.testLoad();
    }
    /**
     *
     */
    testInit() { }
    /**
     *
     */
    testLoad() { }
}
