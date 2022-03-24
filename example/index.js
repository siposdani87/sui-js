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

const lightThemeNode = new SUI.Query('.light-theme').getItem();
const darkThemeNode = new SUI.Query('.dark-theme').getItem();
darkThemeNode.setHtml(lightThemeNode.getHtml(true).replace(/light-/g, 'dark-'));

const config = new SUI.Objekt({
    app_id: 'sui-js',
    title: 'application.name',
    locale: 'en-GB',
    backend: window.location.origin,
    production: SUI.releaseMode,
    secret: '484xlj8y4jjöyéö57hk5ghrkleéjx',
});
const app = new SUI.Application(config, SUI.coreResources);

class Service1 {
    constructor(service2) {
        console.info('Service1', service2.getName());
    }

    enter() {
        console.log('Service1.enter()');
    }
}

const service1 = app.service('Service1', ['Service2'], Service1);

class Service2 {
    constructor() {
        console.info('Service2');
    }

    getName() {
        return 'Service2.getName()';
    }
}

const service2 = app.service('Service2', [], Service2);

class Controller1 {
    constructor(instances) {
        console.info('Controller1');
        console.log(instances);
    }
}

const controller1 = app.controller('Controller1', ['instances', 'Service1'], Controller1);

const routes = [
    new SUI.Route('page1', 'Page-1', '/page1', controller1),
];

const providers = [
    service1,
    service2,
];

app.setRootState('page1');
app.run(routes, providers);

const form = new SUI.Form();
const tabPanel = new SUI.TabPanel(document, '.tab-panel', 'form-panel');
