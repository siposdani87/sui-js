import {
    consoleLog,
    consoleInfo,
    consoleWarn,
    consoleError,
    consoleDebug,
    consoleAssert,
} from './log';
import { setReleaseMode } from '../common/config';

describe('log', () => {
    afterEach(() => {
        setReleaseMode(false);
    });

    describe('consoleLog', () => {
        it('should log the message when not in release mode', () => {
            const logSpy = jest.spyOn(console, 'log');
            const message = 'message text';

            consoleLog(message);

            expect(logSpy).toHaveBeenCalledWith(message);
            logSpy.mockRestore();
        });

        it('should log multiple arguments', () => {
            const logSpy = jest.spyOn(console, 'log');

            consoleLog('a', 'b', 123);

            expect(logSpy).toHaveBeenCalledWith('a', 'b', 123);
            logSpy.mockRestore();
        });

        it('should suppress output in release mode', () => {
            setReleaseMode(true);
            const logSpy = jest.spyOn(console, 'log');

            consoleLog('should not appear');

            expect(logSpy).not.toHaveBeenCalled();
            logSpy.mockRestore();
        });
    });

    describe('consoleInfo', () => {
        it('should log info message when not in release mode', () => {
            const infoSpy = jest.spyOn(console, 'info');

            consoleInfo('info message');

            expect(infoSpy).toHaveBeenCalledWith('info message');
            infoSpy.mockRestore();
        });

        it('should log multiple arguments', () => {
            const infoSpy = jest.spyOn(console, 'info');

            consoleInfo('a', 'b', 123);

            expect(infoSpy).toHaveBeenCalledWith('a', 'b', 123);
            infoSpy.mockRestore();
        });

        it('should suppress output in release mode', () => {
            setReleaseMode(true);
            const infoSpy = jest.spyOn(console, 'info');

            consoleInfo('should not appear');

            expect(infoSpy).not.toHaveBeenCalled();
            infoSpy.mockRestore();
        });
    });

    describe('consoleWarn', () => {
        it('should log warning message when not in release mode', () => {
            const warnSpy = jest.spyOn(console, 'warn');

            consoleWarn('warn message');

            expect(warnSpy).toHaveBeenCalledWith('warn message');
            warnSpy.mockRestore();
        });

        it('should log multiple arguments', () => {
            const warnSpy = jest.spyOn(console, 'warn');

            consoleWarn('a', 'b', 123);

            expect(warnSpy).toHaveBeenCalledWith('a', 'b', 123);
            warnSpy.mockRestore();
        });

        it('should suppress output in release mode', () => {
            setReleaseMode(true);
            const warnSpy = jest.spyOn(console, 'warn');

            consoleWarn('should not appear');

            expect(warnSpy).not.toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('consoleError', () => {
        it('should log error message regardless of release mode', () => {
            const errorSpy = jest.spyOn(console, 'error');

            consoleError('error message');

            expect(errorSpy).toHaveBeenCalledWith('error message');
            errorSpy.mockRestore();
        });

        it('should log error message in release mode', () => {
            setReleaseMode(true);
            const errorSpy = jest.spyOn(console, 'error');

            consoleError('error in release');

            expect(errorSpy).toHaveBeenCalledWith('error in release');
            errorSpy.mockRestore();
        });

        it('should log multiple arguments', () => {
            const errorSpy = jest.spyOn(console, 'error');

            consoleError('error', { detail: 'info' });

            expect(errorSpy).toHaveBeenCalledWith('error', {
                detail: 'info',
            });
            errorSpy.mockRestore();
        });
    });

    describe('consoleDebug', () => {
        it('should log debug message regardless of release mode', () => {
            const debugSpy = jest.spyOn(console, 'debug');

            consoleDebug('debug message');

            expect(debugSpy).toHaveBeenCalledWith('debug message');
            debugSpy.mockRestore();
        });

        it('should log debug message in release mode', () => {
            setReleaseMode(true);
            const debugSpy = jest.spyOn(console, 'debug');

            consoleDebug('debug in release');

            expect(debugSpy).toHaveBeenCalledWith('debug in release');
            debugSpy.mockRestore();
        });

        it('should log multiple arguments', () => {
            const debugSpy = jest.spyOn(console, 'debug');

            consoleDebug('state', { prev: 1 }, { next: 2 });

            expect(debugSpy).toHaveBeenCalledWith(
                'state',
                { prev: 1 },
                { next: 2 },
            );
            debugSpy.mockRestore();
        });
    });

    describe('consoleAssert', () => {
        it('should call console.assert with condition and data', () => {
            const assertSpy = jest.spyOn(console, 'assert');

            consoleAssert(true, 'should pass');

            expect(assertSpy).toHaveBeenCalledWith(true, 'should pass');
            assertSpy.mockRestore();
        });

        it('should call console.assert with false condition', () => {
            const assertSpy = jest.spyOn(console, 'assert');

            consoleAssert(false, 'assertion failed');

            expect(assertSpy).toHaveBeenCalledWith(false, 'assertion failed');
            assertSpy.mockRestore();
        });

        it('should pass multiple data arguments', () => {
            const assertSpy = jest.spyOn(console, 'assert');

            consoleAssert(false, 'msg', { key: 'val' });

            expect(assertSpy).toHaveBeenCalledWith(false, 'msg', {
                key: 'val',
            });
            assertSpy.mockRestore();
        });
    });
});
