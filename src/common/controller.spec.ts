import { Controller } from './controller';

describe('Controller', () => {
    it('should instantiate', () => {
        const controller = new Controller();
        expect(controller).toBeInstanceOf(Controller);
    });

    it('should call enter without error', () => {
        const controller = new Controller();
        expect(() => controller.enter()).not.toThrow();
    });

    it('should call exit without error', () => {
        const controller = new Controller();
        expect(() => controller.exit()).not.toThrow();
    });
});
