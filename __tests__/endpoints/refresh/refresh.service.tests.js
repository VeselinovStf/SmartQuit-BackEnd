
ObjectId = require('mongodb').ObjectId;

describe('Refresh Service Should..', () => {

    describe('refresh..', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('Returns Data Succesfully ', async () => {
            let req = {
                refreshToken: "TOKEN"
            };

            jest.doMock('../../../src/app-packages/token/jwt.token.generator', () => {
                return {
                    verifyRefreshToken: function (val) {
                        return {
                            success: true
                        };
                    },
                    generate: function (payload, option) {
                        return {
                            token: "new_token"
                        }
                    }
                }
            });

            jest.doMock('../../../src/endpoints/refresh/user.repository', () => {
                return {
                    updateTilesAccessToken: function (val, valT) {
                        return true
                    },
                    updateRoutesAccessToken: function (val, valT) {
                        return true
                    }
                }
            });

            jest.doMock('../../../src/endpoints/refresh/refresh.repository', () => {
                return {
                    getRefreshToken: function (val) {
                        return {
                            userId: "user_id",
                            _id: "_ID"
                        }
                    },
                    add: function (data) {
                        return true
                    },
                    destroyById: function (id) {
                        return true
                    }
                }
            });

            let refreshService = require('../../../src/endpoints/refresh/refresh.service');
            let response = await refreshService.refresh(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(true);
            expect(response.status).toBe(200);
            expect(response.data).toBeDefined();
            expect(response.data.idToken).toBe("new_token");
            expect(response.data.refreshToken).toBe("new_token");
        });

        test('Failse when request is invalid ', async () => {
            let req = undefined;

            let refreshService = require('../../../src/endpoints/refresh/refresh.service');
            let response = await refreshService.refresh(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(403);
        });

        test('Failse when req.refreshToken is empty', async () => {
            let req = {
                refreshToken: ""
            };

            let refreshService = require('../../../src/endpoints/refresh/refresh.service');
            let response = await refreshService.refresh(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(403);
        });

        test('Failse when req.refreshToken is undefined', async () => {
            let req = {
                refreshToken: undefined
            };

            let refreshService = require('../../../src/endpoints/refresh/refresh.service');
            let response = await refreshService.refresh(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(403);
        });

        test('Failse when token is not valid ', async () => {
            let req = {
                refreshToken: "TOKEN"
            };

            jest.doMock('../../../src/app-packages/token/jwt.token.generator', () => {
                return {
                    verifyRefreshToken: function (val) {
                        return {
                            success: false
                        };
                    },
                    generate: function (payload, option) {
                        return {
                            token: "new_token"
                        }
                    }
                }
            });

            let refreshService = require('../../../src/endpoints/refresh/refresh.service');
            let response = await refreshService.refresh(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
        });

        test('Failse when refresh token is not found ', async () => {
            let req = {
                refreshToken: "TOKEN"
            };

            jest.doMock('../../../src/app-packages/token/jwt.token.generator', () => {
                return {
                    verifyRefreshToken: function (val) {
                        return {
                            success: true
                        };
                    }
                }
            });

            jest.doMock('../../../src/endpoints/refresh/refresh.repository', () => {
                return {
                    getRefreshToken: function (val) {
                        return undefined
                    }
                }
            });

            let refreshService = require('../../../src/endpoints/refresh/refresh.service');
            let response = await refreshService.refresh(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(403);
        });
    })
})