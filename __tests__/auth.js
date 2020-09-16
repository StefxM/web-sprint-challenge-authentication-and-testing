
const supertest = require('supertest')

const server = require('../api/server');
const dbConfig = require('../database/dbConfig');

afterAll( async () => {
    await dbConfig.destroy()
})

describe('Register tests', () => {

    it('POST/ register of new user', async () => {
        let res = await supertest(server)
        .post('/api/auth/register')
        .send({username: 'test12334565', password: 'test123'});

        expect(res.statusCode).toBe(409);
    })

    it('POST / creates test user', async () => {
        const res = await supertest(server)
        .post('/api/auth/register')
        .send({username: 'smairena123478', password:'password13'})
        expect(res.statusCode).toBe(201);
        

    })

    it('POST / login fail', async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send({username:'smairena12345', password: null})
            expect(res.statusCode).toBe(400)
    })

    it('POST / login success', async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send({username:'smairena123478', password:'password13'})
            expect(res.statusCode).toBe(200)
    })
})

