const request = require('supertest');
const app = require('../src/index');

describe('Users API', () => {
    it('should create a user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'John', email: 'john@example.com' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('John');
        expect(res.body.email).toBe('john@example.com');
    });

    it('should get a user by id', async () => {
        const createRes = await request(app)
            .post('/users')
            .send({ name: 'Jane', email: 'jane@example.com' });

        const id = createRes.body.id;
        const getRes = await request(app).get(`/users/${id}`);

        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.name).toBe('Jane');
    });

    it('should update a user by id', async () => {
        const createRes = await request(app)
            .post('/users')
            .send({ name: 'Jim', email: 'jim@example.com' });

        const id = createRes.body.id;
        const updateRes = await request(app)
            .put(`/users/${id}`)
            .send({ name: 'Jimmy', email: 'jimmy@example.com' });

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.name).toBe('Jimmy');
    });

    it('should delete a user by id', async () => {
        const createRes = await request(app)
            .post('/users')
            .send({ name: 'Jake', email: 'jake@example.com' });

        const id = createRes.body.id;
        const deleteRes = await request(app).delete(`/users/${id}`);

        expect(deleteRes.statusCode).toBe(204);
    });
});
