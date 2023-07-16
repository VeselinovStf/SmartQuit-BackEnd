describe('HTTP Client Should..', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe('getWithParams..', () => {
        test('Return correct responce when params are valid', async () => {
            let url = "http://"
            let param = "param"
            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return a
                    }
                }
            })

            let http = require('../../src/app-packages/http.client');
            let response = await http.getWithParams(url, param)

            expect(response).toBeDefined();
            expect(response).toBe(url);
        })

        test('Throw when URL is invalid', async () => {
            let url = undefined
            let param = "param"

            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return a
                    }
                }
            })

            let http = require('../../src/app-packages/http.client')

            return  await http.getWithParams(url, param)
                .catch(err => {
                    expect(err).toEqual("Invalid Params: undefined")
                })

        })

        test('Throw when URL is empty', async () => {
            let url = ""
            let param = "param"

            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return a
                    }
                }
            })

            let http = require('../../src/app-packages/http.client')

            return  await http.getWithParams(url, param)
                .catch(err => {
                    expect(err).toEqual("Invalid Params: ")
                })

        })

        test('Throw when param is invalid', async () => {
            let url = "URL"
            let param = undefined

            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return a
                    }
                }
            })

            let http = require('../../src/app-packages/http.client')

            return  await http.getWithParams(url, param)
                .catch(err => {
                    expect(err).toEqual("Invalid Params: URL")
                })

        })

        test('Throw when param is null', async () => {
            let url = "URL"
            let param = null

            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return a
                    }
                }
            })

            let http = require('../../src/app-packages/http.client')

            return  await http.getWithParams(url, param)
                .catch(err => {
                    expect(err).toEqual("Invalid Params: URL")
                })

        })
    })

    describe('getImage..', () => {
        test('Return correct responce when params are valid', async () => {
            let url = "http://"
            let param = "param"
            const buffer64 = Buffer.from(url, 'binary');
            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return {
                            data: (a)
                        }
                    }
                }
            })

            let http = require('../../src/app-packages/http.client');
            let response = await http.getImage(url)

            expect(response).toBeDefined();
            expect(response.toString()).toBe(buffer64.toString());
        })

        test('Throw when URL is invalid', async () => {
            let url = undefined
            jest.doMock('axios', () => {
                return {
                    get: function (a, b) {
                        return {
                            data: (a)
                        }
                    }
                }
            })

            let http = require('../../src/app-packages/http.client');
            return  await http.getImage(url)
                .catch(err => {       
                    expect(err).toEqual("Invalid Params: undefined")
                })

        })

    })

})