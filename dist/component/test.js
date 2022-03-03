import { ContainerTest } from '../test/containerTest';
import { DeferredTest } from '../test/deferredTest';
import { NodeTest } from '../test/nodeTest';
import { ObjektTest } from '../test/objektTest';
import { consoleInfo } from '../utils/log';
/**
 * @class
 */
export class Test {
    /**
     */
    constructor() { }
    /**
     * @return {undefined}
     */
    run() {
        const tests = [
            new ContainerTest(),
            new DeferredTest(),
            new NodeTest(),
            new ObjektTest(),
        ];
        for (const test of tests) {
            test.init();
            consoleInfo(`Test${test.name}.init()`);
        }
    }
}
