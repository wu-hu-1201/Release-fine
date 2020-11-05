const Koa = require('koa')
const cors = require('@koa/cors')  // 跨域处理
const bodyParser = require('koa-bodyparser')  // 解析参数
const mongoose = require('mongoose')  // 做mongodb连接
const config = require('./config')  
// const router = require('koa-router')()


const app = new Koa()


// 建立mongodb连接
mongoose.connect(config.db, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log('Failed to connect to database');
    } else {
        console.log('Connecting database successfully');
    }
})


// router.use('', require('@/oauth.js'))
app.use(cors());
app.use(bodyParser({
    formLimit: '1mb'
  }));
// 官方文档：https://github.com/koajs/bodyparser#options   form-data 的默认最大上传限制只有 56kb 






const user_router = require('./routes/api/user_router')
const record_router = require('./routes/api/record_router')

app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(record_router.routes()).use(record_router.allowedMethods())


app.listen(config.port)  // 监听端口