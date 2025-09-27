const request = require("supertest");
const app = require("../src/index.js");

let userId;

describe("User Management API", () => {
    test("POST /users should create a new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({ name: "John Doe", email: "john@example.com" })
            .expect(201);
        userId = response.body.id;
    });

    test("GET /users/:id should return user details", async () => {
        await request(app).get(`/users/${userId}`).expect(200);
    });

    test("GET /users/:id should return 404 for non-existent user", async () => {
        await request(app).get("/users/nonexistent").expect(404);
    });

    test("PUT /users/:id should update user details", async () => {
        await request(app).put(`/users/${userId}`).send({ name: "Jane Doe" }).expect(200);
    });

    test("PUT /users/:id should return 404 if user does not exist", async () => {
        await request(app).put("/users/nonexistent").send({ name: "X" }).expect(404);
    });

    test("DELETE /users/:id should delete the user", async () => {
        await request(app).delete(`/users/${userId}`).expect(200);
    });

    test("DELETE /users/:id should return 404 if user does not exist", async () => {
        await request(app).delete("/users/nonexistent").expect(404);
    });
});
