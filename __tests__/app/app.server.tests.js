describe('App should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const app = {
        use: jest.fn(),
        listen: jest.fn()
    }

    const mongoDb = {
        connectToServer: jest.fn()
    }

    test('Connect to server', () => {
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        jest.doMock('../../src/app-packages/db/db.data.mongodb', () => {
            return mongoDb
        })

        let server = require('../../src/app/app.server');
        server(app);

        expect(mongoDb.connectToServer).toBeCalledTimes(1);
    })
})