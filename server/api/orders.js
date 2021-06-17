const router = require("express").Router();
const {
  models: { Order, Pun, LineItem },
} = require("../db");
const LineItem = require("../db/models/lineItem");

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

//**OPEN ORDER ROUTES */

router.post("/addToCart", async (req, res, next) => {
  try {
    const { punId, orderId, qty, price } = req.body;
    await lineItem.create({ punId, orderId, qty, price });
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteItem", async (req, res, next) => {
  try {
    const item = LineItem.findByPk(req.body.punId);
    await lineItem.delete(item);
  } catch (error) {
    next(error);
  }
});

router.put("/editLineItem", async (req, res, next) => {
  try {
    const { punId, orderId, qty, price } = req.body;
    await lineItem.update({
      punId,
      orderId,
      qty,
      price,
    });
  } catch (error) {
    next(error);
  }
});

//checkout edit order status
router.put("/checkout/orderId/:orderId", async (req, res, next) => {
  try {
    const {
      status,
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      total,
    } = req.body;
    const order = await Order.findByPk(req.params.orderId);
    await order.update({
      status,
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      total,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
