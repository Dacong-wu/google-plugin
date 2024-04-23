async function middleware({ socket, data, callback, func }) {
    try {
      let info = await func(data, socket)
      callback(info)
    } catch (err) {
      socket.emit('error', { info: err.stack })
    }
}

module.exports = { middleware }
