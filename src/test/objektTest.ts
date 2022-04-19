import { BaseTest } from './baseTest';
import { Objekt } from '../core/objekt';

/**
 * @class
 * @extends {BaseTest}
 */
export class ObjektTest extends BaseTest {
    /**
     *
     */
    constructor() {
        super('Objekt');
    }
    /**
     * @override
     * @return {undefined}
     */
    init(): void {
        this.testMerge();
        this.testGetTypedValue();
        this.testGet();
        this.testSet();
        this.testRemove();
        this.testCopy();
    }
    /**
     * @return {undefined}
     */
    testMerge(): void {
        const options = new Objekt({
            attr: null,
            obj: {
                attr2: 1,
                attr4: 3,
            },
        });
        this.showAssert(options.attr === null, 'merge', 1);

        options.merge({
            attr: 'value1',
            obj: {
                attr2: 2,
                attr3: null,
            },
        });
        this.showAssert(options.attr === 'value1', 'merge', 2);
        this.showAssert(options.obj.attr2 === 2, 'merge', 3);
        this.showAssert(options.obj.attr3 === null, 'merge', 4);
        this.showAssert(options.obj.attr4 === 3, 'merge', 5);
    }
    /**
     * @return {undefined}
     */
    testGetTypedValue(): void {
        const options = new Objekt({
            attr: 'null',
            obj: {
                attr2: '1',
                attr3: '3.2',
            },
            attr4: 'false',
            attr5: 'true',
            attr6: 'string123,456.789',
            attr7: undefined,
            attr8: null,
            attr9: '1e+3',
            attr10: '1e-3',
            attr11: '1E3',
            attr12: '2e234',
            attr13: '8e23467',
        });
        this.showAssert(options.attr === null, '_getTypedValue', 0);
        this.showAssert(options.obj.attr2 === 1, '_getTypedValue', 1);
        this.showAssert(options.obj.attr3 === 3.2, '_getTypedValue', 2);
        this.showAssert(options.attr4 === false, '_getTypedValue', 3);
        this.showAssert(options.attr5 === true, '_getTypedValue', 4);
        this.showAssert(
            options.attr6 === 'string123,456.789',
            '_getTypedValue',
            5,
        );
        this.showAssert(options.attr7 === undefined, '_getTypedValue', 6);
        this.showAssert(options.attr8 === null, '_getTypedValue', 7);
        this.showAssert(options.attr9 === 1e3, '_getTypedValue', 8);
        this.showAssert(options.attr10 === 1e-3, '_getTypedValue', 9);
        this.showAssert(options.attr11 === 1e3, '_getTypedValue', 10);
        this.showAssert(options.attr12 === 2e234, '_getTypedValue', 11);
        this.showAssert(options.attr13 === '8e23467', '_getTypedValue', 12);
    }
    /**
     * @return {undefined}
     */
    testGet(): void {
        const options = new Objekt({
            attr: null,
            obj: {
                attr2: 1,
                obj2: {
                    attr4: 2,
                    attr3: 3.2,
                    attr5: 4.5,
                },
            },
            arr: [
                {
                    attr1: -4,
                },
            ],
        });
        options.set('attr', null);
        this.showAssert(options.get('attr') === null, 'get', 0);

        options.set('obj.attr2', 1);
        this.showAssert(options.get('obj.attr2') === 1, 'get', 1);

        options.set('obj.obj2.attr3', 3.2);
        this.showAssert(options.get('obj.obj2.attr3') === 3.2, 'get', 2);

        this.showAssert(options.get('obj.obj3') == undefined, 'get', 3);

        this.showAssert(options.get('arr.0.attr1') === -4, 'get', 4);
    }
    /**
     * @return {undefined}
     */
    testSet(): void {
        const options = new Objekt({
            attr: 0,
            obj: {
                attr2: 0,
                obj2: {
                    attr3: 0,
                },
            },
            other: {
                attr4: 32,
            },
            other2: {
                other3: {
                    attr5: 13,
                    attr6: 'title',
                },
            },
        });
        options.set('attr', null);
        this.showAssert(options.get('attr') === null, 'set', 0);

        options.set('obj.attr2', 1);
        this.showAssert(options.get('obj.attr2') === 1, 'set', 1);

        options.set('obj.obj2.attr3', 3.2);
        this.showAssert(options.get('obj.obj2.attr3') === 3.2, 'set', 2);

        options.set('obj.obj3', 5);
        this.showAssert(options.get('obj.obj3') === 5, 'set', 3);

        options.set('other', null);
        this.showAssert(options.get('other') === null, 'set', 4);

        options.set('other2.other3', null);
        this.showAssert(options.get('other2.other3') === null, 'set', 5);
    }
    /**
     * @return {undefined}
     */
    testRemove(): void {
        const options = new Objekt({
            attr: 0,
            obj: {
                attr2: 0,
                obj2: {
                    attr3: 0,
                },
            },
        });
        options.remove('attr');
        this.showAssert(options.get('attr') === undefined, 'remove', 0);

        options.remove('obj.attr2');
        this.showAssert(options.get('obj.attr2') === undefined, 'remove', 1);

        options.remove('obj.obj2.attr3');
        this.showAssert(
            options.get('obj.obj2.attr3') === undefined,
            'remove',
            2,
        );

        options.remove('obj.obj3');
        this.showAssert(options.get('obj.obj3') === undefined, 'remove', 3);
    }
    /**
     * @return {undefined}
     */
    testCopy(): void {
        const options = new Objekt({
            attr: 0,
            obj: {
                attr2: 0,
                obj2: {
                    attr3: 0,
                },
            },
        });
        options.set('obj.attr2', 0);
        const optionsCopy = options.copy();
        optionsCopy.remove('obj.attr2');

        this.showAssert(options.get('obj.attr2') === 0, 'copy', 0);
    }
}
