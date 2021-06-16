/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Order },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Order routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/orderId/:orderId", () => {
    it("GET /api/orders/orderId/1", async () => {
      const res = await request(app).get("/api/orders/orderId/1").expect(200);
      expect(res.body).to.be.an("object");
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
