import { isSame } from '../utils/operation';
import { BaseTest } from './baseTest';
import { Item } from '../core/item';

/**
 * @class
 * @extends {BaseTest}
 */
export class ItemTest extends BaseTest {
    node: Item;
    /**
     *
     */
    constructor() {
        super('Item');
    }
    /**
     * @override
     * @return {undefined}
     */
    init(): void {
        this.node = new Item('div');

        this.testAttribute();
        this.testAttributeData();
        this.testData();
    }
    /**
     * @return {undefined}
     */
    testAttribute(): void {
        const values = ['text', null, true, false, Infinity, 0, 1, 10];

        for (let i = 0; i < values.length; i++) {
            this.node.setAttribute('data', values[i]);
            const value = this.node.getAttribute('data');
            const condition = isSame(value, values[i]);
            this.showAssert(condition, 'setAttribute(data)', values[i]);
            this.showAssert(condition, 'getAttribute(data)', value);
        }
    }
    /**
     * @return {undefined}
     */
    testAttributeData(): void {
        const values = [
            'text',
            null,
            true,
            false,
            Infinity,
            0,
            1,
            10,
            [0, 1, 10],
            { key: 'value' },
        ];

        for (let i = 0; i < values.length; i++) {
            this.node.setAttribute('data-value', values[i]);
            const value = this.node.getAttribute('data-value');
            const condition = isSame(value, values[i]);
            this.showAssert(condition, 'setAttribute(data-value)', values[i]);
            this.showAssert(condition, 'getAttribute(data-value)', value);
        }
        this.node.removeAttribute('data-value');
    }
    /**
     * @return {undefined}
     */
    testData(): void {
        const values = [
            '',
            'text',
            null,
            true,
            false,
            undefined,
            Infinity,
            0,
            1,
            10,
            [0, 1, 10],
            { key: 'value' },
        ];

        for (let i = 0; i < values.length; i++) {
            this.node.setData('value', values[i]);
            const value = this.node.getData('value');
            const condition = isSame(value, values[i]);
            this.showAssert(condition, 'setData(value)', values[i]);
            this.showAssert(condition, 'getData(value)', value);
        }
        this.node.removeData('value');
    }
}
