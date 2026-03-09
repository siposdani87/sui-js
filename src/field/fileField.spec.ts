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

    describe('refresh', () => {
        it('should show remove button when not required and has value', () => {
            fileField.render();
            fileField.setRequired(false);
            (fileField as any).valueSrc = 'https://example.com/img.jpg';
            fileField.refresh();
            expect(fileField.removeButton.hasClass('hidden')).toBe(false);
        });

        it('should hide remove button when required', () => {
            fileField.render();
            fileField.setRequired(true);
            (fileField as any).valueSrc = 'https://example.com/img.jpg';
            fileField.refresh();
            expect(fileField.removeButton.hasClass('hidden')).toBe(true);
        });

        it('should hide remove button when no value', () => {
            fileField.render();
            fileField.setRequired(false);
            (fileField as any).valueSrc = null;
            fileField.refresh();
            expect(fileField.removeButton.hasClass('hidden')).toBe(true);
        });
    });

    describe('_remove', () => {
        it('should clear value and restore default', () => {
            fileField.render();
            (fileField as any).valueSrc = 'data:image/png;base64,abc';
            (fileField as any)._remove();
            expect((fileField as any).valueSrc).toBeNull();
        });
    });

    describe('setValue with document', () => {
        it('should render file icon for document type field', () => {
            const container = document.createElement('div');
            container.className = 'input-block doc-file-sv';
            const label = document.createElement('label');
            label.setAttribute('for', 'doc-file-sv');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[docsv]';
            input.id = 'doc-file-sv';
            input.setAttribute('accept', '.pdf');
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.doc-file-sv',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const docField = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            docField.render();
            docField.setValue('https://example.com/report.pdf');
            expect((docField as any).valueSrc).toBe(
                'https://example.com/report.pdf',
            );
            container.remove();
        });
    });

    describe('_read', () => {
        it('should read an image file and set valueSrc', (done) => {
            fileField.render();
            const blob = new Blob(['fake-image-data'], {
                type: 'image/png',
            });
            const file = new File([blob], 'photo.png', {
                type: 'image/png',
            });

            const spy = jest.spyOn(fileField, 'modelChange');
            (fileField as any)._read(file);

            setTimeout(() => {
                expect((fileField as any).valueSrc).toContain(
                    ';filename=photo.png;base64,',
                );
                expect(fileField.imageTag.getAttribute('src')).toContain(
                    ';filename=photo.png;base64,',
                );
                expect(spy).toHaveBeenCalled();
                done();
            }, 100);
        });

        it('should read a document file and show file icon', (done) => {
            fileField.render();
            const blob = new Blob(['fake-pdf-data'], {
                type: 'application/pdf',
            });
            const file = new File([blob], 'report.pdf', {
                type: 'application/pdf',
            });

            const spy = jest.spyOn(fileField, 'modelChange');
            (fileField as any)._read(file);

            setTimeout(() => {
                expect((fileField as any).valueSrc).toContain(
                    ';filename=report.pdf;base64,',
                );
                // For non-image type with known MIME, image src should be the SVG icon
                expect(fileField.imageTag.getAttribute('src')).toContain(
                    'data:image/svg+xml;base64,',
                );
                expect(spy).toHaveBeenCalled();
                done();
            }, 100);
        });

        it('should read a non-image file with unknown MIME and keep data URL', (done) => {
            fileField.render();
            const blob = new Blob(['fake-data'], {
                type: 'application/octet-stream',
            });
            const file = new File([blob], 'archive.zip', {
                type: 'application/octet-stream',
            });

            (fileField as any)._read(file);

            setTimeout(() => {
                expect((fileField as any).valueSrc).toContain(
                    ';filename=archive.zip;base64,',
                );
                // No matching file type, so image src should be the data URL itself
                expect(fileField.imageTag.getAttribute('src')).toContain(
                    ';filename=archive.zip;base64,',
                );
                done();
            }, 100);
        });
    });

    describe('change event on input', () => {
        it('should trigger _read when file is selected', (done) => {
            fileField.render();
            const blob = new Blob(['data'], { type: 'image/jpeg' });
            const file = new File([blob], 'test.jpg', {
                type: 'image/jpeg',
            });

            const inputNode = fileField.input.getNode();
            Object.defineProperty(inputNode, 'files', {
                value: [file],
                writable: true,
                configurable: true,
            });

            const changeEvent = new Event('change', { bubbles: true });
            inputNode.dispatchEvent(changeEvent);

            setTimeout(() => {
                expect((fileField as any).valueSrc).toContain(
                    ';filename=test.jpg;base64,',
                );
                done();
            }, 100);
        });

        it('should not call _read when no file is selected', () => {
            fileField.render();
            const readSpy = jest.spyOn(fileField as any, '_read');

            // Ensure files is empty/null
            const inputNode = fileField.input.getNode();
            Object.defineProperty(inputNode, 'files', {
                value: null,
                writable: true,
                configurable: true,
            });

            const changeEvent = new Event('change', { bubbles: true });
            inputNode.dispatchEvent(changeEvent);

            expect(readSpy).not.toHaveBeenCalled();
        });
    });

    describe('remove button click', () => {
        it('should call _remove when enabled and clicked', () => {
            fileField.render();
            (fileField as any).valueSrc = 'data:image/png;base64,abc';
            const removeSpy = jest.spyOn(fileField as any, '_remove');

            const clickEvent = new Event('click', { bubbles: true });
            fileField.removeButton.getNode().dispatchEvent(clickEvent);

            expect(removeSpy).toHaveBeenCalled();
        });

        it('should not call _remove when disabled', () => {
            fileField.render();
            fileField.setDisabled(true);
            const removeSpy = jest.spyOn(fileField as any, '_remove');

            const clickEvent = new Event('click', { bubbles: true });
            fileField.removeButton.getNode().dispatchEvent(clickEvent);

            expect(removeSpy).not.toHaveBeenCalled();
        });
    });

    describe('browse button click', () => {
        it('should call input click when field is enabled', () => {
            fileField.render();
            fileField.setDisabled(false);

            const browseButtonNode = fileField.inputBlock
                .getNode()
                .querySelector('.browse-button') as HTMLButtonElement;
            expect(browseButtonNode).not.toBeNull();

            let clickCalled = false;
            fileField.input.getNode().click = () => {
                clickCalled = true;
            };

            browseButtonNode.click();

            expect(clickCalled).toBe(true);
        });

        it('should not call input click when field is disabled', () => {
            fileField.render();
            fileField.setDisabled(true);

            const browseButtonNode = fileField.inputBlock
                .getNode()
                .querySelector('.browse-button') as HTMLButtonElement;
            expect(browseButtonNode).not.toBeNull();

            let clickCalled = false;
            fileField.input.getNode().click = () => {
                clickCalled = true;
            };

            browseButtonNode.click();

            expect(clickCalled).toBe(false);
        });
    });

    describe('_remove without defaultSrc', () => {
        it('should remove src attribute when no defaultSrc', () => {
            fileField.render();
            (fileField as any).valueSrc = 'data:image/png;base64,abc';
            (fileField as any).defaultSrc = '';

            (fileField as any)._remove();

            expect((fileField as any).valueSrc).toBeNull();
            expect(fileField.imageTag.getAttribute('src')).toBeFalsy();
        });
    });

    describe('_isDocument branches', () => {
        it('should return true for xlsx accept type', () => {
            const container = document.createElement('div');
            container.className = 'input-block xlsx-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'xlsx-file');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[xlsx]';
            input.id = 'xlsx-file';
            input.setAttribute('accept', '.xlsx');
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.xlsx-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const xlsxField = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            expect((xlsxField as any)._isDocument()).toBe(true);
            container.remove();
        });
    });

    describe('_initValueSrc branches', () => {
        it('should use data-default-value when present', () => {
            const container = document.createElement('div');
            container.className = 'input-block default-val-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'default-val-file');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[defval]';
            input.id = 'default-val-file';
            input.setAttribute('accept', '.jpg,.png');
            input.setAttribute(
                'data-default-value',
                'https://example.com/default.png',
            );
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.default-val-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const field = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            expect((field as any).defaultSrc).toBe(
                'https://example.com/default.png',
            );
            container.remove();
        });

        it('should use required color when field is required', () => {
            const container = document.createElement('div');
            container.className = 'input-block req-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'req-file');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[req]';
            input.id = 'req-file';
            input.setAttribute('accept', '.jpg,.png');
            input.required = true;
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.req-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const field = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            // The defaultSrc should contain the stroke:red styling for required fields
            expect((field as any).defaultSrc).toContain(
                'data:image/svg+xml;base64,',
            );
            container.remove();
        });
    });

    describe('_initDefaultImg branches', () => {
        it('should use existing img element when present', () => {
            const container = document.createElement('div');
            container.className = 'input-block img-exists-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'img-exists-file');
            const img = document.createElement('img');
            img.setAttribute('src', 'https://example.com/existing.jpg');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[imgexists]';
            input.id = 'img-exists-file';
            input.setAttribute('accept', '.jpg,.png');
            container.appendChild(label);
            container.appendChild(img);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.img-exists-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const field = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            // valueSrc should be initialized from existing img src
            expect((field as any).valueSrc).toBe(
                'https://example.com/existing.jpg',
            );
            container.remove();
        });
    });

    describe('setValue with document and unknown extension', () => {
        it('should handle document field with unknown extension', () => {
            const container = document.createElement('div');
            container.className = 'input-block doc-unk-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'doc-unk-file');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[docunk]';
            input.id = 'doc-unk-file';
            input.setAttribute('accept', '.pdf');
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.doc-unk-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const docField = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            docField.render();
            // .txt is not in the fileTypes map, so _lookupByExtension returns []
            docField.setValue('https://example.com/readme.txt');
            expect((docField as any).valueSrc).toBe(
                'https://example.com/readme.txt',
            );
            container.remove();
        });
    });

    describe('browse button for document field', () => {
        it('should show description icon for document accept type', () => {
            const container = document.createElement('div');
            container.className = 'input-block doc-browse-file';
            const label = document.createElement('label');
            label.setAttribute('for', 'doc-browse-file');
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'field[docbr]';
            input.id = 'doc-browse-file';
            input.setAttribute('accept', '.docx');
            container.appendChild(label);
            container.appendChild(input);
            document.body.appendChild(container);

            const inputBlock = new Query<HTMLElement>(
                '.input-block.doc-browse-file',
            ).getKnot();
            const parsed = parseInputBlock(inputBlock);
            const docField = new FileField(
                parsed.input,
                parsed.label,
                parsed.error,
                inputBlock,
            );
            docField.render();
            const browseButton = docField.actionContainerKnot
                .getNode()
                .querySelector('.browse-button')!;
            expect(browseButton.innerHTML).toBe('description');
            container.remove();
        });
    });
});
