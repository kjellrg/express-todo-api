import { afterAll, describe, expect, it } from "vitest";
import app from "../../../../app";

const request = require("supertest");
const fs = require("node:fs");

const testFile = "temp_delete_id.txt";
const testID = "62cf07e0bdcf8194bd5edd75";
const baseURL = "/api/v1/todos";

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
      .send({ title: "vitest_testing_post" })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
        fs.writeFileSync(testFile, res.body._id, function (err) {
          // save database ID to test DELETE......
          if (err) console.error(err);
        });
      });
  });
  it("Post with missing required field - should return 400", async () => {
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
  it("Post with too short title - should return 400", async () => {
    await request(app)
      .post(baseURL)
      .send({ title: "test" })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
        expect(res.body.message).toContain(
          "is shorter than the minimum allowed length"
        );
      });
  });
});

describe("Test /:id", () => {
  it("GET valid /:id - Should return 200", async () => {
    const deleteID = fs.readFileSync(testFile, "utf-8");
    await request(app)
      .get(`${baseURL}/${deleteID}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
        expect(res.body).toEqual(
          expect.arrayContaining([expect.objectContaining({ _id: deleteID })])
        );
      });
  });
  it("GET non-existant /:id - Should return 404", async () => {
    await request(app)
      .get(`${baseURL}/${testID}`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
        expect(res.body).toEqual(
          expect.objectContaining({ message: "id does not exist" })
        );
      });
  });
  it("GET invalid-format /:id - Should return 404", async () => {
    await request(app)
      .get(`${baseURL}/error`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeTypeOf("object");
        expect(res.body.message).toContain("Cast to ObjectId failed for value");
      });
  });
  it("DELETE valid /:id Should return 200", async () => {
    const deleteID = fs.readFileSync(testFile, "utf-8");
    await request(app)
      .delete(`${baseURL}/${deleteID}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.deletedCount).toEqual(1);
        expect(res.body.acknowledged).toEqual(true);
      });
  });
  it("DELETE non-existant /:id Should return 404", async () => {
    await request(app)
      .delete(`${baseURL}/${testID}`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body).toEqual(
          expect.objectContaining({ message: `${testID} not found` })
        );
      });
  });
  it("DELETE invalid-format /:id Should return 404", async () => {
    await request(app)
      .delete(`${baseURL}/error`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
      });
  });

  afterAll(() => {
    fs.rm(testFile, function (err) {
      if (err) console.error(err);
    });
  });
});
