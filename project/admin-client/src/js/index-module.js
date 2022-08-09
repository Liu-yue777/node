// 首页的业务模块
console.log('首页的业务模块')

// 下载axios:npm i axios
import axios from 'axios'

let disnone = document.querySelector('.disnone')

// 获取本地存储的token
let token = localStorage.getItem('token')

// 存储当前页面地址(登录成功后跳转的地址)
localStorage.setItem('targetUrl', location.href)

// 判断是否已登录
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
      // 隐藏登录注册
      $('.tologin').hide()
      $('.toregister').hide()
      // 显示登录昵称
      $('.showname').text(data.info.nick)
      disnone.classList.remove('disnone')
    }
  })

// 退出登录
$('.logout').click(function () {
  // 删除本地token
  localStorage.removeItem('token')
  // 提示用户
  alert('退出成功！')
  // 刷新页面
  location.reload()
})