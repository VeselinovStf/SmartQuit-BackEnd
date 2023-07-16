describe('JWT Config Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let jwtConfig = require('../../../src/app-packages/token/jwt.config');

            expect(jwtConfig).toBeDefined();
        });
    })
})