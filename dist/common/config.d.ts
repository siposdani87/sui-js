/**
 * Global release mode flag controlling debug behavior.
 *
 * @category Common
 */
export declare let releaseMode: boolean;
/**
 * Sets the global release mode flag.
 *
 * @param {boolean} mode Whether release mode is enabled.
 * @category Common
 */
export declare const setReleaseMode: (mode: boolean) => void;
/**
 * Mapping of core dependency injection resource names used by {@link Application}.
 *
 * @category Common
 */
export declare const coreResources: {
    app: string;
    config: string;
    eventBus: string;
    scheduler: string;
    http: string;
    flash: string;
    template: string;
    dialog: string;
    confirm: string;
    viewer: string;
    header: string;
    topMenu: string;
    leftMenu: string;
    footer: string;
    bottomMenu: string;
    navBar: string;
    script: string;
    style: string;
    state: string;
    dom: string;
    page: string;
    screen: string;
    helper: string;
    cookie: string;
    localDepot: string;
    sessionDepot: string;
    browser: string;
    loader: string;
    progressBar: string;
    geoLocation: string;
    instances: string;
    console: string;
};
