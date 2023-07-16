describe('JWT Token Generator Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let jwtTokenGenerator = require('../../../src/app-packages/token/jwt.token.generator');

            expect(jwtTokenGenerator).toBeDefined();
        });
    })
})