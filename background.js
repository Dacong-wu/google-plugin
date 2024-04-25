const TEN_SECONDS_MS = 10 * 1000
let webSocket = null

connect()
keepAlive()

function connect() {
  webSocket = new WebSocket('ws://127.0.0.1:5000')

  webSocket.onopen = () => {
    chrome.action.setIcon({ path: 'assets/128-success.png' })
    chrome.action.setBadgeText({ text: '123' });
  }

  webSocket.onmessage = event => {
    console.log(event.data)
  }

  webSocket.onclose = () => {
    chrome.action.setIcon({ path: 'assets/128-close.png' })
    webSocket = null
  }
}

function disconnect() {
  if (webSocket) {
    webSocket.close()
  }
}

function keepAlive() {
  const keepAliveIntervalId = setInterval(
    () => {
      if (webSocket) {
        console.log('ping')
        webSocket.send('ping')
      } else {
        clearInterval(keepAliveIntervalId)
      }
    },
    // It's important to pick an interval that's shorter than 30s, to
    // avoid that the service worker becomes inactive.
    TEN_SECONDS_MS
  )
}
