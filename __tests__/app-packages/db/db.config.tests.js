describe('DB Config Should..', () => {
    let env = {};
    var BACKEND_DB_CONNECTION_STRING = "BACKEND_DB_CONNECTION_STRING"
    var BACKEND_DATABASE_NAME = "BACKEND_DATABASE_NAME"
    var BACKEND_INITIAL_USER_EMAIL = "BACKEND_INITIAL_USER_EMAIL"
    var BACKEND_INITIAL_USER_PASSWORD = "BACKEND_INITIAL_USER_PASSWORD"
    var BACKEND_INITIAL_USER_DEVICE_ID = "BACKEND_INITIAL_USER_DEVICE_ID"

    beforeEach(() => {
        env = process.env;

        process.env.MONGO_DB_CONNECTION_STRING = BACKEND_DB_CONNECTION_STRING
        process.env.MONGO_DB_DATABASE_NAME = BACKEND_DATABASE_NAME
        process.env.BACKEND_INITIAL_USER_EMAIL = BACKEND_INITIAL_USER_EMAIL
        process.env.BACKEND_INITIAL_USER_PASSWORD = BACKEND_INITIAL_USER_PASSWORD
        process.env.BACKEND_INITIAL_USER_DEVICE_ID = BACKEND_INITIAL_USER_DEVICE_ID

        jest.resetModules();
    });

    afterEach(() => {
        process.env = env
    })

    describe('Export correct variables..', () => {
        test('Return correct responce when params are valid', async () => {
            let config = require('../../../src/app-packages/db/db.config');

            expect(config).toBeDefined();
            expect(config.DB_CONNECTION_STRING).toBe(BACKEND_DB_CONNECTION_STRING);
            expect(config.DB_DATABASE).toBe(BACKEND_DATABASE_NAME);
            expect(config.INITIAL_USER_EMAIL).toBe(BACKEND_INITIAL_USER_EMAIL);
            expect(config.INITIAL_USER_PASSWORD).toBe(BACKEND_INITIAL_USER_PASSWORD);
            expect(config.INITIAL_USER_DEVICE_ID).toBe(BACKEND_INITIAL_USER_DEVICE_ID);
        })

    })
})