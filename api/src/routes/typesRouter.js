const {Router} = require('express')
const {getTypesHandler} = require('../handlers/typeHandler')

const typeRouter = Router()

typeRouter.get('/type',getTypesHandler)

module.exports = typeRouter