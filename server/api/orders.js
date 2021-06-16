const router = require('express').Router();
const {
  models: { Order },
} = require('../db');

//get open order by userId
router.get('/myCart/:userId', async (req, res, next) => {
  try {
    //make sure have requireToken
    const userId = req.params.userId;
    const order = await Order.findAll({
      where: { userId: userId, status: 'open' },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

//get order by orderId (useful for guests)
//security: if order has userId, then to access must be associated user or admin
router.get('/orderId/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//create new order
router.post('/', async (req, res, next) => {
  try {
    //make sure getting proper order instance from store
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

//edit an order
//add/edit/delete items
//checkout edit status
router.put('/orderId/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    //if going to checkout, send same order object with updated status to 'fulfilled'
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;