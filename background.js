import { sendMessage, getMessage } from './utils/socket.js'
const TEN_SECONDS_MS = 10 * 1000
let webSocket = null
let keepAliveIntervalId = null
connect()

function connect() {
  if (keepAliveIntervalId) clearInterval(keepAliveIntervalId)
  webSocket = new WebSocket('wss://api.ll1025.cn')

  keepAlive()

  webSocket.onopen = () => {
    chrome.action.setIcon({ path: 'assets/128-success.png' })
  }

  webSocket.onmessage = event => {
    getMessage(event.data)
  }

  webSocket.onclose = () => {
    chrome.action.setIcon({ path: 'assets/128-close.png' })
    webSocket = null
    setTimeout(connect, 2000)
  }
}

function keepAlive() {
  keepAliveIntervalId = setInterval(() => {
    if (webSocket) {
      sendMessage(webSocket, 'ping', '1')
    } else {
      clearInterval(keepAliveIntervalId)
    }
  }, TEN_SECONDS_MS)
}
