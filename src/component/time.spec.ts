import { Knot, Query } from '../core';
import { Time } from './time';

describe('time', () => {
    let container: Knot;
    let time: Time;

    beforeEach(() => {
        container = new Query('.template-view').getKnot();
    });

    afterEach(() => {
        container.removeChildren();
    });

    it('should be instance of Time', () => {
        time = new Time(container, {
            selected: 0,
            radius_x: 80,
            radius_y: 80,
        });

        expect(time).toBeInstanceOf(Time);
    });

    describe('draw', () => {
        it('should draw circles for the given range', () => {
            time = new Time(container, {
                selected: 3,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(1, 12, 1, true);

            const circles = container.getNode().querySelectorAll('.circle');
            expect(circles.length).toBe(12);
        });

        it('should mark selected circle', () => {
            time = new Time(container, {
                selected: 5,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(1, 12, 1, true);

            const selected = container.getNode().querySelectorAll('.selected');
            expect(selected.length).toBe(1);
        });

        it('should draw with step interval', () => {
            time = new Time(container, {
                selected: 0,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(0, 59, 5, true);

            const circles = container.getNode().querySelectorAll('.circle');
            expect(circles.length).toBe(60);
        });

        it('should draw counter-clockwise when opt_isClockWise is false', () => {
            time = new Time(container, {
                selected: 1,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(1, 12, 1, false);

            const circles = container.getNode().querySelectorAll('.circle');
            expect(circles.length).toBe(12);
        });

        it('should use captions when provided', () => {
            time = new Time(container, {
                selected: 0,
                radius_x: 80,
                radius_y: 80,
                captions: [
                    '00',
                    '05',
                    '10',
                    '15',
                    '20',
                    '25',
                    '30',
                    '35',
                    '40',
                    '45',
                    '50',
                    '55',
                ],
            });

            time.draw(0, 59, 5, true);

            const circles = container.getNode().querySelectorAll('.circle');
            // First caption circle should have '00' text
            expect(circles[0]!.innerHTML).toBe('00');
        });

        it('should emit click event when circle is clicked', () => {
            time = new Time(container, {
                selected: 0,
                radius_x: 80,
                radius_y: 80,
            });

            const spy = jest.fn();
            time.on('click', spy);
            time.draw(1, 12, 1, true);

            const circle = container
                .getNode()
                .querySelector('.circle') as HTMLElement;
            circle.click();

            expect(spy).toHaveBeenCalled();
        });

        it('should use default step and clockwise values', () => {
            time = new Time(container, {
                selected: 3,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(1, 12);

            const circles = container.getNode().querySelectorAll('.circle');
            expect(circles.length).toBe(12);
        });

        it('should position circles absolutely', () => {
            time = new Time(container, {
                selected: 6,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(1, 12, 1, true);

            const circle = container
                .getNode()
                .querySelector('.circle') as HTMLElement;
            expect(circle.style.position).toBe('absolute');
        });

        it('should set pointer style for selected circle', () => {
            time = new Time(container, {
                selected: 1,
                radius_x: 80,
                radius_y: 80,
            });

            time.draw(1, 12, 1, true);

            expect(time.pointerKnot.getNode().style.transform).toContain(
                'rotate',
            );
        });
    });
});
