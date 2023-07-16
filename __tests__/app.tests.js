describe('App should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const app = {
        use: jest.fn(),
        listen: jest.fn()
    }

    test('Not throw when is set up properly', () => {
        const appSecurity = function (app) { };
        const appMiddlewares = function (app) { };
        const appSetup = function (app) { };
        const appServer = function (app) { };

        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        jest.doMock('../src/app/app.security', () => {
            return () => {
                return appSecurity
            }
        })

        jest.doMock('../src/app/app.middlewares', () => {
            return () => {
                return appMiddlewares;
            };
        })

        jest.doMock('../src/app/app.setup', () => {
            return () => {
                return appSetup
            };
        })

        jest.doMock('../src/app/app.server', () => {
            return () => {
                return appServer
            };
        })

        expect(() => require('../app')).not.toThrow();
    })

    test('Run server when is set up correctly', () => {
        const appSecurity = function (app) { app.use() };
        const appMiddlewares = function (app) { app.use() };
        const appSetup = function (app) { app.use()};
        const appServer = function (app) { app.listen() };

        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        jest.doMock('../src/app/app.security', () => {
            return () => {
                return appSecurity(app)
            }
        })

        jest.doMock('../src/app/app.middlewares', () => {
            return () => {
                return appMiddlewares(app);
            };
        })

        jest.doMock('../src/app/app.setup', () => {
            return () => {
                return appSetup(app)
            };
        })

        jest.doMock('../src/app/app.server', () => {
            return () => {
                return appServer(app)
            };
        })

        let backend = require('../app');

        expect(app.listen).toBeCalledTimes(1);
        expect(app.use).toBeCalledTimes(3);
    })

    test('Throw when module have error', () => {
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        jest.doMock('../src/app/app.security', () => {
            return () => {
                throw "Internal Error"
            }
        })

        expect(() => require('../app')).toThrow();
    })
})