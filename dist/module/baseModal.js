import { isString, isNumber, noop, contain } from '../utils/operation';
import { Async } from '../core/async';
import { Query } from '../core/query';
/**
 * Abstract base class for modal dialog windows. Provides shared
 * functionality for opening, closing, positioning, and managing modal
 * overlays with a blur effect on the main container.
 *
 * Subclasses (such as {@link Dialog}, {@link Confirm}, and {@link Viewer})
 * must call `_initBase()` after setting up their own DOM references
 * (`modal`, `modalWindow`, `modalHeader`, `modalTitle`, `modalBody`,
 * `modalFooter`, and `body`) to initialize button handlers and shared
 * state.
 *
 * The modal supports close, minimize, and maximize buttons, and
 * automatically centers itself within the viewport. Open/close actions
 * apply a blur overlay to `.main-container` and prevent body scrolling.
 *
 * @example
 * // BaseModal is not instantiated directly; extend it instead:
 * class CustomModal extends BaseModal {
 *     constructor() {
 *         super();
 *         this.body = new Query('body').getKnot();
 *         this.modal = new Query('#custom-modal').getKnot();
 *         // ... set up remaining DOM refs ...
 *         this._initBase();
 *     }
 * }
 *
 * @see {@link Dialog}
 * @see {@link Confirm}
 * @see {@link Viewer}
 * @category Module
 */
