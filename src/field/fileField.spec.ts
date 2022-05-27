import { FileField } from './fileField';

describe('fileField', () => {
    it('should be instance of FileField', () => {
        const fileField = new FileField();
        
        expect(fileField).toBeInstanceOf(FileField);
    });
});
