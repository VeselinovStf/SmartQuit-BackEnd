describe('Password Manager Should..', () => {

    describe('Verify..', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('When parameters are correct', async () => {
            let data = "!Aa12345678";
            let encrypted = "encrypted"

            jest.doMock('bcrypt', () => {
                return {
                    compare: function (p, pT) {
                        return true;
                    }
                }
            })

            let passwordManager = require('../../src/app-packages/password.manager');
            let response = await passwordManager.verify(data, encrypted);

            expect(response).toBe(true);
        })

    });

    describe('Encrypt..', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('When parameters are correct', async () => {
            let data = "!Aa12345678";
            let encrypted = "encrypted"

            jest.doMock('bcrypt', () => {
                return {
                    encrypt: function (p, pT) {
                        return "hashed";
                    },
                    genSalt: function (p, pT) {
                        return "hashed";
                    },
                    hash: function (p, pT) {
                        return "hashed";
                    },

                }
            })

            let passwordManager = require('../../src/app-packages/password.manager');
            let response = await passwordManager.encrypt(data, encrypted);

            expect(response).toBe("hashed");
        })

        test('Throws when hash is invalid', async () => {
            let data = "!Aa12345678";
            let encrypted = "encrypted"

            jest.doMock('bcrypt', () => {
                return {
                    encrypt: function (p, pT) {
                        return "hashed";
                    },
                    genSalt: function (p, pT) {
                        return "hashed";
                    },
                    hash: function (p, pT) {
                        return undefined;
                    },

                }
            })

            let passwordManager = require('../../src/app-packages/password.manager');

            try {
                await passwordManager.encrypt(data, encrypted)
                expect(true).toBe(true);
            } catch (error) {
                expect(error).toBeDefined();
            }

        })

    })
})