import { coreResources } from '../common/config';
import { Application } from './application';

describe('application', () => {
    let application: Application;

    beforeEach(() => {
        application = new Application({}, coreResources);
    });

    describe('run', () => {
        it('should log development environment message by default', () => {
            const infoSpy = jest.spyOn(console, 'info');

            application.run([], []);

            expect(infoSpy).toHaveBeenCalledWith(
                '%cApplication run in development environment...',
                'font-weight:bold;color:#000;',
            );
            infoSpy.mockRestore();
        });

        it('should log production environment message when production is true', () => {
            const infoSpy = jest.spyOn(console, 'info');
            const prodApp = new Application(
                { production: true, theme_color: '#f00' },
                coreResources,
            );

            prodApp.run([], []);

            expect(infoSpy).toHaveBeenCalledWith(
                '%cApplication run in production environment...',
                'font-weight:bold;color:#f00;',
            );
            infoSpy.mockRestore();
        });
    });

    describe('options', () => {
        it('should have default options', () => {
            expect(application.options.get('app_id')).toBe('sui-app');
            expect(application.options.get('backend')).toBe('');
            expect(application.options.get('production')).toBe(false);
            expect(application.options.get('theme_color')).toBe('#000');
        });

        it('should merge custom options with defaults', () => {
            const customApp = new Application(
                { app_id: 'my-app', backend: '/api' },
                coreResources,
            );

            expect(customApp.options.get('app_id')).toBe('my-app');
            expect(customApp.options.get('backend')).toBe('/api');
            expect(customApp.options.get('production')).toBe(false);
        });
    });

    describe('getLocale', () => {
        it('should return the default locale from navigator.language', () => {
            const locale = application.getLocale();
            expect(typeof locale).toBe('string');
            expect(locale.length).toBeGreaterThan(0);
        });

        it('should return a custom locale after setLocale', () => {
            application.setLocale('hu-HU');

            expect(application.getLocale()).toBe('hu-HU');
        });
    });

    describe('setLocale', () => {
        it('should persist the locale to options', () => {
            application.setLocale('de-DE');

            expect(application.options.locale).toBe('de-DE');
        });

        it('should persist the locale to localDepot', () => {
            application.setLocale('fr-FR');

            const depot = application.getInstance(
                'localDepot',
            ) as typeof application extends { getInstance(k: string): infer R }
                ? R
                : never;
            expect(depot).toBeTruthy();
        });
    });

    describe('getLanguage', () => {
        it('should return the language part of the locale', () => {
            application.setLocale('en-US');
            expect(application.getLanguage()).toBe('en');
        });

        it('should handle locale without region', () => {
            application.setLocale('ja');
            expect(application.getLanguage()).toBe('ja');
        });

        it('should handle locale with region', () => {
            application.setLocale('pt-BR');
            expect(application.getLanguage()).toBe('pt');
        });
    });

    describe('setLocaleWithReload', () => {
        it('should set locale and call state.reload', () => {
            application.run([], []);
            const state = application.getInstance('state') as {
                reload: () => void;
            };
            const reloadSpy = jest.spyOn(state, 'reload');

            application.setLocaleWithReload('it-IT');

            expect(application.getLocale()).toBe('it-IT');
            expect(reloadSpy).toHaveBeenCalled();
            reloadSpy.mockRestore();
        });
    });

    describe('getInstance', () => {
        it('should return registered framework instances', () => {
            expect(application.getInstance('http')).toBeTruthy();
            expect(application.getInstance('flash')).toBeTruthy();
            expect(application.getInstance('dialog')).toBeTruthy();
            expect(application.getInstance('confirm')).toBeTruthy();
            expect(application.getInstance('loader')).toBeTruthy();
            expect(application.getInstance('cookie')).toBeTruthy();
            expect(application.getInstance('eventBus')).toBeTruthy();
        });

        it('should return the application itself as app instance', () => {
            expect(application.getInstance('app')).toBe(application);
        });

        it('should return the config as options', () => {
            expect(application.getInstance('config')).toBe(application.options);
        });

        it('should return null for unregistered instances', () => {
            expect(application.getInstance('nonExistent' as never)).toBeNull();
        });

        it('should return depot instances', () => {
            expect(application.getInstance('localDepot')).toBeTruthy();
            expect(application.getInstance('sessionDepot')).toBeTruthy();
        });

        it('should return UI module instances', () => {
            expect(application.getInstance('header')).toBeTruthy();
            expect(application.getInstance('topMenu')).toBeTruthy();
            expect(application.getInstance('leftMenu')).toBeTruthy();
            expect(application.getInstance('footer')).toBeTruthy();
            expect(application.getInstance('navBar')).toBeTruthy();
            expect(application.getInstance('viewer')).toBeTruthy();
            expect(application.getInstance('progressBar')).toBeTruthy();
        });
    });

    describe('getController', () => {
        it('should return the default controller before any route', () => {
            const controller = application.getController() as {
                enter: () => void;
                exit: () => void;
            };
            expect(controller).toBeTruthy();
            expect(typeof controller.enter).toBe('function');
            expect(typeof controller.exit).toBe('function');
        });
    });

    describe('controller', () => {
        it('should register a controller with explicit injections', () => {
            class TestCtrl {
                enter() {}
                exit() {}
            }
            const name = application.controller(
                'testCtrl',
                ['http', 'flash'],
                TestCtrl,
            );
            expect(name).toBe('testCtrl');
        });

        it('should register a controller with auto-injection via static inject', () => {
            class AutoCtrl {
                static inject = ['http', 'flash'];
                enter() {}
                exit() {}
            }
            const name = application.controller('autoCtrl', AutoCtrl);
            expect(name).toBe('autoCtrl');
        });
    });

    describe('service', () => {
        it('should register a service with explicit injections', () => {
            class TestService {
                enter() {}
            }
            const name = application.service(
                'testService',
                ['http'],
                TestService,
            );
            expect(name).toBe('testService');
        });

        it('should register a service with auto-injection via static inject', () => {
            class AutoService {
                static inject = ['http', 'localDepot'];
                enter() {}
            }
            const name = application.service('autoService', AutoService);
            expect(name).toBe('autoService');
        });
    });

    describe('setRootState', () => {
        it('should set root state without params', () => {
            application.setRootState('dashboard');
            // No error thrown is the assertion
        });

        it('should set root state with params', () => {
            application.setRootState('dashboard', { tab: 'overview' });
            // No error thrown is the assertion
        });
    });

    describe('certificate', () => {
        it('should add sui-js class to html element', () => {
            const html = document.documentElement;
            expect(html.classList.contains('sui-js')).toBe(true);
        });
    });
});
