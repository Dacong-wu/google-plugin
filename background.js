import { io } from './assets/socket.io.esm.min.js'
chrome.runtime.onInstalled.addListener(() => {
  const socket = io('http://127.0.0.1:5000')
  socket.on('connect', () => {
    console.log('Connected, socket id:', socket.id)
    // 这里进行你想要的操作
  })
})
