import request from "supertest";

import app from "../../src/app";

let server: any;

beforeAll(async () => {
    server = app.listen(8080);
});

afterAll(async () => {
    server.close();
});

describe("Integration: User /POST Testing", () => {
    describe("when all the values are correct", () => {
        // it("should return 200 if duplicate email or username does not exist", async () => {
        //     const data = {
        //         username: "newuser2",
        //         name: "Alemu sisay",
        //         email: "newuser2@gmail.com"
        //     };

        //     const result = await request(server).post("/user").send(data);
        //     expect(result.status).toBe(200);
        //     expect(result.body._id).toBeDefined();
        // }, 60000);

        it("should return 409 if duplicate  exist", async () => {
            const data = {
                username: "abserdtfyguhcdef",
                name: "Alemu sisay",
                email: "abserdtfyuhjic@gmail.com"
            };

            const result = await request(server).post("/user").send(data);
            expect(result.status).toBe(409);
            expect(result.body.message).toEqual("Username or email already exists");
        }, 60000);
    });

    describe("when one value is missing", () => {
        it("should return 400", async () => {
            const result = await request(server).post("/user").send({
                name: "Alemu sisay3",
                email: "alemu3@gmail.com"
            });
            expect(result.status).toBe(400);
            expect(result.body.message).toEqual("Invalid details provided");
        }, 60000);
    });
});

describe("Integration: User /Get Testing", () => {
    describe("when the users exists", () => {
        it("should return 200", async () => {
            const result = await request(server).get("/user");
            expect(result.status).toBe(200);
        }, 60000);
    });
});

describe("Integration: User /DELETE Testing", () => {
    const userID = "64700c4ea392a4d0546f21aa";
    it("should return 200 if user exists", async () => {
        const result = await request(server).get(`/user/${userID}`);
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
    }, 60000);
});
