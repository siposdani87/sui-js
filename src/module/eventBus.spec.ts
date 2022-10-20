import { EventBus } from './eventBus';

describe('event', () => {
    it('should be instance of EventBus', () => {
        const eventBus = new EventBus();

        expect(eventBus).toBeInstanceOf(EventBus);
    });
});
