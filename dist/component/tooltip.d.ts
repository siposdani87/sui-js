import { Knot } from '../core/knot';
export declare class Tooltip {
    element: Knot;
    valid: boolean;
    positionCssClass: string;
    tooltip: Knot;
    constructor(element: Knot, opt_position?: string | undefined);
    private _initPositions;
    private _init;
    private _getMessage;
    private _createTooltip;
    render(opt_message?: string | undefined): void;
    private _handleAttributes;
    setMessage(opt_message?: string | undefined): void;
    open(): void;
    close(): void;
    isOpen(): boolean;
    toggle(): void;
}
