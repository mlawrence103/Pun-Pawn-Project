const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Pun } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Puns routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/puns', () => {

    it('GET /api/puns', async () => {
      const res = await request(app)
        .get('/api/puns')
        .expect(200)

      expect(res.body).to.be.an('array');
    })
  }) // end describe('/api/users') 
describe('/api/puns/:id', () => {

    it('GET /api/puns/:id', async () => {
      const res = await request(app)
        .get('/api/puns/1')
        .expect(200)

      expect(res.body).to.be.an('object');
    })
  }) // end describe('/api/users')
}) 