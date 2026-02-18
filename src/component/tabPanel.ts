import { isNull } from '../utils/operation';
import { Async } from '../core/async';
import { Deferred } from '../core/deferred';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { Knot } from '../core';

/**
 * @description Tab panel component that manages tab/panel activation with async change events.
 * Tabs are linked to panels by href attributes, and switching triggers an overridable
 * eventChange callback through the {@link Async} serial pipeline.
 *
 * @example
 * const tabPanel = new TabPanel(containerKnot, '.tab-panel', 'details');
 * tabPanel.eventChange = (panelId) => loadContent(panelId);
 * tabPanel.setActive('settings');
 *
 * @see {@link Async} for the async serial execution pipeline
 * @see {@link Deferred} for the promise-like deferred object
 *
 * @category Component
 */
export class TabPanel {
    tabPanel: Knot;
    options: { selected_tab: string; default_tab: string };
    activeTab!: string;
    tabs!: Query;
    panels!: Query;

    /**
     * @description Creates a new TabPanel bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the tab panel container.
     * @param {string} [opt_selectedTab] - ID of the initially selected tab.
     * @param {string} [opt_defaultTab] - Fallback tab ID when no match is found.
     */
    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.tab-panel',
        opt_selectedTab: string | undefined = '',
        opt_defaultTab: string | undefined = '',
    ) {
        this.tabPanel = new Query(opt_selector, dom).getKnot();
        this.options = {
            selected_tab: opt_selectedTab,
            default_tab: opt_defaultTab || opt_selectedTab,
        };
        this._init();
    }

    /**
     * @description Initializes tabs and panels, then activates the selected tab.
     */
    private _init(): void {
        this._initTabs();
        this._initPanels();

        this.activeTab = this.options.selected_tab;
        this._setActive(this.activeTab);
    }

    /**
     * @description Queries tab anchor elements, wires click handlers, and hides single tabs.
     */
    private _initTabs(): void {
        this.tabs = new Query('.tabs a', this.tabPanel);
        this.tabs.each((tab) => {
            const panelId = tab.getAttribute('href').substring(1);
            if (this.tabs.size() === 1) {
                tab.addClass('hidden');
            }
            tab.setData('panel', panelId);
            tab.setAttribute('href', 'javascript:void(0)');
            tab.addEventListener('click', () => {
                this.setActive(panelId);
            });
        });
    }

    /**
     * @description Queries panel elements within the tab panel container.
     */
    private _initPanels(): void {
        this.panels = new Query('.panel', this.tabPanel);
    }

    /**
     * @description Activates the matching panel and tab, deactivating all others.
     * @param {string} panelId - The panel ID or class name to activate.
     */
    private _setActive(panelId: string): void {
        let activeTab = this.options.default_tab;

        this.panels.each((panel) => {
            panel.removeClass('active');
            if (panel.getId() === panelId || panel.hasClass(panelId)) {
                panel.addClass('active');
                activeTab = panelId;
            }
        });

        this.tabs.each((tab) => {
            tab.removeClass('active');
            if (tab.getData('panel') === panelId) {
                tab.addClass('active');
            }
        });

        this.activeTab = activeTab;
    }

    /**
     * @description Called when the active tab changes. Override to handle tab change events.
     * @param {string} panelId - The ID of the newly active panel.
     *
     * @example
     * tabPanel.eventChange = (panelId) => loadPanelContent(panelId);
     */
    eventChange(panelId: string): void {
        consoleDebug('TabPanel.eventChange()', panelId);
    }

    /**
     * @description Activates a tab/panel by ID and fires the eventChange callback asynchronously.
     * @param {string} panelId - The panel ID to activate.
     * @returns {Promize} A promise that resolves after the change event completes.
     *
     * @example
     * tabPanel.setActive('settings').then(() => console.log('Tab changed'));
     */
    setActive(panelId: string) {
        const deferred = new Deferred();
        if (!isNull(panelId)) {
            this._setActive(panelId);
            const async = new Async();
            async
                .serial([
                    () => {
                        return this.eventChange(this.getActive());
                    },
                ])
                .defer(deferred);
        } else {
            deferred.reject();
        }
        return deferred.promise();
    }

    /**
     * @description Returns the ID of the currently active tab/panel.
     * @returns {string} The active panel ID.
     *
     * @example
     * const activeId = tabPanel.getActive();
     */
    getActive(): string {
        return this.activeTab;
    }
}
