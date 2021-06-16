const router = require('express').Router()
const {models: {Pun}} = require('../db/index')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Pun.findAll())
    } catch (error){
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await Pun.findByPk(req.params.id))
    }
    catch (error){
        next(error)
    }
})

module.exports = router
