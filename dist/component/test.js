import { CollectionTest } from '../test/collectionTest';
import { DeferredTest } from '../test/deferredTest';
import { ItemTest } from '../test/itemTest';
import { ObjektTest } from '../test/objektTest';
import { consoleInfo } from '../utils/log';
/**
 * @class
 */
export class Test {
    /**
     * @return {undefined}
     */
    run() {
        const tests = [
            new CollectionTest(),
            new DeferredTest(),
            new ItemTest(),
            new ObjektTest(),
        ];
        for (const test of tests) {
            test.init();
            consoleInfo(`Test${test.name}.init()`);
        }
    }
}
