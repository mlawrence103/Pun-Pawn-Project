const router = require('express').Router();
const {
  models: { Pun },
} = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    res.json(await Pun.findAll());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Pun.findByPk(req.params.id));
  } catch (error) {
    next(error);
  }
});

//add a new pun to inventory
router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Pun.create(req.body));
  } catch (error) {
    next(error);
  }
});

//update a pun
router.put('/:id', async (req, res, next) => {
  try {
    const pun = await Pun.findByPk(req.params.id);
    await pun.update(req.body);
    res.json(pun);
  } catch (error) {
    next(error);
  }
});

//delete a pun
router.delete('/:id', async (req, res, next) => {
  try {
    const pun = await Pun.findByPk(req.params.id);
    await pun.destroy();
    res.json(pun);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
