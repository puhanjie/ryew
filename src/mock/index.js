import Mock from 'mockjs'
import './modules/user'

// 设置被拦截的请求的响应时间，单位：毫秒
Mock.setup({
    timeout: '600-1000',
  });