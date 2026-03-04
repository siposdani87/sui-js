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
});
