// 食品相关的路由表

// 创建路由表（空表）
// let express = require('express')
// let router = express.Router()
let router = require('express').Router()

// 导入数据模型
let foodModel = require('../db/models/foodModel')

/**
 * @api {post} /food/add 添加食品
 * @apiGroup food
 *
 * @apiParam {String} name 球员名称
 * @apiParam {String} age 球员年龄
 * @apiParam {String} num 球员号码
 * @apiParam {String} position 球员位置
 * @apiParam {String} imgurl 球员图片
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *     "code": 1,
 *     "msg": "添加成功"
 * }
 */
router.post('/add', (req, res) => {// fn1
  // 获取请求参数并赋值
  let { name, age, num, position, imgurl } = req.body
  // 先查询数据库是否有name这个球员
  foodModel.find({ name })
    .then((arr) => {
      if (arr.length === 0) {
        // 数据库中没有这个球员，可以添加
        return foodModel.insertMany({ name, age, num, position, imgurl })
        // 返回一个成功的Promise对象
      }
      else {
        // 数据库中已有这个球员
        res.send({ code: -1, msg: '该球员已存在' })
      }
    })
    .then(() => {
      res.send({ code: 1, msg: '添加成功！' })
    })
    .catch((err) => {
      res.send({ code: 0, msg: err })
    })
})

/**
 * @api {post} /food/del 删除球员
 * @apiGroup food
 *
 * @apiParam {String} name 球员名称
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *     "code": 1,
 *     "msg": "添加成功"
 * }
 */
router.post('/del', (req, res) => {
  // 获取前端传过来的参数
  let { name } = req.body
  // 删除数据
  foodModel.deleteOne({ name })
    .then(() => {
      res.send({ code: 1, msg: '删除成功！' })
    })
    .catch(() => {
      res.send({ code: 0, msg: '删除失败！' })
    })
})

// 修改菜品信息
router.post('/update', (req, res) => {
  // 获取前端传过来的参数
  let { originalname, name, age, num, position, imgurl } = req.body
  // 修改数据
  foodModel.updateOne({ name: originalname }, { $set: { name, name, age, num, position, imgurl } })
    .then(() => {
      res.send({ code: 1, msg: '修改成功！' })
    })
    .catch(() => {
      res.send({ code: 0, msg: '修改失败！' })
    })
})

// 分页查询数据
router.post('/getpage',(req,res)=>{
  // 获取前端传过来的参数
  let {page,size} = req.body
  page = page || 1 // 页码，默认为第1页
  size = size || 4 // 每页条数，默认为4条
  let pages = 0 // 记录数据总页数
  let count = 0 // 记录数据总条数
  // 查询所有数据
  foodModel.find()
  .then((arr)=>{
      count = arr.length
      pages = Math.ceil(count/size)

      // foodModel.find()查询所有数据
      // limit(num)限制查询num条数据
      // skip(num)跳过num条数据开始查询
      // skip(0)// 查询第1页，跳过0条，从第1条开始查询
      // skip(4)// 查询第2页，跳过4条，从第5条开始查询
      // skip(8)// 查询第3页，跳过8条，从第9条开始查询
      // skip((page-1)*size)
      return foodModel.find().limit(Number(size)).skip((page-1)*size)
  })
  .then((arr)=>{
      res.send({code:1,msg:'查询成功！',data:arr,pages,count})
  })
  .catch(()=>{
      res.send({code:0,msg:'查询失败，请重试！'})
  })
})

// 模糊查询（关键字查询）
router.post('/search', (req, res) => {
  // 获取前端传过来的关键字参数
  let { kw } = req.body
  // 定义匹配关键字的正则
  // let reg=/kw/  // 这样的话只会匹配到'kw'字符串
  let reg = new RegExp(kw)  //匹配kw变量的值
  // 根据关键字查询数据
  foodModel.find({ $or: [{ name: { $regex: reg } }, { age: { $regex: reg } }, { num: { $regex: reg } }, { position: { $regex: reg } }] })
    .then((arr) => {
      if (arr.length === 0) {
        res.send({ code: 1, msg: '暂无数据', data: [] })
      } else {
        res.send({ code: 1, msg: '查询成功', data: arr })
      }
    })
    .catch((err) => {
      res.send({ code: 0, msg: '查询失败' })
    })
})

// 导出路由表
module.exports = router
