import { DateTimeRangeField } from './dateTimeRangeField';

describe('dateTimeRangeField', () => {
    it('should be instance of DateTimeRangeField', () => {
        const dateTimeRangeField = new DateTimeRangeField();
        
        expect(dateTimeRangeField).toBeInstanceOf(DateTimeRangeField);
    });
});
