describe('Error Middleware Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('Module Should ..', () => {
        test('Catch Error 500', async () => {
            let middleware = require('../../../src/app-packages/middlewares/errorHandler.middleware');

            let errMock = { statusCode: 500 };

            let response = "";
            let resMock = {
                status: function (code) {
                    return {
                        json: function (obj) {
                            response = obj;
                            return response;
                        }
                    }
                }
            }

            expect(middleware).toBeDefined();
            middleware(errMock, {}, resMock, {});
            expect(response).toBeDefined();
            expect(response.message).toBe("Error Accures");
            expect(response.status).toBe(404);
            expect(response.success).toBe(false);
        });

        test('Catch Error 200', async () => {
            let middleware = require('../../../src/app-packages/middlewares/errorHandler.middleware');

            let errMock = { statusCode: 200 };

            let response = "";
            let resMock = {
                status: function (code) {
                    return {
                        json: function (obj) {
                            response = obj;
                            return response;
                        }
                    }
                }
            }

            expect(middleware).toBeDefined();
            middleware(errMock, {}, resMock, {});
            expect(response).toBeDefined();
            expect(response.message).toBe("Error Accures");
            expect(response.status).toBe(404);
            expect(response.success).toBe(false);
        });

    })
})