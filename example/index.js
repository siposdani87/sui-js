const picIds = [
    5550, 5570, 5574, 5578, 5590, 5616, 5682, 5694, 5871, 'V150', 'V097', 'V565', 5831, 5550, 5570, 5574, 5638, 5646, 5670, 5682, 5686, 5775, 5831, 5839, 5550, 5570, 5574, 5578, 5621, 5642, 5682, 5694, 5797, 5812, 5831, 5839, 5849, 'V719', 'V296', 'V774', 'V689', 'V565', 'V097', 5550, 5574, 5638, 5646, 5670, 5682, 5772, 5775, 5782, 5862, 5864, 5866, 5560, 5574, 5578, 5849, 'V719', 'V150', 'V296', 'V774', 'V880', 'V349', 'V395', 'V565', 'V819', 5550, 5698, 5726, 5733, 5613, 5550, 5719, 5726, 5733, 'V842', 'V980', 5550, 5570, 5574, 5578, 5585, 5590, 5596, 5609, 5613, 5616, 5621, 5624, 5633, 5638, 5642, 5644, 5646, 5670, 5682, 5686, 5694, 5698, 5707, 5713, 5719, 5726, 5733, 5775, 5796, 5797, 5798, 5812, 5831, 5839, 5841, 5849, 5862, 5864, 5871, 5874, 5875, 'V719', 'V842', 'V296', 'V980', 'V880', 'V028', 'V395', 'V565', 'V689', 'V819', 'V097', 'V305'
];
let results = {};
for (const picId of picIds) {
    if (!results[picId]) {
        results[picId] = 0;
    }
    results[picId]++;
}
console.log(results);

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
