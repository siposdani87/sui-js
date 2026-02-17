export class Waiter {
    timeoutWaiting: number;
    counter: number;
    intervall!: number;

    constructor() {
        this.timeoutWaiting = 0;
        this.counter = 0;
    }

    advancedWaiting(
        callback: Function,
        opt_duration: number | undefined,
    ): void {
        const duration = opt_duration || 3000;
        this._advancedDelayHandler(callback, duration, this.timeoutWaiting);
    }

    private _advancedDelayHandler(
        callback: Function,
        duration: number,
        counter: number,
    ): void {
        this.timeoutWaiting += 0.0001;
        setTimeout(() => {
            const prevCounter = this.timeoutWaiting - 0.0001;
            if (prevCounter.toFixed(4) === counter.toFixed(4)) {
                this.timeoutWaiting = 0;
                callback();
            }
        }, duration);
    }

    stopAdvancedWaiting(): void {
        this.timeoutWaiting += 0.0001;
        this.intervall = setInterval(() => {
            this.timeoutWaiting += 0.0001;
        }, 1000);
    }

    startAdvancedWaiting(): void {
        clearInterval(this.intervall);
        this.timeoutWaiting -= 0.0001;
    }

    simpleWaiting(callback: Function, opt_duration: number | undefined): void {
        const duration = opt_duration || 3000;
        this._simpleDelayHandler(callback, duration, this.counter);
    }

    private _simpleDelayHandler(
        callback: Function,
        duration: number,
        counter: number,
    ): void {
        this.counter++;
        setTimeout(() => {
            const prevCounter = this.counter - 1;
            if (counter === prevCounter) {
                this.counter = 0;
                callback();
            }
        }, duration);
    }
}
