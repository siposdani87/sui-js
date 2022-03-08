import { isSame } from '../utils/operation';
import { BaseTest } from './baseTest';
import { Item } from '../core/item';
/**
 * @class
 * @extends {BaseTest}
 */
export class NodeTest extends BaseTest {
    /**
     *
     */
    constructor() {
        super('Node');
    }
    /**
     * @override
     */
    init() {
        this.node = new Item('div');
        this.testAttribute();
        this.testAttributeData();
        this.testData();
    }
    /**
     *
     */
    testAttribute() {
        const values = ['text', null, true, false, Infinity, 0, 1, 10];
        for (let i = 0; i < values.length; i++) {
            this.node.setAttribute('data', values[i]);
            const value = this.node.getAttribute('data');
            if (!isSame(value, values[i])) {
                this.showError('setAttribute(data)', values[i]);
                this.showError('getAttribute(data)', value);
            }
        }
    }
    /**
     *
     */
    testAttributeData() {
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
            if (!isSame(value, values[i])) {
                this.showError('setAttribute(data-value)', values[i]);
                this.showError('getAttribute(data-value)', value);
            }
        }
        this.node.removeAttribute('data-value');
    }
    /**
     *
     */
    testData() {
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
            if (!isSame(value, values[i])) {
                this.showError('setData(value)', values[i]);
                this.showError('getData(value)', value);
            }
        }
        this.node.removeData('value');
    }
}
