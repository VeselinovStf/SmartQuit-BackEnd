describe('App Security Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const app = {
        use: jest.fn(),
        listen: jest.fn(),
        disable: jest.fn()
    }

    test('Add security middlewares', () => {
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        let security = require('../../src/app/app.security');
        security(app)

        expect(app.use).toBeCalledTimes(15);
        expect(app.disable).toBeCalledTimes(1);
    })
})