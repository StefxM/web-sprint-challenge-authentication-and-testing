const request = require('supertest');

const auth = require('../auth/auth-router');
const { intersect } = require('../database/dbConfig');

describe('auth-router.js', () => {

        describe('register route', () => {
            it('should return an 201 status code', async () => {
                const expectedStatusCode = 201;

                const response = await request(auth).post('/register');

                expect 


            })
        })


})