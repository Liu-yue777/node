// 登录的业务模块
console.log('登录的业务模块')

import axios from 'axios'

// 点击登录
$('.btn-primary').click(function (e) {
  e.preventDefault()
  // 获取输入的内容
  let user = $('#user').val()
  let pass = $('#pass').val()

  // 校验账号密码格式
  let regUser = /^\w{2,18}$/
  if (!regUser.test(user)) {
    alert('账号格式错误')
    return
  }
  let regPass = /^\w{2,12}$/
  if (!regPass.test(pass)) {
    alert('密码格式错误')
    return
  }

  // 发送登录请求
  axios.post('/api/user/login', {
    username: user,
    password: pass
  })
    .then((res) => {
      let { data } = res
      alert(data.msg)
      if (data.code === 1) {
        // 将token存储在本地
        localStorage.setItem('token', data.token)
        // 跳转到目标地址(哪里来跳回哪里去)
        location.href = localStorage.getItem('targetUrl')
      }
    })
})