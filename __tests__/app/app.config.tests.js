describe('App Config should..', () => {
    const env = process.env;

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        process.env = env
    })

    test('Render environment variables', () => {
        process.env.BACKEND_PORT = 5000;
        process.env.BACKEND_CORS_ORIGIN_ADDRESS = "DEMO";

        let config = require('../../src/app/app.config');

        expect(config.PORT).toBe("5000");
        expect(config.CORS_ORIGIN_ADDRESS).toBe("DEMO");
    })
})