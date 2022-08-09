// 球员列表的业务模块
console.log('球员列表的业务模块')

// 执行公用模板
import './food-common.js'

import axios from 'axios'

import baseUrl from './webpack.env.js'

const source = axios.CancelToken.source()

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (!localStorage.getItem('token')) {
    // 没有token，取消本次请求
    source.cancel('缺少token数据')
  }
  return config // 放行，继续执行后面的程序
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let res = response.data
  return res // 放行，继续执行后面的程序
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

let count = 0
let pages = 0
let page = 1
let size = 4

// 进入页码获取第一页数据并渲染
getPageData(page, size)

function getPageData(page, size) {// 获取分页数据并渲染
  axios({
    method: 'post',
    url: baseUrl + '/food/getpage',
    data: { page, size },
    cancelToken: source.token
  })
    .then((res) => {
      // let {data} = res
      if (res.code === 1) {
        count = res.count
        pages = res.pages
        console.log(count, pages)
        // 渲染表格
        renderTable(res.data)
        // 渲染分页
        renderPages(page, pages)
      }
      else {
        alert(res.msg)
      }
    })
    .catch((err) => {
      console.log('获取分页数据失败', err)
    })
}

function renderTable(arr) {
  // 根据数据渲染表格
  // 渲染模板
  let template1 = `<tr>
      <th>球员名称</th>
      <th>球员年龄</th>
      <th>球员号码</th>
      <th>球员位置</th>
      <th>球员图片</th>
      <th>操作</th>
    </tr>`
  // 遍历arr数组[{item},{item},....]
  arr.forEach((item) => {
    template1 += `<tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.num}</td>
          <td>${item.position}</td>
          <td><img src="${item.imgurl}" alt=""></td>
          <td>
              <button class="btn btn-success btn-xs" data-toggle="modal" data-target="#my-modal"><span class="glyphicon glyphicon-pencil"></span> 编辑</button>
              <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> 删除</button>
          </td>
      </tr>`
    // 将模板插入到body中
    $('.table tbody').html(template1)
  })
}

function renderPages(page, pages) {
  // 渲染分页选项
  // 渲染模板字符串
  let template2 = `<li class="prev">
      <a href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`

  for (var i = 0; i < pages; i++) {
    template2 += `<li class="num"><a href="#">${i + 1}</a></li>`
  }

  template2 += `<li class="next">
      <a href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
      </a>
    </li>`

  // 添加到分页容器中
  $('.pagination').html(template2)

  // 给当前页添加选中状态
  $('.pagination li').eq(page).addClass('active')
}

// 点击上一页
$('.pagination').on('click', '.prev', function () {
  page--
  //页码加一
  if (page === 0) {
    // 当前已经在最后一页了
    alert('已经在最后一页了')
    page = 1
    return
  }
  // 切换选中项状态
  $('.num').eq(page - 1).addClass('active').siblings('.num').removeClass('active')
  // 切换页面数据
  getPageData(page, size)
})

// 点击下一页
$('.pagination').on('click', '.next', function () {
  page++ // 页码加1
  if (page > pages) {// 临界值判断
    // 当前已经在最后一页了
    alert('已经在最后一页了')
    page = pages
    return
  }
  // 切换选中项状态
  $('.num').eq(page - 1).addClass('active').siblings('.num').removeClass('active')
  // 切换页面数据
  getPageData(page, size)
})

// 选中某一项
$('.pagination').on('click', '.num', function () {
  // 获取当前页码
  page = $(this).children().eq(0).text()
  // 切换选中项状态
  $('.num').eq(page - 1).addClass('active').siblings('.num').removeClass('active')
  // 切换页面数据
  getPageData(page, size)
})

// 关键字搜索
$('.btn-search').click(function () {
  // 获取输入的关键字
  let kw = $('#kw').val()
  // 空值判断
  if (!kw) {
    alert('搜索内容不能为空')
    return
  }
  // 发送请求
  axios({
    method: 'post',
    url: baseUrl + '/food/search',
    data: { kw },
    cancelToken: source.token
  })
    .then((res) => {
      // let {data}=res
      if (res.code === 1) {
        // 渲染表格
        renderTable(res.data)
      }
      else {
        alert(res.msg)
      }
    })
    .catch((err) => {
      console.log('搜索失败', err)
    })
})

// 点击删除
$('.table').on('click', '.btn-danger', function () {
  // 删除后端对应的数据
  let name = $(this).parent().parent().children().eq(0).text()//要删除的菜品的名称
  axios({
    method: 'post',
    url: baseUrl + '/food/del',
    data: { name },
    cancelToken: source.token
  })
    .then((res) => {
      // let {data}=res
      alert(res.msg)
      if (res.code === 1) {
        // 前端删除对应的tr
        $(this).parent().parent().remove()
      }
    })
    .catch((err) => {
      console.log('删除失败', err)
    })
})

let originalname // 球员原始名称
// 点击编辑
$('.table').on('click', '.btn-success', function () {
  // 获取原始数据
  originalname = $(this).parent().parent().children().eq(0).text()// 菜品名称
  console.log(originalname)
  let age = $(this).parent().parent().children().eq(1).text()// 菜品描述
  let num = $(this).parent().parent().children().eq(2).text()// 菜品价格
  let position = $(this).parent().parent().children().eq(3).text()// 菜品类型
  let imgurl = $(this).parent().parent().children().eq(4).find('img').attr('src')// 图片地址
  console.log(age)

  // 展示原始数据
  $('#name').val(originalname)
  $('#age').val(age)
  $('#num').val(num)
  $('#position').val(position)
  $('#imgurl').val(imgurl)
})

// 编辑-上传图片
$('#upload').submit(function (e) {
  e.preventDefault()
  // 创建ForData对象
  let formData = new FormData(this)
  // 发送请求
  axios.post(baseUrl + 'file/upload', formData, { cancelToken: source.token })
    .then((res) => {
      // let {data}=res
      alert(res.msg)
      if (res.code === 1) {
        // 上传成功
        $('#imgutl').val(res.imgurl)
      }
    })
    .catch((err) => {
      console.log('上传失败', err)
    })
})

// 点击修改
$('.btn-update').click(function () {
  // 获取表单内容
  let name = $('#name').val()
  let age = $('#age').val()
  let num = $('#num').val()
  let position = $('#position').val()
  let imgurl = $('#imgurl').val()

  // 发送请求
  axios({
    method: 'post',
    url: baseUrl + '/food/update',
    data: { originalname, name, age, num, position, imgurl },
    cancelToken: source.token
  })
    .then((res) => {
      // let { data } = res
      alert(res.msg)
      if (res.code === 1) {
        // 修改成功后隐藏模态框
        location.reload()
      }
    })
    .catch((err) => {
      console.log('修改失败', err)
    })
})