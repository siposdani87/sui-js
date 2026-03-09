import { Knot, Query } from '../core';
import { Clock } from './clock';

describe('clock', () => {
    let container: Knot;
    let clock: Clock;
    const testDate = new Date(2024, 0, 15, 14, 30, 0); // 2:30 PM

    beforeEach(() => {
        container = new Query('.template-view').getKnot();
    });

    afterEach(() => {
        container.removeChildren();
    });

    it('should be instance of Clock', () => {
        clock = new Clock(container, {
            type: 'hour',
            time: testDate,
        });

        expect(clock).toBeInstanceOf(Clock);
    });

    describe('draw', () => {
        it('should draw hour mode clock', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            clock.draw();

            const content = container.getNode().querySelector('.content');
            expect(content).not.toBeNull();
            const circles = container.getNode().querySelectorAll('.circle');
            expect(circles.length).toBeGreaterThan(0);
        });

        it('should draw minute mode clock', () => {
            clock = new Clock(container, {
                type: 'minute',
                time: testDate,
            });

            clock.draw();

            const circles = container.getNode().querySelectorAll('.circle');
            expect(circles.length).toBeGreaterThan(0);
        });
    });

    describe('setTime', () => {
        it('should display hours and minutes in header', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            const hoursEl = container.getNode().querySelector('.hours');
            const minutesEl = container.getNode().querySelector('.minutes');

            expect(hoursEl).not.toBeNull();
            expect(minutesEl).not.toBeNull();
            expect(hoursEl!.innerHTML).toBe('02');
            expect(minutesEl!.innerHTML).toBe('30');
        });

        it('should show PM period for afternoon time', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            const periodEl = container.getNode().querySelector('.period');
            expect(periodEl).not.toBeNull();
            expect(periodEl!.classList.contains('pm')).toBe(true);
        });

        it('should show AM period for morning time', () => {
            const morningDate = new Date(2024, 0, 15, 9, 15, 0);
            clock = new Clock(container, {
                type: 'hour',
                time: morningDate,
            });

            const periodEl = container.getNode().querySelector('.period');
            expect(periodEl!.classList.contains('am')).toBe(true);
        });

        it('should update time when setTime is called', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            const newTime = new Date(2024, 0, 15, 8, 5, 0);
            clock.setTime(newTime);

            const hoursEl = container.getNode().querySelector('.hours');
            const minutesEl = container.getNode().querySelector('.minutes');

            expect(hoursEl!.innerHTML).toBe('08');
            expect(minutesEl!.innerHTML).toBe('05');
        });

        it('should display double-digit hours without padding', () => {
            const elevenAM = new Date(2024, 0, 15, 11, 0, 0);
            clock = new Clock(container, {
                type: 'hour',
                time: elevenAM,
            });

            const hoursEl = container.getNode().querySelector('.hours');
            expect(hoursEl!.innerHTML).toBe('11');
        });

        it('should display double-digit minutes without padding', () => {
            const thirtyMin = new Date(2024, 0, 15, 14, 45, 0);
            clock = new Clock(container, {
                type: 'hour',
                time: thirtyMin,
            });

            const minutesEl = container.getNode().querySelector('.minutes');
            expect(minutesEl!.innerHTML).toBe('45');
        });
    });

    describe('period toggle', () => {
        it('should toggle from PM to AM when clicked', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate, // 2:30 PM
            });

            const periodEl = container
                .getNode()
                .querySelector('.period') as HTMLElement;
            periodEl.click();

            expect(periodEl.classList.contains('am')).toBe(true);
        });

        it('should toggle from AM to PM when clicked', () => {
            const morningDate = new Date(2024, 0, 15, 9, 30, 0);
            clock = new Clock(container, {
                type: 'hour',
                time: morningDate,
            });

            const periodEl = container
                .getNode()
                .querySelector('.period') as HTMLElement;
            periodEl.click();

            expect(periodEl.classList.contains('pm')).toBe(true);
        });
    });

    describe('mode switching', () => {
        it('should switch to minute mode when minutes header is clicked', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            clock.draw();

            const minutesHeader = container
                .getNode()
                .querySelector('.minutes') as HTMLElement;
            minutesHeader.click();

            // After clicking minutes, minute mode should be active
            expect(clock.activeMode).toBe('MINUTE');
        });

        it('should switch to hour mode when hours header is clicked', () => {
            clock = new Clock(container, {
                type: 'minute',
                time: testDate,
            });

            clock.draw();

            const hoursHeader = container
                .getNode()
                .querySelector('.hours') as HTMLElement;
            hoursHeader.click();

            expect(clock.activeMode).toBe('HOUR');
        });
    });

    describe('click events', () => {
        it('should emit click event when hour is selected', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            const spy = jest.fn();
            clock.on('click', spy);
            clock.draw();

            // Click the first hour circle
            const circle = container
                .getNode()
                .querySelector('.content .circle') as HTMLElement;
            if (circle) {
                circle.click();
                expect(spy).toHaveBeenCalled();
            }
        });

        it('should emit click event when minute is selected', () => {
            clock = new Clock(container, {
                type: 'minute',
                time: testDate,
            });

            const spy = jest.fn();
            clock.on('click', spy);
            clock.draw();

            const circle = container
                .getNode()
                .querySelector('.content .circle') as HTMLElement;
            if (circle) {
                circle.click();
                expect(spy).toHaveBeenCalled();
            }
        });
    });

    describe('separator', () => {
        it('should render colon separator between hours and minutes', () => {
            clock = new Clock(container, {
                type: 'hour',
                time: testDate,
            });

            const separator = container.getNode().querySelector('.separator');
            expect(separator).not.toBeNull();
            expect(separator!.innerHTML).toBe(':');
        });
    });
});
