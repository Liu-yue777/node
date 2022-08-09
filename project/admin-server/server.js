// 入口文件

// 导入模块
let express = require('express')
let path = require('path')
let connect = require('./db/connect.js')

// 创建express服务
let app = express()


// 解决跨域
let cors = require('cors')
app.use(cors())

// 解析请求体
app.use(express.urlencoded({extended:false}))// 解析模拟表单数据
app.use(express.json())// 解析json数据

// 导入路由表
let userRouter = require('./router/userRouter.js')
let foodRouter = require('./router/foodRouter.js')
let fileRouter = require('./router/fileRouter.js')

// 告诉express服务，什么时候，使用哪张路由表(中间件)
app.use('/user',userRouter)
app.use('/food',foodRouter)
app.use('/file',fileRouter)

// 设置静态资源目录
// 访问 http://localhost:8080/static 时，就访问到www目录
app.use('/static',express.static(path.join(__dirname,'www')))

// 监听端口，启动服务
app.listen(8080,'localhost',()=>{
    console.log( '----------------server start---------------' )
})
