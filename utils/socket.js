export function sendMessage(webSocket, type, value) {
  webSocket.send(JSON.stringify({ type, value }))
}

export function updateBadgeText(value) {
  chrome.action.getBadgeText({}, function (result) {
    let newValue = parseInt(result ? result : 0) + parseInt(value ? value : 0)
    chrome.action.setBadgeText({ text: newValue.toString() })
  })
}

export function getMessage(data) {
  let { type, value } = JSON.parse(data)
  switch (type) {
    case 'notification':
      updateBadgeText(value)
      break
  }
}
