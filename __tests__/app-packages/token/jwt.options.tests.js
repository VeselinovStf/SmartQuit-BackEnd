describe('JWT Options Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let jwtOptions = require('../../../src/app-packages/token/jwt.token.options');

            expect(jwtOptions).toBeDefined();
        });
    })
})