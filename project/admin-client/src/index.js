console.log('首页入口。。。。')

// 导入样式模块
import './css/reset.css'
import './css/bootstrap.css'
import './less/index.less'


// 作用是加载 Bootstrap 的所有 jQuery 插件到 jQuery 对象上
require('bootstrap')

// 导入业务模块
import './js/index-module.js'