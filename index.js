const createNamespace = (namespace) => {
    Object.keys(window).forEach((attr) => {
        if (attr.includes('$$')) {
            const name = attr.split('$$', 2)[0];
            window[namespace] = window[namespace] || {};
            window[namespace][name] = window[attr];
        }
    });
    return window[namespace];
};
var SUI = SUI || createNamespace('SUI');

console.log(SUI);

var lightThemeNode = new SUI.Query('.light-theme').getItem();
var darkThemeNode = new SUI.Query('.dark-theme').getItem();
darkThemeNode.setHtml(lightThemeNode.getHtml(true).replace(/light-/g, 'dark-'));

var config = new SUI.Objekt({
    app_id: 'sui-js',
    title: 'application.name',
    locale: 'en-GB',
    backend: window.location.origin,
    production: SUI.releaseMode,
    secret: '484xlj8y4jjöyéö57hk5ghrkleéjx',
});
var app = new SUI.Application(config, SUI.SUI.coreRes);
app.run();

var form = new SUI.Form();
var tabPanel = new SUI.TabPanel(document, '.tab-panel', 'form-panel');
