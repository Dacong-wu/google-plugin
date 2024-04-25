const WebSocket = require('ws')

const socket = server => {
  const wss = new WebSocket.Server({ server })
  wss.on('connection', function connection(ws, req) {
    console.log('新的WebSocket连接已建立')
    ws.on('message', function message(data) {
      console.log('received: %s', data)
    })
    // 发送消息给客户端
    ws.send('欢迎连接WebSocket服务器')
  })
}

module.exports = socket
