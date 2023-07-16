const request = require('request');

describe('Refresh Token Should..', () => {

    describe('Refresh...', () => {
        test('Return new refresh token when request data is valid', function (done) {
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
                expect(r.data).toBeDefined();

                let startToken = r.data.idToken;
                let startRefreshToken = r.data.refreshToken;

                request.post({
                    url: 'http://localhost:8090/api/refreshtoken',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ refreshToken: startRefreshToken })
                }, function (error, response, body) {
                    let r = JSON.parse(body);

                    expect(r).toBeDefined();
                    expect(r.success).toBe(true);
                    expect(r.status).toBe(200);
                    expect(r.data).toBeDefined();

                    expect(r.data.idToken).not.toEqual(startToken);
                    expect(r.data.refreshToken).not.toEqual(startRefreshToken);

                    done()
                });
            });
        });

        test('Not return new refresh token when request data is invalid', function (done) {
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
                expect(r.data).toBeDefined();

                request.post({
                    url: 'http://localhost:8090/api/refreshtoken',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ refreshToken: "INVALID_TOKEN" })
                }, function (error, response, body) {
                    let r = JSON.parse(body);

                    expect(body).toBeDefined();
                    expect(r.success).toBe(false);
                    expect(r.status).toBe(404);

                    done()
                });
            });
        });
    });

})


