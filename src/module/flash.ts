import { eq, format, isFunction, isPureObject, noop } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { Knot } from '../core';
import { mdl } from '../utils/render';

/**
 * @class
 */
export class Flash {
    container: Knot;
    options: Objekt;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.container = new Query(this.options.id).getKnot();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
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
     * @return {!Knot}
     */
    _getFlashKnot(
        type: string,
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        const flashKnot = this.container.createElement('div');
        flashKnot.setAttribute('data-id', opt_id || generateId('flash'));
        flashKnot.addClass(['flash', type]);
        flashKnot.setHtml(message);
        if (
            this._isClosable(type, opt_closeCallback) &&
            !eq(opt_duration, Infinity)
        ) {
            const buttonKnot = this._getCloseButton(
                flashKnot,
                opt_closeCallback,
            );
            flashKnot.beforeChild(buttonKnot);
        }
        return flashKnot;
    }
    /**
     * @param {!Knot} flashKnot
     * @param {?Function=} opt_closeCallback
     * @return {!Knot}
     */
    private _getCloseButton(
        flashKnot: Knot,
        opt_closeCallback: (Function | null) | undefined = null,
    ): Knot {
        const buttonKnot = flashKnot.createElement('button');
        buttonKnot.addClass([
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);

        const buttonIcon = buttonKnot.createElement('em');
        buttonIcon.addClass('material-icons');
        buttonIcon.setHtml('close');

        buttonKnot.appendChild(buttonIcon);

        buttonKnot.addEventListener('click', () => {
            this.remove(flashKnot, opt_closeCallback);
        });

        mdl(buttonKnot);

        return buttonKnot;
    }
    /**
     * @param {string} type
     * @param {string} message
     * @param {number=} opt_duration
     * @param {?Function=} opt_closeCallback
     * @param {string=} opt_id
     * @return {!Knot}
     */
    _add(
        type: string,
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        this.removeById(opt_id);
        const flashKnot = this._getFlashKnot(
            type,
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
        this.container.appendChild(flashKnot);
        if (
            !this._isClosable(type, opt_closeCallback) &&
            !eq(opt_duration, Infinity)
        ) {
            flashKnot.addClass('closable');
            flashKnot.addEventListener('click', () => {
                this.remove(flashKnot, opt_closeCallback);
            });
            window.setTimeout(() => {
                this.remove(flashKnot, opt_closeCallback);
            }, opt_duration || this.options.duration);
        }
        return flashKnot;
    }
    /**
     * @param {string=} opt_id
     */
    removeById(opt_id: string | undefined = '') {
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
    private _isClosable(
        type: string,
        opt_closeCallback: (Function | null) | undefined = null,
    ): boolean {
        return (
            this.options.closableTypes.indexOf(type) !== -1 ||
            isFunction(opt_closeCallback)
        );
    }
    /**
     * @param {!Knot} flash
     * @param {?Function=} opt_closeCallback
     * @return {undefined}
     */
    remove(
        flash: Knot,
        opt_closeCallback: (Function | null) | undefined = null,
    ): void {
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
     * @return {!Knot}
     */
    addSuccess(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
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
     * @return {!Knot}
     */
    addInfo(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
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
     * @return {!Knot}
     */
    addWarning(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
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
     * @return {!Knot}
     */
    addError(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
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
     * @return {!Knot|null}
     */
    addMessage(
        message: { type: string; content: string; closable?: boolean },
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot | null {
        if (isPureObject(message)) {
            const closeCallback = message.closable ? noop : opt_closeCallback;
            return this._add(
                message.type,
                message.content,
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
     * @return {!Knot}
     */
    addDefault(
        message: string,
        opt_duration: number | undefined = 0,
        opt_closeCallback: (Function | null) | undefined = null,
        opt_id: string | undefined = '',
    ): Knot {
        return this._add(
            'default',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }
}
