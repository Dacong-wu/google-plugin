$(document).ready(function () {
  chrome.action.getBadgeText({}, function (result) {
    $('#countValue').text(result ? result : 0)
  })

  // 监听 countValue 元素及其子节点的变化
  const targetNode = document.getElementById('countValue')

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const count = parseInt($('#countValue').text())

        // 如果 count 值大于 0，则显示 warning 元素；否则隐藏 warning 元素
        if (count > 0) {
          $('.warning').show()
          $('#myButton').show()
        } else {
          $('.warning').hide()
          $('#myButton').hide()
        }
      }
    })
  })

  const config = {
    subtree: true,
    childList: true,
    characterData: true
  }

  observer.observe(targetNode, config)

  $('#myButton').click(function () {
    // 在按钮被点击时执行的操作
    $('#countValue').text('0')
    chrome.action.setBadgeText({ text: '' })
  })
})
