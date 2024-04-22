'use strict';
import { io } from './assets/jquery-3.7.1.min'
chrome.runtime.onInstalled.addListener(() => {
  connectToSocketIO()
})

function connectToSocketIO() {
  const socket = new WebSocket('ws://localhost:8080') // 替换为你的Socket.IO服务器地址

  socket.addEventListener('open', event => {
    console.log('Connected to Socket.IO server')
    // 连接成功后可以在这里发送和接收数据
  })

  socket.addEventListener('message', event => {
    console.log('Message from server:', event.data)
    // 处理从服务器接收到的消息
  })

  socket.addEventListener('close', event => {
    console.log('Disconnected from Socket.IO server')
    // 处理连接关闭事件
  })

  socket.addEventListener('error', error => {
    console.error('Socket.IO error:', error)
    // 处理连接错误事件
  })
}
