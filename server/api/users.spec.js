/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('User routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/users/:id', () => {

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object');
      expect(res.body.firstName).to.equal('Brenda')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
