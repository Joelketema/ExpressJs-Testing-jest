import request from "supertest";

import app from "../../src/app";

let server: any;

beforeAll(async () => {
    server = app.listen(8081);
});

afterAll(async () => {
    server.close();
});

describe("UNIT: UserPost /POST Testing", () => {
    describe("when all the values are correct", () => {
        it("should return status 200", async () => {
            const result = await request(server).post("/user").send({
                title: "some title",
                desciption: "some desc",
                vote: 5,
                author: "646ca147a83e24d475fbf660"
            });
            expect(result.status).toBe(200);
        }, 60000);
    });

    describe("when request values are not correct", () => {
        it("should return status 400", async () => {
            const result = await request(server).post("/post").send({
                desciption: "some desc",
                vote: 5,
                author: "646ca147a83e24d475fbf660"
            });
            expect(result.status).toBe(400);
        }, 60000);
    });
});

describe("UNIT: UserPost /Get Testing", () => {
    describe("when the user has posts ", () => {
        it("should return 200", async () => {
            const result = await request(server).get("/post");
            expect(result.status).toBe(200);
        }, 60000);
    });
});
