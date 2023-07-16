describe('Object Validator Should..', () => {

    describe('Verify..', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('When parameters are correct', async () => {
            let object = {
                id: "let"
            };

            let shema = {
                id: function (value) {
                    return value != undefined && value && value.length > 0;
                }
            }

            let objectValidator = require('../../src/app-packages/object.validator');
            let response = objectValidator(object, shema);

            expect(response.success).toBe(true);
        })

        test('Return false when params are not valid', async () => {
            let object = {
                id: ""
            };

            let shema = {
                id: function (value) {
                    return value != undefined && value && value.length > 0;
                }
            }

            let objectValidator = require('../../src/app-packages/object.validator');
            let response = objectValidator(object, shema);

            expect(response.success).toBe(false);
        })

    });

})