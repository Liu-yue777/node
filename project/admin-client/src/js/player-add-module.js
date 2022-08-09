// 添加球员的业务模块
console.log('添加球员的业务模块')

import axios from 'axios'
// 执行公用模板
import './food-common.js'

// 点击上传图片
$('.form-inline').submit(function (e) {
  // 阻止表单默认提交
  e.preventDefault()

  // 创建FormData对象
  let formData = new FormData(this)

  // 发送上传图片请求
  axios.post('/api/file/upload', formData)
    .then((res) => {
      let { data } = res
      alert(data.msg)
      if (data.code === 1) {
        // 上传成功，把图片地址填入下面的输入框中
        $('#imgurl').val(data.imgurl)
      }
    })
})

// 点击添加球员
$('.btn-success').click(function () {
  // 获取输入的内容
  let name = $('#name').val()
  let age = $('#age').val()
  let num = $('#num').val()
  let position = $('#position').val()
  let imgurl = $('#imgurl').val()

  // 验证输入的内容
  if (!name || !age || !num || !position || !imgurl) {
    alert('输入内容不能为空')
    return
  }

  // 发送添加请求
  axios.post('/api/food/add', { name, age, num, position, imgurl })
    .then((res) => {
      let { data } = res
      alert(data.msg)
      if (data.code === 1) {
        // 清空输入框
        $('#name').val('')
        $('#desc').val('')
        $('#price').val('')
        $('#type').val('')
        $('#imgurl').val('')
      }
    })
})