export class BaseModal {
    /**
     * Initializes shared base state including window dimensions, the main
     * container reference for blur effects, and all modal control buttons.
     * Must be called by subclasses after their own DOM references are set.
     */
    _initBase() {
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.hasBlur = false;
        this._initButtons();
    }
    /**
     * Initializes all modal control buttons (close, minimize, maximize).
     */
    _initButtons() {
        this._initCloseButton();
        this._initMinimizeButton();
        this._initMaximizeButton();
    }
    /**
     * Initializes the minimize button if present in the modal DOM.
     * Adds MDL button classes and binds the minimize action.
     */
    _initMinimizeButton() {
        const btnMinimize = new Query('.minimize', this.modal).getKnot();
        if (!btnMinimize.isEmpty()) {
            btnMinimize.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnMinimize.addEventListener('click', () => {
                this._actionMinimize();
            });
            this.btnMinimize = btnMinimize;
        }
    }
    /**
     * Initializes the maximize button if present in the modal DOM.
     * Adds MDL button classes and binds the maximize action.
     */
    _initMaximizeButton() {
        const btnMaximize = new Query('.maximize', this.modal).getKnot();
        if (!btnMaximize.isEmpty()) {
            btnMaximize.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnMaximize.addEventListener('click', () => {
                this._actionMaximize();
            });
            this.btnMaximize = btnMaximize;
        }
    }
    /**
     * Initializes the close button if present in the modal DOM.
     * Adds MDL button classes and binds the cancel action, which
     * executes the cancel callback and then closes the modal.
     */
    _initCloseButton() {
        const btnClose = new Query('.close', this.modal).getKnot();
        if (!btnClose.isEmpty()) {
            btnClose.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-button--icon',
            ]);
            btnClose.addEventListener('click', () => {
                this._actionCancel();
            });
            this.btnClose = btnClose;
        }
    }
    /**
     * Checks whether the modal is currently visible.
     *
     * @returns True if the modal has the `visible-flex` CSS class, indicating
     *     it is open and displayed.
     *
     * @example
     * if (!dialog.isOpened()) {
     *     dialog.open();
     * }
     */
    isOpened() {
        return this.modal.hasClass('visible-flex');
    }
    /**
     * Shows or hides the close button based on the allowClose flag.
     *
     * @param opt_allowClose Whether the close button should be visible.
     */
    _handleCloseButton(opt_allowClose = true) {
        if (this.btnClose) {
            if (opt_allowClose) {
                this.btnClose.removeClass('hidden');
            }
            else {
                this.btnClose.addClass('hidden');
            }
        }
    }
    /**
     * Opens the modal dialog with a blur overlay on the main container.
     * Applies the `blur` class to `.main-container`, shows the modal,
     * and starts an interval to keep the modal centered as content
     * changes size.
     *
     * If another modal is already applying blur, the existing blur state
     * is preserved so that closing this modal does not remove the blur
     * prematurely.
     *
     * @param opt_allowClose Whether to show the close button. Defaults to
     *     true. Pass false to prevent the user from dismissing the modal
     *     via the close button.
     *
     * @example
     * confirm.load('Are you sure?', 'Yes', 'No');
     * confirm.open();
     *
     * @example
     * // Open without a close button (forced interaction)
     * dialog.open(false);
     */
    open(opt_allowClose = true) {
        this.hasBlur = this.mainContainerKnot.hasClass('blur');
        if (!this.hasBlur) {
            this.mainContainerKnot.addClass('blur');
            this.body.addClass('overflow-hidden');
        }
        this.modal.addClass('visible-flex');
        this.modal.removeClass('hidden');
        this._handleCloseButton(opt_allowClose);
        this._handleCenterPosition();
        this.interval = setInterval(() => {
            this._handleCenterPosition();
        }, 1000);
    }
    /**
     * Closes the modal dialog and clears its content. Removes the blur
     * overlay from `.main-container` (unless another modal applied it),
     * hides the modal, and removes all children from the title, body,
     * and footer sections.
     *
     * @example
     * dialog.close();
     */
    close() {
        clearInterval(this.interval);
        if (!this.hasBlur) {
            this.mainContainerKnot.removeClass('blur');
            this.body.removeClass('overflow-hidden');
        }
        this.modal.addClass('hidden');
        this.modal.removeClass('visible-flex');
        this.modalTitle.removeChildren();
        this.modalBody.removeChildren();
        this.modalFooter.removeChildren();
    }
    /**
     * Sets the modal header title text. Shows the header when the title
     * is a non-empty string or a number; hides it otherwise.
     *
     * @param opt_title The title text to display in the modal header.
     */
    _setTitle(opt_title) {
        this.modalTitle.setHtml(opt_title !== null && opt_title !== void 0 ? opt_title : '');
        if ((isString(opt_title) && opt_title.length > 0) ||
            isNumber(opt_title)) {
            this.modalHeader.removeClass('hidden');
        }
        else {
            this.modalHeader.addClass('hidden');
        }
    }
    /**
     * Resets the OK and Cancel event callbacks to no-op functions.
     * Called before loading new content to ensure stale callbacks from
     * a previous modal session are not carried over.
     */
    _reset() {
        this.eventOK = noop();
        this.eventCancel = noop();
    }
    /**
     * Executes the OK callback followed by closing the modal. Uses
     * {@link Async} serial execution to ensure the callback completes
     * before the modal is closed.
     */
    _actionOK() {
        const async = new Async();
        const calls = [this.eventOK.bind(this), this.close.bind(this)];
        async.serial(calls);
    }
    /**
     * Executes the Cancel callback followed by closing the modal. Uses
     * {@link Async} serial execution to ensure the callback completes
     * before the modal is closed.
     */
    _actionCancel() {
        const async = new Async();
        const calls = [this.eventCancel.bind(this), this.close.bind(this)];
        async.serial(calls);
    }
    /**
     * Handles the minimize button action. Currently a no-op placeholder
     * for future implementation.
     */
    _actionMinimize() {
        // empty function
    }
    /**
     * Handles the maximize button action. Currently a no-op placeholder
     * for future implementation.
     */
    _actionMaximize() {
        // empty function
    }
    /**
     * Updates the stored window dimensions and recalculates the modal
     * center position. Typically called when the browser window is
     * resized.
     *
     * @param width The current viewport width in pixels.
     * @param height The current viewport height in pixels.
     *
     * @example
     * window.addEventListener('resize', () => {
     *     modal.setSize(window.innerWidth, window.innerHeight);
     * });
     */
    setSize(width, height) {
        this.windowWidth = width;
        this.windowHeight = height;
        this._handleCenterPosition();
    }
    /**
     * Checks the computed height of the modal window and toggles the
     * `center` CSS class. When the modal is taller than the viewport,
     * centering is removed to allow scrolling; otherwise the modal is
     * vertically centered.
     */
    _handleCenterPosition() {
        const style = this.modalWindow.getComputedStyle();
        const styleHeight = style.getPropertyValue('height');
        if (contain(styleHeight, 'px')) {
            const height = parseInt(styleHeight.slice(0, -2), 10);
            if (height > this.windowHeight) {
                this.modal.removeClass('center');
            }
            else {
                this.modal.addClass('center');
            }
        }
        else {
            this.modal.addClass('center');
        }
    }
}
