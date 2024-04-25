function sendMessage(ws, type, value) {
  let data = JSON.stringify({ type, value })
  ws.send(data)
}
function getMessage(data) {
  let { type, value } = JSON.parse(data)
  switch (type) {
    case 'ping':
      console.log(value)
  }
}

module.exports = { sendMessage, getMessage }
