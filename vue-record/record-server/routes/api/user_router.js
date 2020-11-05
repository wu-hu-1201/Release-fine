const Router = require('koa-router')
const router = new Router()
const user_controller = require('./../../app/controllers/user_controller')

router.get('/get', user_controller.get) // 调用控制成(user_controller)里的get方法
router.post('/login', user_controller.login)  // 调用控制成(user_controller)里的login方法
router.post('/register', user_controller.register) // 调用控制成(user_controller)里的register方法
router.post('/home/mine', user_controller.release)
router.post('/login', user_controller.getLogin)

module.exports = router