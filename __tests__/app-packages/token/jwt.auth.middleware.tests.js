describe('JWT Auth Middleware Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let jwtAuthMiddleware = require('../../../src/app-packages/token/jwt.auth.middleware');

            expect(jwtAuthMiddleware).toBeDefined();
        });
    })
})