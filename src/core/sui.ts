/**
 * @license
 * Copyright 2015 Dániel Sipos (siposdani87@gmail.com),
 * SUI-JS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * A component handler interface using the revealing module design pattern.
 * More details on this design pattern here
 *
 * @author Dániel Sipos
 */

/**
 * @export
 * @define {boolean}
 */
export const releaseMode = false;

/**
 * @export
 * @struct
 */
export const SUI = {
    title: 'SUI-JS',
    description:
        'Frontend framework helps to build fast and modern web applications',
    version: '0.6.0',
    const: {},
    config: {},
    res: {},
    coreRes: {},
};

/**
 *
 */
SUI.coreRes = {
    // CORE
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
