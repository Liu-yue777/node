// 文件相关的路由表

// 创建路由表（空表）
let router = require('express').Router()
let multer = require('multer')
let path = require('path')

/* 
    服务端接收上传文件(复杂版)
    使用 multer 插件接收上传的文件
    1.下载：npm i multer
    2.导入
    3.使用：
        在服务端准备一个保存上传文件目录 www/uploads
        生成一个接收器，用于接收上传的文件
        接收器中的配置：{storage:'仓库信息'}
        生成一个仓库信息对象: multer.diskStorage({配置})
        仓库信息对象的配置：{
                            destination: function (){},
                            filename: function (){}
                        }
        
        在匹配路径后面使用接收器解析上传的文件，并添加到req.file属性中
        receiver.single('上传文件的name值') 用于接收单个文件
*/

// 生成接收器
let receiver = multer({
    // dest: './www/uploads' 上传文件存储路径，简单版
    limits: {
        // 限制上传文件最大为500KB
        fileSize: 1024 * 500
    },
    fileFilter: function (req,file,cb){
        // 限制只能上传图片
        let reg = /\.(png|jpe?g|gif|svg)$/
        if (reg.test(file.originalname)) {
            // 上传的文件类型符合要求，接收文件
            cb(null,true)
        } else {
            // 上传的文件类型不符合要求，不接收文件
            cb(null,false)
        }
    },
    storage: multer.diskStorage({
        destination: function (req,file,cb){// 设置文件存储路径
            // cb 回调函数，用于设置上传文件的存储路径
            // 执行回调函数来设置上传文件的存储路径
            // null 不修改上传的二进制流文件
            // './www/uploads' 上传文件的存储路径
            cb(null,'./www/uploads')
        },
        filename: function (req,file,cb){// 设置文件的名称
            // 执行回调函数来设置上传文件的名称
            // null 不修改上传的二进制流文件
            // 'hehe.png' 上传文件的名称
            // cb(null,'hehe.png')// 上传的所有图片都叫hehe.png 会发送覆盖

            // 自定义文件名和后缀名
            let hzm = path.extname(file.originalname) // '.png' 上传文件的原始后缀名
            let filen = 'upload_'+Date.now()+'_'+parseInt(Math.random()*100000)+hzm
            // 'upload_17653256563_456722.png'
            cb(null,filen)
        }
    })
})

let fun = receiver.single('myimg')// 接收文件

router.post('/upload',(req,res)=>{

    fun(req,res,(err)=>{// 接收到文件之后执行的回调函数
        if (err) {
            console.log( err )
            // 上传的文件大小不符合要求
            return res.send({code:-1,msg:'上传的图片最大为500KB！'})
        }
        if (!req.file) {
            // 上传的文件类型不符合要求
            return res.send({code:-2,msg:'只能上传图片类型的文件！'})
        }
        res.send({code:1,msg:'图片上传成功',imgurl:'http://localhost:8080/static/uploads/'+req.file.filename})
    })
})

// 导出路由表
module.exports = router
