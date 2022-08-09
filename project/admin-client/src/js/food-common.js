// 公用模板

import axios from 'axios'

// 保持当前页面
localStorage.setItem('targetUrl', location.href)

// 获取本地的token
let token = localStorage.getItem('token')

// 判断是否登录
axios({
  method: 'get',
  url: '/api/user/islogin',
  headers: {
    authorization: token
  }
})
  .then((res) => {
    let { data } = res
    if (data.code === 1) {
      // 已登录，展示用户昵称
      $('.showname').text(data.info.nick)
    }
    else {
      // 未登录，跳转到登录页
      location.href = './login.html'
    }
  })

// 退出登录
$('.logout').click(function () {
  // 删除本地的totken
  localStorage.removeItem('token')
  // 提示用户
  alert('退出成功')
  // 刷新页面
  location.reload()
})