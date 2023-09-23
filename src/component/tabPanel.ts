import { isNull } from '../utils/operation';
import { Async } from '../core/async';
import { Deferred } from '../core/deferred';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { Knot, Promize } from '../core';

/**
 * @class
 */
export class TabPanel {
    tabPanel: Knot;
    options: { selected_tab: string; default_tab: string };
    activeTab: string;
    tabs: Query;
    panels: Query;
    /**
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {string=} opt_selectedTab
     * @param {string=} opt_defaultTab
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
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this._initTabs();
        this._initPanels();

        this.activeTab = this.options.selected_tab;
        this._setActive(this.activeTab);
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _initPanels(): void {
        this.panels = new Query('.panel', this.tabPanel);
    }
    /**
     * @private
     * @param {string} panelId
     * @return {undefined}
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
     * @param {string} panelId
     * @return {undefined}
     */
    eventChange(panelId: string): void {
        consoleDebug('TabPanel.eventChange()', panelId);
    }
    /**
     * @param {string} panelId
     * @return {!Promize}
     */
    setActive(panelId: string): Promize {
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
     * @return {string}
     */
    getActive(): string {
        return this.activeTab;
    }
}
