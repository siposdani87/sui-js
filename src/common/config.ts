/**
 * Global release mode flag controlling debug behavior.
 *
 * @category Common
 */
export let releaseMode = true;

/**
 * Sets the global release mode flag.
 *
 * @param {boolean} mode Whether release mode is enabled.
 * @category Common
 */
export const setReleaseMode = (mode: boolean): void => {
    releaseMode = mode;
};

/**
 * Mapping of core dependency injection resource names used by {@link Application}.
 *
 * @category Common
 */
export const coreResources = {
    app: 'app',
    config: 'config',
    eventBus: 'eventBus',
    scheduler: 'scheduler',
    http: 'http',
    flash: 'flash',
    template: 'template',
    dialog: 'dialog',
    confirm: 'confirm',
    viewer: 'viewer',
    header: 'header',
    topMenu: 'topMenu',
    leftMenu: 'leftMenu',
    footer: 'footer',
    bottomMenu: 'bottomMenu',
    navBar: 'navBar',
    script: 'script',
    style: 'style',
    state: 'state',
    dom: 'dom',
    page: 'page',
    screen: 'screen',
    helper: 'helper',
    cookie: 'cookie',
    localDepot: 'localDepot',
    sessionDepot: 'sessionDepot',
    browser: 'browser',
    loader: 'loader',
    progressBar: 'progressBar',
    geoLocation: 'geoLocation',
    instances: 'instances',
    console: 'console',
};
