// nodemailer模块，用于发送邮件
// 官方文档: https://nodemailer.com/about/

// 1.下载模块: npm i nodemailer
// 2.导入模块
let nodemailer = require('nodemailer')

// 3.使用模块

function sendMail(email,subject,text){
    // 创建transporter对象
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",// 发送者的邮箱主机名(看下方查找1)
        port: 465,// 端口号
        secure: true, // 端口号为465时是true, 其他端口号为false
        auth: {
            user: '99835885@qq.com', // 发送者的邮箱地址(管理员的邮箱地址)
            pass: 'wdmtlvqnhznmbjcb', // 发送者邮箱的SMTP授权码(看下方查找2)
        },
    })

    // 查找1: 
    // node_modules\nodemailer\lib\well-known\services.json 
    // 打开services.json文件
    // 搜索 qq 找到qq邮箱的配置

    // 查找2:
    // 进入99835885@qq.com邮箱主页
    // 点击 设置
    // 点击 账户
    // 开启 POP3/SMTP服务 
    // 需要身份验证
    // 复制 SMTP 授权码

    // 发送邮件的配置信息
    // "570062873@qq.com"
    let info = {
        from: '"管理员 👻" <99835885@qq.com>', // 发送者邮箱地址(管理员的邮箱地址)
        to: email, // 接收者的邮箱地址
        subject: subject, // 邮件主题
        text: text, // 邮件主体内容,二选一
        // html: "<b>Hello world?</b>", // 邮件主体内容,二选一
    }

    // 发送邮件（异步任务）
    return new Promise((resolve,reject)=>{
        transporter.sendMail(info,(err)=>{
            if (err) {
                console.log( '发送失败' )
                reject('发送邮件失败')
            } else{
                console.log( '发送成功' )
                resolve('发送邮件成功')
            }
        })
    })
}

// 导出内容
module.exports = {sendMail}
