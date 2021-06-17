const router = require("express").Router();
const {
  models: { Order, Pun },
} = require("../db");

//get open order by userId
router.get("/myCart/:userId", async (req, res, next) => {
  try {
    //make sure have requireToken
    const userId = req.params.userId;
    //add eager loading to include where items' order id matches
    const order = await Order.findOne({
      where: { userId: userId, status: "open" },
      include: [
        {
          model: Pun,
          through: {
            where: {
              orderId: orderId,
            },
          },
        },
      ],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

//get order by orderId (useful for guests)
//security: if order has userId, then to access must be associated user or admin
router.get("/orderId/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    //add eager loading to include where items' order id matches
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Pun,
          through: {
            where: {
              orderId: orderId,
            },
          },
        },
      ],
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//create new order
router.post("/", async (req, res, next) => {
  try {
    //make sure getting proper order instance from store
    const {
      status,
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
    } = req.body;
    const order = await Order.create({
      status,
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
    }); //destructured
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

//edit an order
//add/edit/delete items
//checkout edit status
router.put("/orderId/:orderId", async (req, res, next) => {
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
