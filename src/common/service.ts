/**
 * Base service class with an `enter()` lifecycle hook.
 *
 * @description Services provide shared business logic and are managed by
 * the {@link Application} dependency injection container. Override `enter()`
 * to initialize the service when it is first activated.
 *
 * @example
 * class AuthService extends Service {
 *     enter(): void {
 *         // Initialize authentication state
 *     }
 * }
 *
 * @see {@link Application}
 * @see {@link Module}
 * @category Common
 */
export class Service {
    /**
     * Called when the service is activated. Override to perform initialization.
     */
    enter(): void {
        //empty method
    }
}
