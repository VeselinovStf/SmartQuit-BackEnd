describe('Seed Db MongoDb Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let db = require('../../../src/app-packages/db/seed.data.mongodb');

            expect(db).toBeDefined();
        });
    })
})