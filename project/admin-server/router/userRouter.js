// 用户相关的路由表

// 创建路由表（空表）
// let express = require('express')
// let router = express.Router()
let router = require('express').Router()

// 导入发送邮件模块
let myemail = require('../utils/email.js')

// 导入数据模型
let userModel = require('../db/models/userModel.js')

// 导入jwt模块
let jwt = require('jsonwebtoken')

// 验证是否已登录
router.get('/islogin', (req, res) => {
  // 获取来自前端的token
  const token = req.headers.authorization
  // 验证token
  jwt.verify(token, 'abc123', (err, data) => {
    if (err) {
      res.send({ 'code': 0, msg: '无效的token信息', info: '' })
    } else {
      res.send({ 'code': 1, msg: '用户已登录', info: data })
    }
  })
})

/**
 * @api {post} /user/login 登录接口
 * @apiGroup user
 *
 * @apiParam {String} username 用户账号
 * @apiParam {String} password 用户密码
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *     "code": 1,
 *     "msg": "登录成功"
 * }
 */
router.post('/login', (req, res) => {// fn1
  // 获取请求参数并解构赋值
  let { username, password } = req.body
  // 查询数据库
  // userModel.find({$and:[{'username':username},{'password':password}]})
  userModel.find({ $and: [{ username }, { password }] })
    .then((arr) => {
      if (arr.length > 0) {// [{...}]
        // 登录成功，生成token，返回给前端保存

        // 要保存的用户信息
        let userInfo = {
          user: arr[0].username,
          nick: arr[0].nickname,
          sex: arr[0].sex,
          age: arr[0].age
        }

        // 生成token
        let token = jwt.sign(userInfo, 'abc123', { expiresIn: '7d' })

        // 响应前端
        res.send({ code: 1, msg: '登录成功', token })
      } else {
        res.send({ code: 0, msg: '账号或密码错误' })
      }
    })
    .catch((err) => {
      res.send({ code: -1, msg: err })
    })
})

// 缓存验证码
let cacheCode = {
  // '570062873@qq.com': '56787',
  // '570061234@qq.com': '12322'
}
/**
 * @api {post} /user/register 注册接口
 * @apiGroup user
 *
 * @apiParam {String} username 用户账号
 * @apiParam {String} password 用户密码
 * @apiParam {String} nickname 用户昵称
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} sex 用户性别
 * @apiParam {String} age 用户年龄
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *     "code": 1,
 *     "msg": "注册成功"
 * }
 */
router.post('/register', (req, res) => {// fn2
  // 获取请求参数并解构赋值
  let { username, password, nickname, email, sex, age, code } = req.body
  // 校验验证码
  if (code !== cacheCode[email]) {
    return res.send({ code: -3, msg: '验证码错误！' })
  }
  // 查询数据库
  userModel.find({ username })// p1
    .then((arr) => {
      if (arr.length > 0) {
        // 数据有该账号，不允许重复注册
        res.send({ code: -1, msg: '账号已存在' })
      } else {
        // 可以注册该账号，向数据库添加数据
        return userModel.insertMany({ username, password, nickname, email, sex, age })
      }
    })// p2
    .then((arr) => {
      if (arr.length > 0) {
        res.send({ code: 1, msg: '注册成功' })
      } else {
        res.send({ code: 0, msg: '注册失败' })
      }
    })
    .catch((err) => {
      res.send({ code: -2, msg: err })
    })

  // res.send('register ok')
})

/**
 * @api {post} /user/sendmail 发送邮件
 * @apiGroup user
 *
 * @apiParam {String} email 用户邮箱
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *     "code": 1,
 *     "msg": "发送邮件成功"
 * }
 */
router.post('/sendmail', (req, res) => {
  // 获取用户邮箱的参数
  let { email } = req.body
  // 生成随机验证码
  let code = parseInt(Math.random() * 100000)
  // 给用户发送邮件
  myemail.sendMail(email, '邮箱验证码', '您的验证码是：' + code)
    .then((msg) => {
      // 缓存当前邮箱的验证码
      cacheCode[email] = code + ''
      res.send({ 'code': 1, 'msg': msg })
    })
    .catch((err) => {
      res.send({ 'code': 0, 'msg': err })
    })
})

// 导出路由表
module.exports = router
