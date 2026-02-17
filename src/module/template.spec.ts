import { Template } from './template';
import { Http } from './http';
import { Objekt } from '../core/objekt';
import { Knot } from '../core/knot';
import { Deferred } from '../core/deferred';
import { cleanupDOM } from '../test-helpers';

function createMockHttp(): Http {
    const http = Object.create(Http.prototype);
    http.get = jest.fn();
    http.post = jest.fn();
    return http;
}

function setupTemplateDOM(opt_attrs: Record<string, string> = {}): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('template-view');
    for (const [key, value] of Object.entries(opt_attrs)) {
        container.setAttribute(key, value);
    }
    document.body.appendChild(container);
    return container;
}

function createResponseKnot(
    contentText: string,
    opt_messageClass?: string,
): Knot {
    const wrapper = document.createElement('div');
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    if (opt_messageClass) {
        const msg = document.createElement('div');
        msg.classList.add('message', opt_messageClass);
        msg.textContent = contentText;
        pageContent.appendChild(msg);
    } else {
        pageContent.textContent = contentText;
    }

    wrapper.appendChild(pageContent);
    return new Knot(wrapper);
}

describe('Template', () => {
    let http: Http;
    let template: Template;

    beforeEach(() => {
        cleanupDOM();
        setupTemplateDOM();
        http = createMockHttp();
    });

    afterEach(() => {
        cleanupDOM();
    });

    describe('constructor', () => {
        it('should store the http instance', () => {
            template = new Template(http);
            expect(template.http).toBe(http);
        });

        it('should find viewKnot from default selector', () => {
            template = new Template(http);
            expect(template.viewKnot).toBeDefined();
            expect(template.viewKnot.getNode()).toBeDefined();
        });

        it('should use custom selector', () => {
            const custom = document.createElement('div');
            custom.classList.add('custom-view');
            document.body.appendChild(custom);

            template = new Template(http, { selector: '.custom-view' });
            expect(template.viewKnot.getNode()).toBe(custom);
        });

        it('should set default locale from navigator.language', () => {
            template = new Template(http);
            expect(template.options.get('locale')).toBe(navigator.language);
        });

        it('should allow custom locale', () => {
            template = new Template(http, { locale: 'hu' });
            expect(template.options.get('locale')).toBe('hu');
        });
    });

    describe('getViewKnot', () => {
        it('should return the container knot', () => {
            template = new Template(http);
            const knot = template.getViewKnot();
            expect(knot).toBe(template.viewKnot);
        });
    });

    describe('load — cached', () => {
        it('should return .page-content knot without HTTP call when URL and locale match', (done) => {
            const pageContent = document.createElement('div');
            pageContent.classList.add('page-content');
            pageContent.textContent = 'cached content';
            const container = document.body.querySelector('.template-view');
            container.appendChild(pageContent);
            container.setAttribute('data-template-url', '/home.html');
            container.setAttribute('data-locale', 'en');

            template = new Template(http, { locale: 'en' });
            const promise = template.load('/home.html');

            promise.then((knot) => {
                expect(knot.getNode().textContent).toBe('cached content');
                expect(http.get).not.toHaveBeenCalled();
                done();
            });
        });

        it('should remove data-locale attribute on cache hit', (done) => {
            const pageContent = document.createElement('div');
            pageContent.classList.add('page-content');
            const container = document.body.querySelector('.template-view');
            container.appendChild(pageContent);
            container.setAttribute('data-template-url', '/about.html');
            container.setAttribute('data-locale', 'en');

            template = new Template(http, { locale: 'en' });
            template.load('/about.html').then(() => {
                expect(container.getAttribute('data-locale')).toBeNull();
                done();
            });
        });
    });

    describe('load — fetch', () => {
        it('should make HTTP GET when URL differs', (done) => {
            const deferred = new Deferred<[Objekt, string], [Objekt, string]>();
            (http.get as jest.Mock).mockReturnValue(deferred.promise());

            template = new Template(http, { locale: 'en' });
            const promise = template.load('/new-page.html');

            expect(http.get).toHaveBeenCalledWith('/new-page.html');

            const responseKnot = createResponseKnot('Hello');
            const responseData = new Objekt();
            responseData.setRaw('raw', responseKnot);

            promise.then((knot) => {
                expect(knot).toBeDefined();
                done();
            });

            deferred.resolve([responseData, '']);
        });

        it('should make HTTP GET when force=true even if URL matches', (done) => {
            const container = document.body.querySelector('.template-view');
            container.setAttribute('data-template-url', '/home.html');
            container.setAttribute('data-locale', 'en');

            const deferred = new Deferred<[Objekt, string], [Objekt, string]>();
            (http.get as jest.Mock).mockReturnValue(deferred.promise());

            template = new Template(http, { locale: 'en' });
            template.load('/home.html', true);

            expect(http.get).toHaveBeenCalledWith('/home.html');

            const responseKnot = createResponseKnot('Fresh content');
            const responseData = new Objekt();
            responseData.setRaw('raw', responseKnot);
            deferred.resolve([responseData, '']);
            done();
        });

        it('should set data-template-url attribute on fetch', () => {
            const deferred = new Deferred<[Objekt, string], [Objekt, string]>();
            (http.get as jest.Mock).mockReturnValue(deferred.promise());

            template = new Template(http, { locale: 'en' });
            template.load('/new-page.html');

            const container = document.body.querySelector('.template-view');
            expect(container.getAttribute('data-template-url')).toBe(
                '/new-page.html',
            );
        });

        it('should insert content into viewKnot on success', (done) => {
            const deferred = new Deferred<[Objekt, string], [Objekt, string]>();
            (http.get as jest.Mock).mockReturnValue(deferred.promise());

            template = new Template(http, { locale: 'en' });
            template.load('/page.html').then((knot) => {
                const container = document.body.querySelector('.template-view');
                expect(container.querySelector('.page-content')).not.toBeNull();
                done();
            });

            const responseKnot = createResponseKnot('Page content');
            const responseData = new Objekt();
            responseData.setRaw('raw', responseKnot);
            deferred.resolve([responseData, '']);
        });
    });

    describe('load — error', () => {
        it('should call eventError with message content and type on HTTP error', (done) => {
            const deferred = new Deferred<[Objekt, string], [Objekt, string]>();
            (http.get as jest.Mock).mockReturnValue(deferred.promise());

            template = new Template(http, { locale: 'en' });
            const spy = jest.spyOn(template, 'eventError');

            template.load('/fail.html').then(
                () => {
                    done.fail('should not resolve');
                },
                (knot) => {
                    expect(spy).toHaveBeenCalledWith({
                        content: 'Not found',
                        type: 'error',
                    });
                    done();
                },
            );

            const responseKnot = createResponseKnot('Not found', 'error');
            const responseData = new Objekt();
            responseData.setRaw('raw', responseKnot);
            deferred.reject([responseData, '']);
        });
    });

    describe('_spaNavigate', () => {
        it('should extract .page-content from response data', () => {
            template = new Template(http, { locale: 'en' });
            const responseKnot = createResponseKnot('Navigate content');
            const knot = template._spaNavigate(responseKnot, false);
            expect(knot.getNode().textContent).toBe('Navigate content');
        });

        it('should insert knot into viewKnot on success', () => {
            template = new Template(http, { locale: 'en' });
            const responseKnot = createResponseKnot('Success content');
            template._spaNavigate(responseKnot, false);
            const container = document.body.querySelector('.template-view');
            expect(container.querySelector('.page-content')).not.toBeNull();
        });

        it('should call eventError on error', () => {
            template = new Template(http, { locale: 'en' });
            const spy = jest.spyOn(template, 'eventError');
            const responseKnot = createResponseKnot(
                'Error occurred',
                'warning',
            );
            template._spaNavigate(responseKnot, true);
            expect(spy).toHaveBeenCalledWith({
                content: 'Error occurred',
                type: 'warning',
            });
        });
    });

    describe('eventError', () => {
        it('should not throw when called', () => {
            template = new Template(http, { locale: 'en' });
            expect(() =>
                template.eventError({
                    content: 'test',
                    type: 'error',
                }),
            ).not.toThrow();
        });
    });
});
