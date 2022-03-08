import {
    eq,
    mdl,
    format,
    isFunction,
    isObject,
    noop,
} from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { Item } from '../core';

/**
 * @class
 */
export class Flash {
    container: Item;
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.container = new Query(this.options.id).getItem();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            id: '#flashes',
            duration: 4000,
            closableTypes: ['error'],
        });
        _self.options.merge(opt_options);
    }
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    _getFlashNode(
        type,
        message,
        opt_duration = 0,
        opt_closeCallback = null,
        opt_id = '',
    ) {
        const flashNode = this.container.createElement('div');
        flashNode.setAttribute('data-id', opt_id || generateId('flash'));
        flashNode.addClass(['flash', type]);
        flashNode.setHtml(message);
        if (
            this._isClosable(type, opt_closeCallback) &&
            !eq(opt_duration, Infinity)
        ) {
            const buttonNode = this._getCloseButton(
                flashNode,
                opt_closeCallback,
            );
            flashNode.beforeChild(buttonNode);
        }
        return flashNode;
    }
    /**
     * @param {!Item} flashNode
     * @param {?Function=} opt_closeCallback
     * @return {!Item}
     */
    _getCloseButton(flashNode, opt_closeCallback = null) {
        const buttonNode = flashNode.createElement('button');
        buttonNode.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);

        const buttonIcon = buttonNode.createElement('em');
        buttonIcon.addClass('material-icons');
        buttonIcon.setHtml('close');

        buttonNode.appendChild(buttonIcon);

        buttonNode.addEventListener('click', () => {
            this.remove(flashNode, opt_closeCallback);
        });

        mdl(buttonNode);

        return buttonNode;
    }
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    _add(
        type,
        message,
        opt_duration = 0,
        opt_closeCallback = null,
        opt_id = '',
    ) {
        this.removeById(opt_id);
        const flashNode = this._getFlashNode(
            type,
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
        this.container.appendChild(flashNode);
        if (
            !this._isClosable(type, opt_closeCallback) &&
            !eq(opt_duration, Infinity)
        ) {
            flashNode.addClass('closable');
            flashNode.addEventListener('click', () => {
                this.remove(flashNode, opt_closeCallback);
            });
            window.setTimeout(() => {
                this.remove(flashNode, opt_closeCallback);
            }, opt_duration || this.options.duration);
        }
        return flashNode;
    }
    /**
     * @param {string=} opt_id
     */
    removeById(opt_id = '') {
        if (opt_id) {
            const selector = format('[data-id={0}]', [opt_id]);
            const flashes = new Query(selector, this.container);
            flashes.each((flash) => {
                this.container.removeChild(flash);
            });
        }
    }
    /**
     * @param {string} type
     * @param {?Function=} opt_closeCallback
     * @return {boolean}
     */
    _isClosable(type, opt_closeCallback = null) {
        return (
            this.options.closableTypes.indexOf(type) !== -1 ||
            isFunction(opt_closeCallback)
        );
    }
    /**
     * @param {!Item} flash
     * @param {?Function=} opt_closeCallback
     * @return {undefined}
     */
    remove(flash, opt_closeCallback = null) {
        if (isFunction(opt_closeCallback)) {
            opt_closeCallback();
        }
        this.container.removeChild(flash);
    }
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addSuccess(
        message,
        opt_duration = 0,
        opt_closeCallback = null,
        opt_id = '',
    ) {
        return this._add(
            'success',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addInfo(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add(
            'info',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addWarning(
        message,
        opt_duration = 0,
        opt_closeCallback = null,
        opt_id = '',
    ) {
        return this._add(
            'warning',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addError(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add(
            'error',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
    /**
     * @param {{type: string, content: string, closable: boolean}} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item|null}
     */
    addMessage(
        message,
        opt_duration = 0,
        opt_closeCallback = null,
        opt_id = '',
    ) {
        if (isObject(message)) {
            const closeCallback = message['closable']
                ? noop
                : opt_closeCallback;
            return this._add(
                message['type'],
                message['content'],
                opt_duration,
                closeCallback,
                opt_id,
            );
        }
        return null;
    }
    /**
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Item}
     */
    addDefault(
        message,
        opt_duration = 0,
        opt_closeCallback = null,
        opt_id = '',
    ) {
        return this._add(
            'default',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
}
