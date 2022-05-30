import { ServiceWorker } from './serviceWorker';

describe('serviceWorker', () => {
    it('should be instance of ServiceWorker', () => {
        const serviceWorker = new ServiceWorker();

        expect(serviceWorker).toBeInstanceOf(ServiceWorker);
    });
});
