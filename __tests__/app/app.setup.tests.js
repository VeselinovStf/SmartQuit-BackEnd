describe('App Setup Should..', () => {
    const env = process.env;
    beforeEach(() => {
        jest.resetModules();
    });

    const app = {
        use: jest.fn(),
        listen: jest.fn()
    }

    afterEach(() => {
        process.env = env
    })

    test('Add Production environment middleware', () => {
        process.env.NODE_ENV = "production"
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })


        let setup = require('../../src/app/app.setup');
        setup(app)

        expect(app.use).toBeCalledTimes(1);
    })

    test('Add Development environment middleware', () => {
        process.env.NODE_ENV = "development"
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })


        let setup = require('../../src/app/app.setup');
        setup(app)

        expect(app.use).toBeCalledTimes(2);
    })
})