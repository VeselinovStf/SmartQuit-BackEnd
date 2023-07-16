
ObjectId = require('mongodb').ObjectId;

describe('Password Service Should..', () => {

    describe('initialPasswordChange..', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('Returns Data Succesfully ', async () => {
            let req = {
                email: "valid@email.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };

            jest.doMock('../../../src/endpoints/password/password.user.repository', () => {
                return {
                    findUser: function (val) {
                        return [{
                            _id: "userId",
                            email: "email@email.com",
                            isLocked: false,
                            passwordConfirmed: false,
                            password: "hashedPwdOne1",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }];
                    },
                    updatePasswordConfirmation: function (val, valT, valV) {
                        return true;
                    }
                }
            });

            jest.doMock('../../../src/endpoints/password/password.refresh.repository', () => {
                return {
                    add: function (val) {
                        return "new_token";
                    }
                }
            });


            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (val, valT) {
                        return true;
                    },
                    encrypt: function (newPass, pass) {
                        return "theNewPwdOne1"
                    }
                }
            });

            jest.doMock('../../../src/app-packages/token/jwt.token.generator', () => {
                return {
                    generate: function (val, valT) {
                        return {
                            token: "new_token"
                        };
                    }
                }
            });


            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(true);
            expect(response.status).toBe(200);
            expect(response.data).toBeDefined();
            expect(response.data.idToken).toBe("new_token");
            expect(response.data.refreshToken).toBe("new_token");
        });

        test('Failse when req is invalid ', async () => {
            let req = undefined;

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();

            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
            expect(response.data).toBe(null);
        });

        test('Failse when req.email is invalid ', async () => {
            let req = {
                email: "invalid@",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
            expect(response.data).toBe(null);
        })

        test('Failse when req.oldPassword is invalid ', async () => {
            let req = {
                email: "valid@mail.com",
                oldPassword: "unvalid",
                newPassword: "theNewPwdOne1#"
            };

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
            expect(response.data).toBe(null);
        })

        test('Failse when req.oldPassword is invalid string', async () => {
            let req = {
                email: "valid@mail.com",
                oldPassword: "hashedPwdOne1",
                newPassword: "theNewPwdOne1#"
            };

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
            expect(response.data).toBe(null);
        })

        test('Failse when req.newPassword is invalid ', async () => {
            let req = {
                email: "valid@mail.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "invbalid"
            };

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
            expect(response.data).toBe(null);
        })

        test('Failse when req.newPassword is invalid string', async () => {
            let req = {
                email: "invalid@mail.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1"
            };

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();
            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
            expect(response.data).toBe(null);
        })

        test('Failse when user is not found ', async () => {
            let req = {
                email: "valid@email.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };

          

            jest.doMock('../../../src/endpoints/password/password.user.repository', () => {
                return {
                    findUser: function (val) {
                        return [];
                    },
                    updatePasswordConfirmation: function (val, valT, valV) {
                        return true;
                    }
                }
            });

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();

            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
        });

        test('Failse when user is locked', async () => {
            let req = {
                email: "valid@email.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };

            jest.doMock('../../../src/endpoints/password/password.user.repository', () => {
                return {
                    findUser: function (val) {
                        return [{
                            _id: "userId",
                            email: "email@email.com",
                            isLocked: true,
                            passwordConfirmed: false,
                            password: "hashedPwdOne1",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }];
                    },
                    updatePasswordConfirmation: function (val, valT, valV) {
                        return true;
                    }
                }
            });

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();

            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
        });


        test('Failse when user old and new password are not verified', async () => {
            let req = {
                email: "valid@email.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };

            jest.doMock('../../../src/endpoints/password/password.user.repository', () => {
                return {
                    findUser: function (val) {
                        return [{
                            _id: "userId",
                            email: "email@email.com",
                            isLocked: false,
                            passwordConfirmed: false,
                            password: "hashedPwdOne1",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }];
                    },
                    updatePasswordConfirmation: function (val, valT, valV) {
                        return true;
                    }
                }
            });

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (val, valT) {
                        return false;
                    },
                    encrypt: function (newPass, pass) {
                        return "theNewPwdOne1"
                    }
                }
            });

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();

            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
        });

        test('Failse when user pasword is confirmed', async () => {
            let req = {
                email: "valid@email.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };


            jest.doMock('../../../src/endpoints/password/password.user.repository', () => {
                return {
                    findUser: function (val) {
                        return [{
                            _id: "userId",
                            email: "email@email.com",
                            isLocked: false,
                            passwordConfirmed: true,
                            password: "hashedPwdOne1",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }];
                    },
                    updatePasswordConfirmation: function (val, valT, valV) {
                        return true;
                    }
                }
            });

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (val, valT) {
                        return false;
                    },
                    encrypt: function (newPass, pass) {
                        return "theNewPwdOne1#"
                    }
                }
            });

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();

            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
        });

        test('Failse when user new and old password are same', async () => {
            let req = {
                email: "valid@email.com",
                oldPassword: "hashedPwdOne1!",
                newPassword: "theNewPwdOne1#"
            };

            jest.doMock('../../../src/endpoints/password/password.user.repository', () => {
                return {
                    findUser: function (val) {
                        return [{
                            _id: "userId",
                            email: "email@email.com",
                            isLocked: false,
                            passwordConfirmed: true,
                            password: "hashedPwdOne1",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }];
                    },
                    updatePasswordConfirmation: function (val, valT, valV) {
                        return true;
                    }
                }
            });

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (val, valT) {
                        return false;
                    },
                    encrypt: function (newPass, pass) {
                        return "hashedPwdOne1#"
                    }
                }
            });

            let passwordService = require('../../../src/endpoints/password/password.service');
            let response = await passwordService.initialPasswordChange(req);

            expect(response).toBeDefined();

            expect(response.success).toBe(false);
            expect(response.status).toBe(404);
        });
    }
    )
})