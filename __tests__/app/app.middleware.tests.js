describe('App Middlewares Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const app = {
        use: jest.fn(),
        listen: jest.fn()
    }

    test('Add middlewares', () => {
        jest.doMock('express', () => {
            return () => {
                return app
            }
        })

        let middlewares = require('../../src/app/app.middlewares');
        middlewares(app)
        expect(app.use).toBeCalledTimes(2);
    })
})