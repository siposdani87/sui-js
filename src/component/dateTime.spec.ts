import { Knot, Query } from '../core';
import { DateTime } from './dateTime';
import { DateIO } from '../utils';

describe('dateTime', () => {
    let container: Knot;

    beforeEach(() => {
        container = new Query('.template-view').getKnot();
    });

    afterEach(() => {
        container.removeChildren();
    });

    it('should be instance of DateTime', () => {
        const dateTime = new DateTime(container, {
            type: 'date',
            value: '2024-01-15',
        });

        expect(dateTime).toBeInstanceOf(DateTime);
    });

    describe('getConfig', () => {
        it('should return datetime-local config', () => {
            const dt = new DateTime(container, {
                type: 'datetime-local',
                value: '2024-01-15T10:30:00',
            });

            const config = dt.getConfig();
            expect(config.format).toBe('YYYY-MM-DDTHH:mm:ss');
            expect(config.calendar_type).toBe('date');
            expect(config.clock_type).toBe('hour');
        });

        it('should return date config', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            const config = dt.getConfig();
            expect(config.format).toBe('YYYY-MM-DD');
            expect(config.calendar_type).toBe('date');
            expect(config.clock_type).toBe('');
        });

        it('should return time config', () => {
            const dt = new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            const config = dt.getConfig();
            expect(config.format).toBe('HH:mm:ss');
            expect(config.calendar_type).toBe('');
            expect(config.clock_type).toBe('hour');
        });

        it('should return month config', () => {
            const dt = new DateTime(container, {
                type: 'month',
                value: '2024-01',
            });

            const config = dt.getConfig();
            expect(config.format).toBe('YYYY-MM');
            expect(config.calendar_type).toBe('month');
            expect(config.clock_type).toBe('');
        });

        it('should return week config', () => {
            const dt = new DateTime(container, {
                type: 'week',
                value: '2024-W03',
            });

            const config = dt.getConfig();
            expect(config.calendar_type).toBe('week');
        });

        it('should return year config', () => {
            const dt = new DateTime(container, {
                type: 'year',
                value: '2024',
            });

            const config = dt.getConfig();
            expect(config.format).toBe('YYYY');
            expect(config.calendar_type).toBe('year');
        });
    });

    describe('structure', () => {
        it('should add datetime class to container', () => {
            new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            expect(container.getNode().classList.contains('datetime')).toBe(
                true,
            );
        });

        it('should create only calendar knot for date type', () => {
            new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            const calendarEl = container.getNode().querySelector('.calendar');
            const clockEl = container.getNode().querySelector('.clock');
            expect(calendarEl).not.toBeNull();
            expect(clockEl).toBeNull();
        });

        it('should create only clock knot for time type', () => {
            new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            const calendarEl = container.getNode().querySelector('.calendar');
            const clockEl = container.getNode().querySelector('.clock');
            expect(calendarEl).toBeNull();
            expect(clockEl).not.toBeNull();
        });
    });

    describe('getFormattedValue', () => {
        it('should return formatted date value', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            const formatted = dt.getFormattedValue();
            expect(formatted).toBe('2024-01-15');
        });

        it('should return formatted time value', () => {
            const dt = new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            const formatted = dt.getFormattedValue();
            expect(formatted).toBe('10:30:00');
        });

        it('should return formatted month value', () => {
            const dt = new DateTime(container, {
                type: 'month',
                value: '2024-01',
            });

            const formatted = dt.getFormattedValue();
            expect(formatted).toBe('2024-01');
        });

        it('should return formatted year value', () => {
            const dt = new DateTime(container, {
                type: 'year',
                value: '2024',
            });

            const formatted = dt.getFormattedValue();
            expect(formatted).toBe('2024');
        });
    });

    describe('setValue', () => {
        it('should update value and redraw', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            dt.setValue('2024-06-20');

            expect(dt.getFormattedValue()).toBe('2024-06-20');
        });

        it('should rebuild structure on setValue for time type', () => {
            const dt = new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            dt.setValue('14:00:00');

            const clockEl = container.getNode().querySelector('.clock');
            expect(clockEl).not.toBeNull();
            expect(dt.getFormattedValue()).toBe('14:00:00');
        });
    });

    describe('draw', () => {
        it('should draw calendar for date type', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            dt.draw();

            const calendarContent = container
                .getNode()
                .querySelector('.calendar .content');
            expect(calendarContent).not.toBeNull();
        });

        it('should draw clock for time type', () => {
            const dt = new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            dt.draw();

            const clockContent = container
                .getNode()
                .querySelector('.clock .content');
            expect(clockContent).not.toBeNull();
        });

        it('should not draw calendar for time type', () => {
            const dt = new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            dt.draw();

            const calendarContent = container
                .getNode()
                .querySelector('.calendar');
            expect(calendarContent).toBeNull();
        });

        it('should not draw clock for date type', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            dt.draw();

            const clockContent = container.getNode().querySelector('.clock');
            expect(clockContent).toBeNull();
        });
    });

    describe('click events', () => {
        it('should emit click with formatted value when calendar date is clicked', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '2024-01-15',
            });

            const spy = jest.fn();
            dt.on('click', spy);
            dt.draw();

            // Click a day cell in the calendar
            const dayCell = container
                .getNode()
                .querySelector('.calendar .content .row .cell') as HTMLElement;
            if (dayCell) {
                dayCell.click();
                expect(spy).toHaveBeenCalled();
                expect(typeof spy.mock.calls[0]![0]).toBe('string');
            }
        });

        it('should emit click with formatted value when clock hour is clicked', () => {
            const dt = new DateTime(container, {
                type: 'time',
                value: '10:30:00',
            });

            const spy = jest.fn();
            dt.on('click', spy);
            dt.draw();

            // Click an hour circle in the clock
            const circle = container
                .getNode()
                .querySelector('.clock .content .circle') as HTMLElement;
            if (circle) {
                circle.click();
                expect(spy).toHaveBeenCalled();
                expect(typeof spy.mock.calls[0]![0]).toBe('string');
            }
        });
    });

    describe('default value', () => {
        it('should use current date when value is empty', () => {
            const dt = new DateTime(container, {
                type: 'date',
                value: '',
            });

            const formatted = dt.getFormattedValue();
            const today = DateIO.format(new Date(), 'YYYY-MM-DD');
            expect(formatted).toBe(today);
        });
    });
});
