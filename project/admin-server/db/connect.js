// 连接数据库

// 1. 安装：npm install mongoose
// 2. 导入使用
let mongoose = require('mongoose')

// 3. 连接数据库
mongoose.connect('mongodb://localhost/hehe')

// 4. 监听连接状态
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log( '-----------------db connect-----------------' )
})
// module.exports = {}