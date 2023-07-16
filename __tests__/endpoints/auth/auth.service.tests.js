describe('Auth Service Should..', () => {

    describe('Authenticate..', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        test('Return SUCCESS=FALSE when req params are empty', async () => {
            let req = {
                email: "",
                password: ""
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when req email is invalid', async () => {
            let req = {
                email: "",
                password: "!Aa12345678"
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when req email is missing @', async () => {
            let req = {
                email: "aaa.bg.com",
                password: "!Aa12345678"
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when req email is missing domain', async () => {
            let req = {
                email: "aaa@bg",
                password: "!Aa12345678"
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when req password is only letters', async () => {
            let req = {
                email: "test@mail.com",
                password: "abvcdfre"
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when req password is only numbers', async () => {
            let req = {
                email: "test@mail.com",
                password: "111111111"
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when req password is less then 8 chars', async () => {
            let req = {
                email: "test@mail.com",
                password: "!Aa1234"
            }

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=TRUE when authentication is valid', async () => {
            let password = "!Aa12345678";
            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return {
                            isLocked: false,
                            _id: '12345678',
                            password: password,
                            passwordConfirmed: true
                        }
                    }
                }
            })

            jest.doMock('../../../src/endpoints/auth/auth.refresh.repository', () => {
                return {
                    getUserRefreshTokens: function (id) {
                        return [
                            { _id: 1 }
                        ]
                    },
                    destroyByIds: function (id) {
                        return true;
                    },
                    add: function (obj) {
                        return true;
                    }
                }
            })

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (password, userPassword) {
                        return true;
                    }
                }
            })

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(true);
        })

        test('Return SUCCESS=FALSE when user is not existing', async () => {
            let password = "!Aa12345678";
            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return undefined
                    }
                }
            })

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when user is locked', async () => {
            let password = "!Aa12345678";
            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return {
                            isLocked: true
                        }
                    }
                }
            })

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=FALSE when user password is not correct', async () => {
            let password = "!Aa12345678";
            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return {
                            isLocked: false,
                            _id: '12345678',
                            password: password,
                            passwordConfirmed: true
                        }
                    },

                }
            })

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (password, userPassword) {
                        return false;
                    }
                }
            })

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.success).toBe(false);
        })

        test('Return SUCCESS=TRUE and response code 404 when authentication is valid and is first login', async () => {
            let password = "!Aa12345678";
            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return {
                            isLocked: false,
                            _id: '12345678',
                            password: password,
                            passwordConfirmed: false
                        }
                    }
                }
            })

            jest.doMock('../../../src/endpoints/auth/auth.refresh.repository', () => {
                return {
                    getUserRefreshTokens: function (id) {
                        return [
                            { _id: 1 }
                        ]
                    },
                    destroyByIds: function (id) {
                        return true;
                    },
                    add: function (obj) {
                        return true;
                    }
                }
            })

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (password, userPassword) {
                        return true;
                    }
                }
            })

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.status).toBe(404);
        })

        test('Return SUCCESS=TRUE and response code 200 when authentication is valid and is not first login', async () => {
            let password = "!Aa12345678";
            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return {
                            isLocked: false,
                            _id: '12345678',
                            password: password,
                            passwordConfirmed: true
                        }
                    }
                }
            })

            jest.doMock('../../../src/endpoints/auth/auth.refresh.repository', () => {
                return {
                    getUserRefreshTokens: function (id) {
                        return [
                            { _id: 1 }
                        ]
                    },
                    destroyByIds: function (id) {
                        return true;
                    },
                    add: function (obj) {
                        return true;
                    }
                }
            })

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (password, userPassword) {
                        return true;
                    }
                }
            })

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.status).toBe(200);
        })

        test('Return New generated tokens', async () => {
            let password = "!Aa12345678";

            let generatedToken = "THIS_IS_SIGN_IN_TOKEN";
            let generatedRefreshToken = "THIS_IS_Refresh_IN_TOKEN";

            let req = {
                email: "test@mail.com",
                password: password
            }

            jest.doMock('../../../src/endpoints/auth/auth.user.repository', () => {
                return {
                    findUser: function (user) {
                        return {
                            isLocked: false,
                            _id: '12345678',
                            password: password,
                            passwordConfirmed: true
                        }
                    }
                }
            })

            jest.doMock('../../../src/endpoints/auth/auth.refresh.repository', () => {
                return {
                    getUserRefreshTokens: function (id) {
                        return [
                            { _id: 1 }
                        ]
                    },
                    destroyByIds: function (id) {
                        return true;
                    },
                    add: function (obj) {
                        return {
                            token: generatedRefreshToken
                        };
                    }
                }
            })

            jest.doMock('../../../src/app-packages/password.manager', () => {
                return {
                    verify: function (password, userPassword) {
                        return true;
                    }
                }
            })

            jest.mock('../../../src/app-packages/token/jwt.token.generator', () => (
                {
                    generate: jest.fn()
                        .mockReturnValueOnce({ token: generatedToken })
                        .mockReturnValueOnce({ token: generatedRefreshToken })
                }
            ))

            let authService = require('../../../src/endpoints/auth/auth.service');
            let authenticateResult = await authService.authenticate(req);

            expect(authenticateResult.data.idToken).toBe(generatedToken);
            expect(authenticateResult.data.refreshToken).toBe(generatedRefreshToken);
        })
    })
})