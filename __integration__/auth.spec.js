const request = require('request');

describe('Authentication..', () => {

    describe('Login should...', () => {
        test('Authenticate when correct credentials are send', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mail.com", password: "this12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(true);
                expect(r.status).toBe(200);

                done()
            });
        });

        test('Return different id and refresh JWTs', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mail.com", password: "this12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(true);
                expect(r.status).toBe(200);
                expect(r.data).toBeDefined()
                expect(r.data.idToken).toBeDefined();
                expect(r.data.refreshToken).toBeDefined();
                expect(r.data.idToken).not.toEqual(r.data.refreshToken);

                done()
            });
        });

        test('Not Authenticate when credentials are not provided', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({})
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(false);
                expect(r.status).toBe(404);

                done()
            });
        });

        test('Not Authenticate when email is not provided', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ password: "this12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(false);
                expect(r.status).toBe(404);

                done()
            });
        });

        test('Not Authenticate when password is not provided', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mail.com" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(false);
                expect(r.status).toBe(404);

                done()
            });
        });

        test('Not authenticate when email is not valid', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mailcom", password: "this12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(false);
                expect(r.status).toBe(404);

                done()
            });
        });

        test('Not authenticate when password is not valid', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mail.com", password: "Bthis12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(false);
                expect(r.status).toBe(404);

                done()
            });
        });
    })

    describe('Logout should...', () => {
        test('Logout when user id is correct', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mail.com", password: "this12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(true);
                expect(r.status).toBe(200);

                let token = r.data;

                request.post({
                    url: 'http://localhost:8090/api/auth/logout',
                    headers: {
                        "content-type": "application/json",
                        "Authorization": "Bearer " + token.idToken
                    }
                }, function (error, response, body) {
                    let r = JSON.parse(body);
                    expect(body).toBeDefined();
                    expect(r.success).toBe(true);
                    expect(r.status).toBe(200);

                    done()
                });

            });
        });

        test('Not Logout when user id is not correct', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email: "admin@mail.com", password: "this12345678Sparta!" })
            }, function (error, response, body) {
                let r = JSON.parse(body);

                expect(body).toBeDefined();
                expect(r.success).toBe(true);
                expect(r.status).toBe(200);

                let token = r.data;
                let splitToken = token.idToken.split('.');
                let newId = Buffer.from("NOT_VALID")
                splitToken[1] = newId.toString("base64");
                let changedToken = `${splitToken[0]}.${splitToken[1]}.${splitToken[2]}`

                request.post({
                    url: 'http://localhost:8090/api/auth/logout',
                    headers: {
                        "content-type": "application/json",
                        "Authorization": "Bearer " + changedToken
                    }
                }, function (error, response, notLogBody) {
                    expect(notLogBody).toBeDefined();
                    expect(notLogBody).toBe('Forbidden');

                    done()
                });

            });
        });

        test('Not Logout when send request is without Authorization', function (done) {
            request.post({
                url: 'http://localhost:8090/api/auth/logout',
                headers: {
                    "content-type": "application/json"
                }
            }, function (error, response, notLogBody) {
                expect(notLogBody).toBeDefined();
                expect(notLogBody).toBe('Unauthorized');

                done()
            });
        });
    });

})


