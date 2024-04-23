const Koa = require('koa')
const socket = require('./socket/index')
const app = new Koa({ proxy: true })
const server = app.listen(5000, '0.0.0.0', () => {
  // 0.0.0.0指定ipv4格式 ctx.ip获取到的是ipv4的地址
  console.log(`AppServer Online 🎈`)
})

const io = socket(server)
