const { expect } = require('chai');
const {
  db,
  models: { Pun },
} = require('../index');

describe('Pun model', () => {
  beforeEach(() => db.sync({ force: true }));
  describe('instance method: convertFromPennies', () => {
    it('returns price in pennies divided by 100', async () => {
      const pun1 = await Pun.create({
        content: 'pretty fly for a wifi',
        author: 'Ben Rodriguez',
        price: 25,
        quantity: 3,
      });

      const pun2 = await Pun.create({
        content:
          "You're going to await a while for the seed data as I've used all my seeds to plant trees.",
        author: 'Ben Rodriguez',
        price: 5000,
        quantity: 1,
      });

      expect(pun1.convertFromPennies()).to.equal(0.25);
      expect(pun2.convertFromPennies()).to.equal(50.0);
    });
  });
});
