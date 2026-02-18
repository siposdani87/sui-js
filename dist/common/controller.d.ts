/**
 * Base controller class with `enter()` and `exit()` lifecycle hooks.
 *
 * @description Controllers manage page-level logic and are instantiated by
 * the {@link Application} router. Override `enter()` to set up the page
 * and `exit()` to tear down resources when navigating away.
 *
 * @example
 * class HomeController extends Controller {
 *     enter(): void {
 *         // Set up home page
 *     }
 *     exit(): void {
 *         // Clean up resources
 *     }
 * }
 *
 * @see {@link Application}
 * @see {@link Module}
 * @category Common
 */
export declare class Controller {
    /**
     * Called when the controller becomes active. Override to initialize page logic.
     */
    enter(): void;
    /**
     * Called when the controller is deactivated. Override to clean up resources.
     */
    exit(): void;
}
