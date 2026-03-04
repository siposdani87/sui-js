import { parseInputBlock } from '../component';
import { Query } from '../core';
import { FileField } from './fileField';

describe('FileField', () => {
    let fileField: FileField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-file',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        fileField = new FileField(input, label, error, inputBlock);
    });

    it('should be instance of FileField', () => {
        expect(fileField).toBeInstanceOf(FileField);
    });

    it('should return field name', () => {
        expect(fileField.getName()).toBe('field.file');
    });

    it('should check disabled state', () => {
        expect(fileField.isDisabled()).toBe(false);
    });

    describe('render', () => {
        it('should render without error', () => {
            expect(() => fileField.render()).not.toThrow();
        });

        it('should call refresh after render', () => {
            const spy = jest.spyOn(fileField, 'refresh');
            fileField.render();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('refresh', () => {
        it('should execute refresh without error', () => {
            fileField.render();
            expect(() => fileField.refresh()).not.toThrow();
        });
    });

    describe('_isDocument', () => {
        it('should detect document types from accept attribute', () => {
            // The test DOM input has accept=".jpg,.png" which is not a document
            expect((fileField as any)._isDocument()).toBe(false);
        });

        it('should return true for document accept types', () => {
            // Create a file input with document accept types
            const container = document.createElement('div');
            container.className = 'input-block doc-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'doc-file');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[doc]';
            input.id = 'doc-file';
            input.setAttribute('accept', '.docx,.pdf');
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.doc-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const docField = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            expect((docField as any)._isDocument()).toBe(true);
            container.remove();
        });
    });

    describe('_initFileIcon', () => {
        it('should initialize file type mappings', () => {
            const fileTypes = (fileField as any).fileTypes;
            expect(fileTypes).toBeDefined();
        });
    });

    describe('setValue', () => {
        it('should handle string URL value', () => {
            fileField.render();
            expect(() =>
                fileField.setValue('https://example.com/image.jpg'),
            ).not.toThrow();
        });

        it('should handle object with url property', () => {
            fileField.render();
            expect(() =>
                fileField.setValue({ url: 'https://example.com/image.jpg' }),
            ).not.toThrow();
        });

        it('should handle null value', () => {
            fileField.render();
            expect(() => fileField.setValue(null)).not.toThrow();
        });
    });

    describe('_lookupByMimeType', () => {
        it('should look up extension by MIME type', () => {
            fileField.render();
            const result = (fileField as any)._lookupByMimeType(
                'application/pdf',
            );
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('_lookupByExtension', () => {
        it('should look up MIME type by extension', () => {
            fileField.render();
            const result = (fileField as any)._lookupByExtension('pdf');
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        });

        it('should return empty array for unknown extension', () => {
            fileField.render();
            const result = (fileField as any)._lookupByExtension('xyz');
            expect(result).toEqual([]);
        });
    });
});
