import { contain, each, format } from '../utils/operation';
import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
import { consoleWarn } from '../utils/log';
import { mdl } from '../utils/render';
/**
 * @class
 */
export class CardCollection {
    /**
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {?Object=} opt_ctrl
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = '.card-collection', opt_ctrl = null, opt_options = {}) {
        this.cardCollectionNode = new Query(opt_selector, dom).getKnot();
        this.ctrl = opt_ctrl;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            no_content: {
                image_url: null,
                text: '',
            },
            row_count: 12,
            pager_num: 4,
            sort: {
                column: null,
                order: 'asc',
            },
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.collection = new Collection();
        this.query = '';
        this._initContentHandler();
        this._initStructure();
        this._initTemplate();
        this.pager = new Pager(this.cardCollectionNode, ['.pager', '.pager-statistics'], this.options);
        this.pager.eventAction = (page) => {
            this.refresh(page);
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initContentHandler() {
        this.contentHandler = new ContentHandler(this.cardCollectionNode, this.options.no_content);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initStructure() {
        this.cardCollectionNode.addClass('card-collection');
        this.body = new Knot('div');
        this.body.addClass('cards');
        this.cardCollectionNode.appendChild(this.body);
        this.cardFooterNode = new Knot('div');
        this.cardFooterNode.addClass('card-footer');
        this.cardCollectionNode.appendChild(this.cardFooterNode);
        this.pagerNode = new Knot('div');
        this.pagerNode.addClass('pager-statistics');
        this.cardFooterNode.appendChild(this.pagerNode);
        this.pagerNode = new Knot('div');
        this.pagerNode.addClass('pager');
        this.cardFooterNode.appendChild(this.pagerNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initTemplate() {
        this.cardTemplate = new Query('template', this.cardCollectionNode).getKnot();
        this.cardTemplate.remove();
        this.template = this.cardTemplate.toString(false);
    }
    /**
     * @private
     * @param {!Objekt} item
     * @return {!Knot}
     */
    _getCardNode(item) {
        const regex = new RegExp('{{[a-zA-Z._,() ]*}}', 'g');
        const matches = this.template.match(regex);
        let cloneTemplate = this.template;
        each(matches, (match) => {
            const expression = match.replace('{{', '').replace('}}', '');
            if (contain(expression, 'ctrl.')) {
                const paramsRegex = new RegExp('(([a-zA-Z._, ]*))', 'g');
                const expressionMatches = expression.match(paramsRegex);
                const fnName = expressionMatches[0].replace('ctrl.', '');
                const fnKeys = expressionMatches[2].split(', ');
                const fnParams = [];
                each(fnKeys, (key) => {
                    if (key === 'item') {
                        fnParams.push(item);
                    }
                    else {
                        fnParams.push(item.get(key));
                    }
                });
                if (this.ctrl) {
                    const method = this.ctrl[fnName];
                    if (method) {
                        const result = method.apply(this.ctrl, fnParams);
                        cloneTemplate = cloneTemplate.replace(match, result);
                    }
                    else {
                        consoleWarn(format('ctrl.{0}() missing', [fnName]));
                    }
                }
            }
            else {
                cloneTemplate = cloneTemplate.replace(match, item.get(expression));
            }
        });
        return new Knot(cloneTemplate);
    }
    /**
     * @param {number=} opt_page
     * @return {undefined}
     */
    refresh(opt_page = -1) {
        if (opt_page > -1) {
            this.pager.setPage(opt_page);
        }
        const params = new Objekt({
            query: this.query,
            column: this.options.sort.column,
            order: this.options.sort.order,
            offset: this.pager.offset,
            limit: this.options.row_count,
        });
        this.eventAction(params);
    }
    /**
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params) {
        consoleWarn('CardCollection.eventAction()', params);
    }
    /**
     * @param {!Knot} cardNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    eventCardNode(cardNode, item) {
        consoleWarn('CardCollection.eventCardNode()', cardNode, item);
    }
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _addCard(item) {
        const cardNode = this._getCardNode(item);
        this.body.appendChild(cardNode);
        this.eventCardNode(cardNode, item);
        mdl(cardNode);
    }
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    setData(items) {
        this.collection.reload(items);
        if (this.collection.size() === 0) {
            this.contentHandler.show();
        }
        else {
            this.contentHandler.hide();
            this._draw();
        }
    }
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count) {
        this.pager.setCount(count);
        this.pager.draw();
    }
    /**
     * @private
     * @return {!Array}
     */
    _getItems() {
        let items = this.collection.getItems();
        if (this.collection.size() > this.options.row_count) {
            items = this.collection.limit(this.pager.offset, this.options.row_count);
        }
        return items;
    }
    /**
     * @private
     * @return {undefined}
     */
    _draw() {
        this.body.removeChildren();
        each(this._getItems(), (item) => {
            this._addCard(item);
        });
        mdl(this.body);
    }
    /**
     * @return {undefined}
     */
    render() {
        this.refresh();
    }
}
