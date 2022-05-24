import { consoleLog } from './log';

describe('log', () => {
    it('should be log the message', () => {
        const logSpy = jest.spyOn(console, 'log');
        const message = 'message text';

        consoleLog(message);

        expect(logSpy).toBeCalledWith(message);
        logSpy.mockRestore();
    });
});
