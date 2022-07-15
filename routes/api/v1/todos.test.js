import { describe, expect, it } from "vitest";
import app from "../../../app";

const request = require("supertest");

const baseURL = "/api/v1/todos";

let foo = "hei";

describe("Test GET /", () => {
  it("Should return 200", async () => {
    await request(app)
      .get(baseURL)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
      });
  });
});

describe("Test POST", () => {
  it("Post valid - should return 201", async () => {
    await request(app)
      .post(baseURL)
      .send({ title: "This is a test" })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
      });
  });
  it("Post invalid - should return 400", async () => {
    await request(app)
      .post(baseURL)
      .send({ body: "This is a test" })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
        expect(res.body.message).toContain("validation failed");
      });
  });
});
