describe('App Routes Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const app = {
        use: jest.fn(),
        listen: jest.fn(),
    }

    test('Add routing endpoints', () => {
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        jest.doMock('../../src/endpoints/auth/auth.route', () => { return jest.fn() })
        jest.doMock('../../src/endpoints/refresh/refresh.route', () => { return jest.fn() })
        jest.doMock('../../src/endpoints/password/password.route', () => { return jest.fn() })
        jest.doMock('../../src/endpoints/smoke/smoke.route', () => { return jest.fn() })

        
        let routing = require('../../src/app/app.routes');
        routing(app)

        expect(app.use).toBeCalledTimes(4);
    })
})