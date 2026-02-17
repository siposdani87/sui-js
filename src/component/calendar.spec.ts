import { Knot } from '../core/knot';
import { Calendar } from './calendar';

describe('Calendar', () => {
    let calendarKnot: Knot;

    beforeEach(() => {
        const div = document.createElement('div');
        div.className = 'calendar-test-container';
        document.body.appendChild(div);
        calendarKnot = new Knot(div);
    });

    afterEach(() => {
        document
            .querySelectorAll('.calendar-test-container')
            .forEach((el) => el.remove());
    });

    function createCalendar(
        type: string = 'date',
        date: Date = new Date(2024, 5, 15),
    ): Calendar {
        return new Calendar(calendarKnot, { type, date });
    }

    describe('constructor & initialization', () => {
        it('should be instance of Calendar', () => {
            const calendar = createCalendar();
            expect(calendar).toBeInstanceOf(Calendar);
        });

        it('should create header with previous/next buttons and mode span', () => {
            const calendar = createCalendar();
            expect(calendar.headerKnot).toBeDefined();
            const buttons = calendar.headerKnot.getNode().querySelectorAll('a');
            expect(buttons.length).toBe(2);
            expect(calendar.currentModeKnot).toBeDefined();
        });

        it('should create content container', () => {
            const calendar = createCalendar();
            expect(calendar.contentKnot).toBeDefined();
            expect(
                calendar.contentKnot.getNode().classList.contains('content'),
            ).toBe(true);
        });

        it('should initialize in DAY mode for type date', () => {
            const calendar = createCalendar('date');
            expect(calendar.activeMode).toBe('DAY');
        });

        it('should initialize in MONTH mode for type month', () => {
            const calendar = createCalendar('month');
            expect(calendar.activeMode).toBe('MONTH');
        });

        it('should initialize in YEAR mode for type year', () => {
            const calendar = createCalendar('year');
            expect(calendar.activeMode).toBe('YEAR');
        });

        it('should set selectedDate from options', () => {
            const date = new Date(2024, 5, 15);
            const calendar = createCalendar('date', date);
            expect(calendar.selectedDate).toEqual(date);
        });

        it('should populate days array after construction', () => {
            const calendar = createCalendar('date');
            expect(calendar.days.length).toBe(42);
        });
    });

    describe('header display', () => {
        it('should display year and month in DAY mode', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const headerText = calendar.currentModeKnot.getNode().textContent;
            expect(headerText).toContain('2024');
            expect(headerText).toContain('June');
        });

        it('should display year in MONTH mode', () => {
            const calendar = createCalendar('month', new Date(2024, 5, 15));
            calendar.draw();
            const headerText = calendar.currentModeKnot.getNode().textContent;
            expect(headerText).toBe('2024');
        });

        it('should display empty string in YEAR mode', () => {
            const calendar = createCalendar('year', new Date(2024, 5, 15));
            calendar.draw();
            const headerText = calendar.currentModeKnot.getNode().textContent;
            expect(headerText).toBe('');
        });
    });

    describe('day drawing', () => {
        it('should render 7 week day headers', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const weekDays = calendar.weekDaysKnot
                .getNode()
                .querySelectorAll('.day');
            expect(weekDays.length).toBe(7);
        });

        it('should render 42 day cells', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const days = calendar.daysKnot.getNode().querySelectorAll('.day');
            expect(days.length).toBe(42);
        });

        it('should include days from previous month', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const prevDays = calendar.daysKnot
                .getNode()
                .querySelectorAll('.previous-month');
            expect(prevDays.length).toBeGreaterThan(0);
        });

        it('should include days from current month', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const currentDays = calendar.daysKnot
                .getNode()
                .querySelectorAll('.current-month');
            expect(currentDays.length).toBe(30);
        });

        it('should include days from next month', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const nextDays = calendar.daysKnot
                .getNode()
                .querySelectorAll('.next-month');
            expect(nextDays.length).toBeGreaterThan(0);
        });

        it('should have previous + current + next = 42 days', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();
            const prev = calendar.daysKnot
                .getNode()
                .querySelectorAll('.previous-month').length;
            const current = calendar.daysKnot
                .getNode()
                .querySelectorAll('.current-month').length;
            const next = calendar.daysKnot
                .getNode()
                .querySelectorAll('.next-month').length;
            expect(prev + current + next).toBe(42);
        });
    });

    describe('month drawing', () => {
        it('should render 12 month cells', () => {
            const calendar = createCalendar('month', new Date(2024, 5, 15));
            calendar.draw();
            const months = calendar.monthsKnot
                .getNode()
                .querySelectorAll('.month');
            expect(months.length).toBe(12);
        });

        it('should display abbreviated month names', () => {
            const calendar = createCalendar('month', new Date(2024, 5, 15));
            calendar.draw();
            const months = calendar.monthsKnot
                .getNode()
                .querySelectorAll('.month');
            expect(months[0].textContent).toBe('Jan');
            expect(months[5].textContent).toBe('Jun');
            expect(months[11].textContent).toBe('Dec');
        });
    });

    describe('year drawing', () => {
        it('should render 16 year cells', () => {
            const calendar = createCalendar('year', new Date(2024, 5, 15));
            calendar.draw();
            const years = calendar.yearsKnot
                .getNode()
                .querySelectorAll('.year');
            expect(years.length).toBe(16);
        });

        it('should display years starting from aligned batch', () => {
            const calendar = createCalendar('year', new Date(2024, 5, 15));
            calendar.draw();
            const years = calendar.yearsKnot
                .getNode()
                .querySelectorAll('.year');
            // 2024 - (2024 % 16) = 2024 - 8 = 2016
            expect(years[0].textContent).toBe('2016');
            expect(years[15].textContent).toBe('2031');
        });
    });

    describe('navigation', () => {
        function getNavButtons(calendar: Calendar): NodeListOf<Element> {
            return calendar.headerKnot.getNode().querySelectorAll('a');
        }

        it('should navigate to previous month in DAY mode', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[0].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getMonth()).toBe(4);
            expect(calendar.current.day.getFullYear()).toBe(2024);
        });

        it('should navigate to next month in DAY mode', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[1].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getMonth()).toBe(6);
            expect(calendar.current.day.getFullYear()).toBe(2024);
        });

        it('should navigate to previous year in MONTH mode', () => {
            const calendar = createCalendar('month', new Date(2024, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[0].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getFullYear()).toBe(2023);
        });

        it('should navigate to next year in MONTH mode', () => {
            const calendar = createCalendar('month', new Date(2024, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[1].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getFullYear()).toBe(2025);
        });

        it('should navigate 16 years back in YEAR mode', () => {
            const calendar = createCalendar('year', new Date(2024, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[0].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getFullYear()).toBe(2008);
        });

        it('should navigate 16 years forward in YEAR mode', () => {
            const calendar = createCalendar('year', new Date(2024, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[1].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getFullYear()).toBe(2040);
        });

        it('should not go below year 0 in YEAR mode', () => {
            const calendar = createCalendar('year', new Date(10, 5, 15));
            calendar.draw();

            const buttons = getNavButtons(calendar);
            buttons[0].dispatchEvent(new Event('click'));

            expect(calendar.current.day.getFullYear()).toBeGreaterThanOrEqual(
                0,
            );
        });
    });

    describe('mode switching', () => {
        it('should switch from DAY to MONTH on header click', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();

            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));

            expect(calendar.activeMode).toBe('MONTH');
        });

        it('should switch from MONTH to YEAR on header click', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();

            // First click: DAY → MONTH
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            // Second click: MONTH → YEAR
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));

            expect(calendar.activeMode).toBe('YEAR');
        });

        it('should wrap back to default mode at boundary', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();

            // DAY → MONTH → YEAR → DAY (wrap)
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));

            expect(calendar.activeMode).toBe('DAY');
        });
    });

    describe('click handling', () => {
        it('should call eventClick when day is clicked', () => {
            const eventClickSpy = jest.fn();
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.eventClick = eventClickSpy;
            calendar.draw();

            const dayCells = calendar.daysKnot
                .getNode()
                .querySelectorAll('.day.current-month');
            dayCells[0].dispatchEvent(new Event('click'));

            expect(eventClickSpy).toHaveBeenCalled();
        });

        it('should call eventClick when month is clicked', () => {
            const eventClickSpy = jest.fn();
            const calendar = createCalendar('month', new Date(2024, 5, 15));
            calendar.eventClick = eventClickSpy;
            calendar.draw();

            const monthCells = calendar.monthsKnot
                .getNode()
                .querySelectorAll('.month');
            monthCells[0].dispatchEvent(new Event('click'));

            expect(eventClickSpy).toHaveBeenCalled();
        });

        it('should call eventClick when year is clicked', () => {
            const eventClickSpy = jest.fn();
            const calendar = createCalendar('year', new Date(2024, 5, 15));
            calendar.eventClick = eventClickSpy;
            calendar.draw();

            const yearCells = calendar.yearsKnot
                .getNode()
                .querySelectorAll('.year');
            yearCells[0].dispatchEvent(new Event('click'));

            expect(eventClickSpy).toHaveBeenCalled();
        });

        it('should zoom in mode when clicking in non-target mode', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            // Switch to YEAR mode first
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            calendar.currentModeKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            expect(calendar.activeMode).toBe('YEAR');

            calendar.draw();

            // Click a year - should zoom to MONTH
            const yearCells = calendar.yearsKnot
                .getNode()
                .querySelectorAll('.year');
            yearCells[0].dispatchEvent(new Event('click'));

            expect(calendar.activeMode).toBe('MONTH');
        });

        it('should update selectedDate on click', () => {
            const calendar = createCalendar('date', new Date(2024, 5, 15));
            calendar.draw();

            const dayCells = calendar.daysKnot
                .getNode()
                .querySelectorAll('.day.current-month');
            dayCells[9].dispatchEvent(new Event('click'));

            expect(calendar.selectedDate).toBeDefined();
            expect(calendar.selectedDate.getDate()).toBe(10);
        });
    });
});
