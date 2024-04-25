const WebSocket = require('ws')
const { sendMessage, getMessage } = require('./util.js')

const socket = server => {
  const wss = new WebSocket.Server({ server })
  wss.on('connection', function connection(ws, req) {
    console.log('新的WebSocket连接已建立')
    ws.on('message', function message(data) {
      getMessage(data)
    })
    sendMessage(ws, 'notification', '5')
  })
}

module.exports = socket
