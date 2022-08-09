import axios from "axios"

// 注册的业务模块
console.log('注册的业务模块')

var btncode = document.querySelector('.btn')

var timeId = null
btncode.onclick = function () {
  var num = 60
  timeId = setInterval(function () {
    num--
    if (num <= 0) {
      clearInterval(timeId)
      btncode.disabled = false
      btncode.value = '发送验证码'
      return
    }
    btncode.value = num + '秒后重新发送'
    btncode.disabled = true
  }, 1000)

  // 获取输入的邮箱
  let email = $('#email').val()
  // 验证邮箱格式
  let regEmail = /^\w{6,20}@[0-9a-zA-Z]{1,10}(\.[a-z]{2,3}){1,2}$/
  if (!regEmail.test(email)) {
    alert('邮箱格式错误！')
    return
  }
  // 发送验证码请求
  axios.post('/api/user/sendmail', { email })
    .then((res) => {
      let { data } = res
      alert(data.msg)
    })
}

// 点击注册
$('.btn-primary').click(function () {
  // 获取用户输入的内容
  let user = $('#user').val()
  let pass = $('#pass').val()
  let nick = $('#nick').val()
  let email = $('#email').val()
  let sex = $('#sex').val()
  let age = $('#age').val()
  let code = $('#code').val()
  // 校验输入内容的格式
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
  let regNick = /^.{2,16}$/
  if (!regNick.test(nick)) {
    alert('昵称格式错误')
    return
  }
  let regEmail = /^\w{6,20}@[0-9a-zA-Z]{1,10}(\.[a-z]{2,3}){1,2}$/
  if (!regEmail.test(email)) {
    alert('邮箱格式错误！')
    return
  }
  let regCode = /^\d{2,7}$/
  if (!regCode.test(code)) {
    alert('验证码格式错误')
  }
  if (!sex) {
    alert('请选择性别')
    return
  }
  let regAge = /^\d{1,3}$/
  if (regAge.test(age)) {
    alert('年龄格式错误！')
    return
  }

  // 发送注册请求
  axios.post('api/user/register', {
    username: user,
    password: pass,
    nickname: nick,
    email,
    sex,
    age,
    code
  })
    .then((res) => {
      let { data } = res
      alert(data.msg)
      if (data.code === 1) {
        // 注册成功，跳转到登录页面
        location.href = './login.html'
      }
    })
})