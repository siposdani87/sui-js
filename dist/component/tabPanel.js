import { isNull } from '../utils/operation';
import { Async } from '../core/async';
import { Deferred } from '../core/deferred';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
export class TabPanel {
    constructor(dom, opt_selector = '.tab-panel', opt_selectedTab = '', opt_defaultTab = '') {
        this.tabPanel = new Query(opt_selector, dom).getKnot();
        this.options = {
            selected_tab: opt_selectedTab,
            default_tab: opt_defaultTab || opt_selectedTab,
        };
        this._init();
    }
    _init() {
        this._initTabs();
        this._initPanels();
        this.activeTab = this.options.selected_tab;
        this._setActive(this.activeTab);
    }
    _initTabs() {
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
    _initPanels() {
        this.panels = new Query('.panel', this.tabPanel);
    }
    _setActive(panelId) {
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
    eventChange(panelId) {
        consoleDebug('TabPanel.eventChange()', panelId);
    }
    setActive(panelId) {
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
        }
        else {
            deferred.reject();
        }
        return deferred.promise();
    }
    getActive() {
        return this.activeTab;
    }
}
