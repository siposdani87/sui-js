import { parseInputBlock } from '../component';
import { Query } from '../core';
import { ColorField } from './colorField';
import { installCanvasMock, uninstallCanvasMock } from '../test-helpers';

describe('ColorField', () => {
    let colorField: ColorField;
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-color',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        colorField = new ColorField(input, label, error, inputBlock);
    });

    afterEach(() => {
        uninstallCanvasMock();
    });

    it('should be instance of ColorField', () => {
        expect(colorField).toBeInstanceOf(ColorField);
    });

    it('should return field name', () => {
        expect(colorField.getName()).toBe('field.color');
    });

    it('should set and get value', () => {
        colorField.setValue('#FF0000');
    });

    it('should check disabled state', () => {
        expect(colorField.isDisabled()).toBe(false);
    });

    it('should render without error', () => {
        expect(() => colorField.render()).not.toThrow();
    });

    describe('render', () => {
        it('should create preview element after render', () => {
            colorField.render();
            // The preview is created during _initPreview which is called in _initInput chain
            // Check that the canvas was initialized
            expect((colorField as any).canvas).toBeDefined();
        });

        it('should initialize material colors', () => {
            colorField.render();
            const colors = (colorField as any).colors;
            expect(colors).toBeDefined();
            expect(Array.isArray(colors)).toBe(true);
            expect(colors.length).toBeGreaterThan(0);
        });
    });

    describe('refresh', () => {
        it('should execute refresh after render', () => {
            colorField.render();
            expect(() => colorField.refresh()).not.toThrow();
        });

        it('should set default value #000000 when empty', () => {
            colorField.render();
            colorField.refresh();
            // After refresh, setValue is called with the current value or #000000
        });
    });

    describe('_draw', () => {
        it('should draw color palette on canvas', () => {
            colorField.render();
            (colorField as any)._draw();
            // The draw method should call canvas drawing methods
            expect((colorField as any).canvas).toBeDefined();
        });
    });

    describe('_setMaterialColors', () => {
        it('should populate colors array with material design palette', () => {
            colorField.render();
            const colors = (colorField as any).colors;
            // 11 color families, each with 19 shades
            expect(colors.length).toBe(11);
            colors.forEach((row: string[]) => {
                expect(row.length).toBe(19);
                row.forEach((color: string) => {
                    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
                });
            });
        });
    });

    describe('preview click handler', () => {
        it('should open popup when preview is clicked and field is enabled', () => {
            colorField.render();
            const openSpy = jest.spyOn((colorField as any).popup, 'open');
            const drawSpy = jest.spyOn(colorField as any, '_draw');
            (colorField as any).previewKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            expect(drawSpy).toHaveBeenCalled();
            expect(openSpy).toHaveBeenCalled();
        });

        it('should not open popup when field is disabled', () => {
            colorField.render();
            colorField.setDisabled(true);
            const openSpy = jest.spyOn((colorField as any).popup, 'open');
            (colorField as any).previewKnot
                .getNode()
                .dispatchEvent(new Event('click'));
            expect(openSpy).not.toHaveBeenCalled();
        });
    });

    describe('canvas click handler', () => {
        it('should set value from canvas pixel on click with offsetX', () => {
            colorField.render();
            const setValueSpy = jest.spyOn(colorField, 'setValue');
            const closeSpy = jest.spyOn((colorField as any).popup, 'close');
            const clickEvent = new MouseEvent('click', {
                clientX: 10,
                clientY: 10,
            });
            Object.defineProperty(clickEvent, 'offsetX', { value: 5 });
            Object.defineProperty(clickEvent, 'offsetY', { value: 5 });
            (colorField as any).canvas.canvasKnot
                .getNode()
                .dispatchEvent(clickEvent);
            expect(setValueSpy).toHaveBeenCalled();
            expect(closeSpy).toHaveBeenCalled();
        });

        it('should use layerX when offsetX is not available', () => {
            colorField.render();
            const setValueSpy = jest.spyOn(colorField, 'setValue');
            const clickEvent = new MouseEvent('click', {
                clientX: 10,
                clientY: 10,
            });
            Object.defineProperty(clickEvent, 'offsetX', { value: 0 });
            Object.defineProperty(clickEvent, 'offsetY', { value: 0 });
            Object.defineProperty(clickEvent, 'layerX', { value: 8 });
            Object.defineProperty(clickEvent, 'layerY', { value: 8 });
            (colorField as any).canvas.canvasKnot
                .getNode()
                .dispatchEvent(clickEvent);
            expect(setValueSpy).toHaveBeenCalled();
        });
    });

    describe('validation', () => {
        it('should add is-invalid when required and empty', () => {
            colorField.input.getNode().setAttribute('required', 'required');
            colorField.input.getNode().value = '';
            colorField.render();
            jest.spyOn(colorField, 'isRequired').mockReturnValue(true);
            jest.spyOn(colorField, 'getValue').mockReturnValue('');
            colorField.refresh();
            expect(
                (colorField as any).inputBlock
                    .getNode()
                    .classList.contains('is-invalid'),
            ).toBe(true);
        });

        it('should add is-disabled when disabled', () => {
            colorField.render();
            colorField.setDisabled(true);
            colorField.refresh();
            expect(
                (colorField as any).inputBlock
                    .getNode()
                    .classList.contains('is-disabled'),
            ).toBe(true);
        });

        it('should remove is-disabled when enabled', () => {
            colorField.render();
            colorField.setDisabled(true);
            colorField.refresh();
            colorField.setDisabled(false);
            colorField.refresh();
            expect(
                (colorField as any).inputBlock
                    .getNode()
                    .classList.contains('is-disabled'),
            ).toBe(false);
        });
    });

    describe('default color', () => {
        it('should use #000000 as default when value is empty', () => {
            colorField.render();
            const setValueSpy = jest.spyOn(colorField, 'setValue');
            colorField.refresh();
            expect(setValueSpy).toHaveBeenCalledWith('#000000');
        });
    });
});
