const lightThemeNode = new SUI.Query('.light-theme').getItem();
const darkThemeNode = new SUI.Query('.dark-theme').getItem();
darkThemeNode.setHtml(lightThemeNode.getHtml(true).replace(/light-/g, 'dark-'));

const config = new SUI.Objekt({
    app_id: 'sui-js',
    title: 'application.name',
    locale: 'hu-HU', // 'en-GB',
    backend: window.location.origin,
    production: SUI.releaseMode,
    secret: '484xlj8y4jjöyéö57hk5ghrkleéjx',
    theme_color: '#673ab7'
});
const app = new SUI.Application(config, SUI.coreResources);

class Service1 {
    name = 'Service1';
    constructor(service2) {
        console.info(this.name);
        console.log({
            service2Name: service2.getName(),
        });
    }

    enter() {
        console.log('Service1.enter()', {
            name: this.name
        });
    }
}

const service1 = app.service('Service1', ['Service2'], Service1);

class Service2 {
    name = 'Service2';
    constructor() {
        console.info(this.name);
    }

    getName() {
        return this.name;
    }
}

const service2 = app.service('Service2', [], Service2);

class Controller1 {
    name = 'Contoller1'
    constructor(instances) {
        console.info(this.name);
        console.log({
            instances
        });
    }

    enter() {
        console.log('Controller1.enter()', {
            name: this.name
        });
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
const inputField = form.findByModel('light-input-text-default');
console.log(inputField.getName());

const tabPanel = new SUI.TabPanel(document, '.tab-panel', 'form-panel');
