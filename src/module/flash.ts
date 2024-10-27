import { eq, format, isFunction, isPureObject, noop } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { generateId } from '../utils/coder';
import { Knot } from '../core';
import { mdl } from '../utils/render';

export class Flash {
    container: Knot;
    options: Objekt;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _init(): void {
        this.container = new Query(this.options.id).getKnot();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            id: '#flashes',
            duration: 4000,
            closableTypes: ['error'],
        });
        this.options.merge(opt_options);
    }

    private _getFlashKnot(
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

    private _add(
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

    removeById(opt_id: string | undefined = '') {
        if (opt_id) {
            const selector = format('[data-id={0}]', [opt_id]);
            const flashes = new Query(selector, this.container);
            flashes.each((flash) => {
                this.container.removeChild(flash);
            });
        }
    }

    private _isClosable(
        type: string,
        opt_closeCallback: (Function | null) | undefined = null,
    ): boolean {
        return (
            this.options.closableTypes.indexOf(type) !== -1 ||
            isFunction(opt_closeCallback)
        );
    }

    remove(
        flash: Knot,
        opt_closeCallback: (Function | null) | undefined = null,
    ): void {
        if (isFunction(opt_closeCallback)) {
            opt_closeCallback();
        }
        this.container.removeChild(flash);
    }

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
