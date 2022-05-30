import { Event } from './event';

describe('event', () => {
    it('should be instance of Event', () => {
        const event = new Event();

        expect(event).toBeInstanceOf(Event);
    });
});
