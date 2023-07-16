describe('Response Model Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let model = require('../../../src/app-packages/models/response.model');

            expect(model).toBeDefined();
        });
    })
})