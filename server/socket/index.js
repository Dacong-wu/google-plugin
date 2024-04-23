const socketIo = require('socket.io')
const emitFunctions = require('./emitFunctions')
const { middleware } = require('./middleware')

const socket = server => {
  const io = socketIo(server, {
    maxHttpBufferSize: 1e7 //最大接收10M
  })

  io.on('connection', async socket => {
    console.log(socket.id)
    Object.keys(emitFunctions).forEach(key => {
      socket.on(key, async (data, callback) => {
        middleware({ socket, data, callback, func: emitFunctions[key] })
      })
    })
  })

  return io
}

module.exports = socket
