// require("dotenv").config({ path: ".env" });
/* eslint-disable no-undef */
const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const jwt = require("jsonwebtoken");

let server;
let agent;

describe("Online Voting Sytem test cases", () => {
    let authToken;

    beforeAll(async () => {
        server = app.listen(9000, () => { });
        agent = request.agent(server);

        authToken = jwt.sign({ id: 1 }, "Drvl@TestCase", { expiresIn: "1h" });
    });

    afterAll(async () => {
        try {
            await db.sequelize.close();
            await server.close();
        } catch (error) {
            console.log(error);
        }
    });

    test("Signup new user", async () => {
        res = await agent.post("/user/signup").send({
            firstName: "Dipu",
            lastName: "rvl",
            email: "dipu@gmail.com",
            password: "dipu",
        });
        expect(res.statusCode).toBe(200);
    });

    test("User login", async () => {
        res = await agent.post("/user/signin").send({
            email: "dipu@gmail.com",
            password: "dipu",
        });
        expect(res.statusCode).toBe(200);
    });

    test("Get List Of ELection", async () => {
        const response = await request(server)
            .get("/election")
            .set("Authorization", `Bearer ${authToken}`);
        expect(response.statusCode).toBe(200);
    });

    test("Creating Election", async () => {
        const response = await request(server)
            .post("/election")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                title: "Class Monitor 2023",
                url: "monitor",
            });
        expect(response.statusCode).toBe(200);
    });

    test("Delete an election", async () => {

        const response = await request(server)
            .post("/election")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                title: "HOD provision",
                url: "mmm",
            });
        expect(response.statusCode).toBe(200);

        const election = JSON.parse(response.text);
        console.log(election);
        const rese = await agent
            .delete(`/election/${election.election.id}`)
            .set("Authorization", `Bearer ${authToken}`)

        expect(rese.statusCode).toBe(200);
    });

});