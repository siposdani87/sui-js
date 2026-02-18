import { DateIO, convertToISOFormat, setDateIOLocale } from './dateio';

describe('DateIO', () => {
    describe('setDateIOLocale', () => {
        it('should set locale without error', () => {
            expect(() => setDateIOLocale('hu-HU')).not.toThrow();
        });

        it('should handle unknown locale by falling back to en-US', () => {
            expect(() => setDateIOLocale('xx-XX')).not.toThrow();
        });
    });

    describe('convertToISOFormat', () => {
        it.each([
            ['YYYY-MM-DD', 'yyyy-MM-dd'],
            ['DD/MM/YYYY', 'dd/MM/yyyy'],
            ['YYYY', 'yyyy'],
            ['MM-DD', 'MM-dd'],
        ])('should convert %s to %s', (input, expected) => {
            expect(convertToISOFormat(input)).toBe(expected);
        });
    });

    describe('parse', () => {
        it('should parse number format of year', () => {
            const date = DateIO.parse(2024, 'YYYY');
            expect(date.getFullYear()).toBe(2024);
        });

        it('should parse string format of year', () => {
            const date = DateIO.parse('2024', 'YYYY');
            expect(date.getFullYear()).toBe(2024);
        });

        it('should parse ISO date string', () => {
            const date = DateIO.parse('2024-06-15');
            expect(date.getFullYear()).toBe(2024);
            expect(date.getMonth()).toBe(5); // 0-indexed
            expect(date.getDate()).toBe(15);
        });

        it('should parse date with format string', () => {
            const date = DateIO.parse('15/06/2024', 'DD/MM/YYYY');
            expect(date.getFullYear()).toBe(2024);
            expect(date.getDate()).toBe(15);
        });

        it('should return a Date for default (no args)', () => {
            const date = DateIO.parse();
            expect(date).toBeInstanceOf(Date);
        });
    });

    describe('format', () => {
        it('should format date with custom pattern', () => {
            const date = new Date(2024, 5, 15);
            const result = DateIO.format(date, 'YYYY-MM-DD');
            expect(result).toBe('2024-06-15');
        });

        it('should format date to ISO string without pattern', () => {
            const date = new Date(2024, 5, 15, 12, 0, 0);
            const result = DateIO.format(date);
            expect(result).toContain('2024-06-15');
        });
    });

    describe('date components', () => {
        const date = new Date(2024, 5, 15, 10, 30); // June 15, 2024 10:30

        it('should get year', () => {
            expect(DateIO.getYear(date)).toBe(2024);
        });

        it('should get month (0-indexed)', () => {
            expect(DateIO.getMonth(date)).toBe(5);
        });

        it('should get date', () => {
            expect(DateIO.getDate(date)).toBe(15);
        });

        it('should get day of week', () => {
            expect(DateIO.getDay(date)).toBeGreaterThanOrEqual(0);
            expect(DateIO.getDay(date)).toBeLessThanOrEqual(6);
        });

        it('should get hours', () => {
            expect(DateIO.getHours(date)).toBe(10);
        });

        it('should get minutes', () => {
            expect(DateIO.getMinutes(date)).toBe(30);
        });
    });

    describe('date arithmetic', () => {
        const date = new Date(2024, 5, 15, 10, 30);

        it('should add days', () => {
            const result = DateIO.addDays(date, 5);
            expect(DateIO.getDate(result)).toBe(20);
        });

        it('should subtract days', () => {
            const result = DateIO.subDays(date, 5);
            expect(DateIO.getDate(result)).toBe(10);
        });

        it('should add months', () => {
            const result = DateIO.addMonths(date, 2);
            expect(DateIO.getMonth(result)).toBe(7);
        });

        it('should subtract months', () => {
            const result = DateIO.subMonths(date, 2);
            expect(DateIO.getMonth(result)).toBe(3);
        });

        it('should add years', () => {
            const result = DateIO.addYears(date, 1);
            expect(DateIO.getYear(result)).toBe(2025);
        });

        it('should subtract years', () => {
            const result = DateIO.subYears(date, 1);
            expect(DateIO.getYear(result)).toBe(2023);
        });

        it('should add hours', () => {
            const result = DateIO.addHours(date, 3);
            expect(DateIO.getHours(result)).toBe(13);
        });

        it('should subtract hours', () => {
            const result = DateIO.subHours(date, 2);
            expect(DateIO.getHours(result)).toBe(8);
        });

        it('should add minutes', () => {
            const result = DateIO.addMinutes(date, 15);
            expect(DateIO.getMinutes(result)).toBe(45);
        });

        it('should subtract minutes', () => {
            const result = DateIO.subMinutes(date, 15);
            expect(DateIO.getMinutes(result)).toBe(15);
        });
    });

    describe('setters', () => {
        const date = new Date(2024, 5, 15, 10, 30);

        it('should set year', () => {
            const result = DateIO.setYear(date, 2025);
            expect(DateIO.getYear(result)).toBe(2025);
        });

        it('should set month', () => {
            const result = DateIO.setMonth(date, 0);
            expect(DateIO.getMonth(result)).toBe(0);
        });

        it('should set date', () => {
            const result = DateIO.setDate(date, 1);
            expect(DateIO.getDate(result)).toBe(1);
        });

        it('should set hours', () => {
            const result = DateIO.setHours(date, 0);
            expect(DateIO.getHours(result)).toBe(0);
        });

        it('should set minutes', () => {
            const result = DateIO.setMinutes(date, 0);
            expect(DateIO.getMinutes(result)).toBe(0);
        });
    });

    describe('comparison', () => {
        const earlier = new Date(2024, 0, 1);
        const later = new Date(2024, 11, 31);

        it('should check isBefore', () => {
            expect(DateIO.isBefore(earlier, later)).toBe(true);
            expect(DateIO.isBefore(later, earlier)).toBe(false);
        });

        it('should check isAfter', () => {
            expect(DateIO.isAfter(later, earlier)).toBe(true);
            expect(DateIO.isAfter(earlier, later)).toBe(false);
        });
    });

    describe('week and month helpers', () => {
        const date = new Date(2024, 5, 15);

        it('should get start of week', () => {
            const result = DateIO.startOfWeek(date);
            expect(result).toBeInstanceOf(Date);
        });

        it('should get end of month', () => {
            const result = DateIO.endOfMonth(date);
            expect(DateIO.getDate(result)).toBe(30); // June has 30 days
        });

        it('should get days in month', () => {
            expect(DateIO.getDaysInMonth(date)).toBe(30); // June
            expect(DateIO.getDaysInMonth(new Date(2024, 1, 1))).toBe(29); // Feb 2024 leap year
        });

        it('should get ISO week', () => {
            const result = DateIO.getISOWeek(date);
            expect(result).toBeGreaterThan(0);
            expect(result).toBeLessThanOrEqual(53);
        });

        it('should get week', () => {
            const result = DateIO.getWeek(date);
            expect(result).toBeGreaterThan(0);
        });
    });
});
