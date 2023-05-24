import request from "supertest";

import app from "../../src/app";
import mongoose from "mongoose";

let server: any;

beforeAll(async () => {
    server = app.listen(8080);
});

afterAll(async () => {
    server.close();
});

describe("Integration: User /POST Testing", () => {
    describe("when all the values are correct", () => {
        it("should return 200 if duplicate email or username does not exist", async () => {
            const data = {
                username: "abcdef5ggdfhi",
                name: "Alemu sisay",
                email: "abc5fehjbfi@gmail.com"
            };

            const result = await request(server).post("/user").send(data);
            expect(result.status).toBe(200);
        }, 60000);

        it("should return 409 if duplicate  exist", async () => {
            const data = {
                username: "abcdef",
                name: "Alemu sisay",
                email: "abc@gmail.com"
            };

            const result = await request(server).post("/user").send(data);
            expect(result.status).toBe(409);
        }, 60000);
    });

    describe("when one value is not missing", () => {
        it("should return 400", async () => {
            const result = await request(server).post("/user").send({
                name: "Alemu sisay3",
                email: "alemu3@gmail.com"
            });
            expect(result.status).toBe(400);
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
