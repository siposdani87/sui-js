import { Knot } from '../core';
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
export declare class BaseModal {
    windowWidth: number;
    windowHeight: number;
    mainContainerKnot: Knot;
    hasBlur: boolean;
    modal: Knot;
    btnMinimize: Knot;
    btnMaximize: Knot;
    btnClose: Knot;
    body: Knot;
    interval: number;
    modalTitle: Knot;
    modalBody: Knot;
    modalFooter: Knot;
    modalHeader: Knot;
    eventOK: () => void;
    eventCancel: () => void;
    modalWindow: Knot;
    /**
     * Initializes shared base state including window dimensions, the main
     * container reference for blur effects, and all modal control buttons.
     * Must be called by subclasses after their own DOM references are set.
     */
    protected _initBase(): void;
    /**
     * Initializes all modal control buttons (close, minimize, maximize).
     */
    private _initButtons;
    /**
     * Initializes the minimize button if present in the modal DOM.
     * Adds MDL button classes and binds the minimize action.
     */
    private _initMinimizeButton;
    /**
     * Initializes the maximize button if present in the modal DOM.
     * Adds MDL button classes and binds the maximize action.
     */
    private _initMaximizeButton;
    /**
     * Initializes the close button if present in the modal DOM.
     * Adds MDL button classes and binds the cancel action, which
     * executes the cancel callback and then closes the modal.
     */
    private _initCloseButton;
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
    isOpened(): boolean;
    /**
     * Shows or hides the close button based on the allowClose flag.
     *
     * @param opt_allowClose Whether the close button should be visible.
     */
    private _handleCloseButton;
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
    open(opt_allowClose?: boolean | undefined): void;
    /**
     * Closes the modal dialog and clears its content. Removes the blur
     * overlay from `.main-container` (unless another modal applied it),
     * hides the modal, and removes all children from the title, body,
     * and footer sections.
     *
     * @example
     * dialog.close();
     */
    close(): void;
    /**
     * Sets the modal header title text. Shows the header when the title
     * is a non-empty string or a number; hides it otherwise.
     *
     * @param opt_title The title text to display in the modal header.
     */
    protected _setTitle(opt_title: string | undefined): void;
    /**
     * Resets the OK and Cancel event callbacks to no-op functions.
     * Called before loading new content to ensure stale callbacks from
     * a previous modal session are not carried over.
     */
    protected _reset(): void;
    /**
     * Executes the OK callback followed by closing the modal. Uses
     * {@link Async} serial execution to ensure the callback completes
     * before the modal is closed.
     */
    protected _actionOK(): void;
    /**
     * Executes the Cancel callback followed by closing the modal. Uses
     * {@link Async} serial execution to ensure the callback completes
     * before the modal is closed.
     */
    protected _actionCancel(): void;
    /**
     * Handles the minimize button action. Currently a no-op placeholder
     * for future implementation.
     */
    private _actionMinimize;
    /**
     * Handles the maximize button action. Currently a no-op placeholder
     * for future implementation.
     */
    private _actionMaximize;
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
    setSize(width: number, height: number): void;
    /**
     * Checks the computed height of the modal window and toggles the
     * `center` CSS class. When the modal is taller than the viewport,
     * centering is removed to allow scrolling; otherwise the modal is
     * vertically centered.
     */
    private _handleCenterPosition;
}
