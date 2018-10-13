goog.provide('SUI.TabPanel');

goog.require('SUI');
goog.require('SUI.Async');
goog.require('SUI.Deferred');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.TabPanel}
 * @param {!SUI.Node} dom
 * @param {string=} opt_selector
 * @param {string=} opt_selected
 */
SUI.TabPanel = function(dom, opt_selector = '.tab-panel', opt_selected = '') {
  this.tabpanel = new SUI.Query(opt_selector, dom).getItem();
  this.options = {
    selected: opt_selected,
  };
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._init = function() {
  this._initTabs();
  this._initPanels();
  this._setActiveTab(this.options.selected);
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._initTabs = function() {
  this.tabs = new SUI.Query('.tabs a', this.tabpanel);
  this.tabs.each((tab) => {
    let panelId = tab.getAttribute('href').substr(1);
    if (this.tabs.size() === 1) {
      tab.addClass('hidden');
    }
    tab.setData('panel', panelId);
    tab.setAttribute('href', 'javascript:void(0)');
    tab.addEventListener('click', (tabNode) => {
      let panelId = tab.getData('panel');
      this.setActive(panelId);
    });
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.TabPanel.prototype._initPanels = function() {
  this.panels = new SUI.Query('.panel', this.tabpanel);
};

/**
 * @private
 * @param {string} panelId
 * @return {undefined}
 */
SUI.TabPanel.prototype._setActiveTab = function(panelId) {
  this.panels.each(function(panel) {
    panel.removeClass('active');
    if (panel.getId() === panelId || panel.hasClass(panelId)) {
      panel.addClass('active');
    }
  });

  this.tabs.each(function(tab) {
    tab.removeClass('active');
    if (tab.getData('panel') === panelId) {
      tab.addClass('active');
    }
  });
};

/**
 * @param {string} panelId
 * @return {undefined}
 */
SUI.TabPanel.prototype.eventChange = function(panelId) {
  console.warn('SUI.TabPanel.eventChange()', panelId);
};

/**
 * @param {string} panelId
 * @return {!SUI.Promise}
 */
SUI.TabPanel.prototype.setActive = function(panelId) {
  let deferred = new SUI.Deferred();
  if (!SUI.isNull(panelId)) {
    this._setActiveTab(/** @type {string} */(panelId));
    let async = new SUI.Async();
    async.serial([() => {
      return this.eventChange(/** @type {string} */(panelId));
    }]).defer(deferred);
  } else {
    deferred.reject();
  }
  return deferred.promise();
};
