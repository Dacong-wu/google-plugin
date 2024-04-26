export function sendMessage(webSocket, type, value) {
  webSocket.send(JSON.stringify({ type, value }))
}

export function updateBadgeText() {
  chrome.action.getBadgeText({}, function (result) {
    let newValue = parseInt(result ? result : 0) + 1
    chrome.action.setBadgeText({ text: newValue.toString() })
  })
}

export function getMessage(data) {
  let { type, value } = JSON.parse(data)
  switch (type) {
    case 'notification':
      updateBadgeText()
      const options = {
        type: 'basic',
        iconUrl: '/assets/128.png', // 通知图标
        title: '大葱给你发了消息',
        message: value
      }
      // 发送通知
      chrome.notifications.create(options)
      break
  }
}
