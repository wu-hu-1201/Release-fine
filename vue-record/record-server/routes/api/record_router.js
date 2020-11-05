const Router = require('koa-router')
const router = new Router()
const record_controller = require('./../../app/controllers/record_controller')

router.post('/home/publish', record_controller.publish)
router.post('/home/community', record_controller.getRecord)
router.post('/info', record_controller.getInfo)
router.post('/mine', record_controller.getPublish)
router.post('/home/search', record_controller.getSearchSuggest)



module.exports = router