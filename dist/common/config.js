ES_PROD = window['ES_PROD'] || false;
/**
 * @define {boolean}
 */
const GC_PROD = false;
/**
 */
export const releaseMode = ES_PROD || GC_PROD || false;
/**
 */
export const coreResources = {
    app: 'app',
    config: 'config',
    event: 'event',
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
    leftSidebar: 'leftSidebar',
    rightSidebar: 'rightSidebar',
    footer: 'footer',
    bottomMenu: 'bottomMenu',
    navBar: 'navBar',
    script: 'script',
    style: 'style',
    state: 'state',
    dom: 'dom',
    document: 'document',
    window: 'window',
    helper: 'helper',
    cookie: 'cookie',
    localStorage: 'localStorage',
    sessionStorage: 'sessionStorage',
    browser: 'browser',
    loader: 'loader',
    progressBar: 'progressBar',
    geoLocation: 'geoLocation',
    instances: 'instances',
    console: 'console',
    serviceWorker: 'serviceWorker',
    actionCable: 'actionCable',
};
