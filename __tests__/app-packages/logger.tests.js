describe('Logger Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('Return logger', async () => {
        let logger = require('../../src/app-packages/logger');

        expect(logger).toBeDefined();
        expect(logger.format).toBeDefined();
        expect(logger.transports.length).toBe(2);
        expect(logger.level).toBe("debug");
    })
})