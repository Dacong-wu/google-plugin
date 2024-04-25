const Koa = require('koa')
const app = new Koa({ proxy: true })
const socket = require('./socket')
const server = app.listen(5010, '0.0.0.0', () => {
  // 0.0.0.0指定ipv4格式 ctx.ip获取到的是ipv4的地址
  console.log(`AppServer Online 🎈`)
})

const wss = socket(server)
app.use(async (ctx, next) => {
  ctx.wss = wss
  await next()
})