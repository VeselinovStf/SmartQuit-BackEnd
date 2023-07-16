describe('Db MongoDb Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Be Requeired', async () => {
            let db = require('../../../src/app-packages/db/db.data.mongodb');

            expect(db).toBeDefined();
        });
    })
})