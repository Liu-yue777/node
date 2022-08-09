// 导入模块
let mongoose = require('mongoose')

// mongoose中的一切始于schema对象
// 创建schema对象（设置users数据集合中的字段名称和值的类型）
let userSchema = mongoose.Schema({
    username: {
        type: String,// 设置字段数据类型
        required: true// 必填项
    },
    password: {
        type: String,// 设置字段数据类型
        required: true// 必填项
    },
    nickname: {
        type: String,// 设置字段数据类型
        default: "张三"// 选填项
    },
    email: {
        type: String,// 设置字段数据类型
        required: true// 必填项
    },
    sex: {
        type: String,// 设置字段数据类型
        default: "妖"// 选填项
    },
    age: {
        type: String,// 设置字段数据类型
        default: "99"// 选填项
    }
})

// 把schema对象编译成数据模型model
// 使用 数据模型 来对数据库进行增删改查等操作
let  userModel = mongoose.model('users',userSchema)

// 导出数据模型
module.exports = userModel
