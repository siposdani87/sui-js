import { Service } from './service';

describe('Service', () => {
    it('should instantiate', () => {
        const service = new Service();
        expect(service).toBeInstanceOf(Service);
    });

    it('should call enter without error', () => {
        const service = new Service();
        expect(() => service.enter()).not.toThrow();
    });
});
