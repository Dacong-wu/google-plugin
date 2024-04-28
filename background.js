import { sendMessage, getMessage } from './utils/socket.js'
const TEN_SECONDS_MS = 10 * 1000
let webSocket = null
let keepAliveIntervalId = null
connect()

chrome.runtime.onStartup.addListener(() => {
  if (!webSocket) connect()
})

chrome.runtime.onInstalled.addListener(() => {
  
  chrome.storage.local.get('token', function (data) {
    const token = data.token
    console.log('获取到的凭证:', token)
  })
})

function connect() {
  if (keepAliveIntervalId) clearInterval(keepAliveIntervalId)
  // webSocket = new WebSocket('wss://api.ll1025.cn')
  webSocket = new WebSocket('ws://127.0.0.1:5003')

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
